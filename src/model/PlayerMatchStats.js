 // src/models/PlayerMatchStats.js
import mongoose from "mongoose";

const playerMatchStatsSchema = new mongoose.Schema(
  {
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },

    inningsNumber: { type: Number, default: 1 },

    // Batting
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    dismissalType: {
      type: String,
      enum: [null, "bowled", "caught", "lbw", "run-out", "stumped", "hit-wicket", "not-out"],
      default: null,
    },

    // Bowling
    overs: { type: Number, default: 0 },
    ballsBowled: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 },

    // Fielding
    catches: { type: Number, default: 0 },
    runOuts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PlayerMatchStats = mongoose.model(
  "PlayerMatchStats",
  playerMatchStatsSchema
);
