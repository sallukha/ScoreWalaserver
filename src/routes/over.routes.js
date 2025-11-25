import express from "express";
import { addBallToOver } from "../controllers/over.controller.js";

const router = express.Router();

router.post("/:matchId/:innings/:overNumber/ball", addBallToOver);

export default router;
