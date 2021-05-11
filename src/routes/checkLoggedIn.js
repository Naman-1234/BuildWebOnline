const router = require("express").Router();
const auth = require("../middlewares/auth");
router.get("/", auth, (req, res) => {
  try {
    res.status(200).send("Please come in");
  } catch (err) {
    res.status(404).send("Please authenticate");
  }
});
module.exports = router;
