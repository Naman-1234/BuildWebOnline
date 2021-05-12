const router = require("express").Router();
const User = require("../models/User");
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    //Being called by an instance and not a schema
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
