const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Job = require("./models/Job");

const app = express();

app.use(cors());
app.use(express.json());

// Replace YOUR_PASSWORD with your actual password when running locally
mongoose
  .connect(
    "mongodb+srv://Arppitha:YOUR_PASSWORD@cluster0.eyebgza.mongodb.net/jobtracker?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

// GET ALL JOBS
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD JOB
app.post("/jobs", async (req, res) => {
  try {
    const job = new Job({
      company: req.body.company,
      role: req.body.role,
      status: req.body.status,
    });

    await job.save();

    res.json({
      message: "Job Added Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE JOB
app.put("/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        company: req.body.company,
        role: req.body.role,
        status: req.body.status,
      },
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE JOB
app.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});