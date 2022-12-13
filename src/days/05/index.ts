import assert from "assert";
import { compose, head, join, map, times } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

type Instruction = {
  count: number;
  from: number;
  to: number;
};

const parseStacks = (input: string): string[][] => {
  const lines = parseLines(input);

  const width = lines
    .map((line) => line.length)
    .reduce((a, b) => Math.max(a, b));

  const numberOfStacks = (width + 1) / 4;
  const stacks: string[][] = times(() => [], numberOfStacks);

  lines.forEach((line) => {
    stacks.forEach((stack, index) => {
      const char = line.charAt(4 * index + 1);
      if (char !== " ") stack.push(char);
    });
  });

  return stacks;
};

const parseInstructions = (input: string): Instruction[] => {
  const lines = parseLines(input);
  return lines.map((line) => {
    const match = line.match(/move (\d+) from (\d+) to (\d+)/);
    assert(match, `cannot parse line: ${line}`);

    return {
      count: parseNumber(match[1]),
      from: parseNumber(match[2]) - 1,
      to: parseNumber(match[3]) - 1,
    };
  });
};

const rearrangeCrates = (
  stacks: string[][],
  instructions: Instruction[],
  is9001: boolean
): string => {
  instructions.forEach(({ count, from, to }) => {
    const moving = [];
    for (let i = 0; i < count; i += 1) moving.push(stacks[from].shift()!);

    if (is9001) moving.reverse();

    moving.forEach((char) => {
      stacks[to].unshift(char);
    });
  });

  return compose(join(""), map(head))(stacks);
};

export const solvePart1 = (input: string) => {
  const [stacks, instructions] = input.split("\n\n");

  return rearrangeCrates(
    parseStacks(stacks),
    parseInstructions(instructions.trim()),
    false
  );
};
export const solvePart2 = (input: string) => {
  const [stacks, instructions] = input.split("\n\n");

  return rearrangeCrates(
    parseStacks(stacks),
    parseInstructions(instructions.trim()),
    true
  );
};
