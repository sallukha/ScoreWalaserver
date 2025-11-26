 import { Match } from "../model/Match.js";
import { getIO } from "../sockets/socket.js";

export const addBall = async (req, res) => {
  try {
    const { matchId } = req.params;

    const {
      ballNumber,
      batsman,
      bowler,
      runs = 0,
      extrasType = null,
      extrasRuns = 0,
      isWicket = false,
      wicketType = null,
    } = req.body;

    // ✅ Guard checks
    if (ballNumber === undefined) {
      return res.status(400).json({
        success: false,
        message: "ballNumber is required",
      });
    }

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    // ✅ Create innings if missing
    if (!match.innings || match.innings.length === 0) {
      match.innings = [
        {
          inningsNumber: 1,
          battingTeam: match.teamA,
          bowlingTeam: match.teamB,
          totalRuns: 0,
          wickets: 0,
          ballsBowled: 0,
          balls: [],
        },
      ];
      match.currentInnings = 1;
    }

    const inningsIndex = match.currentInnings - 1;
    const innings = match.innings[inningsIndex];

    // ✅ Ensure inningsNumber exists
    if (!innings.inningsNumber) {
      innings.inningsNumber = match.currentInnings;
    }

    // ✅ CRAITICAL FIX: ensure ballNumber saved
    innings.balls.push({
      ballNumber: Number(ballNumber),
      batsman,
      bowler,
      runs: Number(runs),
      extrasType,
      extrasRuns: Number(extrasRuns),
      isWicket,
      wicketType,
    });

    // ✅ Update stats
    innings.totalRuns += Number(runs) + Number(extrasRuns);

    if (extrasType !== "wide" && extrasType !== "no-ball") {
      innings.ballsBowled += 1;
    }

    if (isWicket) {
      innings.wickets += 1;
    }

    await match.save();

    // ✅ Emit socket
    try {
      getIO().to(matchId).emit("live-score", innings);
    } catch (e) {}

    res.status(200).json({
      success: true,
      message: "Ball added successfully",
      innings,
    });
  } catch (err) {
    console.error("addBall ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
