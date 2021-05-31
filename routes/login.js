const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    //Called on Schema and not on instance
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(403).send(err);
  }
});
module.exports = router;
