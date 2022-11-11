
function fibbVariant0(n) {
  const phi = (1 + Math.sqrt(5)) / 2;
  return Math.trunc(Math.pow(phi, n) / Math.sqrt(5 + 0.5));
}


const cache = {};

function fibbVariant1(n) {
  if (cache[n] !== undefined) return cache[n];
  if (n == 0) return BigInt(0);
  if (n == 1) return BigInt(1);
  cache[n] = fibbVariant1(BigInt(n) - BigInt(1)) + fibbVariant1(BigInt(n) - BigInt(2))
  return cache[n];
}


module.exports = {
  fibbVariant0,
  fibbVariant1
};
