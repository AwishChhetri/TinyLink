const urlInput = document.getElementById("urlInput");
const urlError = document.getElementById("urlError");
const form = document.getElementById("linkForm");
const submitBtn = document.getElementById("submitBtn");
const alertBox = document.getElementById("alertBox");

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const searchInput = document.getElementById("searchInput");
const rows = document.querySelectorAll("tbody tr");


function showAlert(type, text) {
  alertBox.innerHTML = `
    <div class="mb-6 p-4 border rounded-lg text-sm
      ${type === "success"
        ? "bg-green-900/40 border-green-500/40 text-green-300"
        : "bg-red-900/40 border-red-500/40 text-red-300"}">
      ${text}
    </div>
  `;

  setTimeout(() => (alertBox.innerHTML = ""), 2000);
}


urlInput.addEventListener("input", () => {
  try {
    new URL(urlInput.value.trim());
    urlError.classList.add("hidden");
  } catch {
    urlError.classList.remove("hidden");
  }
});


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.innerText = "Creating...";
  submitBtn.disabled = true;

  try {
    await axios.post("/api/links", {
      url: urlInput.value.trim(),
      code: document.getElementById("codeInput").value.trim(),
    });

    showAlert("success", "Short link created!");
    setTimeout(() => location.reload(), 700);

  } catch (err) {
    if (err.response?.status === 400) showAlert("error", "Invalid URL");
    else if (err.response?.status === 409) showAlert("error", "Code already exists");
    else showAlert("error", "Something went wrong");
  }

  submitBtn.innerText = "Shorten URL";
  submitBtn.disabled = false;
});


function copyLink(code, btn) {
  const shortURL = `${window.location.origin}/${code}`;

  navigator.clipboard.writeText(shortURL)
    .then(() => {
      // Create temporary tooltip
      const tooltip = document.createElement("span");
      tooltip.innerText = "Copied!";
      tooltip.className =
        "absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-emerald-600 text-white animate-pulse";

      // Position relative for tooltip anchor
      btn.style.position = "relative";
      btn.appendChild(tooltip);

      // Color flash
      btn.classList.add("bg-emerald-500/30", "text-emerald-200");

      setTimeout(() => {
        tooltip.remove();
        btn.classList.remove("bg-emerald-500/30", "text-emerald-200");
      }, 1200);
    })
    .catch(() => {
      alert("Failed to copy");
    });
}



let deleteCode = null;

function openDeleteModal(code) {
  deleteCode = code;
  deleteModal.classList.remove("hidden");
  console.log("model ope!")
}

function closeDeleteModal() {
  deleteModal.classList.add("hidden");
}

confirmDeleteBtn.addEventListener("click", async () => {
  try {
    await axios.post(`/api/links/${deleteCode}/delete`);
    const row = document.getElementById(`row-${deleteCode}`);
    if (row) row.remove();

    showAlert("success", "Link deleted!");
    closeDeleteModal();

  } catch (err) {
    showAlert("error", "Delete failed");
  }
});



searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();

  rows.forEach((row) => {
    row.style.display = row.innerText.toLowerCase().includes(term) ? "" : "none";
  });
});


const headers = document.querySelectorAll(".sortable");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const key = header.dataset.sort;
    const tbody = document.getElementById("linksTableBody");

    const sorted = [...rows].sort((a, b) => {
      const A = (a.dataset[key] || "").toLowerCase();
      const B = (b.dataset[key] || "").toLowerCase();
      return A.localeCompare(B);
    });

    tbody.innerHTML = "";
    sorted.forEach((row) => tbody.appendChild(row));
  });
});
