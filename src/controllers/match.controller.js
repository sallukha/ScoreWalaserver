 import { Match } from "../model/Match.js";

export const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json({ success: true, match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("teamA teamB tossWinner innings.battingTeam innings.bowlingTeam");

    res.json({ success: true, matches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Start Match (create first innings)
export const startMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.status = "live";

    if (match.innings.length === 0) {
      match.innings.push({
        inningsNumber: 1,
        battingTeam:
          match.tossDecision === "bat"
            ? match.tossWinner
            : match.teamA.equals(match.tossWinner)
            ? match.teamB
            : match.teamA,
        bowlingTeam:
          match.tossDecision === "bat"
            ? match.teamA.equals(match.tossWinner)
              ? match.teamB
              : match.teamA
            : match.tossWinner,
      });
    }

    await match.save();
    res.json({ success: true, match });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
