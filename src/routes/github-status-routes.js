import { Router } from "express";
import { getGithubLeetcodeUserAllData } from "../controllers/github-controllers.js";
const router = Router();

router.post("/create-github-leetcode-user-all-data", getGithubLeetcodeUserAllData);
export default router;
