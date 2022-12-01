import {getRandomInt} from "../6-sort/util.js"
import fs from "fs";

export default function genFile(n, t, fname) {
  getRandomInt(0, t)
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(getRandomInt(0, t));
  }

  fs.writeFileSync(fname, arr.join("\n"));
}

