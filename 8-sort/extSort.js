import fs from 'fs';
import readLine from 'readline';
import {shellSortKnuth} from '../6-sort/shell.js';
import genFile from './genFile.js';

// Количество строк в файле
const getCount = async fname => {
  const rl = readLine.createInterface({
    input: fs.createReadStream(fname),
    crlfDelay: Infinity,
  });

  let c = 0;
  for await (const line of rl) {
    c++;
  }
  return c;
}

// Делит файл на n файлов, при этом имя части начинается с suffix
const splitFile = async (fname, n, suffix) => {
  const count = await getCount(fname);
  const rl = readLine.createInterface({
    input: fs.createReadStream(fname),
    crlfDelay: Infinity,
  });

  let lines = 0;
  let file = 0;

  for await (const line of rl) {
    if (lines > (count / n)) {
      lines = 0;
      file++;
    }

    fs.appendFileSync(`${suffix}-${file}.txt`, `${line}\n`)
    lines++;
  }
}

// Делит файл на n файлов, при этом имя части начинается с suffix
const splitFileOnN = async (fname, n, suffix) => {
  const count = await getCount(fname);
  const rl = readLine.createInterface({
    input: fs.createReadStream(fname),
    crlfDelay: Infinity,
  });

  let lines = 0;
  let file = 0;

  for await (const line of rl) {
    if (lines > n) {
      lines = 0;
      file++;
    }

    fs.appendFileSync(`${suffix}-${file}.txt`, `${line}\n`)
    lines++;
  }
}


// Берет данные из fnameSrc, сортирует их и помещает их в fnameDest
// Данные добавляются к файлу! не замещают то, что там было
async function appendWithSortedFile(fnameDest, fnameSrc) {
  const src = fs.readFileSync(fnameSrc, 'utf8');
  const arr = src.split('\n').map(e => +e);
  shellSortKnuth(arr);
  fs.appendFileSync(fnameDest, arr.join('\n'));
}

//Возвращает имена файлов в папке dir которые начинаются на prefix
async function getFiles(dir, prefix) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      const fls = files.filter(file => file.startsWith(prefix))
      resolve(fls);
    });
  });
}

//Берет файлы из папку, и добавляет их отсортированное содержимое
//по очереди то в файл sorted-0.text, то в файл sorted-1.txt
async function combineFiles(dir, prefix) {
  const files = await getFiles(dir, prefix);

  let fileIndex = 0;

  files.forEach(file => {
    const filename = `sorted-${fileIndex}.txt`;
    appendWithSortedFile(filename, file)

    if (fileIndex === 0) {
      fileIndex = 1;
    } else {
      fileIndex = 0;
    }
  });
}

// Берет 2 файл и сортирует их содержимое итеративно
// сливая их содержимое. Функция будет вызываться рекурсивно
// пока fname не станет пустым и не будет удален

async function mergeFiles(fname1, fname2) {
  const rl1 = readLine.createInterface({
    input: fs.createReadStream(fname1),
    crlfDelay: Infinity,
  });

  const rl2 = readLine.createInterface({
    input: fs.createReadStream(fname2),
    crlfDelay: Infinity,
  });

  const it1 = rl1[Symbol.asyncIterator]();
  const it2 = rl2[Symbol.asyncIterator]();

  let line1 = await it1.next();
  let line2 = await it2.next();

  let v1 = +line1.value;
  let v2 = +line2.value;

  let last;


  const write = value => {
    if (value >= last) {
      fs.appendFileSync("temp0.txt", `${value}\n`);
      last = value;
    } else {
      fs.appendFileSync("temp1.txt", `${value}\n`);
    }
  };

  while (true) {
    if (!line1.done && (v1 <= v2 && (last === undefined || last !== undefined && last <= v1))) {
      fs.appendFileSync("temp0.txt", `${v1}\n`)
      last = v1;
      line1 = await it1.next();
      v1 = +line1.value;
    } else if (!line2.done && (last === undefined || last !== undefined && last <= v2)) {
      fs.appendFileSync("temp0.txt", `${v2}\n`)
      last = v2;
      line2 = await it2.next();
      v2 = +line2.value;
    } else {
      if (v1 < v2) {
        if (!line1.done) {
          write(v1);
        }
        if (!line2.done) {
          write(v2);
        }
      } else {
        if (!line2.done) {
          write(v2);
        }

        if (!line1.done) {
          write(v1);
        }
      }
      break;
    }
  }



  while (!line1.done) {
    line1 = await it1.next();
    if (!line1.done) {
      write(line1.value);
    }
  }

  while (!line2.done) {
    line2 = await it2.next();
    if (!line2.done) {
      write(line2.value);
    }
  }

  fs.renameSync("temp0.txt", fname1);

  if (fs.existsSync("temp1.txt")) {
    fs.renameSync("temp1.txt", fname2);
  } else {
    fs.unlinkSync(fname2)
  }

  if (fs.existsSync(fname2)) {
    const stat = fs.statSync(fname2);
    console.log(`not sorted yet, go once again...${fname2} size: ${stat.size}`);

    mergeFiles(fname1, fname2);
  } else {
    console.log('done')
  }
}

async function run() {
  genFile(1000000, 100000, "big.txt")
  // await splitFile("foo.txt", 4, "part");
  // await combineFiles(".", "part");
  // mergeFiles("sorted-0.txt", "sorted-1.txt")
}


// ES2. +1 байта. Реализовать алгоритм внешеней сортировки ExternalSort вторым способом, с двумя вспомогательными файлами.

// ES3. +1 байта. Реализовать алгоритм внешеней сортировки ExternalSort третьим способом, при первом проходе в память загружать блоки по 100 чисел, сортировать их любым другим алгоритмом и отправлять на выход, а потом действовать по алгоритму ES2.
async function variantEs3(inputFileName) {
  genFile(10000, 10000, inputFileName)
  await splitFileOnN(inputFileName, 100, "bigPart");
  await combineFiles(".", "bigPart");
  mergeFiles("sorted-0.txt", "sorted-1.txt")
}

// run();

variantEs3("big.txt")











