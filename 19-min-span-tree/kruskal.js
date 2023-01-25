const graph = {
  A: [['B', 9], ['I', 3], ['D', 10]],
  B: [['I', 16], ['C', 4], ['E', 8]],
  C: [['E', 14], ['F', 1]],
  D: [['I', 11], ['E', 7], ['G', 13], ['H', 5]],
  E: [['F', 12], ['G', 15]],
  F: [['G', 2]],
  G: [['H', 6]],
  H: [],
  I: []
};

function unionFind() {
  let parent = {};

  function findRoot(a) {
    if (parent[a] === a || parent[a] === undefined) {
      return a;
    }
    return parent[a] = findRoot(parent[a]);
  }

  function union(a, b) {
    const rootA = findRoot(a);
    const rootB = findRoot(b);

    if (rootA !== rootB) {
      parent[rootA] = rootB;
    }
  }

  function isConnected(a, b) {
    return findRoot(a) === findRoot(b);
  }

  return {
    union,
    isConnected
  }
}

function getSortedEdges(g) {
  const keys = Object.keys(g);
  return keys.reduce((a, e) => {
    const es = g[e].map(edge => [e, ...edge])
    return [...a, ...es];
  }, []).sort((e1, e2) => e1[2] - e2[2])
}

function kruskal(g) {
  const uf = unionFind();

  const edges = getSortedEdges(graph);
  const result = []

  edges.forEach(edge => {
    const [from, to] = edge;
    if (!uf.isConnected(from, to)) {
      uf.union(from, to)
      result.push(edge)
    }
  });

  return result;
}

kruskal(graph)









