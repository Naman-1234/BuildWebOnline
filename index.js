const express = require("express");
const logger = require("morgan");
const passport = require("passport");
require("./src/db/mongoose");
require("dotenv").config();
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const path = require("path");
const port = process.env.PORT || 7000;
const app = express();
app.use(passport.initialize());
app.use(passport.session());
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

//Middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use(limiter);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.use("/users/signup", signUpRouter);
app.use("/users/login", loginRouter);
app.use("/users/logout", logoutRouter);
app.use("/users/documents", documentsRouter);
app.use("/users/me", profileRouter);
//Adding error for any other path than this.
if (process.env.NODE_ENV === "production") {
  //Since a build folder will be generated as soon as it is in production.
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// app.use("*", async (req, res, next) => {
//   res.status(404).send("Not a valid route this is ");
// });
app.listen(port, () => {
  console.log(`Started at ${port}`);
});
