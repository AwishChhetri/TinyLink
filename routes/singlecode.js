import express from "express"
import {singlecodeController} from "../controllers/singlecodeContoller.js"
const router=express.Router()

router.get("/:code",singlecodeController.stats)

export default router;