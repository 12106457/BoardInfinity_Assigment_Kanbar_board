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
console.log(process.env.MONGODB_URL)
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
