/* eslint-disable no-loop-func */
import { compose } from "ramda";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Graph = Record<string, { left: string; right: string }>;
type ParsedInput = { instructions: ("left" | "right")[]; graph: Graph };

const parseInput = (input: string): ParsedInput => {
  const [instructions, , ...graphString] = input.split("\n");
  const graph: Graph = {};

  graphString.forEach((s) => {
    graph[s.slice(0, 3)] = { left: s.slice(7, 10), right: s.slice(12, 15) };
  });

  return {
    instructions: instructions
      .split("")
      .map((char) => (char === "L" ? "left" : "right")),
    graph,
  };
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const countSteps = (
  { graph, instructions }: ParsedInput,
  startNode: string,
  isEnd: (node: string) => boolean,
) => {
  let currentPosition = startNode;
  let steps = 0;

  while (!isEnd(currentPosition)) {
    instructions.forEach((instruction) => {
      currentPosition = graph[currentPosition][instruction];
    });
    steps += instructions.length;
  }

  return steps;
};

const solvePartA = (input: ParsedInput) =>
  countSteps(input, "AAA", (node) => node === "ZZZ");

const solvePartB = (input: ParsedInput) =>
  Object.keys(input.graph)
    .filter((node) => node.endsWith("A"))
    .map((startNode) =>
      countSteps(input, startNode, (node) => node.endsWith("Z")),
    )
    .reduce(lcm);

export const hauntedWasteland: Day = {
  day: 8,
  year: 2023,
  partA: {
    getExampleInput: () => readInput(__dirname, "input/examplePartA"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: compose(solvePartA, parseInput),
  },
  partB: {
    getExampleInput: () => readInput(__dirname, "input/examplePartB"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: compose(solvePartB, parseInput),
  },
};
