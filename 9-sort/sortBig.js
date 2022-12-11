import fs from 'fs';
import {bucketSort, bucketSortFile} from './bucketSort.js';

bucketSortFile('/home/vn/projects/own/otus-algo/9-sort/foo.txt', '/home/vn/projects/own/otus-algo/9-sort/f.txt')

// const r = fs.createReadStream('/home/vn/projects/own/otus-algo/9-sort/f.txt');

// r.on('data', chunk => {
//   const uint16array = new Uint16Array(
//     chunk.buffer,
//     chunk.byteOffset,
//     chunk.length / Uint16Array.BYTES_PER_ELEMENT);
//   console.log(uint16array)
// });
