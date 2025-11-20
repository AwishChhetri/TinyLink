import express from "express";
import { RedirectController } from "../controllers/redirectController.js";

const router = express.Router();
// This will open page of the code's url
router.get("/:code", RedirectController.go);

export default router;
