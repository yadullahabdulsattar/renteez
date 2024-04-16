const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

// Controller methods
const createUser = async (req, res, next) => {
  const { title, first_name, last_name, email, password, phone } = req.body;

  try {
    const user = await User.signup(
      title,
      first_name,
      last_name,
      email,
      password,
      phone
    );
    const token = createToken(user._id);
    res.status(201).json({ message: user.email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
};
