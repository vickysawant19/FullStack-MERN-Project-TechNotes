const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/Note");
// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { username, email, password, roles } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(409).json({ error: "All field required" });
  }

  try {
    // find dublicate email
    const dublicate = await User.findOne({ email })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();
    if (dublicate) {
      return res.status(400).json({ message: "Email already exits" });
    }

    // Check if duplicate username exists
    const duplicateUsername = await User.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();
    if (duplicateUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hasedPassword,
      roles,
    });

    if (!newUser) {
      return res.status(400).json({ message: "error creating user" });
    }
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// update user controller
const updateUser = async (req, res) => {
  const { email, username, password, _id, roles, active } = req.body;

  // Check if _id is provided
  if (!_id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    // Find the user by _id
    let user = await User.findById(_id).select("-password").exec();

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with id: ${_id}` });
    }

    // Check if username is provided and not taken by another user
    if (username && username !== user.username) {
      const duplicate = await User.findOne({ username })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
      if (duplicate) {
        return res.status(400).json({ message: "username already exists" });
      }
      user.username = username;
    }
    // Check if email is provided and not taken by another user
    if (email && email !== user.email) {
      const duplicateEmail = await User.findOne({ email })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
      if (duplicateEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    // Update roles if provided
    if (roles && Array.isArray(roles)) {
      user.roles = roles;
    }

    // Update active status if provided
    if (typeof active === "boolean") {
      user.active = active;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  // Check if _id is provided
  if (!_id) {
    return res.status(400).json({ message: "ID not provided" });
  }
  try {
    // Find the user by _id
    const user = await User.findById(_id).select("-password").exec();

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notes = await Note.find({ user: _id }).exec();

    if (notes.length > 0) {
      return res.status(409).json({ message: "User got note assigned" });
    }

    // Delete the user
    await user.deleteOne();

    // Return success message
    res.status(200).json({ message: `User deleted: ${user.username}` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };
