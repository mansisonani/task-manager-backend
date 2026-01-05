const express = require("express");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", taskRoutes);

// Health check
app.get("/health", (req, res) => {
  res.send("Server is healthy 🚀");
});

module.exports = app;
