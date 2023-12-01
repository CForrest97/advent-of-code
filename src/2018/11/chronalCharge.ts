import { Position } from "../../helpers/Position";
import { Day } from "../../helpers/types";

const calculatePowerLevel = (
  { x, y }: Position,
  gridSerialNumber: number,
): number => {
  const rackId = x + 1 + 10;
  const power = (rackId * (y + 1) + gridSerialNumber) * rackId;
  const hundredsValue = ((power % 1000) - (power % 100)) / 100;

  return hundredsValue - 5;
};

const calculateMaxFixedGrid = (gridSerialNumber: number) => {
  const fuelCells = Array.from({ length: 300 }, (_, y) =>
    Array.from({ length: 300 }, (__, x) =>
      calculatePowerLevel({ x, y }, gridSerialNumber),
    ),
  );

  const size = 3;
  let maxPowerLevel = -Infinity;
  let position: Position = { x: -1, y: -1 };

  for (let y = 0; y <= fuelCells.length - size; y += 1) {
    for (let x = 0; x <= fuelCells[y].length - size; x += 1) {
      let powerLevel = 0;

      for (let yDiff = 0; yDiff < size; yDiff += 1)
        for (let xDiff = 0; xDiff < size; xDiff += 1)
          powerLevel += fuelCells[y + yDiff][x + xDiff];

      if (powerLevel > maxPowerLevel) {
        position = { x, y };
        maxPowerLevel = powerLevel;
      }

      maxPowerLevel = Math.max(maxPowerLevel, powerLevel);
    }
  }

  return `${position.x + 1},${position.y + 1}`;
};

const calculateMaxVariableGrid = (gridSerialNumber: number) => {
  const gridSize = 300;
  const maxSquareSize = 20;
  const sumsToRightAndBelow = Array.from({ length: gridSize }, (_, y) =>
    Array.from({ length: gridSize }, (__, x) =>
      calculatePowerLevel({ x, y }, gridSerialNumber),
    ),
  );

  for (let diff = gridSize - 2; diff >= 0; diff -= 1) {
    sumsToRightAndBelow[diff][gridSize - 1] +=
      sumsToRightAndBelow[diff + 1][gridSize - 1];
    sumsToRightAndBelow[gridSize - 1][diff] +=
      sumsToRightAndBelow[gridSize - 1][diff + 1];
  }

  for (let y = gridSize - 2; y >= 0; y -= 1)
    for (let x = gridSize - 2; x >= 0; x -= 1)
      sumsToRightAndBelow[y][x] +=
        sumsToRightAndBelow[y + 1][x] +
        sumsToRightAndBelow[y][x + 1] -
        sumsToRightAndBelow[y + 1][x + 1];

  let maxPowerLevel = -Infinity;
  let bestPosition: Position = { x: -1, y: -1 };
  let bestSize = -1;

  for (let y = 0; y < gridSize; y += 1)
    for (let x = 0; x < gridSize; x += 1)
      for (
        let size = 1;
        size < Math.min(maxSquareSize, gridSize - x, gridSize - y);
        size += 1
      ) {
        const powerLevel =
          sumsToRightAndBelow[y][x] -
          sumsToRightAndBelow[y + size][x] -
          sumsToRightAndBelow[y][x + size] +
          sumsToRightAndBelow[y + size][x + size];

        if (powerLevel > maxPowerLevel) {
          bestPosition = { x, y };
          maxPowerLevel = powerLevel;
          bestSize = size;
        }
      }

  return `${bestPosition.x + 1},${bestPosition.y + 1},${bestSize}`;
};

const solvePartA = (gridSerialNumber: number) =>
  calculateMaxFixedGrid(gridSerialNumber);
const solvePartB = (gridSerialNumber: number) =>
  calculateMaxVariableGrid(gridSerialNumber);

export const chronalCharge: Day<number, string> = {
  day: 11,
  year: 2018,
  partA: {
    getExampleInput: async () => 42,
    getPuzzleInput: async () => 1309,
    solve: solvePartA,
  },
  partB: {
    getExampleInput: async () => 42,
    getPuzzleInput: async () => 1309,
    solve: solvePartB,
  },
};
