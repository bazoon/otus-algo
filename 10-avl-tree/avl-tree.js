import {getRandomInt, measureFn} from "../6-sort/util.js";

class Node {
  constructor(key) {
    this.key = key;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    if (!node) return 0;
    return node.height;
  }

  getBalance(node) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  leftRotate(node) {
    var right = node.right;
    var left = right.left;

    right.left = node;
    node.right = left;

    node.height = Math.max(this.getHeight(node.left),
      this.getHeight(node.right)) + 1;
    right.height = Math.max(this.getHeight(right.left),
      this.getHeight(right.right)) + 1;

    return right;
  }

  rightRotate(node) {
    var left = node.left;
    var right = left.right;

    left.right = node;
    node.left = right;

    node.height = Math.max(this.getHeight(node.left),
      this.getHeight(node.right)) + 1;
    left.height = Math.max(this.getHeight(left.left),
      this.getHeight(left.right)) + 1;

    return left;
  }

  insertAvl(node, key) {
    if (node === null) return new Node(key);

    if (key <= node.key) {
      node.left = this.insertAvl(node.left, key);
    } else if (key > node.key) {
      node.right = this.insertAvl(node.right, key);
    }

    node.height = 1 + Math.max(node?.left?.height || 0, node?.right?.height || 0);

    const balance = this.getBalance(node);

    if (balance > 1 && key < node.left.key) {
      return this.rightRotate(node);
    }

    if (balance < -1 && key > node.right.key) {
      return this.leftRotate(node);
    }

    if (balance > 1 && key > node.left.key) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (balance < -1 && key < node.right.key) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  preOrder(node, fn) {
    if (node != null) {
      fn(node)
      this.preOrder(node.left, fn);
      this.preOrder(node.right, fn);
    }
  }

  find(node, key) {
    if (!node) return null;

    if (node.key === key) return node;

    if (key <= node.key) {
      return this.find(node.left, key)
    }

    return this.find(node.right, key);
  }

  findParent(current, key) {
    if (current.key === key) return null;

    if (current.left && current.left.key === key) return current;
    if (current.right && current.right.key === key) return current;

    if (current.left && key <= current.key) {
      return this.findParent(current.left, key);
    } else if (current.right) {
      return this.findParent(current.right, key);
    }
  }

  findMinimum(current) {
    if (!current.left) return current;
    return this.findMinimum(current.left);
  }

  remove(key) {
    const node = this.find(this.root, key);
    const parent = this.findParent(this.root, key);

    let balanceNode;

    if (!node) return;

    if (!node.left && !node.right) {
      if (node !== this.root) {
        if (parent.left === node) parent.left = null;
        if (parent.right === node) parent.right = null;
        balanceNode = parent;
      } else {
        this.root = null;
        return;
      }
    } else if (node.left && node.right) {
      const successor = this.findMinimum(node.right);
      const k = successor.key;
      this.remove(k);
      node.key = key;
      balanceNode = node;
    } else {
      const child = node.left ? node.left : node.right;

      if (node !== this.root) {
        if (node === parent.left) parent.left = child;
        if (node === parent.right) parent.right = child;
      } else {
        this.root = child;
      }
      balanceNode = child;
    }


    const balance = this.getBalance(balanceNode);

    if (balance > 1 && key < balanceNode.left.key) {
      return this.rightRotate(balanceNode);
    }

    if (balance < -1 && key > balanceNode.right.key) {
      return this.leftRotate(balanceNode);
    }

    if (balance > 1 && key > balanceNode.left.key) {
      balanceNode.left = this.leftRotate(balanceNode.left);
      return this.rightRotate(balanceNode);
    }

    if (balance < -1 && key < balanceNode.right.key) {
      balanceNode.right = this.rightRotate(balanceNode.right);
      return this.leftRotate(balanceNode);
    }



  }
}


// var tree = new Tree();
// tree.root = tree.insertAvl(tree.root, 10);
// tree.root = tree.insertAvl(tree.root, 20);
// tree.root = tree.insertAvl(tree.root, 30);
// tree.root = tree.insertAvl(tree.root, 40);
// tree.root = tree.insertAvl(tree.root, 50);
// tree.root = tree.insertAvl(tree.root, 25);
// tree.root = tree.insertAvl(tree.root, 5);

// for (let i = 0; i < 10; i++) {
//   tree.root = tree.insertAvl(tree.root, i);
// }

// tree.preOrder(tree.root, node => console.log(`${node.height} ${node.key}`));

// console.log(tree.findParent(tree.root, 30))

// console.log(tree.findMinimum(tree.root));

// console.log(tree.find(tree.root, 25));





















