export default function heapSort(arr) {
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  const heapify = (root, size) => {
    let x = root;
    let l = 2 * x + 1;
    let r = l + 1;
    if (l < size && arr[l] > arr[x]) x = l;
    if (r < size && arr[r] > arr[x]) x = r;
    if (x === root) return;
    swap(root, x);
    heapify(x, size);
  }


  for (let i = arr.length / 2 - 1; i >= 0; i--) {
    heapify(i, arr.length);
  }

  for (let j = arr.length - 1; j > 0; j--) {
    swap(0, j);
    heapify(0, j);
  }


}
