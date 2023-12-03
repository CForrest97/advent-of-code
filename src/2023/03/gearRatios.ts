import { add } from "ramda";
import { Position } from "../../helpers/Position";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Engine = string[][];
type PartNumber = { value: number; positions: Position[] };
type Gear = [PartNumber, PartNumber];

const isDigit = (char: string) => char.match(/\d/);
const isSymbol = (char: string) => !isDigit(char) && char !== ".";
const isNear = ({ x: x1, y: y1 }: Position, { x: x2, y: y2 }: Position) =>
  Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;

const getSymbols = (engine: Engine) =>
  engine
    .flat()
    .map((_, i) => ({
      x: i % engine.length,
      y: Math.floor(i / engine.length),
    }))
    .filter(({ x, y }) => isSymbol(engine[y][x]));

const getPartNumbers = (engine: Engine) =>
  engine.flatMap((row, y) =>
    row.reduce((curr, char, x) => {
      if (!isDigit(char)) return curr;
      const currentPartNumber = curr.at(-1);

      if (currentPartNumber && currentPartNumber.positions.at(-1)!.x === x - 1)
        return [
          ...curr.slice(0, -1),
          {
            value: currentPartNumber.value * 10 + parseNumber(char),
            positions: [...currentPartNumber.positions, { x, y }],
          },
        ];

      return [...curr, { value: parseNumber(char), positions: [{ x, y }] }];
    }, [] as PartNumber[]),
  );

const solvePartA = (input: string) => {
  const engine = parseLines(input).map((line) => line.split(""));
  const symbols = getSymbols(engine);
  const partNumbers = getPartNumbers(engine);

  return partNumbers
    .filter((partNumber) =>
      partNumber.positions.some((position) =>
        symbols.some((symbol) => isNear(symbol, position)),
      ),
    )
    .map((partNumber) => partNumber.value)
    .reduce(add);
};

const solvePartB = (input: string) => {
  const engine = parseLines(input).map((line) => line.split(""));
  const symbols = getSymbols(engine);
  const partNumbers = getPartNumbers(engine);

  const gears: Gear[] = symbols
    .filter((symbol) => engine[symbol.y][symbol.x] === "*")
    .map((symbol) =>
      partNumbers.filter(({ positions }) =>
        positions.some((position) => isNear(position, symbol)),
      ),
    )
    .filter((gear): gear is Gear => gear.length === 2);

  return gears
    .map(([partNumber1, partNumber2]) => partNumber1.value * partNumber2.value)
    .reduce(add);
};

export const gearRatios: Day = {
  day: 3,
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
