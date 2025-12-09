import { readFile } from "node:fs/promises";

type Tile = [number, number];

const getArea = (a: Tile, b: Tile) => {
  return (a[0] - b[0] + 1) * (a[1] - b[1] + 1);
};

const main = async () => {
  // const input: string = await readFile("day9_example.txt", {
  //   encoding: "utf8",
  // });

  const input: string = await readFile("day9_input.txt", {
    encoding: "utf8",
  });

  const tiles = input
    .split("\n")
    .map((row) => row.split(",").map((n) => parseInt(n, 10))) as Tile[];

  let max = 0;

  for (let i = 0; i < tiles.length; i++) {
    const a = tiles[i];

    for (let j = i + 1; j < tiles.length; j++) {
      const b = tiles[j];

      const area = getArea(a, b);

      if (area > max) {
        max = area;
      }
    }
  }

  console.log(max);
};

main().catch(console.error);
