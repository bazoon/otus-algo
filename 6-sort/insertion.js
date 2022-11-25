export function insertionSort(arr) {
  const n = arr.length;
  for (let j = 0; j < n; j++) {
    for (let i = j - 1; i >= 0 && arr[i] > arr[i + 1]; i--) {
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;

    }
  }

  return arr;
}

export async function insertionSortAsync(arr, draw) {
  const n = arr.length;
  for (let j = 0; j < n; j++) {
    for (let i = j - 1; i >= 0 && arr[i] > arr[i + 1]; i--) {
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;

      const p = await sleep(1)

      if (draw) {
        draw(arr, i, i + 1);
      }

    }
  }

  return arr;
}


export function insertionSortShift(arr) {
  const n = arr.length;
  let i;

  for (let j = 1; j < n; j++) {
    let k = arr[j];
    for (i = j - 1; i >= 0 && arr[i] > k; i--) {
      arr[i + 1] = arr[i];
    }
    arr[i + 1] = k;
  }
  return arr;
}


export async function insertionSortBinarySearch(arr, draw) {
  const n = arr.length;
  let i;

  const binarySearh = (key, low, high) => {
    if (high <= low) {
      if (key > arr[low]) {
        return low + 1;
      } else {
        return low;
      }
    }

    let mid = ((low + high) / 2) | 0;

    if (key > arr[mid]) {
      return binarySearh(key, mid + 1, high);
    } else {
      return binarySearh(key, low, mid - 1);
    }
  }

  for (let j = 1; j < n; j++) {
    let k = arr[j];
    let p = binarySearh(k, 0, j - 1);
    for (i = j - 1; i >= p; i--) {
      arr[i + 1] = arr[i];

      const p = await sleep(1)

      if (draw) {
        draw(arr, i, i + 1);
      }
    }

    arr[i + 1] = k;
  }
  return arr;
}

