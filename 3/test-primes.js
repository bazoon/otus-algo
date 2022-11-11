const runTests = require("../test-framework");
const path = require("path");
const {
  findPrimes,
  sievePrimes
} = require("./primes")


const mapInput = s => {
  return +(s.trim());
}

const mapOutput = s => {
  return +s;
}


runTests(path.resolve('./test-cases/5.Primes'), mapInput, mapOutput, (n, result) => {
  const v = findPrimes(n);
  return [v.length == result, v];
});

runTests(path.resolve('./test-cases/5.Primes'), mapInput, mapOutput, (n, result) => {
  const v = sievePrimes(n);
  return [v.length == result, v];
});



