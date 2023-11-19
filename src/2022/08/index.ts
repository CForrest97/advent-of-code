import { count, map, sum } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

const parseInput = (input: string): number[][] =>
  parseLines(input).map((row) => row.split("").map((c) => parseNumber(c)));

const solve = (trees: number[][]) => {
  const visibleTrees = trees.map((row) => row.map(() => false));

  for (let y = 0; y < visibleTrees.length; y += 1) {
    let max = -1;
    for (let x = 0; x < visibleTrees[y].length; x += 1) {
      if (trees[y][x] > max) {
        max = trees[y][x];
        visibleTrees[y][x] = true;
      }
    }
  }

  for (let x = 0; x < visibleTrees[0].length; x += 1) {
    let max = -1;
    for (let y = 0; y < visibleTrees.length; y += 1) {
      if (trees[y][x] > max) {
        max = trees[y][x];
        visibleTrees[y][x] = true;
      }
    }
  }
  for (let y = visibleTrees.length - 1; y >= 0; y -= 1) {
    let max = -1;
    for (let x = visibleTrees[0].length - 1; x >= 0; x -= 1) {
      if (trees[y][x] > max) {
        max = trees[y][x];
        visibleTrees[y][x] = true;
      }
    }
  }

  for (let x = visibleTrees[0].length - 1; x >= 0; x -= 1) {
    let max = -1;
    for (let y = visibleTrees.length - 1; y >= 0; y -= 1) {
      if (trees[y][x] > max) {
        max = trees[y][x];
        visibleTrees[y][x] = true;
      }
    }
  }

  return sum(map((row) => count(Boolean, row), visibleTrees));
};

const evaluateTree = (trees: number[][], x: number, y: number): number => {
  let above = 0;
  let below = 0;
  let left = 0;
  let right = 0;

  let currX = x + 1;
  let currY = y;
  const height = trees[y][x];

  while (currX < trees[y].length) {
    right += 1;
    if (trees[currY][currX] >= height) {
      break;
    }
    currX += 1;
  }
  currX = x - 1;
  currY = y;
  while (currX >= 0) {
    left += 1;
    if (trees[currY][currX] >= height) break;
    currX -= 1;
  }
  currX = x;
  currY = y + 1;
  while (currY < trees.length) {
    below += 1;
    if (trees[currY][currX] >= height) break;
    currY += 1;
  }
  currX = x;
  currY = y - 1;
  while (currY >= 0) {
    above += 1;
    if (trees[currY][currX] >= height) break;
    currY -= 1;
  }

  return above * below * left * right;
};

const solve2 = (trees: number[][]): number => {
  evaluateTree(trees, 2, 3);
  let max = 0;

  trees.forEach((row, y) => {
    row.forEach((_, x) => {
      max = Math.max(max, evaluateTree(trees, x, y));
    });
  });

  return max;
};

export const solvePart1 = (input: string) => solve(parseInput(input));
export const solvePart2 = (input: string) => solve2(parseInput(input));
