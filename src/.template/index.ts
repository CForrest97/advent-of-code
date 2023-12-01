import { readInput } from "../helpers/readInput";
import { Day } from "../helpers/types";

const parseInput = (input: string) => input;

const solve = (input: string) => input.length;

const solvePartA = (input: string) => solve(parseInput(input));
const solvePartB = (input: string) => solve(parseInput(input));

export const day: Day = {
  day: 0,
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
