import express from "express";
import {
  createPlayer,
  getPlayers,
  getPlayer,
} from "../controllers/player.controller.js";

const router = express.Router();
router.post("/", createPlayer);
router.get("/", getPlayers);
router.get("/:id", getPlayer);

export default router;
