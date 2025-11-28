require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

// API routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Catch-all – FIXED
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(5000, () => console.log("Server running on port 5000"));
