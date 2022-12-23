/* eslint-disable no-empty-function */
import { mathMod, max, min, sum } from "ramda";
import { Position } from "../../helpers/Position";
import { parseLines } from "../../helpers/parsers";

type Cardinal = "north" | "south" | "east" | "west";

const getSortedCardinals = (() => {
  let i = 0;
  const cardinals: Cardinal[] = [
    "north",
    "south",
    "west",
    "east",
    "north",
    "south",
    "west",
  ];

  return () => {
    const sorted = cardinals.slice(mathMod(i, 4), mathMod(i, 4) + 4);
    i += 1;
    return sorted;
  };
})();

const buildPositionRepository = () => {
  const positions = new Map<string, number>();

  const get = (position: Position) =>
    positions.get(`${position.x},${position.y}`) ?? 0;
  const add = (position: Position) =>
    positions.set(`${position.x},${position.y}`, get(position) + 1);

  return { get, add };
};

const getAdjacentPositions = (
  { x, y }: Position,
  cardinal: Cardinal
): Position[] => {
  if (cardinal === "north")
    return [
      { x: x - 1, y: y - 1 },
      { x, y: y - 1 },
      { x: x + 1, y: y - 1 },
    ];
  if (cardinal === "south")
    return [
      { x: x - 1, y: y + 1 },
      { x, y: y + 1 },
      { x: x + 1, y: y + 1 },
    ];
  if (cardinal === "east")
    return [
      { x: x + 1, y: y - 1 },
      { x: x + 1, y },
      { x: x + 1, y: y + 1 },
    ];
  return [
    { x: x - 1, y: y - 1 },
    { x: x - 1, y },
    { x: x - 1, y: y + 1 },
  ];
};

const getNextElfPosition = (
  elf: Position,
  sortedCardinals: Cardinal[],
  elfRepository: ReturnType<typeof buildPositionRepository>
): Position => {
  const neighbours = [
    ...getAdjacentPositions(elf, "north"),
    ...getAdjacentPositions(elf, "south"),
    ...getAdjacentPositions(elf, "east"),
    ...getAdjacentPositions(elf, "west"),
  ].map(elfRepository.get);

  if (sum(neighbours) === 0) return elf;

  const cardinal = sortedCardinals.find((c) =>
    getAdjacentPositions(elf, c).every((pos) => elfRepository.get(pos) === 0)
  );
  if (cardinal === undefined) return elf;

  return getAdjacentPositions(elf, cardinal)[1];
};

const simulateRound = (elves: Position[]): Position[] => {
  const currentPositionRepository = buildPositionRepository();
  elves.forEach(currentPositionRepository.add);
  const sortedCardinals = getSortedCardinals();

  const moves = elves.map((elf) => {
    const current = elf;

    const next = getNextElfPosition(
      elf,
      sortedCardinals,
      currentPositionRepository
    );

    return { current, next };
  });

  const nextMovesRepository = buildPositionRepository();
  moves.map(({ next }) => next).forEach(nextMovesRepository.add);

  return moves.map(({ current, next }) =>
    nextMovesRepository.get(next) === 1 ? next : current
  );
};

const solve = (elves: Position[]) => {
  let currentElves = elves;
  for (let i = 0; i < 10; i += 1) currentElves = simulateRound(currentElves);

  const minX = currentElves.map(({ x }) => x).reduce(min, Infinity);
  const maxX = currentElves.map(({ x }) => x).reduce(max, -Infinity);
  const minY = currentElves.map(({ y }) => y).reduce(min, Infinity);
  const maxY = currentElves.map(({ y }) => y).reduce(max, -Infinity);

  return (maxY - minY + 1) * (maxX - minX + 1) - elves.length;
};

const isFinalRound = (elves: Position[]): boolean => {
  const { add, get } = buildPositionRepository();
  elves.forEach(add);

  return elves.every(
    ({ x, y }) =>
      get({ x: x - 1, y: y - 1 }) === 0 &&
      get({ x: x - 1, y }) === 0 &&
      get({ x: x - 1, y: y + 1 }) === 0 &&
      get({ x, y: y - 1 }) === 0 &&
      get({ x, y: y + 1 }) === 0 &&
      get({ x: x + 1, y: y - 1 }) === 0 &&
      get({ x: x + 1, y }) === 0 &&
      get({ x: x + 1, y: y + 1 }) === 0
  );
};

const solve2 = (elves: Position[]) => {
  let currentElves = elves;
  let i = 2;
  while (true) {
    currentElves = simulateRound(currentElves);
    if (isFinalRound(currentElves)) return i + 1;
    i += 1;
  }
};

const parseElves = (lines: string[]): Position[] =>
  lines
    .flatMap((line, y) =>
      line.split("").map((char, x) => (char === "#" ? { x, y } : null))
    )
    .filter(Boolean) as any as Position[];

export const solvePart1 = (input: string) =>
  solve(parseElves(parseLines(input)));
export const solvePart2 = (input: string) =>
  solve2(parseElves(parseLines(input)));
