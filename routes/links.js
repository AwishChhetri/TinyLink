import express from "express";
import { LinksController } from "../controllers/linksController.js";

const router = express.Router();
// All the operation will be performed over here /api/lisks/->
router.get("/", LinksController.list);
router.post("/", LinksController.create);
router.get("/:code", LinksController.stats);
router.post("/:code/delete", LinksController.remove);

export default router;
