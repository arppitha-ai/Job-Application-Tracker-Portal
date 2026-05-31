const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Job = require("./models/Job");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
