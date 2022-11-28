import {bubbleSort} from "./bubble.js";
import {insertionSort, insertionSortShift} from "./insertion.js";
import {shellSort, shellSortKnuth} from "./shell.js";
import {compTable} from "./util.js";


compTable(bubbleSort, "Bubble sort", 9000);
compTable(insertionSort, "insertionSort", 900000);
compTable(shellSort, "shellSort");
compTable(shellSortKnuth, "shellSortKnuth");


