import { compose, map } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

type Position3D = {
  x: number;
  y: number;
  z: number;
};

const buildPositionRepository = () => {
  const store = new Set<string>();

  const positionToString = ({ x, y, z }: Position3D) => `${x},${y},${z}`;

  const has = (position: Position3D) => store.has(positionToString(position));
  const add = (position: Position3D) => store.add(positionToString(position));

  return { has, add };
};

const parseLavaCubes = (lines: string[]): Position3D[] =>
  lines
    .map((line) => line.split(","))
    .map(map(parseNumber))
    .map(([x, y, z]) => ({
      x,
      y,
      z,
    }));

const getNeighbours = ({ x, y, z }: Position3D): Position3D[] => [
  { x: x + 1, y, z },
  { x: x - 1, y, z },
  { x, y: y + 1, z },
  { x, y: y - 1, z },
  { x, y, z: z + 1 },
  { x, y, z: z - 1 },
];

const getTotalSurfaceArea = (lavaCubes: Position3D[]): number => {
  const lavaRepository = buildPositionRepository();

  let totalSurfaceArea = 0;

  lavaCubes.forEach((cube) => {
    lavaRepository.add(cube);
    totalSurfaceArea += 6;
    const neighbours = getNeighbours(cube).filter((neighbour) =>
      lavaRepository.has(neighbour)
    );

    totalSurfaceArea -= 2 * neighbours.length;
  });

  return totalSurfaceArea;
};

const getExternalSurfaceArea = (lavaCubes: Position3D[]): number => {
  const lavaRepository = buildPositionRepository();

  lavaCubes.forEach(lavaRepository.add);

  const minX = lavaCubes.map(({ x }) => x).reduce((a, b) => Math.min(a, b)) - 1;
  const maxX = lavaCubes.map(({ x }) => x).reduce((a, b) => Math.max(a, b)) + 1;
  const minY = lavaCubes.map(({ y }) => y).reduce((a, b) => Math.min(a, b)) - 1;
  const maxY = lavaCubes.map(({ y }) => y).reduce((a, b) => Math.max(a, b)) + 1;
  const minZ = lavaCubes.map(({ z }) => z).reduce((a, b) => Math.min(a, b)) - 1;
  const maxZ = lavaCubes.map(({ z }) => z).reduce((a, b) => Math.max(a, b)) + 1;

  const queue: Position3D[] = [{ x: minX, y: minY, z: minZ }];

  const visited = buildPositionRepository();
  let totalSurfaceArea = 0;

  while (queue.length > 0) {
    const cube = queue.shift()!;

    if (visited.has(cube) || lavaRepository.has(cube)) {
      const neighbours = getNeighbours(cube).filter(
        ({ x, y, z }) =>
          x >= minX &&
          x <= maxX &&
          y >= minY &&
          y <= maxY &&
          z >= minZ &&
          z <= maxZ
      );

      const lavaNeighbours = neighbours.filter(lavaRepository.has);
      const airNeighbours = neighbours.filter((c) => !lavaRepository.has(c));
      totalSurfaceArea += lavaNeighbours.length;
      airNeighbours.forEach((air) => queue.push(air));

      visited.add(cube);
    }
  }

  return totalSurfaceArea;
};

export const solvePart1 = compose(
  getTotalSurfaceArea,
  parseLavaCubes,
  parseLines
);
export const solvePart2 = compose(
  getExternalSurfaceArea,
  parseLavaCubes,
  parseLines
);
