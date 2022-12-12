import { repeat, times } from "ramda";
import { parseLines } from "../../helpers/parsers";

type Position = {
  x: number;
  y: number;
};

type ParsedInput = {
  start: Position;
  end: Position;
  map: number[][];
};

const moves: Position[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const isValidPosition = ({ x, y }: Position, height: number, width: number) =>
  x >= 0 && x < width && y >= 0 && y < height;

const toHeight = (char: string) => char.charCodeAt(0) - "a".charCodeAt(0);

const parseInput = (input: string): ParsedInput => {
  let start: Position;
  let end: Position;

  const map = parseLines(input).map((row, y) =>
    row.split("").map((char, x) => {
      if (char === "S") {
        start = { x, y };
        return toHeight("a");
      }

      if (char === "E") {
        end = { x, y };
        return toHeight("z");
      }

      return toHeight(char);
    })
  );

  return {
    map,
    start: start!,
    end: end!,
  };
};

const bfs = ({ map, start, end }: ParsedInput): number => {
  const height = map.length;
  const width = map[0].length;

  const visited: boolean[][] = times(() => repeat(false, width), height);

  const queue: Position[] = [start];
  visited[start.y][start.x] = true;
  let distance = 0;

  while (queue.length > 0) {
    const { length } = queue;

    for (let i = 0; i < length; i += 1) {
      const from = queue.shift()!;

      if (from.x === end.x && from.y === end.y) return distance;

      moves
        .map((move) => ({ x: from.x + move.x, y: from.y + move.y }))
        .filter(
          (to) =>
            isValidPosition(to, map.length, map[0].length) &&
            map[to.y][to.x] <= map[from.y][from.x] + 1 &&
            !visited[to.y][to.x]
        )
        .forEach((to) => {
          queue.push(to);
          visited[to.y][to.x] = true;
        });
    }

    distance += 1;
  }

  return Infinity;
};

export const solvePart1 = (input: string) => bfs(parseInput(input));
export const solvePart2 = (input: string) => {
  const { map, end } = parseInput(input);
  const starts: Position[] = [];

  for (let y = 0; y < map.length; y += 1)
    for (let x = 0; x < map[y].length; x += 1)
      if (map[y][x] === 0) starts.push({ x, y });

  return starts
    .map((start) => bfs({ start, end, map }))
    .reduce((a, b) => Math.min(a, b));
};
