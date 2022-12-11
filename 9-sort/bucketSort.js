import {getRandomArray} from "../6-sort/util.js";
import fs from 'fs';

function newList() {
  return {next: null};
}

function addToList(list, n) {
  if (!list) {
    return {next: null, n}
  }

  if (n <= list.n) {
    const item = {next: list, n};
    return item;
  }

  let prev = list;
  let current = list;

  while (current && current.n < n) {
    prev = current;
    current = current.next;
  }

  const newItem = {next: prev.next, n};
  prev.next = newItem;
  return list;
}

function printList(l) {
  let current = l;
  while (current) {
    console.log(current.n);
    current = current.next;
  }
}

class Buckets {
  constructor(n) {
    this.buckets = [];
  }

  addToBucket(bucketIndex, n) {
    this.buckets[bucketIndex] = addToList(this.buckets[bucketIndex], n);
  }

  bucketsToArray(arr) {
    let index = 0;
    this.buckets.forEach(b => {
      let current = b;
      while (current) {
        arr[index] = current.n;
        current = current.next;
        index++;
      }
    });
  }

  bucketsToFile(filename) {
    let isWritten = false;
    let arr = [];
    let index = 0;

    this.buckets.forEach(b => {
      let current = b;
      while (current) {
        isWritten = false;
        arr.push(current.n);
        current = current.next;

        if (arr.length >= 65535) {
          var buffer = new Buffer(Uint16Array.from(arr).buffer);
          fs.createWriteStream(filename, {flags: 'a'}).write(buffer);
          arr = []
          isWritten = true;
        }
      }
    });

    if (!isWritten) {
      var buffer = new Buffer(Uint16Array.from(arr).buffer);
      fs.createWriteStream(filename, {flags: 'a'}).write(buffer);
    }

  }
}

export const maxArr = arr => arr.reduce((a, e) => a < e ? e : a);

export function bucketSort(arr, k) {
  const max = maxArr(arr);

  const b = new Buckets();

  arr.forEach(a => {
    const bucket = ((a * arr.length) / (max + 1)) | 0;
    b.addToBucket(bucket, a);
  });

  b.bucketsToArray(arr);
}

export function bucketSortFile(filename, filenameOut) {
  const r = fs.createReadStream(filename);
  const b = new Buckets();
  let total = 0;
  return new Promise((res, rej) => {

    r.on('data', chunk => {
      const uint16array = new Uint16Array(
        chunk.buffer,
        chunk.byteOffset,
        chunk.length / Uint16Array.BYTES_PER_ELEMENT);
      // console.log(uint16array)

      const max = 65535;

      total = total + uint16array.length

      for (let i = 0; i < uint16array.length; i++) {
        const elem = uint16array[i];
        const bucket = ((elem * uint16array.length) / (max + 1)) | 0;
        b.addToBucket(bucket, elem);
      }

      console.log(total / 1000);

    });

    r.on('end', () => {
      console.log('toFile')
      b.bucketsToFile(filenameOut);
      res();
    });

  });


}

