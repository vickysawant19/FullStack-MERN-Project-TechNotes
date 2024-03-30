const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/Note");

// Controller for getting notes by user ID
const getUserNotes = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "no id provided" });
  }
  try {
    const userNotes = await Note.find({ user: id }).limit(5);
    res.status(200).json(userNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Controller for getting recent notes
const getRecentNotes = async (req, res) => {
  try {
    const recentNotes = await Note.find({ completed: false })
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json(recentNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for getting featured notes
const getFeaturedNotes = async (req, res) => {
  try {
    const featuredNotes = await Note.find({
      completed: false,
      createdAt: { $lt: new Date() },
    }).limit(5);
    res.json(featuredNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserNotes, getRecentNotes, getFeaturedNotes };
