import { readFile } from "node:fs/promises";

const main = async () => {
  //   const input = await readFile("day6_example.txt", { encoding: "utf8" });
  const input: string = await readFile("day6_input.txt", { encoding: "utf8" });

  const rows = input.split("\n");

  let nums: number[] = [];
  let sum = 0;

  for (let col = rows[0].length - 1; col >= 0; col--) {
    let numStr = "";

    for (let row = 0; row < rows.length - 1; row++) {
      numStr += rows[row][col];
    }

    const num = parseInt(numStr, 10);

    if (!isNaN(num)) {
      nums.push(num);
    }

    const op = rows[rows.length - 1][col];

    if (op !== " ") {
      if (op == "*") {
        sum += nums.reduce((i, val) => i * val, 1);
      }

      if (op == "+") {
        sum += nums.reduce((i, val) => i + val, 0);
      }

      nums = [];
    }
  }

  console.log(sum);
};

main().catch(console.error);
