import {bubbleSort} from "./bubble.js";
import runTests from '../test-framework_es.js';
import path from 'path';

const mapInput = s => {
  let [n, arr] = s.split('\n');
  arr = arr.split(' ').map(e => +e);
  return [n, arr];
}

const mapOutput = s => {
  const arr = s.split(' ').map(e => +e);
  return arr;
}

const compareArrays = (a1, a2) => {
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

runTests({
  description: "Testing bubble sort: random",
  dir: path.resolve('../sort-tests/sorting-tests/0.random'),
  mapInput,
  mapOutput,
  testFn: ([n, arr], rarr) => {
    bubbleSort(arr)
    console.log(n);
    return [compareArrays(arr, rarr), n];
  },
  showValues: false,
  filterTest: e => +e.split('.')[1] <= 4
});

runTests({
  description: "Testing bubble sort: digits",
  dir: path.resolve('../sort-tests/sorting-tests/1.digits'),
  mapInput,
  mapOutput,
  testFn: ([n, arr], rarr) => {
    bubbleSort(arr)
    console.log(n);
    return [compareArrays(arr, rarr), n];
  },
  showValues: false,
  filterTest: e => +e.split('.')[1] <= 4
});


runTests({
  description: "Testing bubble sort: sorted",
  dir: path.resolve('../sort-tests/sorting-tests/2.sorted'),
  mapInput,
  mapOutput,
  testFn: ([n, arr], rarr) => {
    bubbleSort(arr)
    console.log(n);
    return [compareArrays(arr, rarr), n];
  },
  showValues: false,
  filterTest: e => +e.split('.')[1] <= 4
});

runTests({
  description: "Testing bubble sort: revers",
  dir: path.resolve('../sort-tests/sorting-tests/3.revers'),
  mapInput,
  mapOutput,
  testFn: ([n, arr], rarr) => {
    bubbleSort(arr)
    console.log(n);
    return [compareArrays(arr, rarr), n];
  },
  showValues: false,
  filterTest: e => +e.split('.')[1] <= 4
});

