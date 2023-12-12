import { add, repeat } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Spring = "?" | "." | "#";
type ParsedRow = { springs: Spring[]; groups: number[] };

const parseInput = (input: string): ParsedRow[] =>
  parseLines(input).map((row) => {
    const [springs, groups] = row.split(" ");

    return {
      springs: springs.split("") as Spring[],
      groups: groups.split(",").map(parseNumber),
    };
  });

const isEnoughSpaceForBroken = (
  springs: Spring[],
  groups: number[],
  springIndex: number,
  groupIndex: number,
) => {
  let groupsSum = groups.length - groupIndex - 1;

  for (let i = groupIndex; i < groups.length; i += 1) groupsSum += groups[i];

  return groupsSum <= springs.length - springIndex;
};

const onlyOperationalRemaining = (springs: Spring[], springIndex: number) => {
  for (let i = springIndex; i < springs.length; i += 1)
    if (springs[i] === "#") return false;

  return true;
};

const isStartOfContiguousBroken = (
  springs: Spring[],
  groups: number[],
  springIndex: number,
  groupIndex: number,
) => {
  if (
    springIndex + groups[groupIndex] > springs.length ||
    !(springs[springIndex + groups[groupIndex]] !== "#")
  )
    return false;

  for (let i = 0; i < groups[groupIndex]; i += 1)
    if (springs[springIndex + i] === ".") return false;

  return true;
};

const countArrangements = ({ springs, groups }: ParsedRow) => {
  const cache: Map<number, number> = new Map();

  const memCountArrangements = (springIndex: number, groupIndex: number) => {
    const key = springIndex * (groups.length + 1) + groupIndex;

    const cachedValue = cache.get(key);
    if (cachedValue !== undefined) return cachedValue;

    let value = 0;

    if (springIndex === springs.length) {
      value = groupIndex === groups.length ? 1 : 0;
    } else if (groupIndex === groups.length) {
      value = onlyOperationalRemaining(springs, springIndex) ? 1 : 0;
    } else if (
      !isEnoughSpaceForBroken(springs, groups, springIndex, groupIndex)
    ) {
      value = 0;
    } else if (springs[springIndex] === ".") {
      value = memCountArrangements(springIndex + 1, groupIndex);
    } else {
      if (isStartOfContiguousBroken(springs, groups, springIndex, groupIndex)) {
        value = memCountArrangements(
          springIndex + groups[groupIndex] + 1,
          groupIndex + 1,
        );
      }

      if (springs[springIndex] === "?") {
        value += memCountArrangements(springIndex + 1, groupIndex);
      }
    }

    cache.set(key, value);
    return value;
  };

  return memCountArrangements(0, 0);
};

const unfold = ({ springs, groups }: ParsedRow): ParsedRow => ({
  springs: repeat(springs.join(""), 5).join("?").split("") as Spring[],
  groups: repeat(groups, 5).flat(),
});

const solvePartA = (input: string) =>
  parseInput(input).map(countArrangements).reduce(add);

const solvePartB = (input: string) =>
  parseInput(input).map(unfold).map(countArrangements).reduce(add);

export const hotSprings: Day = {
  day: 12,
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
