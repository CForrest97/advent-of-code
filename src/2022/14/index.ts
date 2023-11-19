import { compose, init, range, tail, xprod, zip } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { Position } from "../../helpers/Position";

const buildReservoirRepository = (rocks: Position[]) => {
  const store = new Set<string>();
  let height = 0;

  const isAir = ({ x, y }: Position) => !store.has(`${x},${y}`);
  const add = ({ x, y }: Position) => {
    height = Math.max(height, y);
    store.add(`${x},${y}`);
  };
  rocks.forEach(add);

  return { isAir, add, getHeight: () => height };
};

type ReservoirRepository = ReturnType<typeof buildReservoirRepository>;

const parsePosition = (s: string): Position => {
  const [x, y] = s.split(",");
  return { x: parseNumber(x), y: parseNumber(y) };
};

const getRocksBetweenPositions = (pos1: Position, pos2: Position): Position[] =>
  xprod(
    range(Math.min(pos1.x, pos2.x), Math.max(pos1.x, pos2.x) + 1),
    range(Math.min(pos1.y, pos2.y), Math.max(pos1.y, pos2.y) + 1)
  ).map(([x, y]) => ({ x, y }));

const getRocks = (rockPaths: string[]): Position[] =>
  rockPaths
    .map((rockPath) => rockPath.split(" -> ").map(parsePosition))
    .flatMap((points) => zip(init(points), tail(points)))
    .flatMap(([currPos, nextPos]) =>
      getRocksBetweenPositions(currPos, nextPos)
    );

const simulateSand =
  (hasFloor: boolean) =>
  ({ add, isAir, getHeight }: ReservoirRepository) => {
    const height = getHeight();
    let sandCount = 0;

    if (hasFloor)
      range(500 - height - 10, 500 + height + 10).forEach((x) =>
        add({ x, y: height + 2 })
      );

    while (true) {
      let currPos: Position = { x: 500, y: 0 };

      while (true) {
        if (currPos.y > height + 2) return sandCount;

        const nextPos = [
          { x: currPos.x, y: currPos.y + 1 },
          { x: currPos.x - 1, y: currPos.y + 1 },
          { x: currPos.x + 1, y: currPos.y + 1 },
        ].find(isAir);

        if (nextPos === undefined) break;

        currPos = nextPos;
      }
      sandCount += 1;

      if (currPos.x === 500 && currPos.y === 0) return sandCount;

      add(currPos);
    }
  };

export const solvePart1 = compose(
  simulateSand(false),
  buildReservoirRepository,
  getRocks,
  parseLines
);
export const solvePart2 = compose(
  simulateSand(true),
  buildReservoirRepository,
  getRocks,
  parseLines
);
