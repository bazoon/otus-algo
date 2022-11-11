const runTests = require("../test-framework");
const path = require("path");
const {
  fibbVariant0,
  fibbVariant1
} = require("./fibb")
const matrixFibb = require("./matrix");


const mapInput = s => {
  return +(s.trim());
}

const mapOutput = s => {
  return BigInt(s);
}

console.log("Testing golden ratio algorithm")
runTests(path.resolve('./test-cases/4.Fibo'), mapInput, mapOutput, (n, result) => {
  const v = fibbVariant0(n);
  return [v == result, v];
}, false);



console.log("Testing matrix algorithm")
runTests(path.resolve('./test-cases/4.Fibo'), mapInput, mapOutput, (n, result) => {
  const v = matrixFibb(n);
  return [v == result, v];
}, false);
