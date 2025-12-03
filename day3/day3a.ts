import { readFile } from "node:fs/promises";

const main = async () => {
  const input = await readFile("day3_example.txt", { encoding: "utf8" });

  const banks = input.split("\n");

  let sum = 0;

  for (const bank of banks) {
    console.log(bank);
    let max = 0;

    for (let i = 0; i < bank.length; i++) {
      const a = parseInt(bank[i]);

      for (let j = i + 1; j < bank.length; j++) {
        const b = parseInt(bank[j]);

        const val = a * 10 + b;

        if (val > max) {
          max = val;
        }
      }
    }

    sum += max;
  }

  console.log(sum);
};

main().catch(console.error);
