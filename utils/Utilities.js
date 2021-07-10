const fs = require('fs');
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
