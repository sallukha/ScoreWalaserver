 import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import teamRoutes from "./routes/team.routes.js";
import playerRoutes from "./routes/player.routes.js";
import matchRoutes from "./routes/match.routes.js";
import scoreRoutes from "./routes/score.routes.js";
import overRoutes from "./routes/over.routes.js";

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/overs", overRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cricket scoring API is running ✅",
  });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error 💥:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
