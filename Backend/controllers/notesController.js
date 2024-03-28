const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/Note");

const getNote = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No id provided" });
    }
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "No note Found" });
    }
    res.status(200).send(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

const getAllNote = expressAsyncHandler(async (req, res) => {
  try {
    const notes = await Note.find().exec();
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

const createNote = expressAsyncHandler(async (req, res) => {
  const { title, text, user } = req.body;

  if (!title || !text || !user) {
    return res(400).json({ message: "some fields are missing" });
  }
  try {
    const newNote = await Note.create({ user, title, text });
    if (!newNote) {
      return res.status(400).json({ message: "error creating new note " });
    }
    return res.status(200).send(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

const updateNote = async (req, res) => {
  const { _id, title, text, completed } = req.body;

  // Check if _id is provided
  if (!_id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    // Find the note by _id
    const note = await Note.findById(_id);

    // Check if note exists
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Update note fields if provided
    if (title) {
      note.title = title;
    }
    if (text) {
      note.text = text;
    }
    if (typeof completed === "boolean") {
      note.completed = completed;
    }

    // Save the updated note
    const updatedNote = await note.save();

    // Return the updated note
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteNote = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ message: "id not provided" });
  try {
    const note = await Note.findById(_id).exec();
    if (!note) return res.status(400).json({ message: "no note found" });
    await note.deleteOne();
    res.status(200).json({ message: "note deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = { getAllNote, createNote, updateNote, deleteNote, getNote };
