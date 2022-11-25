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

export function compTable(fn, description, max = 1000000) {
  const ns = [100, 10000, 100000, 1000000].filter(e => e <= max);
  console.log(description);
  ns.forEach(n => {
    const t = {N: n, time: measureFn(fn, getRandomArray(n))};
    console.table(t);
  });


}

