import { Router } from "express";
import { createScore } from "../controllers/score-controllers.js";
const router = Router();
router.post("/create-score", createScore);
export default router;
