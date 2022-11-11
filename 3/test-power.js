const runTests = require("../test-framework");
const path = require("path");
const {pow0, pow1, pow2} = require("./power")


const mapInput = s => {
  return s.split("\n").map(e => +e).slice(0, 2);
}

const mapOutput = s => {
  return +s;
}

const eps = 0.0000001;

runTests(path.resolve('./test-cases/3.Power'), mapInput, mapOutput, (n, result) => {
  // const r = ticketCount(BigInt(n));
  // return r === BigInt(result);

  const v = pow1(n[0], n[1]);

  // console.log(`value: ${v} expected: ${result} diff: ${Math.abs(v - result)}`);

  return [Math.abs(v - result) < eps, v];
});
