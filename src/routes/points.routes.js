import express from "express";
import {
  createPointsEntry,
  getLeaderboard,
  updatePoints,
} from "../controllers/points.controller.js";

const router = express.Router();

// init points row
router.post("/", createPointsEntry);

// tournament leaderboard
router.get("/:tournamentId", getLeaderboard);

// update after match
router.post("/update", updatePoints);

export default router;
