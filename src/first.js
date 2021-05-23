const calculateTip = (total, percent) => {
  const tip = percent * total;
  return total + tip;
};
const fToC = (farenheit) => (farenheit - 32) / 1.8;

const cToF = (celsius) => celsius * 1.8 + 32;
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
module.exports = { calculateTip, fToC, cToF };
