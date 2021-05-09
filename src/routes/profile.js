const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user || {
      name: "Naman Kalra",
      _id: "609686528941121e202ce907",
      phoneNo: "9817636188",
      gender: "Male",
      email: "namankalrabhiwani54@gmail.com",
      __v: 4,
    };
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("No One found");
  }
});
module.exports = router;
