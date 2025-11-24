 import { Team } from "../model/Team.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTeam = asyncHandler(async (req, res) => {
  const team = await Team.create(req.body);
  res.json(new ApiResponse(201, team, "Team created"));
});

export const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find().populate("players");
  res.json(new ApiResponse(200, teams));
});
