import {compTable, compTable999, getRandomArray} from "../6-sort/util.js";
import {bucketSort} from "./bucketSort.js";
import {countSort, countSortDigit} from "./countSort.js";

compTable999([bucketSort, countSort, countSortDigit], ["bucket", "countSort", "radixSort"]);
