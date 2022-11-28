import {compTable, getRandomArray} from "../6-sort/util.js";
import heapSort from "./heapSort.js";
import selectSort from './selectSort.js'


// const a = getRandomArray(10);

// console.log(a)
// heapSort(a);
// console.log(a)

compTable(selectSort, "Select sort", 900000);
compTable(heapSort, "Heap Sort");


