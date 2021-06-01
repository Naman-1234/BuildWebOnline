const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//Models
const User = require('../../models/User');
const Task = require('../../models/Files');

const firstUserAuthenticatedId = new mongoose.Types.ObjectId();
const firstUnauthenticatedUserId = new mongoose.Types.ObjectId();
const firstAuthenticatedUser = {
  _id: firstUserAuthenticatedId,
  name: 'auth1',
  phoneNo: '1234567890',
  gender: 'Male',
  email: 'auth@gmail.com',
  password: 'authpass123',
  tokens: [
    {
      token: jwt.sign(
        {
          _id: firstUserAuthenticatedId,
        },
        process.env.secret
      ),
    },
  ],
};

const firstUnauthenticatedUser = {
  _id: firstUnauthenticatedUserId,
  name: 'unAuth1',
  phoneNo: '9876543210',
  gender: 'Female',
  email: 'unAuth@gmail.com',
  password: 'unAuthpass123',
  tokens: [
    {
      token: jwt.sign(
        {
          _id: firstUnauthenticatedUserId,
        },
        process.env.secret
      ),
    },
  ],
};

const firstUserDocument1 = {
  _id: new mongoose.Types.ObjectId(),
  name: 'firstUser-1',
  content: 'firstUser-Content1',
  owner: firstUserAuthenticatedId,
};
const firstUserDocument2 = {
  _id: new mongoose.Types.ObjectId(),
  name: 'firstUser-2',
  content: 'firstUser-Content2',
  owner: firstUserAuthenticatedId,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(firstAuthenticatedUser).save();
  await new Task(firstUserDocument1).save();
  await new Task(firstUserDocument2).save();
};
module.exports = {
  firstAuthenticatedUser,
  firstUserAuthenticatedId,
  firstUnauthenticatedUser,
  firstUnauthenticatedUserId,
  firstUserDocument1,
  firstUserDocument2,
  setUpDatabase,
};
