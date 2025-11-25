 import { Over } from "../model/over.js";

export const addBallToOver = async (req, res) => {
  try {
    const { matchId, innings, overNumber } = req.params;
    const ballData = req.body;

    const {
      ballNumber,
      bowler,
      batsman,
      runs = 0,
      extras = null,
      isWicket = false,
      wicketType = null,
    } = ballData;

    if (!matchId || !innings || !overNumber) {
      return res.status(400).json({ message: "Missing params" });
    }

    if (!bowler || !batsman) {
      return res.status(400).json({ message: "Bowler and Batsman required" });
    }

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
        bowler,
        balls: [],
      });
    }

    // ✅ Count legal balls
    const legalBalls = over.balls.filter(
      (b) => b.extras !== "wide" && b.extras !== "no-ball"
    ).length;

    if (legalBalls >= 6) {
      return res.status(400).json({ message: "Over already completed" });
    }

    // ✅ Push ball
    over.balls.push({
      ballNumber,
      bowler,
      batsman,
      runs,
      extras,
      isWicket,
      wicketType,
    });

    await over.save();

    res.status(200).json({
      success: true,
      message: "Ball added successfully",
      over,
    });
  } catch (err) {
    console.error("addBallToOver error:", err);
    res.status(500).json({ message: err.message });
  }
};
