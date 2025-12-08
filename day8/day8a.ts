import { readFile } from "node:fs/promises";

type Coord = [number, number, number];

type Box = {
  id: number;
  pos: Coord;
  circuit: number;
};

type Pair = {
  boxA: Box;
  boxB: Box;
  dist: number;
};

const dist = (box1: Box, box2: Box) => {
  const [x0, y0, z0] = box1.pos;
  const [x1, y1, z1] = box2.pos;

  return (x1 - x0) ** 2 + (y1 - y0) ** 2 + (z1 - z0) ** 2;
};

const main = async () => {
  // const input: string = await readFile("day8_example.txt", {
  //   encoding: "utf8",
  // });
  const input: string = await readFile("day8_input.txt", { encoding: "utf8" });
  const boxes: Box[] = input.split("\n").map((row, id) => {
    const pos = row.split(",").map((n) => parseInt(n, 10)) as Coord;

    return { id, pos, circuit: 0 };
  });

  const pairs: Pair[] = [];

  for (let i = 0; i < boxes.length; i++) {
    const boxA = boxes[i];

    for (let j = i + 1; j < boxes.length; j++) {
      const boxB = boxes[j];

      pairs.push({ boxA, boxB, dist: dist(boxA, boxB) });
    }
  }

  pairs.sort((a, b) => {
    return a.dist - b.dist;
  });

  const pairsToCheck = pairs.slice(0, 1000);

  let nextCircuit = 1;

  for (const pair of pairsToCheck) {
    const { boxA, boxB } = pair;

    if (boxA.circuit === 0 && boxB.circuit === 0) {
      // new circuit
      boxA.circuit = nextCircuit;
      boxB.circuit = nextCircuit;
      nextCircuit += 1;
    } else if (boxA.circuit === boxB.circuit) {
      // Same circuit, nothing happens
    } else if (boxA.circuit !== 0) {
      // A already on a circuit, join B's circuit
      boxes
        .filter(
          (b) => b === boxB || (b.circuit === boxB.circuit && b.circuit !== 0)
        )
        .forEach((b) => (b.circuit = boxA.circuit));
    } else if (boxB.circuit !== 0) {
      // B already on a circuit, join A's circuit
      boxes
        .filter(
          (b) => b === boxA || (b.circuit === boxA.circuit && b.circuit !== 0)
        )
        .forEach((b) => (b.circuit = boxB.circuit));
    }
  }

  const circuitSizes: Record<number, number> = {};

  for (const box of boxes) {
    if (circuitSizes[box.circuit] === undefined) {
      circuitSizes[box.circuit] = 0;
    }

    if (box.circuit !== 0) {
      circuitSizes[box.circuit] += 1;
    }
  }

  const sizes = Object.values(circuitSizes);

  sizes.sort((a, b) => {
    return b - a;
  });

  console.log(sizes.slice(0, 3).reduce((a, b) => a * b, 1));
};

main().catch(console.error);
