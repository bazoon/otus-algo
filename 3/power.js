

function pow0(b, n) {
  let r = 1;

  for (let i = 0; i < n; i++) {
    r *= b;
  }

  return r;
}

function pow1(b, n) {
  if (n == 0) return 1;
  if (n % 2 === 0) {
    const v = pow1(b, Math.round(n / 2));
    return v * v;
  }

  return b * pow1(b, n - 1);
}


function pow2(b, n) {
  let p = 1;

  while (n > 0) {
    n = (n / 2) | 0;
    b = b * b;
    if (n % 2 === 1) {
      p = p * b;
    }
  }

  return p;
}

// console.log(0, pow0(1.000000001, 1000000000))
// console.log(2, pow1(1.000000001, 1000000000))
// console.log('i', pow2(1.000000001, 1000000000))
// console.log('p', Math.pow(1.000000001, 1000000000))

module.exports = {
  pow0,
  pow1,
  pow2,
};
