import assert from "assert";
import { range } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

type Direction = "U" | "R" | "D" | "L";

const getDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const xDiff = Math.abs(x1 - x2);
  const yDiff = Math.abs(y1 - y2);

  if (xDiff === 0 && yDiff === 0) return 0;
  if (xDiff === yDiff) return xDiff;
  return Math.max(xDiff, yDiff);
};

class Knot {
  public x: number = 0;

  public y: number = 0;

  // eslint-disable-next-line no-use-before-define
  public child: Knot | null = null;

  // eslint-disable-next-line no-empty-function
  constructor(public parent: Knot | null) {}

  public move(direction: Direction) {
    if (direction === "U") {
      this.y += 1;
    } else if (direction === "R") {
      this.x += 1;
    } else if (direction === "D") {
      this.y -= 1;
    } else {
      this.x -= 1;
    }

    if (this.child) {
      this.child.followParent();
    }
  }

  public followParent() {
    if (!this.parent) return;

    const distance = getDistance(this.parent.x, this.parent.y, this.x, this.y);

    if (distance > 1) {
      if (this.parent.x !== this.x && this.parent.y !== this.y) {
        if (this.parent.x > this.x && this.parent.y > this.y) {
          this.x += 1;
          this.y += 1;
        } else if (this.parent.x > this.x && this.parent.y < this.y) {
          this.x += 1;
          this.y -= 1;
        } else if (this.parent.x < this.x && this.parent.y < this.y) {
          this.x -= 1;
          this.y -= 1;
        } else if (this.parent.x < this.x && this.parent.y > this.y) {
          this.x -= 1;
          this.y += 1;
        }
      } else {
        this.x = Math.round((this.x + this.parent.x) / 2);
        this.y = Math.round((this.y + this.parent.y) / 2);
      }
    }

    this.child?.followParent();
  }
}

const isDirection = (direction: string): direction is Direction =>
  ["U", "R", "D", "L"].includes(direction);

const parseInput = (input: string): Direction[] => {
  const lines = parseLines(input);

  return lines.flatMap((line) => {
    const [direction, count] = line.split(" ");

    assert(isDirection(direction), `cannot parse ${line}`);

    return range(0, parseNumber(count)).map(() => direction);
  });
};

const solve = (size: number) => (directions: Direction[]) => {
  const visited = new Set<string>();

  const head: Knot = new Knot(null);
  let tail = head;
  for (let i = 0; i < size; i += 1) {
    const next = new Knot(tail);
    tail.child = next;
    tail = next;
  }

  directions.forEach((direction) => {
    head.move(direction);
    let t = head;
    while (t.child !== null) t = t.child;
    visited.add(`${t.x},${t.y}`);
  });

  return visited.size;
};

export const solvePart1 = (input: string) => solve(1)(parseInput(input));
export const solvePart2 = (input: string) => solve(9)(parseInput(input));
