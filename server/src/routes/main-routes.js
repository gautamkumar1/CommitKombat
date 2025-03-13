import { Router } from "express";
import { createScoreAndRoastMsg, leaderboardLists, testGithubApi } from "../controllers/main-controller.js";
import { createUserDerails, getUserDetailsByUsername } from "../controllers/user-controller.js";
const router = Router();
router.post("/createScoreAndRoastMsg",createScoreAndRoastMsg);
router.get("/getLeaderboardLists",leaderboardLists);
router.post("/getUserDetailsByUsername",getUserDetailsByUsername)
router.post("/createUserDerails",createUserDerails);
router.post("/testingGithubAPI",testGithubApi);
export default router;