const request = require('supertest');
const { app } = require('../app');
const Task = require('../models/Files');
const {
  firstUserDocument1,
  firstUserDocument2,
  firstAuthenticatedUser,
  setUpDatabase,
} = require('./fixtures/db');
/***
 *
 * Mainly tests deal with errors that can come if any code gets broke on the server side,and
 * to deal with the authentication part
 */
beforeEach(setUpDatabase);
test('User should be able to fetch all its documents', async () => {
  const response = await request(app)
    .get('/users/documents')
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});

test('Non-existent user should not be able to fetch documents', async () => {
  const response = await request(app)
    .get('/users/documents')
    .send()
    .expect(401);
});

test('User should  be able to get a particular document', async () => {
  const response = await request(app)
    .get(`/users/documents/${firstUserDocument1._id}`)
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Non-existent user should not be able to fetch a particular document', async () => {
  const response = await request(app)
    .get('/users/documents/${firstUserDocument1._id}')
    .send()
    .expect(401);
});

test('User should  be able to delete a particular document', async () => {
  const response = await request(app)
    .delete(`/users/documents/delete/${firstUserDocument1._id}`)
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(201);
});

test('Non-existent user should not be able to delete a particular document', async () => {
  const response = await request(app)
    .delete('/users/documents/delete/${firstUserDocument1._id}')
    .send()
    .expect(401);
});

test('User should be able to add a document', async () => {
  const response = await request(app)
    .post('/users/documents/add')
    .set('Authorization', `Bearer ${firstAuthenticatedUser.tokens[0].token}`)
    .send({
      name: 'addDocument',
      content: 'addDocument2',
      owner: firstAuthenticatedUser._id,
    })
    .expect(201);
});

test('Non-existent user should not be able to add a  document', async () => {
  const response = await request(app)
    .post('/users/documents/add')
    .send({
      name: 'addDocument',
      content: 'addDocument2',
      owner: firstAuthenticatedUser._id,
    })
    .expect(401);
});
