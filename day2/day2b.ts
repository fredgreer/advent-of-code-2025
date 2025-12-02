import { readFile } from "node:fs/promises";

const factors = (number: number) =>
  [...Array(number + 1).keys()].filter((i) => number % i === 0 && i !== number);

const allEqual = (arr: number[]) => arr.every((v) => v === arr[0]);

const main = async () => {
  const input = await readFile("day2_input.txt", { encoding: "utf8" });

  const ranges = input.split(",");

  let sum = 0;

  for (const range of ranges) {
    const [firstStr, lastStr] = range.split("-");

    const first = parseInt(firstStr, 10);
    const last = parseInt(lastStr, 10);

    for (let id = first; id <= last; id++) {
      const idStr = id.toString();
      const len = idStr.length;

      const facts = factors(len);

      let isInvalid = false;

      for (const fact of facts) {
        let re = new RegExp(String.raw`.{1,${fact}}`, "g");
        const parts = idStr.match(re)?.map((n) => parseInt(n, 10));

        if (allEqual(parts!)) {
          isInvalid = true;
        }
      }

      if (isInvalid) {
        sum += id;
      }
    }
  }

  console.log(sum);
};

main().catch(console.error);
