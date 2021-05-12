const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const brcypt = require("bcryptjs");
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("No One found");
  }
});
router.patch("/:id", auth, async (req, res) => {
  try {
    const { name, email, gender, phoneNo } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        email: email,
        gender: gender,
        phoneNo: phoneNo,
      },
      {
        new: true,
        useValidators: true,
      }
    );
    if (!user) res.status(401).send("Enter correct credentials please!!");
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;
