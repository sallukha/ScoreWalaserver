 // src/models/Team.js
import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },    // "Delhi Warriors"
    shortName: { type: String, trim: true },                // "DELW"
    location: { type: String, trim: true },                 // "Delhi"
    logo: { type: String },                                 // optional image url
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
