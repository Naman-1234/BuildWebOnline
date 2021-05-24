const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  userId,
  secondUserId,
  authenticatedUser,
  secondAuthenticatedUser,
  unAuthenticatedUser,
  setUpDatabase,
} = require('./fixtures/db');
//This should load all the code except port listen
//* Must put that user in database
beforeEach(setUpDatabase);

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
