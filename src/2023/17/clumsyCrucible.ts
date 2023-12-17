/* eslint-disable no-continue */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { Position } from "../../helpers/Position";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Direction = "north" | "east" | "south" | "west";

const parseInput = (input: string) =>
  parseLines(input).map((row) => row.split("").map(parseNumber));

const directions: Record<Direction, [Direction, Direction]> = {
  north: ["west", "east"],
  east: ["north", "south"],
  south: ["east", "west"],
  west: ["south", "north"],
};

const steps: Record<Direction, Position> = {
  north: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  south: { x: 0, y: 1 },
  west: { x: -1, y: 0 },
};

const isValid = ({ x, y }: Position, heatLosses: number[][]) =>
  y >= 0 && y < heatLosses.length && x >= 0 && x < heatLosses[0].length;

type State = {
  position: Position;
  direction: Direction;
  stepCount: number;
  heatLoss: number;
};

type Plane = "horizontal" | "vertical";
const directionToPlane: Record<Direction, Plane> = {
  north: "vertical",
  east: "horizontal",
  south: "vertical",
  west: "horizontal",
};

const findMinimumHeatLoss = (
  heatLosses: number[][],
  minStepCount: number,
  maxStepCount: number,
): number => {
  const cache: Record<Plane, number[]>[][] = heatLosses.map((row) =>
    row.map(() => ({
      horizontal: Array.from({ length: maxStepCount }, () => Infinity),
      vertical: Array.from({ length: maxStepCount }, () => Infinity),
    })),
  );

  const queue = new MinPriorityQueue<State>((state) => state.heatLoss);
  queue.enqueue({
    position: { x: 0, y: 0 },
    direction: "east",
    heatLoss: 0,
    stepCount: 0,
  });
  queue.enqueue({
    position: { x: 0, y: 0 },
    direction: "south",
    heatLoss: 0,
    stepCount: 0,
  });

  let min = Infinity;

  while (true) {
    const {
      position: { x, y },
      direction,
      heatLoss,
      stepCount,
    } = queue.dequeue();

    if (cache[y][x][directionToPlane[direction]][stepCount] <= heatLoss)
      continue;
    if (heatLoss >= min) return min;

    cache[y][x][directionToPlane[direction]][stepCount] = heatLoss;

    if (
      y === heatLosses.length - 1 &&
      x === heatLosses[0].length - 1 &&
      stepCount >= minStepCount
    ) {
      min = Math.min(min, heatLoss);
    }

    if (stepCount >= minStepCount) {
      directions[direction].forEach((newDirection) => {
        const newPosition: Position = {
          x: x + steps[newDirection].x,
          y: y + steps[newDirection].y,
        };

        if (isValid(newPosition, heatLosses)) {
          queue.enqueue({
            position: newPosition,
            direction: newDirection,
            heatLoss: heatLoss + heatLosses[newPosition.y][newPosition.x],
            stepCount: 1,
          });
        }
      });
    }

    if (stepCount < maxStepCount) {
      const newPosition: Position = {
        x: x + steps[direction].x,
        y: y + steps[direction].y,
      };
      if (isValid(newPosition, heatLosses)) {
        queue.enqueue({
          position: newPosition,
          direction,
          heatLoss: heatLoss + heatLosses[newPosition.y][newPosition.x],
          stepCount: 1 + stepCount,
        });
      }
    }
  }
};

const solvePartA = (input: string) =>
  findMinimumHeatLoss(parseInput(input), 0, 3);
const solvePartB = (input: string) =>
  findMinimumHeatLoss(parseInput(input), 4, 10);

export const clumsyCrucible: Day = {
  day: 17,
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
