import { readFile } from "node:fs/promises";

type Point = [number, number];

const getArea = (a: Point, b: Point) => {
  return Math.abs((a[0] - b[0] + 1) * (a[1] - b[1] + 1));
};

class Edge {
  isHorizontal: boolean;
  a: Point;
  b: Point;

  constructor(a: Point, b: Point) {
    this.isHorizontal = a[1] === b[1];

    if (this.isHorizontal) {
      if (a[0] < b[0]) {
        this.a = a;
        this.b = b;
      } else {
        this.a = b;
        this.b = a;
      }
    } else {
      if (a[1] < b[1]) {
        this.a = a;
        this.b = b;
      } else {
        this.a = b;
        this.b = a;
      }
    }
  }

  intersects(edge2: Edge) {
    if (this.isHorizontal === edge2.isHorizontal) {
      return false;
    }

    const horzEdge = this.isHorizontal ? this : edge2;
    const vertEdge = this.isHorizontal ? edge2 : this;

    return (
      vertEdge.a[0] > horzEdge.a[0] &&
      vertEdge.a[0] < horzEdge.b[0] &&
      horzEdge.a[1] > vertEdge.a[1] &&
      horzEdge.a[1] < vertEdge.b[1]
    );
  }
}

class Polygon {
  public edges: Edge[];

  constructor(points: Point[]) {
    this.edges = points.map((p, i) => {
      const next = points[(i + 1) % points.length];
      return new Edge(p, next);
    });
  }

  intersects(edge2: Edge) {
    for (const edge of this.edges) {
      if (edge.intersects(edge2)) {
        return true;
      }
    }

    return false;
  }
}

const main = async () => {
  //   const input: string = await readFile("day9_example.txt", {
  //     encoding: "utf8",
  //   });

  const input: string = await readFile("day9_input.txt", {
    encoding: "utf8",
  });

  const tiles: Point[] = input.split("\n").map((line) => {
    const [x, y] = line.split(",").map((n) => parseInt(n, 10));
    return [x, y];
  });

  const polygon = new Polygon(tiles);

  let max = 0;

  for (let i = 0; i < tiles.length - 1; i++) {
    const a = tiles[i];

    for (let j = i + 1; j < tiles.length; j++) {
      const b = tiles[j];

      // Haxx area off grid to avoid edge (lol) cases
      const x1 = Math.min(a[0], b[0]) + 0.1;
      const x2 = Math.max(a[0], b[0]) - 0.1;
      const y1 = Math.min(a[1], b[1]) + 0.1;
      const y2 = Math.max(a[1], b[1]) - 0.1;
      const box = new Polygon([
        [x1, y1],
        [x2, y1],
        [x2, y2],
        [x1, y2],
      ]);

      if (!box.edges.some((edge) => polygon.intersects(edge))) {
        const area = getArea(a, b);

        if (area > max) {
          max = area;
        }
      }
    }
  }

  console.log(max);
};

main().catch(console.error);
