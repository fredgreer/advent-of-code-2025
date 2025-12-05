import { readFile } from "node:fs/promises";

const inRange = (num: number, start: number, end: number) => {
  return num >= start && num <= end;
};

const main = async () => {
  //   const input = await readFile("day5_example.txt", { encoding: "utf8" });

  const input: string = await readFile("day5_input.txt", { encoding: "utf8" });

  const rows = input.split("\n");

  const delim = rows.indexOf("");

  const ranges: number[][] = rows
    .slice(0, delim)
    .map((line: string) => line.split("-").map((n: string) => parseInt(n, 10)));

  for (const range of ranges) {
  }

  //   sort by start
  ranges.sort((a, b) => {
    return a[0] - b[0];
  });

  const mergedRanges = [ranges[0]];

  for (const current of ranges) {
    const prev = mergedRanges[mergedRanges.length - 1];

    if (current[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], current[1]);
    } else {
      mergedRanges.push(current);
    }
  }

  let sum = 0;
  for (const [start, end] of mergedRanges) {
    sum += end - start + 1;
  }

  console.log(sum);
};

main().catch(console.error);
