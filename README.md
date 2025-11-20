
# TinyLink

---

## **Features**

* Create short URLs with optional custom codes
* Copy short links with one click
* View analytics (click count, last clicked)
* Delete links with confirmation modal
* Fully responsive UI (mobile-friendly)
* Smooth frontend UX with alerts + tooltips
* MVC architecture (models, controllers, routes)

---

## **Tech Stack**

* **Backend:** Node.js, Express
* **Database:** PostgreSQL (Neon)
* **Templating:** EJS
* **Frontend:** TailwindCSS + Axios
* **Architecture:** MVC 

---

## **Setup**

```sh
npm install
npm start
```

Create a `.env` file:

```
DATABASE_URL=your_neon_connection_string
```

---

## **Project Structure**

```
/controllers
/models
/routes
/views
/public
/db.js
```

---

## **Endpoints**

* **POST /api/links** → Create short link
* **GET /api/links** → Dashboard
* **GET /api/links/:code** → Stats page
* **DELETE /api/links/:code/delete** → Delete link
* **GET /:code** → Redirect handler

---
