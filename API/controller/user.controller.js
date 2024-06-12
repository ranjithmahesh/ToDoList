const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  const newUser = {};

  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = bcryptjs.hashSync(req.body.password, 10);
  const existingUse = await User.findOne({ email: newUser.email });
  if (existingUse) {
    res.status(400).send({ message: "User allready exist" });
  }

  const user = new User({ ...newUser });
  await user.save();

  res.status(200).send({ message: "User created", user });
};

module.exports.LoginUser = async (req, res) => {
  const existingUse = await User.findOne({ email: req.body.email });

  if (!existingUse) {
    return res.status(404).send({ message: "User does not exist" });
  }

  const isMatch = bcryptjs.compareSync(req.body.password, existingUse.password);

  if (!isMatch) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ id: existingUse._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .send({ message: "Authenticated successfully", user: existingUse, token });
};

module.exports.UpdateUser = async (req, res) => {
  const existingUser = await User.findById(req.params.id);
  if (!existingUser) {
    return res.status(404).send({ message: "User does not exist" });
  }

  const UpdateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );
  res.status(200).send({ message: "User Updated", UpdateUser });
};

module.exports.Userdetails = async (req, res) => {
  console.log(req.user.id, ";;;;;;;;;;");

  const UserDetails = await User.findById(req.user.id);

  res.status(200).send({ message: "User Details", userDetails: UserDetails });
};
module.exports.AllUser = async (req, res) => {
  console.log(req.user.id, ";;;;;;;;;;");

  const UserDetails = await User.find().populate("task");

  res.status(200).send({ message: "User Details", userDetails: UserDetails });
};
