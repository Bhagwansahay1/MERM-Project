const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");

const JWTSecretKey = "Bhagwan@@QQaa";

// Create a User using :Post API "api/auth/createuser". Doesn't require Authentication.
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],

  async (req, res) => {
    let success = false;
    //   If There are errors, retrun Bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ errors: errors.array() });
    }
    // Check Whether the user with this email exists already.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      const SecurePassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecurePassword,
      });
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWTSecretKey);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
    //   .then((user) => res.json(user))
    //   .catch((err) => {
    //     res.json({ errors: "Please Enter a unique email address" });
    //   });
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWTSecretKey);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get loggedin User Details using :POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
