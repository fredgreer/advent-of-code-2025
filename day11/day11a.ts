import { readFile } from "node:fs/promises";

const getPaths = (
  graph: Graph,
  start: string,
  end: string,
  currPath: string[] = [],
  paths: string[][] = []
) => {
  currPath.push(start);

  if (start === end) {
    paths.push([...currPath]);
  } else if (graph[start]) {
    for (const next of graph[start]) {
      if (!currPath.includes(next)) {
        getPaths(graph, next, end, currPath, paths);
      }
    }
  }

  currPath.pop();
  return paths;
};

type Graph = Record<string, string[]>;

const main = async () => {
  // const input: string = await readFile("day11_example.txt", {
  //   encoding: "utf8",
  // });

  const input: string = await readFile("day11_input.txt", {
    encoding: "utf8",
  });

  const graph: Graph = {};

  for (const row of input.split("\n")) {
    const [id, neighboursStr] = row.split(": ");

    const next = neighboursStr.split(" ");

    graph[id] = next;
  }

  const start = "you";
  const end = "out";
  const paths = getPaths(graph, start, end);

  console.log(paths.length);
};

main().catch(console.error);
