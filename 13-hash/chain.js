import {getRandomInt} from "../6-sort/util.js";

function createList() {
  let head = null;

  const add = n => {
    const item = {
      n,
      next: head
    };

    head = item;
  }

  const find = n => {
    if (!head) return null;

    let next = head;
    while (next) {
      if (next.n === n) return next;
      next = next.next;
    }

    return null;
  }

  const print = () => {
    let s = "";

    if (!head) return s;

    let next = head;
    while (next) {
      s += next.n + " -> ";
      next = next.next;
    }

    return s;
  }

  const iterate = fn => {
    let next = head;
    while (next) {
      fn(next);
      next = next.next;
    }
  }

  const remove = n => {
    if (!head) return;

    if (head.n === n) {
      head = head.next;
    }

    let next = head;
    let parent = head;

    while (next) {
      if (next.n === n) {
        parent.next = next.next;
        break;
      }

      parent = next;
      next = next.next;
    }


  };


  const o = {
    add,
    find,
    remove,
    iterate,
    print
  };
  return o
}

// const l = createList();
// l.add(10);
// l.add(20);
// l.add(30);
// l.add(40);
// l.add(50);
// l.add(60);

// l.remove(10);
// l.remove(20);
// l.remove(50);

// console.log(l.print());


function createTable(sz) {
  let arr = Array.from({length: sz}).map(e => null);
  const getSize = () => arr.length;
  const hash = n => n % arr.length;

  const add = n => {
    const h = hash(n);
    (arr[h] = arr[h] || createList()).add(n);
  }

  const print = () => {
    arr.forEach((a, i) => {
      console.log(i, a?.print());
    });
  }

  const remove = n => {
    const h = hash(n);
    const list = arr[h];
    if (list) list.remove(n);
  }

  return {
    getSize,
    add,
    remove,
    print
  };

}

const h = createTable(20);

for (let i = 0; i < 100; i++) {
  const n = i;
  h.add(n);
}


h.print();

for (let i = 0; i < 25; i++) {
  h.remove(i);
}



h.print();







