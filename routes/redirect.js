import express from "express";
import { RedirectController } from "../controllers/redirectController.js";

const router = express.Router();

router.get("/:code", RedirectController.go);

export default router;
