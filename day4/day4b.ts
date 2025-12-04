import { readFile } from "node:fs/promises";

const main = async () => {
  //   const input = await readFile("day4_example.txt", { encoding: "utf8" });
  const input = await readFile("day4_input.txt", { encoding: "utf8" });

  const matrix = input.split("\n").map((row: string) => row.split(""));

  let totalRemoved = 0;

  while (true) {
    let accessibleCount = 0;

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];

      for (let j = 0; j < row.length; j++) {
        const element = row[j];

        // Only check rolls
        if (element !== "@") {
          continue;
        }

        let count = 0;

        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (k == i && l == j) {
              // Skip self
              continue;
            }

            try {
              if (matrix[k][l] == "@") {
                count += 1;
              }
            } catch {
              // out of bounds
            }
          }
        }

        // Remove
        if (count < 4) {
          accessibleCount += 1;
          matrix[i][j] = ".";
        }
      }
    }

    totalRemoved += accessibleCount;

    if (accessibleCount === 0) {
      break;
    }
  }

  console.log(totalRemoved);
};

main().catch(console.error);
