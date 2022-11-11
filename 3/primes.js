function findPrimes(n) {
  const foundPrimes = [];

  const isPrime = p => {
    for (let i = 0; i < Math.sqrt(p); i++) {
      const foundPrime = foundPrimes[i];
      if (p % foundPrime === 0) return false;
    }
    return true;
  }

  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      foundPrimes.push(i);
    }
  }

  return foundPrimes;

}


function sievePrimes(n) {
  const a = Array(n).fill(true);

  for (let i = 2; i * i < Math.sqrt(n); i += 1) {
    if (a[i]) {
      for (let j = i * i; j <= n; j += i) {
        a[j] = false;
      }
    }
  }

  return a.map((e, i) => e ? i : false).filter(e => e > 1);
}

module.exports = {
  findPrimes,
  sievePrimes
}


// function sievePrimesBit(n) {
//   const buffer = new ArrayBuffer(4 * (((n / 32) | 0) + 1));
//   const bitsArray = new Uint32Array(buffer);

//   const printBits = () => bitsArray.map(e => e.toString(2)).join('');

//   const getBit = i => {
//     const index = (i / 32) | 0;
//     const bits = bitsArray[index];
//     const insideIndex = i % 32;
//     return (bits >> insideIndex) & BigInt(0x00000001);
//   }

//   const setBit = i => {
//     const index = (i / 32) | 0;
//     const bits = bitsArray[index];
//     const insideIndex = i % 32;

//     if (i === 1) {
//       bitsArray[index] = bits | (1 << insideIndex)
//     } else {
//       const b = ~(1 << insideIndex);
//       bitsArray[index] = bitsArray[index] && b;
//     }
//   }


//   // for (let i = 2; i * i < n; i += 1) {
//   //   if (getBit(i)) {
//   //     for (let j = i * i; j <= n; j += i) {
//   //       setBit(j, 0);
//   //     }
//   //   }
//   // }



//   // const r = [];

//   // for (let i = 2; i < n; i++) {
//   //   if (getBit(i)) {
//   //     r.push(i)
//   //   }
//   // }
//   // return r;

// }

// sievePrimesBit(100);
// console.log(sievePrimes(100));

























