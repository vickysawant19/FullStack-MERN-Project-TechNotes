const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

router.use(verifyJWT);

router
  .route("")
  .get(getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/:id").get(getUser);

module.exports = router;
