import { min, splitEvery } from "ramda";
import { parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type RangedMap = {
  from: [number, number];
  to: [number, number];
  change: number;
}[];
type ParsedInput = { seeds: number[]; rangedMaps: RangedMap[] };

const parseInput = (input: string): ParsedInput => {
  const [seedsLine, ...rest] = input.split("\n\n");
  const seeds = seedsLine.slice(7).split(" ").map(parseNumber);

  const rangedMaps: RangedMap[] = rest.map((block) => {
    const [, ...rangedMapStrings] = block.split("\n");
    return rangedMapStrings.map((line) => {
      const [destination, startSource, rangeLength] = line
        .split(" ")
        .map(parseNumber);

      return {
        from: [startSource, startSource + rangeLength - 1],
        to: [
          startSource + destination - startSource,
          startSource + rangeLength - 1 + destination - startSource,
        ],
        change: destination - startSource,
      };
    });
  });

  return { seeds, rangedMaps };
};

const mapTo = (value: number, rangedMap: RangedMap): number => {
  const range2 = rangedMap.find(
    ({ from }) => value >= from[0] && value <= from[1],
  );
  return range2 ? range2.change + value : value;
};

const solvePartA = (input: string) => {
  const { seeds, rangedMaps } = parseInput(input);
  return seeds.map((seed) => rangedMaps.reduce(mapTo, seed)).reduce(min);
};

const getCandidates = (rangedMap: RangedMap): number[] =>
  rangedMap.flatMap(({ from, to, change }) => [
    from[0] - 1 + change,
    from[0] + change,
    from[1] - 1 + change,
    from[1] + change,
    to[0] - 1 + change,
    to[0] + change,
    to[1] - 1 + change,
    to[1] + change,
  ]);

const reverseMap = (value: number, rangedMap: RangedMap): number[] => {
  const fromRange = rangedMap.find(
    ({ from }) => value >= from[0] && value <= from[1],
  );
  const toRange = rangedMap.find(({ to }) => value >= to[0] && value <= to[1]);

  const arr = [];

  if (!fromRange) arr.push(value);
  if (toRange) arr.push(value - toRange.change);

  return arr;
};

const solvePartB = (input: string) => {
  const { seeds, rangedMaps } = parseInput(input);

  const seedRanges = splitEvery(2, seeds);
  const isValidSeed = (seed: number) =>
    seedRanges.some(([from, size]) => seed >= from && seed < from + size);

  const seedMap: RangedMap = seedRanges.map(([from, size]) => ({
    from: [from, from + size - 1],
    to: [from, from + size - 1],
    change: 0,
  }));

  const candidateSeeds = [seedMap, ...rangedMaps].reduceRight(
    (currentCandidates, map) => [
      ...getCandidates(map),
      ...new Set([
        ...currentCandidates.flatMap((seed) => reverseMap(seed, map)),
      ]),
    ],
    [] as number[],
  );

  return candidateSeeds
    .filter(isValidSeed)
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
