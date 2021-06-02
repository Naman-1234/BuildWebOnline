const router = require('express').Router();
const User = require('../models/User');
const File = require('../models/Files');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const brcypt = require('bcryptjs');
const upload = require('../middlewares/Upload');
const sharp = require('sharp');
const { base64_encode } = require('../utils/Utilities');
const { getErrors } = require('../utils/gettingErrors');
//To get the Profile of User
router.get('/', auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(new Error(err));
  }
});

//To Update the user Profile
router.patch('/:id', auth, async (req, res) => {
  try {
    const { name, email, gender, phoneNo } = req.body;
    //Not Passing req.body in our findByIdAndUpdate since that will make password as NULL
    const user = await User.findOneAndUpdate(
      req.params.id,
      {
        name: name,
        email: email,
        gender: gender,
        phoneNo: phoneNo,
      },
      {
        runValidators: true,
      }
    );
    if (!user) res.status(401).send('Enter correct credentials please!!');
    res.status(201).send(user);
  } catch (err) {
    let errorsArray = getErrors(err);
    res.status(500).send(errorsArray);
  }
});

//To delete user Profile
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) res.status(404).send();
    //Deleting all the documents associated with this user
    const documents = await File.deleteMany({
      owner: req.params.id,
    });
    res.status(201).send({ user, documents });
  } catch (err) {
    res.status(500).send(new Error(err));
  }
});

//Uploading User Avatar
router.post(
  '/avatar',
  auth,
  upload.single('UserProfile'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({
        height: 250,
        width: 250,
      })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(201).send(req.user.avatar);
  },
  (err, req, res, next) => {
    console.log(err);
    //This path is required to parse HTML Coming from multer errors to JSON.
    //This path is for error handling in react and must contain these four parameters in this particular order in order to be used properly.
    res.status(500).send({
      error: err.message,
    });
  }
);
router.get('/avatar', auth, async (req, res) => {
  try {
    if (!req.user || !req.user.avatar) {
      let defaultImage = base64_encode('images/avatar.png');
      res.set('content-Type', 'image/jpg');
      res.status(200).send(defaultImage);
    } else {
      res.set('content-Type', 'image/jpg');
      res.status(200).send(user.avatar);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
