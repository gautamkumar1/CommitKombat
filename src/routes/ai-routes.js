import { Router } from "express";
import { generateRoastMessage } from "../controllers/ai-controller.js";

const router = Router();

router.post("/generate-roast-message", generateRoastMessage);

export default router;
