  import mongoose from "mongoose";

// ---------- BALL SUB-SCHEMA ----------
const ballSchema = new mongoose.Schema(
  {
    ballNumber: { type: Number, required: true }, // 1,2,3...

    batsman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    bowler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    runs: { type: Number, default: 0 },

    extrasType: {
      type: String,
      enum: ["wide", "no-ball", "bye", "leg-bye", null],
      default: null,
    },

    extrasRuns: { type: Number, default: 0 },

    isWicket: { type: Boolean, default: false },

    wicketType: {
      type: String,
      enum: ["bowled", "caught", "lbw", "run-out", "stumped", null],
      default: null,
    },
  },
  { _id: false }
);

// ---------- INNINGS SUB-SCHEMA ----------
const inningsSchema = new mongoose.Schema(
  {
    inningsNumber: { type: Number, required: true }, // 1 or 2

    battingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    bowlingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    totalRuns: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    ballsBowled: { type: Number, default: 0 },

    // ✅ important: sab balls yahan store hongi
    balls: [ballSchema],
  },
  { _id: false }
);

// ---------- MATCH MAIN SCHEMA ----------
const matchSchema = new mongoose.Schema(
  {
    groundName: { type: String },

    teamA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    teamB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    oversLimit: { type: Number, default: 10 },

    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming",
    },

    tossWinner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    tossDecision: {
      type: String,
      enum: ["bat", "bowl", null],
      default: null,
    },

    currentInnings: { type: Number, default: 1 },

    // ✅ YAHAN PE INNINGS ARRAY AAYEGA
    innings: [inningsSchema],
  },
  { timestamps: true }
);

export const Match = mongoose.model("Match", matchSchema);
