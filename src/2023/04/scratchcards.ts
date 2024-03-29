import { add, intersection, prepend } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Card = { numbers: number[]; winners: number[] };

const parseCards = (input: string): Card[] =>
  parseLines(input)
    .map((line) => line.split(": ")[1].replaceAll("  ", " ").split(" | "))
    .map(([numbersString, winsString]) => ({
      numbers: numbersString.split(" ").map(parseNumber),
      winners: winsString.split(" ").map(parseNumber),
    }));

const countWins = (card: Card) =>
  intersection(card.numbers, card.winners).length;

const solvePartA = (input: string) =>
  parseCards(input)
    .map(countWins)
    .map((wins) => (wins === 0 ? 0 : 2 ** (wins - 1)))
    .reduce(add);

const solvePartB = (input: string) =>
  parseCards(input)
    .map(countWins)
    .reduceRight(
      (totals, wins) => prepend(totals.slice(0, wins).reduce(add, 1), totals),
      [] as number[],
    )
    .reduce(add);

export const scratchcards: Day = {
  day: 4,
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
