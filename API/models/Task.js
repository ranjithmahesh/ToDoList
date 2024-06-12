const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String },
  des: { type: String },
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("task", TaskSchema);
