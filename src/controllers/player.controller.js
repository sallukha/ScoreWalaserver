 import { Player } from "../model/Player.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPlayer = asyncHandler(async (req, res) => {
  const player = await Player.create(req.body);
  res.json(new ApiResponse(201, player, "Player created"));
});

export const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find();
  res.json(new ApiResponse(200, players));
});

export const getPlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.json(new ApiResponse(200, player));
});
