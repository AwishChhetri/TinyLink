import express from "express"
import {singlecodeController} from "../controllers/singlecodeContoller.js"
const router=express.Router()
// This will open the stats page of the code /code->
router.get("/:code",singlecodeController.stats)

export default router;