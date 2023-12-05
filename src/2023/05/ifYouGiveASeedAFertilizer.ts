import { min, splitEvery } from "ramda";
import { parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type RangedMap = { from: [number, number]; change: number }[];
type ParsedInput = { seeds: number[]; rangedMaps: RangedMap[] };

const parseInput = (input: string): ParsedInput => {
  const [seedsLine, ...maps] = input.split("\n\n");
  return {
    seeds: seedsLine.slice(7).split(" ").map(parseNumber),
    rangedMaps: maps.map((map) =>
      map
        .split("\n")
        .slice(0)
        .map((line) => line.split(" ").map(parseNumber))
        .map(([destination, startSource, rangeLength]) => ({
          from: [startSource, startSource + rangeLength - 1],
          change: destination - startSource,
        })),
    ),
  };
};

const mapTo = (value: number, rangedMap: RangedMap): number => {
  const range = rangedMap.find(
    ({ from }) => value >= from[0] && value <= from[1],
  );
  return range ? range.change + value : value;
};

const solvePartA = (input: string) => {
  const { seeds, rangedMaps } = parseInput(input);
  return seeds.map((seed) => rangedMaps.reduce(mapTo, seed)).reduce(min);
};

const reverseMapTo = (value: number, rangedMap: RangedMap): number[] =>
  [value, ...rangedMap.map(({ change }) => value - change)].filter(
    (fromValue) => mapTo(fromValue, rangedMap) === value,
  );

const solvePartB = (input: string) => {
  const { seeds, rangedMaps } = parseInput(input);
  const seedRanges = splitEvery(2, seeds);
  const isSeed = (value: number) =>
    seedRanges.some(([from, size]) => value >= from && value < from + size);

  return rangedMaps
    .reduceRight(
      (current: number[], rangedMap) => [
        ...rangedMap.map(({ from }) => from[0]),
        ...new Set(current.flatMap((seed) => reverseMapTo(seed, rangedMap))),
      ],
      [],
    )
    .filter(isSeed)
    .concat(seedRanges.map(([from]) => from))
    .map((seed) => rangedMaps.reduce(mapTo, seed))
    .reduce(min);
};

export const ifYouGiveASeedAFertilizer: Day = {
  day: 5,
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
