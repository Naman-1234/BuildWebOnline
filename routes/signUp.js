const router = require('express').Router();
const User = require('../models/User');
const fs = require('fs');
const sharp = require('sharp');
const { getErrors } = require('../utils/gettingErrors');
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const image = user.image;
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    
    console.log(err);
    res.status(500).send([]);
  }
});

module.exports = router;
