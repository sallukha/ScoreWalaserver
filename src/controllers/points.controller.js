import { PointsTable } from "../model/PointsTable.js";

// Create / Init points row
export const createPointsEntry = async (req, res) => {
  try {
    const entry = await PointsTable.create(req.body);
    res.status(201).json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const table = await PointsTable.find({ tournament: tournamentId })
      .populate("team")
      .sort({ points: -1, netRunRate: -1 });

    res.json({ success: true, table });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update points after match
export const updatePoints = async (req, res) => {
  try {
    const { tournament, winnerTeam, loserTeam } = req.body;

    if (winnerTeam) {
      await PointsTable.findOneAndUpdate(
        { tournament, team: winnerTeam },
        {
          $inc: { matchesPlayed: 1, wins: 1, points: 2 },
        }
      );
    }

    if (loserTeam) {
      await PointsTable.findOneAndUpdate(
        { tournament, team: loserTeam },
        {
          $inc: { matchesPlayed: 1, losses: 1 },
        }
      );
    }

    res.json({ success: true, message: "Points updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
