const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const messageRoutes = require("./routes/messages");
const leadsRoutes = require("./routes/leads");
const authRoutes = require("./routes/auth");
const visitorRoutes = require("./routes/visitors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/messages", messageRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Appsmatta API is running.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
