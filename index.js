import express from "express";
import path from "path";
import "dotenv/config";
import cors from "cors";
import linksRouter from "./routes/links.js";
import redirectRouter from "./routes/redirect.js";
import healthRouter from "./routes/health.js";
import singlecodeRouter from "./routes/singlecode.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
const PORT=3003
// main routes
app.get("/", (req, res) => {
  // res.redirect("/api/links"); 
  res.send("senha tamang")
});

app.use("/api/links", linksRouter);
app.use("/healthz", healthRouter);
app.use("/code",singlecodeRouter)
app.use("/", redirectRouter);

app.listen(PORT, () => console.log("Running → http://localhost:3003"));
