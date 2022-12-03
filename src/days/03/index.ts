import { add, compose, intersection, splitEvery } from "ramda";
import { parseLines } from "../../helpers/parsers";

type Rucksack = [string[], string[]];
type Group = [string[], string[], string[]];

const parseRucksacks = (rucksacks: string): Rucksack[] =>
  parseLines(rucksacks).map((rucksack) => [
    rucksack.slice(0, rucksack.length / 2).split(""),
    rucksack.slice(rucksack.length / 2).split(""),
  ]);

const parseGroups = (input: string): Group[] =>
  splitEvery(
    3,
    parseLines(input).map((s) => s.split(""))
  ) as Group[];

const toPriority = (char: string): number => {
  const charCode = char.charCodeAt(0);
  if (char.toLowerCase() === char) return charCode - 96;
  return charCode - 64 + 26;
};

const findIntersection = (lists: string[][]): number =>
  toPriority(lists.reduce(intersection)[0]);

const sumErrors = (rucksacks: Rucksack[]) =>
  rucksacks.map(findIntersection).reduce(add);
const sumBadges = (groups: Group[]) => groups.map(findIntersection).reduce(add);

export const solvePart1 = compose(sumErrors, parseRucksacks);
export const solvePart2 = compose(sumBadges, parseGroups);
