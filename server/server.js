const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["https://kanban-board-frontend-mu.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://kedarisettysai440:zGaI7ZFmPX1emwW8@karbanboarddb.3ow3j.mongodb.net/test?retryWrites=true&w=majority"
  )
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
