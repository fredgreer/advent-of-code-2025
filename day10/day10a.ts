import { readFile } from "node:fs/promises";

type Machine = {
  target: number;
  buttons: number[];
};

const targetToNum = (target: string) => {
  let num = 0;

  for (let i = 1; i < target.length - 1; i++) {
    const bit = target[i] === "#" ? 1 : 0;

    num |= bit << (i - 1);
  }

  return num;
};

const buttonToNum = (button: string) => {
  const indexes = button
    .slice(1, button.length - 1)
    .split(",")
    .map(Number);

  let num = 0;

  for (const index of indexes) {
    num |= 1 << index;
  }

  return num;
};

const main = async () => {
  // const input: string = await readFile("day10_example.txt", {
  //   encoding: "utf8",
  // });

  const input: string = await readFile("day10_input.txt", {
    encoding: "utf8",
  });

  const machines: Machine[] = input.split("\n").map((row) => {
    const parts = row.split(" ");

    const target = targetToNum(parts[0]);

    const buttons = parts.slice(1, parts.length - 1).map(buttonToNum);

    // const joltages = parts[parts.length - 1];

    return { target, buttons };
  });

  let sum = 0;

  for (const machine of machines) {
    let min = Infinity;

    for (let i = 0; i < 2 ** machine.buttons.length; i++) {
      let num = 0;
      let onCount = 0;

      for (let j = 0; j < machine.buttons.length; j++) {
        const button = machine.buttons[j];

        // bit high, toggle on
        if (i & (1 << j)) {
          num = num ^ button;
          onCount += 1;
        }
      }

      if (num === machine.target) {
        min = Math.min(onCount, min);
      }
    }

    sum += min;
  }

  console.log(sum);
};

main().catch(console.error);
