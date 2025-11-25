 import { Player } from "../model/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({ success: true, player });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("team");
    res.json({ success: true, players });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
