const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
    trim: true,
    required: [true, 'Name is required'],
    unique: [true, 'Name already taken.'],
  },
  phoneNo: {
    type: String,
    required: [true, 'Phone number required'],
    trim: true,
    minlength: [10, 'Phone number must be of length 10'],
    maxlength: [10, 'Phone number must be of length 10'],
    validate(value) {
      if (!validator.isMobilePhone(value))
        throw new Error('Phone Number not valid');
    },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Gender Required'],
  },
  email: {
    type: String,
    required: [true, 'Email Required'],
    trim: true,
    unique: [true, 'Email already taken'],
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Email not valid');
    },
  },
  password: {
    type: String,
    minLength: [6, 'Minimum Length of Password must be 6'],
    required: [true, 'Password Required'],
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: String,
  },
});

// Connecting it to Files Collection, owner acts as a virtual key to
// connect user and files collections.
userSchema.virtual('files', {
  ref: 'File',
  localField: '_id',
  foreignField: 'owner',
});

//Before saving we will use bcrypt to secure the password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  //Calling next Middleware function
  next();
});

//Defining statics method to be called by Schema
userSchema.statics.findByCredentials = async (email, password) => {
  //findOne here is getting a promise,We need to get the result in user
  const user = await User.findOne({
    email: email,
  });
  if (!user) throw new Error('No One Found');

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error('No One Found');

  return user;
};
//This method will be called by instance and hence arrow function is not used since
//this binding is required in this method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.secret, {});

  //Adding them to userSchema tokens
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

/*
Making a function which will help in hiding data,
Some point to note is that it will not run on whole object you are sending, instead
say u are returning {user,token} then user and token each gets stringified but since this 
function is on instance of user, so it will be called for that one only.
*/
userSchema.methods.toJSON = function () {
  const user = this;
  //This is a function in Mongoose
  const publicUser = user.toObject();
  delete publicUser.password;
  delete publicUser.tokens;
  return publicUser;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
