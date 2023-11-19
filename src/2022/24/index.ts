/* eslint-disable no-continue */
import { Position } from "../../helpers/Position";
import { parseLines, parseNumber } from "../../helpers/parsers";

type Cardinal = "north" | "east" | "south" | "west";

type Blizzard = { position: Position; cardinal: Cardinal };

const buildPositionRepository = (initialPositions: Position[] = []) => {
  const positions = new Set<string>();

  const has = (position: Position) =>
    positions.has(`${position.x},${position.y}`);
  const add = (position: Position) =>
    positions.add(`${position.x},${position.y}`);
  const values = (): Position[] =>
    [...positions.values()].map((s) => {
      const [x, y] = s.split(",");
      return { x: parseNumber(x), y: parseNumber(y) };
    });

  initialPositions.forEach(add);

  return { has, add, values };
};

type PositionRepository = ReturnType<typeof buildPositionRepository>;

const mapToCardinal: Record<string, Cardinal> = {
  "^": "north",
  ">": "east",
  v: "south",
  "<": "west",
};

const mapCardinalToPosition: Record<Cardinal, Position> = {
  north: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  south: { x: 0, y: +1 },
  west: { x: -1, y: 0 },
};

const parseBlizzards = (lines: string[]): Blizzard[] =>
  lines
    .flatMap((line, y) =>
      line.split("").map((tile, x) => [tile, { x, y }] as [string, Position])
    )
    .filter(([tile]) => "^>v<".includes(tile))
    .map(([tile, position]) => ({ position, cardinal: mapToCardinal[tile] }));

type Valley = ("wall" | "open")[][];

const parseValley = (lines: string[]): Valley =>
  lines.map((line) =>
    line.split("").map((tile) => (tile === "#" ? "wall" : "open"))
  );

const getAdjacent = ({ x, y }: Position): Position[] => [
  { x, y: y - 1 },
  { x: x + 1, y },
  { x, y: y + 1 },
  { x: x - 1, y },
];

const updateBlizzards = (
  blizzards: Blizzard[],
  width: number,
  height: number
) =>
  blizzards.map((blizzard) => {
    let x = blizzard.position.x + mapCardinalToPosition[blizzard.cardinal].x;
    let y = blizzard.position.y + mapCardinalToPosition[blizzard.cardinal].y;

    if (x === 0) x = width - 2;
    if (x === width - 1) x = 1;
    if (y === 0) y = height - 2;
    if (y === height - 1) y = 1;

    return {
      position: {
        x,
        y,
      },
      cardinal: blizzard.cardinal,
    };
  });

const getNextPositions = (
  blizzards: PositionRepository,
  queue: Position[],
  width: number,
  height: number,
  target: Position
) => {
  const repository = buildPositionRepository();

  // eslint-disable-next-line no-restricted-syntax
  for (const position of queue) {
    const adjacentPositions = getAdjacent(position).filter(
      ({ x, y }) =>
        (x === target.x && y === target.y) ||
        (x > 0 && x < width - 1 && y > 0 && y < height - 1)
    );
    adjacentPositions.push(position);

    const notInBlizzard = adjacentPositions.filter((p) => !blizzards.has(p));

    notInBlizzard.forEach(repository.add);
  }

  return repository;
};

const solve = (valley: Valley, blizzards: Blizzard[]) => {
  const height = valley.length;
  const width = valley[0].length;

  const start: Position = { x: 1, y: 0 };
  const end: Position = { x: width - 2, y: height - 1 };

  let distance = 0;
  let nextBlizzards = updateBlizzards(blizzards, width, height);

  let queue = buildPositionRepository([start]);

  while (true) {
    if (queue.has(end)) return distance;

    const nextBlizzardsRepository = buildPositionRepository(
      nextBlizzards.map(({ position }) => position)
    );

    queue = getNextPositions(
      nextBlizzardsRepository,
      queue.values(),
      width,
      height,
      end
    );
    nextBlizzards = updateBlizzards(nextBlizzards, width, height);
    distance += 1;
  }
};

const solve2 = (valley: Valley, blizzards: Blizzard[]) => {
  const height = valley.length;
  const width = valley[0].length;

  const start: Position = { x: 1, y: 0 };
  const end: Position = { x: width - 2, y: height - 1 };

  let distance = 0;
  let nextBlizzards = updateBlizzards(blizzards, width, height);

  let queue = buildPositionRepository([start]);

  while (true) {
    if (queue.has(end)) break;

    const nextBlizzardsRepository = buildPositionRepository(
      nextBlizzards.map(({ position }) => position)
    );

    queue = getNextPositions(
      nextBlizzardsRepository,
      queue.values(),
      width,
      height,
      end
    );
    nextBlizzards = updateBlizzards(nextBlizzards, width, height);
    distance += 1;
  }

  queue = buildPositionRepository([end]);

  while (true) {
    if (queue.has(start)) break;

    const nextBlizzardsRepository = buildPositionRepository(
      nextBlizzards.map(({ position }) => position)
    );

    queue = getNextPositions(
      nextBlizzardsRepository,
      queue.values(),
      width,
      height,
      start
    );
    nextBlizzards = updateBlizzards(nextBlizzards, width, height);
    distance += 1;
  }

  queue = buildPositionRepository([start]);

  while (true) {
    if (queue.has(end)) break;

    const nextBlizzardsRepository = buildPositionRepository(
      nextBlizzards.map(({ position }) => position)
    );

    queue = getNextPositions(
      nextBlizzardsRepository,
      queue.values(),
      width,
      height,
      end
    );
    nextBlizzards = updateBlizzards(nextBlizzards, width, height);
    distance += 1;
  }

  return distance;
};

export const solvePart1 = (input: string) =>
  solve(parseValley(parseLines(input)), parseBlizzards(parseLines(input)));
export const solvePart2 = (input: string) =>
  solve2(parseValley(parseLines(input)), parseBlizzards(parseLines(input)));
