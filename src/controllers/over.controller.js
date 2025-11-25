import { Over } from "../model/over.js";

export const addBallToOver = async (req, res) => {
  try {
    const { matchId, innings, overNumber } = req.params;
    const ballData = req.body;

    let over = await Over.findOne({
      matchId,
      innings,
      overNumber,
    });

    if (!over) {
      over = await Over.create({
        matchId,
        innings,
        overNumber,
        bowler: ballData.bowler,
        balls: [],
      });
    }

    over.balls.push(ballData);
    await over.save();

    res.status(200).json({ success: true, over });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
