import { Router } from "express";
import { testingRank } from "../controllers/rank-controllers.js";
const router = Router();
router.post("/testing", testingRank);
export default router;


