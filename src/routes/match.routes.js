import express from "express";
import {
  createMatch,
  startMatch,
  getMatches,
  createInnings
} from "../controllers/match.controller.js";

const router = express.Router();
router.post("/", createMatch);
router.put("/:id/start", startMatch);
router.get("/", getMatches);
router.post("/:matchId/innings", createInnings);

export default router;
