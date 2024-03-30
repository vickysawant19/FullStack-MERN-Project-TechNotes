const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

router
  .route("")
  .get(getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/:id").get(getUser);

module.exports = router;
