import mongoose from "mongoose";

const ballSchema = new mongoose.Schema(
  {
    ballNumber: { type: Number, required: true }, // 1 to 6
    bowler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    batsman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    runs: { type: Number, default: 0 },
    extras: {
      type: String,
      enum: ["wide", "no-ball", "bye", "leg-bye", null],
      default: null,
    },
    isWicket: { type: Boolean, default: false },
    wicketType: {
      type: String,
      enum: ["bowled", "caught", "run-out", "lbw", null],
      default: null,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const overSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    innings: { type: Number, required: true }, // 1 or 2
    overNumber: { type: Number, required: true },
    bowler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    balls: [ballSchema],
  },
  { timestamps: true }
);

export const Over = mongoose.model("Over", overSchema);
