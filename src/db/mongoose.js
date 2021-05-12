const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017/codepen";
// This file is just to connect mongoose and will be required in index.js
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
