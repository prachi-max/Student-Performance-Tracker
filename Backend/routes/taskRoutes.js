const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require('../models/User');
// ✅ ADD TASK
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
     status: "Pending" 
    await task.save();
    res.json({ message: "Task added" });
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// ✅ GET TASKS (THIS WAS MISSING 🔥)
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.params.userId
    });

    res.json(tasks);
  }
  catch (err) {
  res.status(500).json(err);
  }

});

// UPDATE
router.put("/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
  
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
router.get(
  '/streak/:userId',

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.userId
        );

      res.json({
        currentStreak:
          user.currentStreak || 0
      });

    }

    catch(error) {

      res.status(500).json({
        message: error.message
      });

    }

});
module.exports = router;