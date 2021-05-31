const router = require("express").Router();
const auth = require("../middlewares/auth");
router.get("/", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token !== req.token;
    });
    await req.user.save();
    res.status(201).send();
  } catch (err) {
    console.log("Error is", err);
    res.status(500).send(err);
  }
});

//To logout from all devices, Say you are currently logged from 4 different devices
//Then this will logout from all devces.
router.post("/all", async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokes.length);
    await req.user.save();
    res.status(201).send("Successfully Logged out from all devices");
  } catch (err) {
    res.status(500).send(new Error(err));
  }
});
module.exports = router;
