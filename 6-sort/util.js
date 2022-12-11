export function getRandomInt(min = 0, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomArray = (n, m) => {
  let a = [];

  for (let i = 0; i < n; i++) {
    a.push(getRandomInt(0, m || n));
  }
  return a;
}

export const getRandomArrayRange = (n, from, to) => {
  let a = [];

  for (let i = 0; i < n; i++) {
    a.push(getRandomInt(from, to));
  }
  return a;
}


const getRandomDigitsArray = n => {
  let a = [];

  for (let i = 0; i < n; i++) {
    a.push(getRandomInt(0, 9));
  }
  return a;
}

const getAlmostSortedArray = n => {
  const arr = getRandomArray(n);
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  for (let i = 0; i < Math.round(n / 100); i++) {
    let i1 = getRandomInt(0, n - 1);
    let i2 = getRandomInt(0, n - 1);
    swap(i1, i2);
  }
  return arr;
}

const getReversedSortedArray = n => {
  return getRandomArray(n).reverse();
};

export function measureFn(fn, ...args) {
  var startTime = performance.now()
  fn(...args)
  var endTime = performance.now()
  return (endTime - startTime);
}

export function compTable(fn, description, max = 1000000) {
  const ns = [100, 10000, 100000, 1000000].filter(e => e <= max);

  console.log(description, "random array");

  const t = {
    // N: n,
    "random": {},
    "sorted": {},
    "digits": {},
    "reversed": {}
  };


  ns.forEach(n => {
    t["random"][n] = t["random"][n] || {};
    t["sorted"][n] = t["sorted"][n] || {};
    t["digits"][n] = t["digits"][n] || {};
    t["reversed"][n] = t["reversed"][n] || {};
    t["random"][n] = measureFn(fn, getRandomArray(n));
    t["sorted"][n] = measureFn(fn, getAlmostSortedArray(n));
    t["digits"][n] = measureFn(fn, getRandomDigitsArray(n));
    t["reversed"][n] = measureFn(fn, getReversedSortedArray(n));
  });

  console.table(t)


  // ns.forEach(n => {
  //   const t = {N: n, time: measureFn(fn, getRandomArray(n))};
  //   console.table(t);
  // });


  // ns.forEach(n => {
  //   const t = {N: n, time: measureFn(fn, getRandomArray(n))};
  //   console.table(t);
  // });

  // console.log(description, "random digits array");
  // ns.forEach(n => {
  //   const t = {N: n, time: measureFn(fn, getRandomDigitsArray(n))};
  //   console.table(t);
  // });

  // console.log(description, "random almost sorted array");
  // ns.forEach(n => {
  //   const t = {N: n, time: measureFn(fn, getAlmostSortedArray(n))};
  //   console.table(t);
  // });


  // console.log(description, "random reversed sorted array");
  // ns.forEach(n => {
  //   const t = {N: n, time: measureFn(fn, getAlmostSortedArray(n))};
  //   console.table(t);
  // });
}

export function compTable999(fns, fnsDescriptions, max = 1000000) {
  const ns = [100, 10000, 100000, 1000000].filter(e => e <= max);
  const t = {};

  ns.forEach(n => {
    fnsDescriptions.forEach((s, i) => {
      const fn = fns[i];
      t[s] = t[s] || {};
      t[s][n] = measureFn(fn, getRandomArrayRange(n, 100, 999));
    });
  });

  console.table(t)
}


