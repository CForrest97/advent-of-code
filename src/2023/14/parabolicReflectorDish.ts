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

const tiltNorth = (platform: Platform): Platform => {
  const arr = platform.grid[0].map(() => 0);

  const { rounds } = platform;

  const newRounds = rounds
    .toSorted((rock1, rock2) => rock1.y - rock2.y)
    .map((rock) => {
      for (let { y } = rock; y >= arr[rock.x]; y -= 1) {
        if (platform.grid[y][rock.x] === "#") {
          arr[rock.x] = y + 2;
          return { x: rock.x, y: y + 1 };
        }
      }
      arr[rock.x] += 1;
      return { x: rock.x, y: arr[rock.x] - 1 };
    });

  return {
    ...platform,
    rounds: newRounds,
  };
};

const tiltWest = (platform: Platform): Platform => {
  const arr = platform.grid.map(() => 0);

  const { rounds } = platform;

  const newRounds = rounds
    .toSorted((rock1, rock2) => rock1.x - rock2.x)
    .map((rock) => {
      for (let { x } = rock; x >= arr[rock.y]; x -= 1) {
        if (platform.grid[rock.y][x] === "#") {
          arr[rock.y] = x + 2;
          return { x: x + 1, y: rock.y };
        }
      }
      arr[rock.y] += 1;
      return { x: arr[rock.y] - 1, y: rock.y };
    });

  return {
    ...platform,
    rounds: newRounds,
  };
};

const tiltSouth = (platform: Platform): Platform => {
  const arr = platform.grid[0].map(() => platform.grid.length - 1);

  const { rounds } = platform;

  const newRounds = rounds
    .toSorted((rock1, rock2) => rock2.y - rock1.y)
    .map((rock) => {
      for (let { y } = rock; y <= arr[rock.x]; y += 1) {
        if (platform.grid[y][rock.x] === "#") {
          arr[rock.x] = y - 2;
          return { x: rock.x, y: y - 1 };
        }
      }
      arr[rock.x] -= 1;
      return { x: rock.x, y: arr[rock.x] + 1 };
    });

  return {
    ...platform,
    rounds: newRounds,
  };
};

const tiltEast = (platform: Platform): Platform => {
  const arr = platform.grid.map(() => platform.grid[0].length - 1);

  const { rounds } = platform;

  const newRounds = rounds
    .toSorted((rock1, rock2) => rock2.x - rock1.x)
    .map((rock) => {
      for (let { x } = rock; x <= arr[rock.y]; x += 1) {
        if (platform.grid[rock.y][x] === "#") {
          arr[rock.y] = x - 2;
          return { x: x - 1, y: rock.y };
        }
      }
      arr[rock.y] -= 1;
      return { x: arr[rock.y] + 1, y: rock.y };
    });

  return {
    ...platform,
    rounds: newRounds,
  };
};

const hash = (platform: Platform) =>
  platform.rounds.map((pos) => `${pos.x}_${pos.y}`).join();

const solvePartA = (input: string) => {
  const platform = parseInput(input);
  return tiltNorth(platform)
    .rounds.map(({ y }) => platform.grid.length - y)
    .reduce(add);
};
const solvePartB = (input: string) => {
  let current = parseInput(input);
  const platformHistory: Map<string, number> = new Map();

  let i = 0;

  while (!platformHistory.has(hash(current))) {
    platformHistory.set(hash(current), i);

    current = tiltNorth(current);
    current = tiltWest(current);
    current = tiltSouth(current);
    current = tiltEast(current);

    i += 1;
  }

  const cycleLength = i - platformHistory.get(hash(current))!;

  for (let _ = 0; _ < (1_000_000_000 - i) % cycleLength; _ += 1) {
    current = tiltNorth(current);
    current = tiltWest(current);
    current = tiltSouth(current);
    current = tiltEast(current);
  }

  return current.rounds.map(({ y }) => current.grid.length - y).reduce(add);
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
