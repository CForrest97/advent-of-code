import { add } from "ramda";
import { parseLines } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";
import { Position } from "../../helpers/Position";

type Tile = "O" | "#" | ".";

type Platform = { rounds: Position[]; grid: Tile[][] };

const parseInput = (input: string): Platform => {
  const grid = parseLines(input).map((row) => row.split("") as Tile[]);
  const rounds: Position[] = [];

  for (let y = 0; y < grid.length; y += 1)
    for (let x = 0; x < grid.length; x += 1)
      if (grid[y][x] === "O") rounds.push({ x, y });

  return { rounds, grid };
};

const tiltNorth = (grid: Tile[][], rounds: Position[]): Position[] => {
  const arr = grid[0].map(() => 0);

  return rounds
    .toSorted((rock1, rock2) => rock1.y - rock2.y)
    .map((rock) => {
      for (let { y } = rock; y >= arr[rock.x]; y -= 1) {
        if (grid[y][rock.x] === "#") {
          arr[rock.x] = y + 2;
          return { x: rock.x, y: y + 1 };
        }
      }
      arr[rock.x] += 1;
      return { x: rock.x, y: arr[rock.x] - 1 };
    });
};

const tiltWest = (grid: Tile[][], rounds: Position[]): Position[] => {
  const arr = grid.map(() => 0);

  return rounds
    .toSorted((rock1, rock2) => rock1.x - rock2.x)
    .map((rock) => {
      for (let { x } = rock; x >= arr[rock.y]; x -= 1) {
        if (grid[rock.y][x] === "#") {
          arr[rock.y] = x + 2;
          return { x: x + 1, y: rock.y };
        }
      }
      arr[rock.y] += 1;
      return { x: arr[rock.y] - 1, y: rock.y };
    });
};

const tiltSouth = (grid: Tile[][], rounds: Position[]): Position[] => {
  const arr = grid[0].map(() => grid.length - 1);

  return rounds
    .toSorted((rock1, rock2) => rock2.y - rock1.y)
    .map((rock) => {
      for (let { y } = rock; y <= arr[rock.x]; y += 1) {
        if (grid[y][rock.x] === "#") {
          arr[rock.x] = y - 2;
          return { x: rock.x, y: y - 1 };
        }
      }
      arr[rock.x] -= 1;
      return { x: rock.x, y: arr[rock.x] + 1 };
    });
};

const tiltEast = (grid: Tile[][], rounds: Position[]): Position[] => {
  const arr = grid.map(() => grid[0].length - 1);

  return rounds
    .toSorted((rock1, rock2) => rock2.x - rock1.x)
    .map((rock) => {
      for (let { x } = rock; x <= arr[rock.y]; x += 1) {
        if (grid[rock.y][x] === "#") {
          arr[rock.y] = x - 2;
          return { x: x - 1, y: rock.y };
        }
      }
      arr[rock.y] -= 1;
      return { x: arr[rock.y] + 1, y: rock.y };
    });
};

const hash = (rounds: Position[]) =>
  rounds.map((pos) => `${pos.x}_${pos.y}`).join();

const solvePartA = (input: string) => {
  const { grid, rounds } = parseInput(input);

  return tiltNorth(grid, rounds)
    .map(({ y }) => grid.length - y)
    .reduce(add);
};
const solvePartB = (input: string) => {
  const { grid, rounds } = parseInput(input);
  let current = rounds;

  const platformHistory: Map<string, number> = new Map();
  let hashed = hash(current);

  let i = 0;

  while (!platformHistory.has(hashed)) {
    platformHistory.set(hashed, i);

    current = tiltNorth(grid, current);
    current = tiltWest(grid, current);
    current = tiltSouth(grid, current);
    current = tiltEast(grid, current);

    i += 1;
    hashed = hash(current);
  }

  const cycleLength = i - platformHistory.get(hash(current))!;

  for (let _ = 0; _ < (1_000_000_000 - i) % cycleLength; _ += 1) {
    current = tiltNorth(grid, current);
    current = tiltWest(grid, current);
    current = tiltSouth(grid, current);
    current = tiltEast(grid, current);
  }

  return current.map(({ y }) => grid.length - y).reduce(add);
};

export const parabolicReflectorDish: Day = {
  day: 14,
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
