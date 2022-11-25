export function getRandomInt(min = 0, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomArray = n => {
  let a = [];

  for (let i = 0; i < n; i++) {
    a.push(getRandomInt(0, n));
  }
  return a;
}

export function measureFn(fn, ...args) {
  var startTime = performance.now()
  fn(...args)
  var endTime = performance.now()
  return (endTime - startTime);
}

export function compTable(fn, description) {
  const ns = [100, 10000, 100000, 1000000];
  const times = ns.map(n => ({N: n, time: measureFn(fn, getRandomArray(n))}));

  console.log(description);
  console.table(times);
}

// module.exports = {
//   getRandomInt,
//   getRandomArray,
//   measureFn,
//   compTable
// };
