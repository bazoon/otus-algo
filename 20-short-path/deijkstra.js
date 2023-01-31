import PQ from "./pq.js";


const graph = {
  A: [['B', 9], ['I', 3], ['D', 10]],
  B: [['A', 9], ['I', 16], ['C', 4], ['E', 8]],
  C: [['B', 4], ['E', 14], ['F', 1]],
  D: [['A', 10], ['I', 11], ['E', 7], ['G', 13], ['H', 5]],
  E: [['B', 8], ['C', 14], ['D', 7], ['I', 20], ['F', 12], ['G', 15]],
  F: [['C', 1], ['E', 12], ['G', 2], ['J', 100]],
  G: [['H', 6]],
  H: [['D', 5], ['G', 6], ['J', 1]],
  I: [['A', 3], ['B', 16], ['E', 20], ['D', 11]],
  J: [['H', 1], ['F', 100]]
};


function deijkstra(g, source, dest) {
  const vertexes = Object.keys(graph);
  const dist = {};
  const prev = {}
  const explored = {};

  vertexes.forEach(v => {
    dist[v] = Infinity;
    prev[v] = -1;
  });

  const pq = PQ((a, b) => a[1] > b[1]);

  pq.enqueue([source, 0]);


  dist[source] = 0;

  while (!explored[dest]) {
    const [v, minDist] = pq.dequeue();
    const minNeighbours = g[v];

    explored[v] = true;

    minNeighbours.forEach(([w, d]) => {
      if (!explored[w]) {
        if (dist[v] + d < dist[w]) {
          dist[w] = dist[v] + d;
          prev[w] = v;
        }
      }
    });

    g[v].forEach(([to, d]) => {
      if (!explored[to]) {
        pq.enqueue([to, d]);
      }
    });
  }

  const distance = dist[dest];

  const path = [];
  let v = dest

  while (v !== -1) {
    path.push(v);
    v = prev[v];
  }


  return [distance, path.reverse()];
}


const [distance, path] = deijkstra(graph, "A", "J");

console.log(distance, path)




