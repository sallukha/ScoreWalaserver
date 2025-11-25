  // src/models/Player.js
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },

    role: {
      type: String,
      enum: ["batsman", "bowler", "all-rounder", "keeper"],
      default: "batsman",
    },

    battingStyle: { type: String, trim: true }, // "Right-hand bat"
    bowlingStyle: { type: String, trim: true }, // "Right-arm medium"

    // simple career stats (optional)
    careerMatches: { type: Number, default: 0 },
    careerRuns: { type: Number, default: 0 },
    careerWickets: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Player = mongoose.model("Player", playerSchema);
