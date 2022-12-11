import {getRandomInt, measureFn} from "../6-sort/util.js";
import BinaryTree from './binary-tree.js';
import AvlTree from './avl-tree.js';


function testInsert(n) {

  const runFind = function (tree) {
    for (let i = 0; i < n / 10; i++) {
      tree.find(tree.root, getRandomInt(0, n));
    }
  }

  const runRemove = function (tree) {
    for (let i = 0; i < n / 10; i++) {
      tree.remove(i);
    }
  }


  var randomTree = new BinaryTree();

  for (let i = 0; i < n; i++) {
    randomTree.root = randomTree.insert(randomTree.root, getRandomInt(0, n));
  }

  var incTree = new BinaryTree();

  for (let i = 0; i < n; i++) {
    incTree.root = incTree.insert(incTree.root, i);
  }


  var avlTree = new AvlTree();

  for (let i = 0; i < n; i++) {
    avlTree.root = avlTree.insertAvl(avlTree.root, i);
  }


  const report = {};

  report.randomTreeFind = measureFn(runFind, randomTree);
  report.incTreeFind = measureFn(runFind, incTree);
  report.avlTreeFind = measureFn(runFind, avlTree);


  report.randomTreeRemove = measureFn(runRemove, randomTree);
  report.incTreeRemove = measureFn(runRemove, incTree);
  report.avlTreeRemove = measureFn(runRemove, avlTree);


  console.table(report)

}

testInsert(30000);
