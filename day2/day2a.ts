import { readFile } from "node:fs/promises";

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

      const a = idStr.substring(0, len / 2);
      const b = idStr.substring(len / 2);

      const isValid = a !== b;

      if (!isValid) {
        sum += id;
      }
    }
  }

  console.log(sum);
};

main().catch(console.error);
