import {compTable, getRandomArray} from "../6-sort/util.js";
import {mergeSort} from "./mergeSort.js";
import {quickSort} from "./quickSort.js";

compTable(quickSort, "Qick sort", 900000);
compTable(mergeSort, "Merge sort", 9000000);


