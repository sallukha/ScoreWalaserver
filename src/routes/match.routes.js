 import express from "express";
import {
  createMatch,
  getMatches,
  startMatch,
} from "../controllers/match.controller.js";

const router = express.Router();

router.post("/", createMatch);
router.get("/", getMatches);

// start match
router.post("/:id/start", startMatch);

export default router;
