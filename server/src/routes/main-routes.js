import { Router } from "express";
import { createScoreAndRoastMsg, leaderboardLists } from "../controllers/main-controller.js";
import { getUserDetailsByUsername } from "../controllers/user-controller.js";
const router = Router();
router.post("/createScoreAndRoastMsg",createScoreAndRoastMsg);
router.get("/getLeaderboardLists",leaderboardLists);
router.post("/getUserDetailsByUsername",getUserDetailsByUsername)
export default router;