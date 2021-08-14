const fs = require('fs');
//This is a very useful utility, especially when u want
// to give some time lapse between code or for testing.
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const base64_encode = (file) => {
  let bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
};

module.exports = {
  sleep,
  base64_encode,
};
