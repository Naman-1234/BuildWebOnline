const mongoose = require("mongoose");
require("dotenv").config();
const connectionURL = process.env.MONGO_DB_URL;
// This file is just to connect mongoose and will be required in index.js
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
