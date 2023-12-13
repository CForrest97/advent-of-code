/* eslint-disable no-bitwise */
import { add, transpose } from "ramda";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Pattern = {
  rows: number[];
  cols: number[];
};

const rowToNumber = (row: string[]) =>
  row.reduce((curr, char) => (char === "#" ? (curr << 1) + 1 : curr << 1), 0);

const parsePatterns = (input: string): Pattern[] =>
  input.split("\n\n").map((pattern) => ({
    rows: pattern
      .split("\n")
      .map((row) => row.split(""))
      .map(rowToNumber),
    cols: transpose(pattern.split("\n").map((row) => row.split(""))).map(
      rowToNumber,
    ),
  }));

const isPowerOfTwo = (x: number) => Math.log2(x) % 1 === 0;
const is1BitDifferent = (x: number, y: number) => isPowerOfTwo(x ^ y);

const findReflection = (values: number[], requireSmudge: boolean) => {
  for (let i = 0; i < values.length - 1; i += 1) {
    let hasFoundSmudge = false;
    let before = i;
    let after = i + 1;

    while (
      values[before] === values[after] ||
      (requireSmudge && is1BitDifferent(values[before], values[after]))
    ) {
      if (values[before] !== values[after]) {
        if (hasFoundSmudge) return null;
        hasFoundSmudge = true;
      }

      before -= 1;
      after += 1;

      if (
        (!requireSmudge || hasFoundSmudge) &&
        (before === -1 || after === values.length)
      )
        return i;
    }
  }

  return null;
};

const summarisePattern = ({ rows, cols }: Pattern, findWithSmudge: boolean) => {
  const verticalReflection = findReflection(rows, findWithSmudge);
  if (verticalReflection !== null) return 100 * (verticalReflection + 1);

  const horizontalReflection = findReflection(cols, findWithSmudge);
  if (horizontalReflection !== null) return horizontalReflection + 1;

  throw new Error(`no reflection found for rows: ${rows}, cols: ${cols}`);
};

const solvePartA = (input: string) =>
  parsePatterns(input)
    .map((pattern) => summarisePattern(pattern, false))
    .reduce(add);
const solvePartB = (input: string) =>
  parsePatterns(input)
    .map((pattern) => summarisePattern(pattern, true))
    .reduce(add);

export const pointOfIncidence: Day = {
  day: 13,
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
