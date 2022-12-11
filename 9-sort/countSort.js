import {getRandomArray, getRandomArrayRange} from "../6-sort/util.js";
import {maxArr} from "./bucketSort.js";


export function countSort(arr) {
  const max = maxArr(arr);
  const counts = Array.from({length: max + 1}).fill(0);
  const copy = Array.from({length: arr.length - 1}).fill(undefined);

  arr.forEach(e => {
    counts[e]++;
  });

  for (let i = 1; i < counts.length; i++) {
    counts[i] += counts[i - 1];
  }

  for (let j = arr.length - 1; j >= 0; j--) {
    const value = arr[j];
    let count = --counts[value];
    copy[count] = value;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = copy[i];
  }

  return copy;
}

const getDigit0 = n => {
  return n % 10
};

const getDigit1 = n => {
  return ((n / 10) % 10) | 0;
}

const getDigit2 = n => {
  return ((n / 100) % 10) | 0;
}

const getDigit3 = n => {
  return ((n / 1000) % 10) | 0;
}

const getDigit4 = n => {
  return ((n / 10000) % 10) | 0;
}

function countSortDigitAux(arr, getDigit) {
  const max = maxArr(arr);
  const counts = Array.from({length: max + 1}).fill(0);
  const copy = Array.from({length: arr.length - 1}).fill(undefined);

  arr.forEach(e => {
    counts[getDigit(e)]++;
  });

  for (let i = 1; i < counts.length; i++) {
    counts[i] += counts[i - 1];
  }

  for (let j = arr.length - 1; j >= 0; j--) {
    const value = arr[j];
    let count = --counts[getDigit(value)];
    copy[count] = value;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = copy[i];
  }

  return copy;
}


export function countSortDigit(arr, getDigit) {
  countSortDigitAux(arr, getDigit0)
  countSortDigitAux(arr, getDigit1)
  countSortDigitAux(arr, getDigit2)
  return arr;
}

// const a = getRandomArrayRange(100, 100, 999);
// console.log(a)


// const a = getRandomArray(100000, 1000);
// const a = [7, 19, 7, 14, 7, 26, 6, 28, 26, 24, 7, 24, 25, 10, 20, 9, 16, 3, 14, 11, 9, 30, 23, 29, 28, 2, 11, 5, 14, 15]
// console.log(a, a.length)
// countSort(a);
