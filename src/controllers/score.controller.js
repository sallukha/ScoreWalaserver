import { Match } from "../model/Match.js";
import { getIO } from "../sockets/socket.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addBall = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const { over, ballInOver, runs, isWicket } = req.body;

  const match = await Match.findById(matchId);

  const inn = match.innings[0];
  inn.balls.push({ over, ballInOver, runs, isWicket });

  inn.totalRuns += runs;
  if (isWicket) inn.wickets += 1;

  await match.save();

  const io = getIO();
  io.to(matchId).emit("score-update", {
    score: `${inn.totalRuns}/${inn.wickets}`,
  });

  res.json(new ApiResponse(200, null, "Ball added"));
});
