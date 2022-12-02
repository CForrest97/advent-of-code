import { add } from "ramda";
import { parseLines } from "../../helpers/parsers";

type Game = `${"A" | "B" | "C"} ${"X" | "Y" | "Z"}`;

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const LOSS = 0;
const DRAW = 3;
const WIN = 6;

const strategy1: Record<Game, number> = {
  "A X": ROCK + DRAW,
  "B X": ROCK + LOSS,
  "C X": ROCK + WIN,
  "A Y": PAPER + WIN,
  "B Y": PAPER + DRAW,
  "C Y": PAPER + LOSS,
  "A Z": SCISSORS + LOSS,
  "B Z": SCISSORS + WIN,
  "C Z": SCISSORS + DRAW,
};
const strategy2: Record<Game, number> = {
  "A X": SCISSORS + LOSS,
  "B X": ROCK + LOSS,
  "C X": PAPER + LOSS,
  "A Y": ROCK + DRAW,
  "B Y": PAPER + DRAW,
  "C Y": SCISSORS + DRAW,
  "A Z": PAPER + WIN,
  "B Z": SCISSORS + WIN,
  "C Z": ROCK + WIN,
};

export const solvePart1 = (input: string) =>
  parseLines(input)
    .map((game) => strategy1[game as Game])
    .reduce(add);

export const solvePart2 = (input: string) =>
  parseLines(input)
    .map((game) => strategy2[game as Game])
    .reduce(add);
