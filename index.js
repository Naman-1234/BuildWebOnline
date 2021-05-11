const express = require("express");
const logger = require("morgan");
require("./src/db/mongoose");
require("dotenv").config();
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const port = process.env.PORT || 7000;
const app = express();
const limiter = rateLimiter({
  windowMs: 60000,
  max: process.env.CALLS_PER_MINUTE || 5,
  message: {
    error: "Request Limit exceeded",
  },
});
//Routers
const signUpRouter = require("./src/routes/signUp");
const loginRouter = require("./src/routes/login");
const logoutRouter = require("./src/routes/logout");
const documentsRouter = require("./src/routes/documents");
const profileRouter = require("./src/routes/profile");
const checkLoggedInRouter = require("./src/routes/checkLoggedIn");
//Middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use(limiter);

app.use("/users/signup", signUpRouter);
app.use("/users/login", loginRouter);
app.use("/users/logout", logoutRouter);
app.use("/users/documents", documentsRouter);
app.use("/users/me", profileRouter);
app.use("/checkLoggedIn", checkLoggedInRouter);
app.use("*", async (req, res, next) => {
  res.status(404).send("Not a valid route this is ");
});
app.listen(port, () => {
  console.log(`Started at ${port}`);
});
