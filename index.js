import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";

import linksRouter from "./routes/links.js";
import redirectRouter from "./routes/redirect.js";
import healthRouter from "./routes/health.js";
import singlecodeRouter from "./routes/singlecode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.redirect("/api/links");
});

app.use("/api/links", linksRouter);
app.use("/healthz", healthRouter);
app.use("/code", singlecodeRouter);
app.use("/", redirectRouter);

export default app;
