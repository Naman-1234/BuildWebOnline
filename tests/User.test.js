const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../app');
const User = require('../models/User');
const {
  firstAuthenticatedUser,
  firstUnauthenticatedUser,
  firstUnauthenticatedUserId,
  firstUserAuthenticatedId,
  setUpDatabase,
} = require('./fixtures/db');

beforeEach(setUpDatabase);

test('should sign up a user', async () => {
  await request(app)
    .post('/users/signup')
    .send({
      name: 'signup',
      email: 'singup@gmail.com',
      password: 'signup-signup',
      gender: 'Male',
      phoneNo: '1234567890',
    })
    .expect(201);
});
//CHecking if who is  registered on our website could login
test('Authenticated User should be able to log in ', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: firstAuthenticatedUser.email,
      password: firstAuthenticatedUser.password,
    })
    .expect(200);
});

//CHecking if who is not registered on our website could login
test('Non-existent User should not be able to log in ', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: firstUnauthenticatedUser.email,
      password: firstUnauthenticatedUser.password,
    })
    .expect(403);
});

test('Authenticated User should be able to log out ', async () => {
  await request(app)
    .get('/users/logout')
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(201);
});

test('Non-existent User should not be able to log out ', async () => {
  await request(app).get('/users/logout').send().expect(401);
});

test('Authenticated user should be able to fetch its profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Non-existent user should not  be able to fetch its profile', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Authenticated user should be able to patch its profile', async () => {
  const patchedProfile = firstAuthenticatedUser;
  patchedProfile.name = 'patchedauth';
  const response = await request(app)
    .patch(`/users/me/${firstUserAuthenticatedId}`)
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send(patchedProfile)
    .expect(201);

  //! Note here you will get the previous name, since in the funtion
  //! findOneAndUpdate returns the original one
  expect(response.body.name).toBe('auth1');

  //Now if you fetch from the database then that would have been updated
  const user = await User.findOne({
    _id: firstUserAuthenticatedId,
  });
  expect(user.name).toBe('patchedauth');
});

test('Non-existent user should not  be able to fetch its profile', async () => {
  await request(app)
    .patch(`/users/me/${firstUnauthenticatedUserId}`)
    .send()
    .expect(401);
});

test('Authenticated user should be able to fetch its profile', async () => {
  await request(app)
    .delete(`/users/me/${firstUserAuthenticatedId}`)
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(201);
});

test('Non-existent user should not  be able to fetch its profile', async () => {
  await request(app)
    .delete(`/users/me/${firstUnauthenticatedUserId}`)
    .send()
    .expect(401);
});
