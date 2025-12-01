import { readFile } from "node:fs/promises";

const main = async () => {
  const input = await readFile("day1_input.txt", { encoding: "utf8" });

  const lines = input.split("\n");

  let dial = 50;
  let zeroCount = 0;

  for (const line of lines) {
    const direction = line[0] === "L" ? -1 : 1;

    const amount = parseInt(line.slice(1), 10);

    dial = (dial + direction * amount + 100) % 100;

    if (dial === 0) {
      zeroCount += 1;
    }
  }

  console.log(zeroCount);
};

main().catch(console.error);
