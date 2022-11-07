const runTests = require('./test');

let cache = {};

function getN(k, n) {
  if (cache[k] !== undefined && cache[k][n] !== undefined) {
    return cache[k][n];
  }

  if (n === BigInt(1)) return BigInt(1);

  let s = BigInt(0);

  for (let l = BigInt(0); l <= BigInt(9); l++) {
    const max = (n - BigInt(1)) * BigInt(9);
    if (k >= l && BigInt(k) - BigInt(l) <= max)
      s += getN(BigInt(k) - BigInt(l), BigInt(n) - BigInt(1));
  }

  cache[k] = cache[k] || {};
  cache[k][n] = s;

  return s;
}

function ticketCount(n) {
  const r = n * BigInt(9);
  let s = BigInt(0);
  for (let k = BigInt(0); k <= r; k++) {
    let p = getN(k, n);
    s += p * p;
  }
  return s;
}

const trimAndToNum = e => BigInt(e.trim());

runTests('./1.Tickets', trimAndToNum, trimAndToNum, (n, result) => {
  const r = ticketCount(BigInt(n));
  return r === BigInt(result);
});


