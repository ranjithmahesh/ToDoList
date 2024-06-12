const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "tasks" },
});

module.exports = mongoose.model("users", UserSchema);
