function* idMaker() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function bubbleSort(arr, draw) {
  const n = arr.length;

  for (let j = n - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }

  return arr;
}

export async function bubbleSortAsync(arr, draw) {
  const n = arr.length;

  for (let j = n - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;

        const p = await sleep(1)

        if (draw) {
          draw(arr, i, i + 1);
        }


      }
    }
  }

  return arr;
}

function bubbleSort2(arr) {
  const n = arr.length;
  let flag = false;

  for (let j = n - 1; j >= 0; j--) {
    flag = false;
    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        flag = true;
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }

    if (!flag) return arr;
  }

  return arr;
}


// module.exports = {
//   bubbleSort,
//   bubbleSort2
// };
