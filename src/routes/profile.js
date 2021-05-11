const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("No One found");
  }
});
module.exports = router;
