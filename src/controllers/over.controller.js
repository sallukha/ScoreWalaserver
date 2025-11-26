import { Over } from "../model/over.js";
import { getIO } from "../sockets/socket.js"; // agar socket use kar raha hai

export const addBallToOver = async (req, res) => {
  try {
    const { matchId, innings, overNumber } = req.params;

    // 🟢 yahan safe check
    const ballData = req.body;

    if (!ballData || Object.keys(ballData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ball data is required in JSON body",
      });
    }

    const {
      ballNumber,
      bowler,
      batsman,
      runs = 0,
      extras = null,
      isWicket = false,
      wicketType = null,
    } = ballData;

    if (!ballNumber) {
      return res.status(400).json({ success: false, message: "ballNumber is required" });
    }

    if (!bowler || !batsman) {
      return res
        .status(400)
        .json({ success: false, message: "bowler and batsman are required" });
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

    // count legal balls (no wide/no-ball)
    const legalBalls = over.balls.filter(
      (b) =>
        b && b.extras !== "wide" && b.extras !== "no-ball"
    ).length;


    if (legalBalls >= 6) {
      return res
        .status(400)
        .json({ success: false, message: "Over already completed (6 legal balls)" });
    }

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

    // agar socket use kar rahe ho to
    try {
      const io = getIO?.();
      io?.to(matchId).emit("live-score", {
        matchId,
        innings: Number(innings),
        overNumber: Number(overNumber),
        over,
      });
    } catch (e) {
      console.log("Socket emit error (ignored):", e.message);
    }

    res.status(200).json({
      success: true,
      message: "Ball added successfully",
      over,
    });
  } catch (err) {
    console.error("addBallToOver error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
