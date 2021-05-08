const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous",
  },
  phoneNo: {
    type: String,
    required: true,
    length: 10,
    validate(value) {
      if (!validator.isMobilePhone(value))
        throw new Error("Phone Number not valid");
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email not valid");
    },
   
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//Connecting it to Files Relation Or Collection
userSchema.virtual('files', {
  ref: 'File',
  localField: '_id',
  foreignField: 'owner'
})

//Before saving we will use bcrypt to secure the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  //Calling next Middleware function
  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  //findOne here is getting a promise,We need to get the result in user
  const user=await User.findOne({
    email: email,
  })
  console.log('Inside findByCredentials', user);
  if (!user) throw new Error("No One Found");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("No One Found");
  console.log('user is ',user);
  return user;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.secret, {
    expiresIn: "7 days",
  });

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
userSchema.methods.toJSON = function()
{
  const user = this;
  console.log('user is ',user);
  console.log('Type of user is',typeof(user));
  //This is a function in Mongoose
  const publicUser = user.toObject();
  delete publicUser.password
  delete publicUser.tokens
  console.log('Type of publicUser ',typeof(publicUser));
  return publicUser
}

const User = mongoose.model("User", userSchema);
module.exports = User;
