import { readInput } from "../helpers/readInput";
import { Day } from "../helpers/types";

const parseInput = (input: string) => input;

const solve = (input: string) => input.length;

const solvePart1 = (input: string) => solve(parseInput(input));
const solvePart2 = (input: string) => solve(parseInput(input));

export const day: Day = {
  day: 0,
  year: 2023,
  getSimpleInput: () => readInput(__dirname, "simpleInput"),
  getPuzzleInput: () => readInput(__dirname, "puzzleInput"),
  solvePart1,
  solvePart2,
};
