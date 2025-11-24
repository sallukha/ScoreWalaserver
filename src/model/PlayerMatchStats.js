 import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
    player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PlayerMatchStats = mongoose.model(
  "PlayerMatchStats",
  statsSchema
);
