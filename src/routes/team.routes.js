import express from "express";
import { createTeam, getTeams } from "../controllers/team.controller.js";

const router = express.Router();
router.post("/", createTeam);
router.get("/", getTeams);

export default router;
