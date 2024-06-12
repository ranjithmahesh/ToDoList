const { check, validationResult } = require("express-validator");

module.exports.userCreateValidation = [
  check("name", "name is required").not().isEmpty(),
  check("email", "email is required").not().isEmpty(),
  check("email", "email is inValid").isEmail(),
  check("password", "password is required").not().isEmpty(),
  check("password", "Password must be at least 8 characters long").isLength({
    min: 8,
  }),
];
module.exports.userLoginValidation = [
  check("email", "email is required").not().isEmpty(),
  check("email", "email is inValid").isEmail(),
  check("password", "password is required").not().isEmpty(),
  check("password", "Password must be at least 8 characters long").isLength({
    min: 8,
  }),
];

module.exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
