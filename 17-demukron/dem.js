const graph = {
  A: ['B'],
  B: ['E'],
  C: ['D'],
  D: ['A', 'E', 'B', 'F'],
  E: ['G'],
  F: ['E', 'H'],
  G: ['H'],
  H: [],
};

const toMatrix = g => {
  const keys = Object.keys(g).sort();
  let m = [];

  keys.forEach(from => {
    let r = []
    keys.forEach(to => {
      if (g[from].includes(to)) {
        r.push(1);
      } else {
        r.push(0);
      }
    })
    m.push(r);
  });

  return m;
}

const printMatrix = m => {
  m.forEach(r => {
    console.log(r.join(' '));
  });
}

const m = toMatrix(graph);

const sumRows = m => {
  const sum = new Array(m.length).fill(0);

  m.forEach((r, i) => {
    r.forEach((e, j) => {
      sum[j] += r[j];
    })
  });

  return sum;
}

const subtractRows = (r1, rows) => {
  const r = r1;
  const l = r.length;

  for (let i = 0; i < l; i++) {
    rows.forEach(row => {
      r[i] -= row[i];
    });
  }

  return r;
};

const printRow = r => console.log(r.join(' '));


const demukron = g => {
  const m = toMatrix(g);
  const keys = Object.keys(g).sort();
  let sum = sumRows(m);
  const result = []

  while (1) {
    const zeroIndexes = sum.reduce((a, e, i) => {
      if (e === 0) {
        return [...a, i];
      }
      return a;
    }, []);

    if (zeroIndexes.length === 0) break;

    const zeroKeys = zeroIndexes.map(e => keys[e]);
    const zeroRows = m.filter((e, i) => zeroIndexes.includes(i));

    result.push(zeroKeys);

    sum = subtractRows(sum, zeroRows);

    zeroIndexes.forEach(i => {
      sum[i] = -1;
    });

  }

  return result;

}


const sorted = demukron(graph);

console.log(sorted);
