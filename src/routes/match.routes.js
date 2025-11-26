 import express from "express";

import {
  createMatch,
  getMatches,
  startMatch,
  endMatch
} from "../controllers/match.controller.js";

const router = express.Router();

router.post("/", createMatch);
router.get("/", getMatches);

// start match
router.post("/:id/start", startMatch);
router.post("/:id/end", endMatch);


export default router;
