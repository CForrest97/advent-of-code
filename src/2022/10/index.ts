import { join, map, repeat, times } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

const parseAdditions = (operations: string[]): number[] =>
  operations.flatMap((operation) =>
    operation === "noop" ? 0 : [0, parseNumber(operation.slice(5))]
  );

const countSignalStrength = (additions: number[]): number => {
  let registerXValue = 1;
  let signalStrength = 0;

  for (let cycle = 1; cycle < additions.length + 1; cycle += 1) {
    if (cycle % 40 === 20) {
      signalStrength += cycle * registerXValue;
    }

    registerXValue += additions[cycle - 1];
  }

  return signalStrength;
};

const drawScreen = (additions: number[]): string => {
  let registerXValue = 1;
  const screen: string[][] = times(() => repeat("", 40), 6);

  for (let cycle = 1; cycle < additions.length + 1; cycle += 1) {
    const col = (cycle - 1) % 40;
    const row = Math.floor((cycle - 1) / 40);

    const spritePositions = [
      registerXValue - 1,
      registerXValue,
      registerXValue + 1,
    ];

    screen[row][col] = spritePositions.includes(col) ? "#" : ".";
    registerXValue += additions[cycle - 1];
  }

  return join("\n", map(join(""), screen));
};

export const solvePart1 = (input: string) =>
  countSignalStrength(parseAdditions(parseLines(input)));
export const solvePart2 = (input: string) =>
  drawScreen(parseAdditions(parseLines(input)));
