const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

const signinForm = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.signin(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ message: user.email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  signinForm,
};
