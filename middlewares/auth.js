const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    //Request will contain Authorization header of the form Bearer <token>
    const token = req.header("Authorization").replace("Bearer ", "");
    //Verifying the token
    //If not verified it will throw the unauthorized error
    const decoded = await jwt.verify(token, process.env.secret);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) res.status("401").send("Please authenticate");
    //Setting current user to the one that sent a request
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status("401").send("Please authenticate");
  }
};
module.exports = auth;
