import { readFile } from "node:fs/promises";

let cache: Record<string, number> = {};

const getPaths = (
  graph: Graph,
  start: string,
  end: string,
  seenDac: boolean,
  seenFft: boolean
) => {
  if (start === "dac") {
    seenDac = true;
  }

  if (start === "fft") {
    seenFft = true;
  }

  let count = 0;

  if (start === end && seenDac && seenFft) {
    return 1;
  } else if (graph[start]) {
    for (const next of graph[start]) {
      const key = JSON.stringify({ graph, next, end, seenDac, seenFft });

      if (cache[key] !== undefined) {
        count += cache[key];
      } else {
        const res = getPaths(graph, next, end, seenDac, seenFft);
        count += res;
        cache[key] = res;
      }
    }
  }

  return count;
};

type Graph = Record<string, string[]>;

const main = async () => {
  //   const input: string = await readFile("day11_exampleb.txt", {
  //     encoding: "utf8",
  //   });

  const input: string = await readFile("day11_input.txt", {
    encoding: "utf8",
  });

  const graph: Graph = {};

  for (const row of input.split("\n")) {
    const [id, neighboursStr] = row.split(": ");

    const next = neighboursStr.split(" ");

    graph[id] = next;
  }

  const start = "svr";
  const end = "out";
  const paths = getPaths(graph, start, end, false, false);

  console.log(paths);
};

main().catch(console.error);
