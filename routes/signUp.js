const router = require('express').Router();
const User = require('../models/User');
const fs = require('fs');
const sharp = require('sharp');
const { getErrors } = require('../utils/gettingErrors');
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const imageString = req.body.profileImage;
    const binaryBuffer = imageString.replace(/^data:image\/\w+;base64,/, '');
    let buffer = new Buffer(binaryBuffer, 'base64');
    // fs.writeFile('profile,png', buffer, (err) => {
    //   if (err) console.log('Error in saving profile image');
    //   else console.log('SUcccess!!');
    // });
    //Being called by an instance and not a schema

    buffer = await sharp(buffer)
      .resize({
        height: 250,
        width: 250,
      })
      .png()
      .toBuffer();
    user.avatar = buffer;
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    // let errorsArray = getErrors(err);
    console.log(err);
    res.status(500).send([]);
    // res.status(500).send(errorsArray);
  }
});

module.exports = router;
