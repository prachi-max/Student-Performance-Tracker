const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: String,
  subject: String,
  title: String,
  description: String,
  difficulty: String,
  deadline: Date,
  status: String
});

module.exports = mongoose.model("Task", TaskSchema);