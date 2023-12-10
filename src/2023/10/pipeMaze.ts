import { Position } from "../../helpers/Position";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Maze = boolean[][];
type Tile = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

const tileToSubMaze: Record<Tile, boolean[][]> = {
  "|": [
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ],
  "-": [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ],
  L: [
    [false, true, false],
    [false, true, true],
    [false, false, false],
  ],
  J: [
    [false, true, false],
    [true, true, false],
    [false, false, false],
  ],
  7: [
    [false, false, false],
    [true, true, false],
    [false, true, false],
  ],
  F: [
    [false, false, false],
    [false, true, true],
    [false, true, false],
  ],
  ".": [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ],
  S: [
    [true, true, true],
    [true, true, true],
    [true, true, true],
  ],
};

const parseMaze = (
  input: string,
): { maze: Maze; startingPosition: Position } => {
  const chars = input.split("\n").map((row) => row.split(""));
  const y = chars.findIndex((row) => row.includes("S"))!;
  const x = chars[y].indexOf("S");

  return {
    startingPosition: { x: 3 * x + 1, y: 3 * y + 1 },
    maze: chars
      .map((row) => row.map((char) => tileToSubMaze[char as Tile]))
      .flatMap((subMazes) => [
        subMazes.flatMap((sub) => sub[0]),
        subMazes.flatMap((sub) => sub[1]),
        subMazes.flatMap((sub) => sub[2]),
      ]),
  };
};

const steps: Position[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const isValidPosition = (maze: Maze, position: Position) =>
  position.x >= 0 &&
  position.x < maze[0].length &&
  position.y >= 0 &&
  position.y < maze.length;

const solvePartA = (input: string) => {
  const { maze, startingPosition } = parseMaze(input);
  let loopSize = 0;

  const queue = [startingPosition];
  const visited = maze.map((row) => row.map(() => false));

  while (queue.length > 0) {
    const queueSize = queue.length;
    loopSize += 1;

    for (let _ = 0; _ < queueSize; _ += 1) {
      const { x, y } = queue.shift()!;

      steps
        .map((step) => ({ x: x + step.x, y: y + step.y }))
        .filter((position) => isValidPosition(maze, position))
        .filter((position) => maze[position.y][position.x])
        .filter((position) => !visited[position.y][position.x])
        .forEach((position) => {
          visited[position.y][position.x] = true;
          queue.push(position);
        });
    }
  }

  return (loopSize - 1) / 3;
};

const solvePartB = (input: string) => {
  const { maze } = parseMaze(input);
  const visited = maze.map((row) => row.map(() => false));
  const queue: Position[] = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
  ];

  while (queue.length > 0) {
    const { x, y } = queue.shift()!;

    steps
      .map((step) => ({ x: x + step.x, y: y + step.y }))
      .filter((position) => isValidPosition(maze, position))
      .filter((position) => !maze[position.y][position.x])
      .filter((position) => !visited[position.y][position.x])
      .forEach((position) => {
        visited[position.y][position.x] = true;
        queue.push(position);
      });
  }

  let count = 0;

  for (let y = 0; y < visited.length; y += 3)
    for (let x = 0; x < visited[y].length; x += 3)
      if (
        !visited[y][x] &&
        !visited[y][x + 1] &&
        !visited[y][x + 2] &&
        !visited[y + 1][x] &&
        !visited[y + 1][x + 1] &&
        !visited[y + 1][x + 2] &&
        !visited[y + 2][x] &&
        !visited[y + 2][x + 1] &&
        !visited[y + 2][x + 2]
      )
        count += 1;

  return count - 1;
};

export const pipeMaze: Day = {
  day: 10,
  year: 2023,
  partA: {
    getExampleInput: () => readInput(__dirname, "input/examplePartA"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartA,
  },
  partB: {
    getExampleInput: () => readInput(__dirname, "input/examplePartB"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartB,
  },
};
