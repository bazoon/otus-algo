import {getRandomInt} from "../6-sort/util.js";

const Empty = Symbol("Empty");
const Removed = Symbol("Removed");

function createTable(sz) {
  let size = 0;
  let arr = Array.from({length: sz}).map(e => Empty);

  const getSize = () => size;
  const hash = n => n % arr.length;
  const getLoadFactor = () => size / arr.length;

  const reHash = () => {
    const newSize = arr.length * 2;
    const old = arr;
    arr = Array.from({length: newSize}).map(e => Empty);
    size = 0;
    old.forEach(e => e !== Empty && e !== Removed && add(e));
  }


  function add(n) {
    let i = 0;

    let h = hash(n.key);
    if (arr[h] === Empty || arr[h] == Removed) {
      arr[h] = n;
    } else {
      while (arr[++h + i * i] !== Empty && h < arr.length) {}
      arr[h] = n;
      i++;
    }

    size++;

    if (getLoadFactor() > 0.5) {
      reHash();
    }
  }

  const find = n => {
    let h = hash(n.key);

    if (arr[h] === n) return h;

    if (arr[h] === Empty) {
      return null;
    }
    else {
      while (arr[++h] !== n && h < arr.length) {

      }

      return arr[h] === n ? h : null;

    }
  }

  const print = () => {
    console.log(arr)
  }

  const remove = n => {
    const index = find(n);

    if (index) {
      arr[index] = Removed;
    }
  }

  return {
    getSize,
    add,
    remove,
    print,
    find
  };
}

const Item = function (key, value) {
  return {
    key,
    value
  };
}

const h = createTable(5);

const objs = []

for (let i = 0; i < 10; i++) {
  const item = Item(getRandomInt(0, 300), "info" + i);
  h.add(item);
  objs.push(item)
}

const obj = objs[5];
console.log(obj, h.find(obj));
h.remove(obj)
// h.print();
console.log(obj, h.find(obj));

h.add(obj)
// h.print();
console.log(obj, h.find(obj));


// console.log(h.getSize())
