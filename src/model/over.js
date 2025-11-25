 import mongoose from "mongoose";

const ballSchema = new mongoose.Schema(
  {
    ballNumber: { type: Number, required: true },
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
    innings: { type: Number, required: true },
    overNumber: { type: Number, required: true },
    bowler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    balls: [ballSchema],
    totalRuns: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ Unique constraint
overSchema.index(
  { matchId: 1, innings: 1, overNumber: 1 },
  { unique: true }
);

// ✅ Max 6 legal balls validation + totalRuns calc
overSchema.pre("save", function (next) {
  const legalBalls = this.balls.filter(
    (b) => b.extras !== "wide" && b.extras !== "no-ball"
  ).length;

  if (legalBalls > 6) {
    return next(new Error("Over cannot have more than 6 legal balls"));
  }

  this.totalRuns = this.balls.reduce((sum, b) => {
    return sum + b.runs + (b.extras ? 1 : 0);
  }, 0);

  next();
});

export const Over = mongoose.model("Over", overSchema);
