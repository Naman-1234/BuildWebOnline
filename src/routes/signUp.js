const router = require('express').Router();
const User = require('../models/User');
const { getErrors } = require('../utils/gettingErrors');
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    //Being called by an instance and not a schema
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    let errorsArray = getErrors(err);
    res.status(500).send(errorsArray);
  }
});

module.exports = router;
