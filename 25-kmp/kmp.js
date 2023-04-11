
const left = (s, n) => s.substr(0, n);
const right = (s, n) => s.substr(s.length - n)

function search(text, pattern) {
  const alphabet = Array.from(new Set(text.split('')));

  function makeDelta() {
    const delta = {};

    for (let q = 0; q < pattern.length; q++) {
      alphabet.forEach(c => {
        let line = left(pattern, q) + c;
        let k = q + 1;
        while (left(pattern, k) !== right(line, k)) k--;

        delta[q] = delta[q] || {};
        delta[q][c] = k

      });
    }

    return delta
  }

  const delta = makeDelta()

  let q = 0;
  for (let i = 0; i < text.length; i++) {
    q = delta[q][text[i]];
    if (q == pattern.length) {
      return i - pattern.length + 1;
    }
  }

  return -1;
}

const s = "aababaabbaabab"
const p = 'baab'
const alphabet = "ab";

// console.log(search(s, p))

function createPiSlow(pattern) {
  let pi = [0];

  for (let q = 0; q <= pattern.length; q++) {
    let line = left(pattern, q);

    for (let len = 0; len < q; len++) {
      if (left(line, len) == right(line, len)) {
        pi[q] = len;
      }
    }

  }

  return pi;
}

function kmp(a, b, pi) {
  const m = a.length;
  const n = b.length;

  let p = 0;

  for (let i = 0; i < m; i++) {

    while (p !== 0 && a[i] !== b[p]) {
      p = pi[p - 1]
    }

    if (a[i] == b[p]) {
      p++;
    }

    if (p === n) {
      return i + 1 - n;
    }

  }

  return -1;

}

const pi = createPiSlow(p);
const found = kmp(s, p, pi)

console.log(found)




