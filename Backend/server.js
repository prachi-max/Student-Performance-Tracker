const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const predictionRoutes =
require('./routes/predictionRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/predict',predictionRoutes);

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);   


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});