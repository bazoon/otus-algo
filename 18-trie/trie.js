import {measureFn} from "../6-sort/util.js";
import {makeStrings} from './util.js';

class Node {
  constructor() {
    this.children = [];
    this.isEnd = false;
  }

  exists(c) {
    return this.children[c] !== undefined;
  }

  next(c) {
    if (!this.exists(c)) {
      this.children[c] = new Node();
    }
    return this.children[c];
  }

}


class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word, n) {
    let node = this.root;
    word.split('').forEach(c => {
      node = node.next(c);
    });
    node.isEnd = true;
    node.n = n;
  }

  search(word) {
    const node = this.go(word);
    return node ? node.isEnd : false;
  }

  get(word) {
    const node = this.go(word);
    return node.isEnd && node.n;
  }

  startsWith(prefix) {
    return !!this.go(prefix);
  }

  go(word) {
    let node = this.root;
    const letters = word.split('');

    for (let i = 0; i < letters.length; i++) {
      let c = letters[i];
      if (node.exists(c)) {
        node = node.next(c)
      } else {
        return null;;
      }
    }

    return node;
  }
}

const trie = new Trie();
const strings = makeStrings(50000, 10);
// console.log(strings)
const report = {};
const h = {};

report["Add 50 to trie"] = measureFn(() => {
  strings.forEach(s => trie.insert(s, 34));
})

report["Add 50 to hash"] = measureFn(() => {
  strings.forEach(s => {
    h[s] = 34;
  });
})

report["Search trie"] = measureFn(() => {
  strings.forEach(s => {
    let b = trie.search(s);
  });
})

report["Search hash"] = measureFn(() => {
  strings.forEach(s => {
    let b = h[s];
  });
})

console.table(report);



