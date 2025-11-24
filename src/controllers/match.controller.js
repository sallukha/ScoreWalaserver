import { Match } from "../model/Match.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createMatch = asyncHandler(async (req, res) => {
  const match = await Match.create(req.body);
  res.json(new ApiResponse(201, match));
});

export const startMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);
  match.status = "live";
  await match.save();

  res.json(new ApiResponse(200, match, "Match started"));
});

export const getMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find().populate("teamA teamB");
  res.json(new ApiResponse(200, matches));
});


export const createInnings = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const { battingTeam, bowlingTeam } = req.body;

  const match = await Match.findById(matchId);
  if (!match) throw new ApiError(404, "Match not found");

  match.innings.push({
    battingTeam,
    bowlingTeam,
    totalRuns: 0,
    wickets: 0,
    balls: [],
  });

  await match.save();

  res.json(new ApiResponse(200, match, "Innings created"));
});
