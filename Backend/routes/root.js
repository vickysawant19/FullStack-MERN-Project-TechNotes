const express = require("express");
const path = require("path");
const User = require("../models/User");

const router = express.Router();

router.get("^/$|index(.html)?", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
