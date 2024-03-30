const express = require("express");
const {
  getAllNote,
  createNote,
  updateNote,
  deleteNote,
  getNote,
} = require("../controllers/notesController");
const {
  getUserNotes,
  getRecentNotes,
  getFeaturedNotes,
} = require("../controllers/speacialNoteController");
const router = express.Router();

router
  .route("")
  .get(getAllNote)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote);

router.route("/user/:id").get(getUserNotes);
router.route("/recent").get(getRecentNotes);
router.route("/featured").get(getFeaturedNotes);

module.exports = router;
