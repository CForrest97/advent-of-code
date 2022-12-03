import { compose, intersection, map, splitEvery, sum } from "ramda";
import { parseLines } from "../../helpers/parsers";

const toCharArray = (s: string) => s.split("");

const parseRucksack = (rucksack: string[]): string[][] => [
  rucksack.slice(0, rucksack.length / 2),
  rucksack.slice(rucksack.length / 2),
];

const toPriority = (char: string): number => {
  const charCode = char.charCodeAt(0);
  return char.toLowerCase() === char ? charCode - 96 : charCode - 64 + 26;
};

const findIntersection = (lists: string[][]): number =>
  toPriority(lists.reduce(intersection)[0]);

export const solvePart1 = compose(
  sum,
  map(findIntersection),
  map(parseRucksack),
  map(toCharArray),
  parseLines
);
export const solvePart2 = compose(
  sum,
  map(findIntersection),
  splitEvery(3),
  map(toCharArray),
  parseLines
);
