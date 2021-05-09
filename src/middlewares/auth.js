const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    //* One more thing, Currently we are using Authorization in header, We can also
    //* use localstorage.
    //Will use bearer token in Authorization Header
    const token = req.header("Authorization").replace("Bearer ", "");
    //Verifying the token
    //If not verified it will automatically throw the error, No need to be handled by us.
    const decoded = jwt.verify(token, process.env.secret);
    const user = User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) res.status("401").send("Please authenticate");
    //Setting current user to the one sent a request
    req.user = user;
    req.token = token;
    console.log("Passing authentication");
    next();
  } catch (err) {
    res.status("401").send("Please authenticate");
  }
};
