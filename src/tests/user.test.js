const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//This should load all the code except port listen

const userId = new mongoose.Types.ObjectId();
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
const unAuthenticatedUser = {
  name: 'Naman',
  email: 'naman-unauth@gmail.com',
  password: '123456',
  gender: 'Male',
  phoneNo: '9817636188',
};

//* Must put that user in database
beforeEach(async () => {
  await User.deleteMany();
  await new User(unAuthenticatedUser).save();
  await new User(authenticatedUser).save();
});

test('Should signup a authenticated User', async () => {
  await request(app)
    .post('/users/signup')
    .send({
      name: 'Namantemp',
      email: 'namantemp@gmail.com',
      password: '123456',
      gender: 'Male',
      phoneNo: '1234567890',
    })
    .expect(201);
});
//Without Authentication login should give forbidden.
// test('Should login', async () => {
//   await request(app)
//     .post('/users/login')
//     .set('Authorization', '')
//     .send({
//       email: unAuthenticatedUser.email,
//       password: unAuthenticatedUser.password,
//     })
//     .expect(401);
// });

// Trying to login for Authenticated One
test('Login should be successful by authenticated One', async () => {
  await request(app)
    .post('/users/login')
    .set('Authorization', `Bearer ${authenticatedUser.tokens[0].token}`)
    .send({
      email: authenticatedUser.email,
      password: authenticatedUser.password,
    })
    .expect(200);
});
