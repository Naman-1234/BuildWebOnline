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

router.post("/all", async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokes.length);
    await req.user.save();
    res.send();
  } catch (err) {
    //Removing all tokens
    res.status(500).send();
  }
});
module.exports = router;
