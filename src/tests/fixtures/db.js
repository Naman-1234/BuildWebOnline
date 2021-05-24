const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Task = require('../../models/Files');

const userId = new mongoose.Types.ObjectId();
const secondUserId = new mongoose.Types.ObjectId();
const unAuthenticatedId = new mongoose.Types.ObjectId();
//Deleting  the data in a database first to start down the fresh lane always.
const authenticatedUser = {
  _id: userId,
  name: 'Naman',
  email: 'naman@gmail.com',
  password: '123456',
  gender: 'Male',
  phoneNo: '9817636188',
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.secret),
    },
  ],
};

const secondAuthenticatedUser = {
  _id: secondUserId,
  name: 'Naman',
  email: 'naman-second@gmail.com',
  password: '2345612',
  gender: 'Male',
  phoneNo: '9817636188',
  tokens: [
    {
      token: jwt.sign({ _id: secondUserId }, process.env.secret),
    },
  ],
};
const documentForAuthenticated = {
  _id: new mongoose.Types.ObjectId(),
  name: 'First',
  content: 'content',
  owner: authenticatedUser._id,
};

const unAuthenticatedUser = {
  _id: unAuthenticatedId,
  name: 'Naman',
  email: 'naman-unauth@gmail.com',
  password: '123456',
  gender: 'Male',
  phoneNo: '9817636188',
};

const documentForUnAuthenticated = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Second',
  content: 'second-content',
  owner: unAuthenticatedUser._id,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(unAuthenticatedUser).save();
  await new User(authenticatedUser).save();
  await new User(secondAuthenticatedUser).save();
  await new Task(documentForAuthenticated).save();
  await new Task(documentForUnAuthenticated).save();
};

module.exports = {
  userId,
  secondUserId,
  authenticatedUser,
  secondAuthenticatedUser,
  unAuthenticatedUser,
  documentForAuthenticated,
  documentForUnAuthenticated,
  setUpDatabase,
};
