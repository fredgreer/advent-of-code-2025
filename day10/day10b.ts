import { readFile } from "node:fs/promises";
import { Constraint, equalTo, solve } from "yalps";

const main = async () => {
  //   const input: string = await readFile("day10_example.txt", {
  //     encoding: "utf8",
  //   });

  const input: string = await readFile("day10_input.txt", {
    encoding: "utf8",
  });

  let total = 0;

  for (const line of input.split("\n")) {
    const parts = line.split(" ");

    const buttons = parts.slice(1, parts.length - 1).map((b) =>
      b
        .slice(1, b.length - 1)
        .split(",")
        .map(Number)
    );

    const target = parts[parts.length - 1];

    const targetCounts = target
      .slice(1, target.length - 1)
      .split(",")
      .map(Number);

    const constraints: Record<number, Constraint> = {};
    for (let i = 0; i < targetCounts.length; i++) {
      const count = targetCounts[i];
      constraints[i] = equalTo(count);
    }

    const variables: Record<number, any> = {};

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      variables[i] = { sum: 1 };

      for (const b of button) {
        variables[i][b] = 1;
      }
    }

    const integers = [];
    for (let i = 0; i < targetCounts.length; i++) {
      integers.push(i.toString());
    }

    const model = {
      direction: "minimize" as const,
      objective: "sum",
      constraints,
      variables,
      integers,
    };

    const solution = solve(model);

    const sum = solution.variables
      .map(([index, count]) => count)
      .reduce((a, b) => a + b, 0);

    total += sum;
  }

  console.log(total);
};

main().catch(console.error);
