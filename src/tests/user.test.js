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
// Without Authentication login should give forbidden.
test('login Should not be done with nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: unAuthenticatedUser.email,
      password: 'this is no one password',
    })
    .expect(401);
});

// Trying to login for Authenticated One
test('Login should be successful by exisiting User', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: authenticatedUser.email,
      password: authenticatedUser.password,
    })
    .expect(200);
});

test('Should fetch Profile of authenticated user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${authenticatedUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test(' should not  fetch Profile of unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should patch Profile of authenticated user', async () => {
  const patchedUser = authenticatedUser;
  patchedUser.name = 'patched';
  await request(app)
    .patch(`/users/me/${userId}`)
    .set('Authorization', `Bearer ${authenticatedUser.tokens[0].token}`)
    .send(patchedUser)
    .expect(201);
});

test('Should not  patch Profile of unauthenticated user', async () => {
  const patchedUser = unAuthenticatedUser;
  patchedUser.name = 'patched';
  await request(app).patch(`/users/me/${userId}`).send(patchedUser).expect(401);
});

test('should delete profile of authenticated', async () => {
  await request(app)
    .delete(`/users/me/${userId}`)
    .set('Authorization', `Bearer ${authenticatedUser.tokens[0].token}`)
    .expect(201);
});

test('should not  delete profile of unauthenticated', async () => {
  await request(app).delete(`/users/me/${userId}`).expect(401);
});
