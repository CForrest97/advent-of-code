import { last, transpose } from "ramda";
import { Position } from "../../helpers/Position";
import { parseLines } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Galaxy = { position: Position; emptyToLeft: number; emptyAbove: number };

const parseGalaxies = (input: string): Galaxy[] => {
  const chars = parseLines(input).map((row) => row.split(""));

  const emptyAbove = chars
    .map((row) => (row.includes("#") ? 0 : 1))
    .reduce((curr, v) => [...curr, (last(curr) ?? 0) + v], [] as number[]);

  const emptyToLeft = transpose(chars)
    .map((col) => (col.includes("#") ? 0 : 1))
    .reduce((curr, v) => [...curr, (last(curr) ?? 0) + v], [] as number[]);

  return chars
    .flatMap((row, y) => row.map((_, x) => ({ x, y })))
    .filter(({ x, y }) => chars[y][x] === "#")
    .map((position) => ({
      position,
      emptyToLeft: emptyToLeft[position.x],
      emptyAbove: emptyAbove[position.y],
    }));
};

const calculateDistance = (
  galaxy1: Galaxy,
  galaxy2: Galaxy,
  expansionRate: number,
) =>
  Math.abs(galaxy1.position.x - galaxy2.position.x) +
  Math.abs(galaxy1.position.y - galaxy2.position.y) +
  (expansionRate - 1) * Math.abs(galaxy2.emptyToLeft - galaxy1.emptyToLeft) +
  (expansionRate - 1) * Math.abs(galaxy2.emptyAbove - galaxy1.emptyAbove);

const sumDistances = (galaxies: Galaxy[], expansionRate: number) => {
  let distance = 0;

  for (let i = 0; i < galaxies.length; i += 1)
    for (let j = i + 1; j < galaxies.length; j += 1)
      distance += calculateDistance(galaxies[i], galaxies[j], expansionRate);

  return distance;
};

const solvePartA = (input: string) => sumDistances(parseGalaxies(input), 2);
const solvePartB = (input: string) =>
  sumDistances(parseGalaxies(input), 1_000_000);

export const cosmicExpansion: Day = {
  day: 11,
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
