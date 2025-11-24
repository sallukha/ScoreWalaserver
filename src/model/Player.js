 import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Player = mongoose.model("Player", playerSchema);
