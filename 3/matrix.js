function multiply(m1, m2) {
  const m1Rows = m1.length;
  const m1Cols = m1[0].length;
  const m2Cols = m2[0].length;

  let resultMatrix = new Array(m1Rows);

  for (let r = 0; r < m1Rows; ++r) {
    resultMatrix[r] = new Array(m2Cols);
    for (var c = 0; c < m2Cols; ++c) {
      resultMatrix[r][c] = 0;
      for (var i = 0; i < m1Cols; ++i) {
        resultMatrix[r][c] = resultMatrix[r][c] || BigInt(0);
        resultMatrix[r][c] += m1[r][i] * m2[i][c];
      }
    }
  }
  return resultMatrix;
}

const identityMatrix = [[BigInt(1), BigInt(0)], [BigInt(0), BigInt(1)]];

function power(m, n) {
  if (n == 0) return identityMatrix;
  if (n % 2 === 0) {
    const v = power(m, (n >> 1));
    return multiply(v, v);
  }

  return multiply(m, power(m, n - 1));
}

function fibb(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  const i = [[BigInt(1), BigInt(1)], [BigInt(1), BigInt(0)]];
  const r = power(i, n);
  return r[0][1];
}


module.exports = fibb;
