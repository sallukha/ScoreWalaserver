 import mongoose from "mongoose";

const ballSchema = new mongoose.Schema({
  over: Number,
  ballInOver: Number,
  runs: Number,
  isWicket: Boolean,
});

const inningsSchema = new mongoose.Schema({
  battingTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  bowlingTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  totalRuns: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  balls: [ballSchema],
});

const matchSchema = new mongoose.Schema(
  {
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    oversLimit: Number,
    status: { type: String, default: "upcoming" },
    innings: [inningsSchema],
  },
  { timestamps: true }
);

export const Match = mongoose.model("Match", matchSchema);
