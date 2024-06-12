const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/Task")
  .catch((error) => console.error(error));
app.use(cors());
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
