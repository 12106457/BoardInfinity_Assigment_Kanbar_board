const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is missing");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("hello welcome to kanban board");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
