import { readFile } from "node:fs/promises";

const main = async () => {
  // const input = await readFile("day6_example.txt", { encoding: "utf8" });
  const input: string = await readFile("day6_input.txt", { encoding: "utf8" });

  const rows = input.split("\n").map((r) => r.trim().split(/\s+/));

  const ops = rows[rows.length - 1];

  const columns: number[][] = [];

  for (const row of rows.slice(0, rows.length - 1)) {
    let i = 0;
    for (const element of row) {
      if (columns[i] === undefined) {
        columns.push([]);
      }

      columns[i].push(parseInt(element, 10));
      i += 1;
    }
  }

  let i = 0;
  let sum = 0;

  for (const column of columns) {
    const op = ops[i];

    console.log(op, column);

    if (op == "*") {
      sum += column.reduce((i, val) => i * val, 1);
    }

    if (op == "+") {
      sum += column.reduce((i, val) => i + val, 0);
    }

    i += 1;
  }

  console.log(sum);
};

main().catch(console.error);
