const graph = {
  A: ['B'],
  B: ['C', 'D'],
  C: ['A'],
  D: ['E'],
  E: ['F'],
  F: ['D'],
  G: ['F', 'H'],
  H: ['I'],
  I: ['J'],
  J: ['K', 'G'],
  K: []
}

const graphToData = g => {
  const nodes = Object.keys(g).map(node => {
    return {
      id: node,
      name: node,
      val: 1,
      color: 'blue'
    }
  });

  const links = nodes.reduce((acc, node) => {
    const to = g[node.id].map(toNode => {
      return {
        source: node.id,
        target: toNode
      };
    });

    return [...acc, ...to];
  }, [])

  return {nodes, links};

}

console.log(graphToData(graph));

function dfs(graph, node, visited, stack) {
  visited[node] = true;

  const ns = graph[node];

  ns.forEach(child => {
    if (!visited[child]) {
      dfs(graph, child, visited, stack);
    }
  });

  if (!stack.includes(node)) {
    stack.push(node);
  }
}

function findSSC(node, graph, visited, result) {
  visited[node] = true;
  result.push(node);

  graph[node].forEach(child => {
    if (!visited[child]) {
      findSSC(child, graph, visited, result)
    }
  });
}


function kosaraju(graph) {
  let stack = []
  let visited = {};

  const keys = ['B', 'A', 'C', 'D', 'E', 'F', 'I', 'G', 'H', 'J', 'K'];

  keys.forEach(node => {
    if (!visited[node]) {
      dfs(graph, node, visited, stack);
    }
  });

  visited = {}

  const reversedGraph = reverseGraph(graph);

  const sscs = [];

  while (stack.length > 0) {
    const node = stack.pop();
    const scc = []
    if (!visited[node]) {
      findSSC(node, reversedGraph, visited, scc);
      sscs.push(scc);
    }


  }

  console.log(stack)
  console.log(sscs);
}


function reverseGraph(g) {
  return Object.keys(g).reduce((reversedGraph, node) => {
    const children = g[node];
    children.forEach(child => {
      reversedGraph[child] = reversedGraph[child] || [];
      reversedGraph[child].push(node);
    })

    return reversedGraph;
  }, {});
}

// console.log(reverseGraph(graph))

kosaraju(graph)

const gData = graphToData(graph);
const gData2 = graphToData(reverseGraph(graph));

addGraph('graph', gData);
addGraph('graph2', gData2);

function addGraph(id, data) {
  const Graph = ForceGraph()
    (document.getElementById(id))
    .linkDirectionalParticles(2)
    .width(1200)
    .height(500)
    .graphData(data)
    .nodeCanvasObject((node, ctx, globalScale) => {
      const label = node.id;
      const fontSize = 12 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = node.color;
      ctx.fillText(label, node.x, node.y);

      node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
    })

}
