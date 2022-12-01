import {getRandomArray} from "../6-sort/util.js";

export function quickSort(arr) {
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  const split = (l, r) => {
    const p = arr[r];
    let m = l - 1;
    for (let j = l; j <= r; j++) {
      if (arr[j] <= p) {
        swap(++m, j);
      }
    }
    return m;
  };

  const sort = (l, r) => {
    if (l >= r) return;
    const m = split(l, r);
    sort(l, m - 1);
    sort(m + 1, r);
  }

  sort(0, arr.length - 1);

  return arr;
}

// const a = getRandomArray(10);
// console.log(a)
// quickSort(a);
// console.log(a)
