import { multiply, zip } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Race = { time: number; recordDistance: number };

const parseRaces = (input: string): Race[] => {
  const [timesString, recordDistancesString] = parseLines(input);

  const times = [...timesString.matchAll(/\d+/g)];
  const recordDistances = [...recordDistancesString.matchAll(/\d+/g)];

  return zip(times, recordDistances).map(([time, recordDistance]) => ({
    time: parseNumber(time[0]),
    recordDistance: parseNumber(recordDistance[0]),
  }));
};

const parseSingleRace = (input: string): Race => {
  const [timesString, recordDistancesString] = parseLines(input);

  return {
    time: parseNumber(timesString.slice(5).replaceAll(" ", "")),
    recordDistance: parseNumber(
      recordDistancesString.slice(9).replaceAll(" ", ""),
    ),
  };
};

const calculateNumberOfWins = ({ time, recordDistance }: Race) => {
  const holdDuration = (time - Math.sqrt(time ** 2 - 4 * recordDistance)) / 2;
  return time - 2 * Math.floor(holdDuration) - 1;
};

const solvePartA = (input: string) =>
  parseRaces(input).map(calculateNumberOfWins).reduce(multiply);

const solvePartB = (input: string) =>
  calculateNumberOfWins(parseSingleRace(input));

export const waitForIt: Day = {
  day: 6,
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
