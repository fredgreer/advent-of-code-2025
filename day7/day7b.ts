import { readFile } from "node:fs/promises";

const cache: Record<string, number> = {};

const cacheKey = (path: number, childRows: string[]) =>
  JSON.stringify({ path, childRows });

const countChildPaths = (path: number, rows: string[]): number => {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (row[path] == "^") {
      const childRows = rows.slice(i + 1, rows.length);

      const cached = cache[cacheKey(path, childRows)];
      if (cached !== undefined) {
        return cached;
      }

      const count =
        countChildPaths(path - 1, childRows) +
        countChildPaths(path + 1, childRows);

      cache[cacheKey(path, childRows)] = count;

      return count;
    }
  }

  return 1;
};

const main = async () => {
  //   const input: string = await readFile("day7_example.txt", {
  //     encoding: "utf8",
  //   });
  const input: string = await readFile("day7_input.txt", { encoding: "utf8" });
  console.log(input);
  const rows = input.split("\n");

  const initialPath = rows[0].indexOf("S");

  console.log(countChildPaths(initialPath, rows));
};

main().catch(console.error);
