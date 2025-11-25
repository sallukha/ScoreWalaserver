import { Tournament } from "../models/Tournament.js";

export const createTournament = async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json({ success: true, tournament });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json({ success: true, tournaments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
