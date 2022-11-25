export function shellSort(arr) {
  const n = arr.length;
  for (let gap = (n / 2) | 0; gap > 0; gap = (gap / 2) | 0) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];

      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];

      arr[j] = temp;
    }
  }


  return arr;
}

export function shellSortKnuth(arr) {
  const n = arr.length;
  let k = 1;

  const gaps = [];
  let r = (Math.pow(3, k) - 1) / 2

  while (r < n) {
    gaps.unshift(r);
    r = (Math.pow(3, ++k) - 1) / 2
  }

  gaps.forEach(gap => {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];

      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];

      arr[j] = temp;
    }
  });

  return arr;
}


export function shellSortHibbard(arr) {
  const n = arr.length;
  let k = 1;

  const gaps = [];
  let r = Math.pow(2, k) - 1

  while (r < n) {
    gaps.unshift(r);
    r = Math.pow(2, ++k) - 1
  }

  gaps.forEach(gap => {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];

      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];

      arr[j] = temp;
    }
  });

  return arr;
}












