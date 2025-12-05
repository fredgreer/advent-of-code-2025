import { readFile } from "node:fs/promises";

const inRange = (num: number, start: number, end: number) => {
  return num >= start && num <= end;
};

const main = async () => {
  // const input = await readFile("day5_example.txt", { encoding: "utf8" });

  const input: string = await readFile("day5_input.txt", { encoding: "utf8" });

  const rows = input.split("\n");

  const delim = rows.indexOf("");

  const ranges = rows.slice(0, delim);

  const ingredientIds = rows
    .slice(delim + 1)
    .map((n: string) => parseInt(n, 10));

  let freshCount = 0;

  for (const ingredientId of ingredientIds) {
    for (const range of ranges) {
      const [start, end] = range.split("-").map((n: string) => parseInt(n, 10));

      if (inRange(ingredientId, start, end)) {
        console.log(ingredientId, start, end);
        freshCount += 1;
        break;
      }
    }
  }

  console.log(freshCount);
};

main().catch(console.error);
