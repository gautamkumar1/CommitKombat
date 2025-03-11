import { Router } from "express";
import { createScoreAndRoastMsg } from "../controllers/main-controller.js";
const router = Router();
router.post("/createScoreAndRoastMsg",createScoreAndRoastMsg);
export default router;