 import { Match } from "../model/Match.js";

export const addBall = async (req, res) => {
  try {
    const { matchId } = req.params;
    const {
      ballNumber,
      batsman,
      bowler,
      runs,
      extrasType,
      extrasRuns,
      isWicket,
      wicketType,
    } = req.body;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    const innings = match.innings[match.currentInnings - 1];
    if (!innings) return res.status(400).json({ message: "Innings not found" });

    innings.balls.push({
      ballNumber,
      batsman,
      bowler,
      runs,
      extrasType,
      extrasRuns,
      isWicket,
      wicketType,
    });

    innings.totalRuns += runs + (extrasRuns || 0);
    innings.ballsBowled += extrasType === "wide" || extrasType === "no-ball" ? 0 : 1;

    if (isWicket) innings.wickets += 1;

    await match.save();

    res.json({ success: true, innings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
