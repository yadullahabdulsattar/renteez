const mongoose = require("mongoose");
const User = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");

const getUserById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "No such user found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "No such user found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const deletedUser = await User.findByIdAndDelete(user._id);
    res.status(200).json({
      message:
        deletedUser.first_name +
        " " +
        deletedUser.last_name +
        " has been deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "No such user found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let newPassword;

    if (req.body.password) {
      if (!validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({ message: "Password not strong enough" });
      }
      const salt = await bcrypt.genSalt(13);
      newPassword = await bcrypt.hash(req.body.password, salt);
    }

    // Update the user's details with the updated user object using a query
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { ...req.body, password: newPassword },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Details for " + updatedUser.last_name + " have been updated",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserById,
  deleteUserById,
  changeDetails,
};
