const express = require("express");
const {
  getAllNote,
  createNote,
  updateNote,
  deleteNote,
  getNote,
} = require("../controllers/notesController");
const router = express.Router();

router
  .route("")
  .get(getAllNote)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote);

router.route("/:id").get(getNote);

module.exports = router;
