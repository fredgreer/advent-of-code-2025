import { readFile } from "node:fs/promises";

const countHashes = (str: string) => str.split("#").length - 1;

const main = async () => {
  //   const input: string = await readFile("day12_example.txt", {
  //     encoding: "utf8",
  //   });

  const input: string = await readFile("day12_input.txt", {
    encoding: "utf8",
  });

  const parts = input.replace(":", "").split("\n\n");

  const boxes = parts.pop();

  const presents = parts.map(countHashes);

  let count = 0;

  for (const line of boxes?.split("\n")!) {
    const [areaStr, countStr] = line.split(": ");

    const [boxWidth, boxHeight] = areaStr.split("x").map(Number);
    const boxArea = boxWidth * boxHeight;

    const counts = countStr.split(" ").map(Number);

    const presentArea = counts
      .map((count, i) => presents[i] * count)
      .reduce((a, b) => a + b, 0);

    if (presentArea <= boxArea) {
      count += 1;
    }
  }

  console.log(count);
};

main().catch(console.error);
