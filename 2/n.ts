const runTests = require('./test');

let cache = {};

function getN(k: bigint, n: bigint) {
  if (cache[k] !== undefined && cache[k][n] !== undefined) {
    return cache[k][n];
  }

  if (n === 1) return 1;

  let s = 0;

  for (let l = (0); l <= (9); l++) {
    const max = (n - (1)) * (9);
    if (k >= l && (k) - (l) <= max)
      s += getN((k) - (l), (n) - (1));
  }

  cache[k] = cache[k] || {};
  cache[k][n] = s;

  return s;
}

function ticketCount(n) {
  const r = n * (9);
  let s = (0);
  for (let k = (0); k <= r; k++) {
    let p = getN(k, n);
    s += p * p;
  }
  return s;
}

const trimAndToNum = e => (e.trim());

runTests('./1.Tickets', trimAndToNum, trimAndToNum, (n, result) => {
  const r = ticketCount((n));
  return r === (result);
});


