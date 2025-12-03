import { readFile } from "node:fs/promises";

const main = async () => {
  //   const input = await readFile("day3_example.txt", { encoding: "utf8" });
  const input = await readFile("day3_input.txt", { encoding: "utf8" });

  const banks = input.split("\n");

  let sum = 0;

  for (const bank of banks) {
    let cells = bank.split("").map((n: string) => parseInt(n, 10));

    const targetLen = 12;
    let num = "";

    while (num.length < targetLen) {
      const digitsToFind = targetLen - num.length - 1;
      const options = cells.slice(0, cells.length - digitsToFind);

      const digit = Math.max(...options);

      num += digit.toString();

      cells = cells.slice(cells.indexOf(digit) + 1);
    }

    sum += parseInt(num);
  }

  console.log(sum);
};

main().catch(console.error);
