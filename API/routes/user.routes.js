const express = require("express");
const {
  createUser,
  LoginUser,
  UpdateUser,
  Userdetails,
  AllUser,
} = require("../controller/user.controller");
const {
  userCreateValidation,
  Validation,
  userLoginValidation,
} = require("../utils/validation");
const { tokenVerify } = require("../utils/tokenVerify");
const router = express.Router();

router.post("/create", userCreateValidation, Validation, createUser);
router.post("/login", userLoginValidation, Validation, LoginUser);
router.put("/update/:id", tokenVerify, UpdateUser);
router.get("/user", tokenVerify, Userdetails);
router.get("/all", tokenVerify, AllUser);

module.exports = router;
