const express = require("express");
const {
  createUser,
  LoginUser,
  UpdateUser,
  Userdetails,
} = require("../controller/user.controller");
const {
  userCreateValidation,
  Validation,
  userLoginValidation,
} = require("../utils/validation");
const { tokenVerify } = require("../utils/tokenVerify");
const {
  createTask,
  deletedTask,
  updateTask,
  getTaskTask,
  AllTask,
} = require("../controller/task.controller");
const router = express.Router();

router.post("/create", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deletedTask);
router.get("/details/:id", getTaskTask);
router.get("/all", AllTask);

module.exports = router;
