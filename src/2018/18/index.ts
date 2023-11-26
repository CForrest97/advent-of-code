import { add, count } from "ramda";
import { Position } from "../../helpers/Position";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Tile = "wall" | "rest" | "flowing";

type ResevoirRepository = {
  get: (position: Position) => Tile | null;
  set: (position: Position, tile: Tile) => void;
  getWater: (includeFlowing: boolean) => number;
};

const getBelow = ({ x, y }: Position): Position => ({ x, y: y + 1 });

type HorizontalVein = {
  type: "horizontal";
  minX: number;
  maxX: number;
  y: number;
};

type VertivalVein = {
  type: "vertical";
  x: number;
  minY: number;
  maxY: number;
};

type Vein = HorizontalVein | VertivalVein;

const parseInput = (input: string): ResevoirRepository => {
  const lines = parseLines(input);

  const veins: Vein[] = lines.map((line) => {
    const verticalMatch = line.match(/x=(\d+), y=(\d+)..(\d+)/);
    const horizontalMatch = line.match(/y=(\d+), x=(\d+)..(\d+)/);

    if (verticalMatch) {
      const [, xString, yString1, yString2] = verticalMatch;
      return {
        type: "vertical",
        x: parseNumber(xString),
        minY: Math.min(parseNumber(yString1), parseNumber(yString2)),
        maxY: Math.max(parseNumber(yString1), parseNumber(yString2)),
      };
    }

    if (horizontalMatch) {
      const [, yString, xString1, xString2] = horizontalMatch;
      return {
        type: "horizontal",
        minX: Math.min(parseNumber(xString1), parseNumber(xString2)),
        maxX: Math.max(parseNumber(xString1), parseNumber(xString2)),
        y: parseNumber(yString),
      };
    }

    throw new Error(`failed to parse line ${line}`);
  });

  const minX = Math.min(
    ...veins.map((vein) => (vein.type === "horizontal" ? vein.minX : vein.x)),
  );

  const maxX = Math.max(
    ...veins.map((vein) => (vein.type === "horizontal" ? vein.maxX : vein.x)),
  );

  const minY = Math.min(
    ...veins.map((vein) => (vein.type === "vertical" ? vein.minY : vein.y)),
  );

  const maxY = Math.max(
    ...veins.map((vein) => (vein.type === "vertical" ? vein.maxY : vein.y)),
  );

  const arr: (Tile | null)[][] = Array.from({ length: maxY + 2 }, () =>
    Array.from({ length: maxX - minX + 5 }, () => null),
  );

  veins.forEach((vein) => {
    if (vein.type === "horizontal") {
      for (let x = vein.minX; x <= vein.maxX; x += 1) {
        arr[vein.y][x - minX + 2] = "wall";
      }
    } else {
      for (let y = vein.minY; y <= vein.maxY; y += 1) {
        arr[y][vein.x - minX + 2] = "wall";
      }
    }
  });

  for (let x = 0; x < arr[0].length; x += 1) {
    arr.at(-1)![x] = "flowing";
  }

  return {
    get: ({ x, y }) => arr[y][x - minX + 2],
    set: ({ x, y }, tile) => {
      arr[y][x - minX + 2] = tile;
    },
    getWater: (includeFlowing) =>
      arr
        .filter((_, y) => y >= minY && y <= maxY)
        .map(
          count(
            (tile) => (includeFlowing && tile === "flowing") || tile === "rest",
          ),
        )
        .reduce(add),
  };
};

const isWallToSide = (
  reservoirRepository: ResevoirRepository,
  startingPosition: Position,
  side: -1 | 1,
): { is: boolean; x: number; tile: Tile | null } => {
  let currentPosition = { ...startingPosition };
  let nextPosition = { x: currentPosition.x + side, y: currentPosition.y };

  while (
    reservoirRepository.get(nextPosition) === null &&
    ["wall", "rest"].includes(
      reservoirRepository.get(getBelow(currentPosition)) ?? "",
    )
  ) {
    currentPosition = nextPosition;
    nextPosition = { x: nextPosition.x + side, y: nextPosition.y };
  }

  return {
    is: reservoirRepository.get(nextPosition) !== null,
    tile: reservoirRepository.get(nextPosition),
    x: nextPosition.x,
  };
};

const flow = (
  reservoirRepository: ResevoirRepository,
  startingPosition: Position,
): Position[] => {
  let currentPosition = { ...startingPosition };

  while (reservoirRepository.get(getBelow(currentPosition)) === null) {
    currentPosition = { x: currentPosition.x, y: currentPosition.y + 1 };
  }

  if (reservoirRepository.get(getBelow(currentPosition)) === "flowing") {
    reservoirRepository.set(currentPosition, "flowing");

    return [];
  }

  const wallToLeft = isWallToSide(reservoirRepository, currentPosition, -1);
  const wallToRight = isWallToSide(reservoirRepository, currentPosition, 1);

  if (wallToLeft.is && wallToRight.is) {
    const isFlowing =
      wallToLeft.tile === "flowing" || wallToRight.tile === "flowing";
    for (let x = wallToLeft.x + 1; x < wallToRight.x; x += 1) {
      reservoirRepository.set(
        { x, y: currentPosition.y },
        isFlowing ? "flowing" : "rest",
      );
    }

    return [];
  }
  const arr: Position[] = [];
  if (!wallToRight.is) {
    arr.push({ x: wallToRight.x - 1, y: currentPosition.y });
  }
  if (!wallToLeft.is) {
    arr.push({ x: wallToLeft.x + 1, y: currentPosition.y });
  }

  return arr;
};

const solve = (
  resevoirRepository: ResevoirRepository,
  includeFlowing: boolean,
): number => {
  const spring: Position = { x: 500, y: 0 };
  let arr: Position[] = [spring];

  while (resevoirRepository.get(spring) === null) {
    const nextArr: Position[] = [spring];
    const seen = new Set<string>();

    arr.forEach((position) => {
      const key = `${position.x}_${position.y}`;

      if (!seen.has(key)) {
        seen.add(key);
        nextArr.push(...flow(resevoirRepository, position));
      }
    });

    arr = nextArr;
  }

  return resevoirRepository.getWater(includeFlowing);
};

const solvePart1 = (input: string) => solve(parseInput(input), true);
const solvePart2 = (input: string) => solve(parseInput(input), false);

export const reservoirResearch: Day = {
  day: 18,
  year: 2018,
  getSimpleInput: () => readInput(__dirname, "simpleInput"),
  getPuzzleInput: () => readInput(__dirname, "puzzleInput"),
  solvePart1,
  solvePart2,
};
