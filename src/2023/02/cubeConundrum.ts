import assert from "assert";
import { add } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Set = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  sets: Set[];
};

const parseSet = (setString: string): Set => {
  const redMatch = setString.match(/(\d+) red/);
  const blueMatch = setString.match(/(\d+) blue/);
  const greenMatch = setString.match(/(\d+) green/);

  return {
    red: redMatch ? parseNumber(redMatch[1]) : 0,
    green: greenMatch ? parseNumber(greenMatch[1]) : 0,
    blue: blueMatch ? parseNumber(blueMatch[1]) : 0,
  };
};

const parseGames = (gameString: string): Game[] =>
  parseLines(gameString).map((line) => {
    const match = line.match(/Game (\d+): (.*)/);
    assert(match, `cannot parse line: ${line}`);

    return {
      id: parseNumber(match[1]),
      sets: match[2].split("; ").map(parseSet),
    };
  });

const solvePartA = (input: string) =>
  parseGames(input)
    .filter((game) =>
      game.sets.every(
        (set) => set.red <= 12 && set.green <= 13 && set.blue <= 14,
      ),
    )
    .map((game) => game.id)
    .reduce(add);

const solvePartB = (input: string) =>
  parseGames(input)
    .map((game) => ({
      red: Math.max(...game.sets.map((set) => set.red)),
      green: Math.max(...game.sets.map((set) => set.green)),
      blue: Math.max(...game.sets.map((set) => set.blue)),
    }))
    .map((set) => set.red * set.green * set.blue)
    .reduce(add);

export const cubeConundrum: Day = {
  day: 2,
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
