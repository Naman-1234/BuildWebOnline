const router = require('express').Router();
const auth = require('auth');
router.get('/', auth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(404).send('No One found');
  }
});
module.exports = router;
