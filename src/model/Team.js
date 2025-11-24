 
 
 import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
