const express = require('express');
const logger = require('morgan');
require('./db/mongoose');
require('dotenv').config();
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const path = require('path');
const app = express();
const limiter = rateLimiter({
  windowMs: 60000,
  max: process.env.CALLS_PER_MINUTE || 5,
  message: {
    error: 'Request Limit exceeded',
  },
});
//Routers
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const documentsRouter = require('./routes/documents');
const profileRouter = require('./routes/profile');

//Middlewares
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users/signup', signUpRouter);
app.use('/users/login', loginRouter);
app.use('/users/logout', logoutRouter);
app.use('/users/documents', documentsRouter);
app.use('/users/me', profileRouter);
//Adding error for any other path than this.
if (process.env.NODE_ENV === 'production') {
  //Since a build folder will be generated as soon as it is in production.
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// app.use("*", async (req, res, next) => {
//   res.status(404).send("Not a valid route this is ");
// });
module.exports = {
  app,
};
