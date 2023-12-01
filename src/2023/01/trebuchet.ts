import { add } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

const digitToNumber: Map<string, number> = new Map([
  ["1", 1],
  ["2", 2],
  ["3", 3],
  ["4", 4],
  ["5", 5],
  ["6", 6],
  ["7", 7],
  ["8", 8],
  ["9", 9],
]);

const wordToNumber: Map<string, number> = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

const readCalibrationValue = (
  stringToNumber: Map<string, number>,
  calibrationLine: string,
) => {
  const { number: firstNumber } = Array.from(stringToNumber.entries())
    .map(([s, number]) => ({ index: calibrationLine.indexOf(s), number }))
    .filter((match) => match.index !== -1)
    .sort((matchA, matchB) => matchA.index - matchB.index)[0];

  const { number: lastNumber } = Array.from(stringToNumber.entries())
    .map(([s, number]) => ({ index: calibrationLine.lastIndexOf(s), number }))
    .filter((match) => match.index !== -1)
    .sort((matchA, matchB) => matchB.index - matchA.index)[0];

  return parseNumber(`${firstNumber}${lastNumber}`);
};

const solvePartA = (calibrationDocument: string) =>
  parseLines(calibrationDocument)
    .map((line) => readCalibrationValue(digitToNumber, line))
    .reduce(add);

const solvePartB = (calibrationDocument: string) =>
  parseLines(calibrationDocument)
    .map((line) =>
      readCalibrationValue(new Map([...digitToNumber, ...wordToNumber]), line),
    )
    .reduce(add);

export const trebuchet: Day = {
  day: 1,
  year: 2023,
  partA: {
    getExampleInput: () => readInput(__dirname, "input/examplePartA"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartA,
  },
  partB: {
    getExampleInput: () => readInput(__dirname, "input/examplePartB"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartB,
  },
};
