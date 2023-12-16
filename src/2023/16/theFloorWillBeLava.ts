/* eslint-disable no-continue */
import { Position } from "../../helpers/Position";
import { parseLines } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Mirror = "\\" | "/";
type Tile = "." | "-" | "|" | Mirror;
type Direction = "north" | "east" | "south" | "west";
type Light = { position: Position; direction: Direction };

const parseInput = (input: string): Tile[][] =>
  parseLines(input).map((row) => row.split("") as Tile[]);

const steps: Record<Direction, Position> = {
  north: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  south: { x: 0, y: 1 },
  west: { x: -1, y: 0 },
};

const isValid = ({ x, y }: Position, floor: Tile[][]) =>
  y >= 0 && y < floor.length && x >= 0 && x < floor[0].length;

const canPassThrough = (direction: Direction, tile: Tile) => {
  if (tile === ".") return true;
  if (tile === "-" && (direction === "east" || direction === "west"))
    return true;
  if (tile === "|" && (direction === "north" || direction === "south"))
    return true;
  return false;
};

const reflect: Record<Mirror, Record<Direction, Direction>> = {
  "/": {
    north: "east",
    east: "north",
    south: "west",
    west: "south",
  },
  "\\": {
    north: "west",
    east: "south",
    south: "east",
    west: "north",
  },
};

const energise = (floor: Tile[][], origin: Light) => {
  const visited: Record<Direction, boolean>[][] = Array.from(
    { length: floor.length },
    () =>
      Array.from({ length: floor[0].length }, () => ({
        north: false,
        east: false,
        south: false,
        west: false,
      })),
  );

  const queue: Light[] = [origin];

  while (queue.length > 0) {
    const {
      position: { x, y },
      direction,
    } = queue.pop()!;

    if (!isValid({ x, y }, floor) || visited[y][x][direction]) continue;

    const tile = floor[y][x];
    visited[y][x][direction] = true;

    if (tile === "/" || tile === "\\") {
      const newDirection = reflect[tile][direction];
      const nextPosition = {
        x: x + steps[newDirection].x,
        y: y + steps[newDirection].y,
      };

      queue.push({ position: nextPosition, direction: newDirection });
    } else if (canPassThrough(direction, tile)) {
      const nextPosition = {
        x: x + steps[direction].x,
        y: y + steps[direction].y,
      };

      queue.push({ position: nextPosition, direction });
    } else if (tile === "-") {
      queue.push({ position: { x: x - 1, y }, direction: "west" });
      queue.push({ position: { x: x + 1, y }, direction: "east" });
    } else {
      queue.push({ position: { x, y: y - 1 }, direction: "north" });
      queue.push({ position: { x, y: y + 1 }, direction: "south" });
    }
  }

  return visited
    .flatMap((row) =>
      row.map(
        (visitedTile) =>
          visitedTile.north ||
          visitedTile.east ||
          visitedTile.south ||
          visitedTile.west,
      ),
    )
    .filter(Boolean).length;
};

const solvePartA = (input: string) =>
  energise(parseInput(input), { position: { x: 0, y: 0 }, direction: "east" });

const solvePartB = (input: string) => {
  const floor = parseInput(input);

  const leftColumn: Light[] = floor.map((_, y) => ({
    position: { x: 0, y },
    direction: "east",
  }));

  const rightColumn: Light[] = floor.map((_, y) => ({
    position: { x: floor[0].length, y },
    direction: "west",
  }));

  const topRow: Light[] = floor[0].map((_, x) => ({
    position: { x, y: 0 },
    direction: "south",
  }));

  const bottomRow: Light[] = floor[0].map((_, x) => ({
    position: { x, y: floor.length - 1 },
    direction: "north",
  }));

  return [...leftColumn, ...rightColumn, ...topRow, ...bottomRow]
    .map((light) => energise(floor, light))
    .reduce((max, value) => Math.max(max, value), 0);
};

export const day: Day = {
  day: 16,
  year: 2023,
  partA: {
    getExampleInput: () => readInput(__dirname, "input/example"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartA,
  },
  partB: {
    getExampleInput: () => readInput(__dirname, "input/example"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartB,
  },
};
