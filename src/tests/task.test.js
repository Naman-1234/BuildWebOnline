const request = require('supertest');
const app = require('../../app');
const {
  userId,
  secondUserId,
  authenticatedUser,
  secondAuthenticatedUser,
  unAuthenticatedUser,
  documentForAuthenticated,
  documentForUnAuthenticated,
  setUpDatabase,
} = require('./fixtures/db');

beforeEach(setUpDatabase);

// test('Should let authenticated User add Document', async () => {
//   await request(app)
//     .post('/users/documents/add')
//     .set('Authorization', `Bearer ${authenticatedUser.tokens[0].token}`)
//     .send(documentForAuthenticated)
//     .expect(201);
// });

test('Should Get all the documents for a existent user', async () => {
  const response = await request(app)
    .get('/users/documents')
    .set('Authorization', `Bearer ${authenticatedUser.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(1);
});

test('User should be able to deltete their files', async () => {
  const id = documentForAuthenticated._id.toString();
  await request(app)
    .delete(`/users/documents/delete/${id}`)
    .set('Authorization', `Bearer ${authenticatedUser.tokens[0].token}`)
    .send()
    .expect(201);
});

test('Non Existent should not be able to delete other Users Tests', async () => {
  const id = documentForAuthenticated._id.toString();
  await request(app).delete(`/users/documents/delete/${id}`).send().expect(401);
});

test('User should not be able to delete others documents', async () => {
  const id = documentForAuthenticated._id.toString();
  await request(app)
    .delete(`/users/documents/delete/${id}`)
    .set('Authorization', `Bearer ${secondAuthenticatedUser.tokens[0].token}`)
    .send()
    .expect(401);
});
