// src/models/Tournament.js
import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // "Village Premier League"
    level: {
      type: String,
      enum: ["village", "district", "state", "other"],
      default: "village",
    },
    location: { type: String },                      // "Village name"
    ballType: { type: String, default: "tennis" },   // "tennis", "leather"
    oversPerInnings: { type: Number, default: 10 },

    startDate: Date,
    endDate: Date,
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Tournament = mongoose.model("Tournament", tournamentSchema);
