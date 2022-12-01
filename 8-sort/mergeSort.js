import {getRandomArray} from "../6-sort/util.js";

export function mergeSort(arr) {
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  const merge = (l, x, r) => {
    const ma = [];
    let a = l;
    let b = x + 1;
    let m = 0;

    while (a <= x && b <= r) {
      if (arr[a] < arr[b]) {
        ma[m++] = arr[a++];
      } else {
        ma[m++] = arr[b++];
      }
    }

    while (a <= x) {
      ma[m++] = arr[a++];
    }
    while (b <= r) {
      ma[m++] = arr[b++];
    }

    for (let i = l; i <= r; i++) {
      arr[i] = ma[i - l];
    }
  };

  const sort = (l, r) => {
    if (l >= r) return;
    const m = ((l + r) / 2) | 0;
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  }

  sort(0, arr.length - 1);

  return arr;
}

// const a = getRandomArray(10);
// console.log(a)
// mergeSort(a);
// console.log(a)
