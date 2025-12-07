import { readFile } from "node:fs/promises";

const main = async () => {
  // const input: string = await readFile("day7_example.txt", {
  //   encoding: "utf8",
  // });
  const input: string = await readFile("day7_input.txt", { encoding: "utf8" });
  const rows = input.split("\n");

  const initialPath = rows[0].indexOf("S");

  let paths = new Set<number>([initialPath]);

  let splitCount = 0;

  for (const row of rows.slice(1)) {
    for (const path of paths) {
      if (row[path] == "^") {
        // Replace current path with left and right
        paths.delete(path);
        paths.add(path - 1);
        paths.add(path + 1);

        splitCount += 1;
      }
    }
  }

  console.log(splitCount);
};

main().catch(console.error);
