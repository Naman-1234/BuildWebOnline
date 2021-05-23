const { calculateTip, fToC, cToF, sleep } = require('../first.js');
test('Verify Tip Function', () => {
  const total = 10;
  const tip = 0.3;
  const totalTip = calculateTip(total, tip);
  expect(totalTip).toBe(13);
});

test('Testing Farenheit to Celsius Function', () => {
  const farenheit = 32;
  const CelsiusFromFunction = fToC(farenheit);
  expect(CelsiusFromFunction).toBe(0);
});

test('Celsius to Farenheit Function', () => {
  const celsius = 0;
  const farenheitFromFunction = cToF(celsius);
  expect(farenheitFromFunction).toBe(32);
});
