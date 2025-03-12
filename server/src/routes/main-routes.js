import { Router } from "express";
import { createScoreAndRoastMsg, leaderboardLists } from "../controllers/main-controller.js";
const router = Router();
router.post("/createScoreAndRoastMsg",createScoreAndRoastMsg);
router.get("/getLeaderboardLists",leaderboardLists);
export default router;