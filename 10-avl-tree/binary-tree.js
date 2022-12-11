
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

  insert(node, key) {
    if (node === null) return new Node(key);

    if (key <= node.key) {
      node.left = this.insert(node.left, key);
    } else if (key > node.key) {
      node.right = this.insert(node.right, key);
    }

    node.height = 1 + Math.max(node?.left?.height || 0, node?.right?.height || 0);

    return node;
  }

  getHeight(node) {
    if (!node) return 0;
    return node.height;
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


    if (!node) return;

    if (!node.left && !node.right) {
      if (node !== this.root) {
        if (parent.left === node) parent.left = null;
        if (parent.right === node) parent.right = null;
      } else {
        this.root = null;
      }
    } else if (node.left && node.right) {
      const successor = this.findMinimum(node.right);
      const k = successor.key;
      this.remove(k);
      node.key = key;
    } else {
      const child = node.left ? node.left : node.right;

      if (node !== this.root) {
        if (node === parent.left) parent.left = child;
        if (node === parent.right) parent.right = child;
      } else {
        this.root = child;
      }
    }
  }
}

