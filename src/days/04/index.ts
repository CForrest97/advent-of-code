import { compose, map, split, count } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

const parseInput = compose(
  map(map(compose(map(parseNumber), split("-")))),
  map(split(",")),
  parseLines
);

const isSubset = (assignment1: number[], assignment2: number[]): boolean =>
  assignment1[0] >= assignment2[0] && assignment1[1] <= assignment2[1];

const isOverlapping = (assignment1: number[], assignment2: number[]): boolean =>
  assignment1[0] >= assignment2[0] && assignment1[0] <= assignment2[1];

const countSubsets = (lists: number[][][]) =>
  count(
    (pair: number[][]) =>
      isSubset(pair[0], pair[1]) || isSubset(pair[1], pair[0]),
    lists
  );
const countOverlapping = (lists: number[][][]) =>
  count(
    (pair: number[][]) =>
      isOverlapping(pair[0], pair[1]) || isOverlapping(pair[1], pair[0]),
    lists
  );

export const solvePart1 = compose(countSubsets, parseInput);
export const solvePart2 = compose(countOverlapping, parseInput);
