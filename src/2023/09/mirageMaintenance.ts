import { add } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

const parseInput = (input: string): number[][] =>
  parseLines(input).map((line) => line.split(" ").map(parseNumber));

const getNextValue = (history: number[]): number =>
  history.every((value) => value === 0)
    ? 0
    : history.at(-1)! +
      getNextValue(
        history.slice(1).map((value, index) => value - history[index]),
      );

const getPreviousValue = (history: number[]): number =>
  history.every((value) => value === 0)
    ? 0
    : history.at(0)! -
      getPreviousValue(
        history.slice(1).map((value, index) => value - history[index]),
      );

const solvePartA = (input: string) =>
  parseInput(input).map(getNextValue).reduce(add);

const solvePartB = (input: string) =>
  parseInput(input).map(getPreviousValue).reduce(add);

export const mirageMaintenance: Day = {
  day: 9,
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
