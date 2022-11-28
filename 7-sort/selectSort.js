

export default function selectSort(arr) {

  const findMax = index => {
    let max = 0;
    for (let i = 0; i <= index; i++) {
      if (arr[i] > arr[max]) {
        max = i;
      }
    }
    return max;
  }

  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }


  for (let j = arr.length - 1; j > 0; j--) {
    swap(findMax(j), j);
  }

}


