import { compose, intersection, map, split, splitAt, splitEvery, sum } from "ramda";
import { parseLines } from "../../helpers/parsers";

const toCompartments = (rucksack: string[]): string[][] =>
  splitAt(rucksack.length / 2, rucksack);

const toPriority = (char: string): number =>
  char.charCodeAt(0) - (char.toLowerCase() === char ? 96 : 38);

const findFirstIntersection = (lists: string[][]): string =>
  lists.reduce(intersection)[0];

export const solvePart1 = compose(
  sum,
  map(compose(toPriority, findFirstIntersection, toCompartments, toCharArray)),
  parseLines
);
export const solvePart2 = compose(
  sum,
  map(compose(toPriority, findFirstIntersection)),
  splitEvery(3),
  map(split("")),
  parseLines
);
