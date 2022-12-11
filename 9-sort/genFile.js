import fs from 'fs';
import {getRandomArrayRange, getRandomInt} from '../6-sort/util.js';

function gen(n, from, to) {
  const randomArr = getRandomArrayRange(n, from, to);
  var buffer = new Buffer(Uint16Array.from(randomArr).buffer)
  const r = fs.createWriteStream('/home/vn/projects/own/otus-algo/9-sort/foo.txt', {flags: 'a'}).write(buffer);
}

for (let i = 0; i < 20; i++) {
  gen(500000, 0, 65535);
}


// gen(100);


