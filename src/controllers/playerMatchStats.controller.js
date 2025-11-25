import { PlayerMatchStats } from "../models/PlayerMatchStats.js";

export const createPlayerStats = async (req, res) => {
  try {
    const stats = await PlayerMatchStats.create(req.body);
    res.status(201).json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
