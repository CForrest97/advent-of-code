import { prop, sum } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

type File = {
  name: string;
  size: number;
};

type Directory = {
  name: string;
  size: number;
  files: Map<String, File>;
  directories: Map<String, Directory>;
  parent: Directory | null;
};

const makeDirectory = (
  name: string,
  parent: Directory["parent"]
): Directory => ({
  name,
  size: 0,
  files: new Map(),
  directories: new Map(),
  parent,
});

const getRootDocument = (input: string): Directory => {
  const root: Directory = makeDirectory("/", null);
  let currentDirectory: Directory = root;

  const commands = input.split("\n$ ").map((command) => parseLines(command));
  for (let i = 1; i < commands.length; i += 1) {
    const command = commands[i];
    if (command[0] === "ls") {
      for (let j = 1; j < command.length; j += 1) {
        const s = command[j];
        if (s.startsWith("dir ")) {
          const name = s.slice(4);
          const newDir = makeDirectory(name, currentDirectory);
          if (currentDirectory.directories.get(name) === undefined) {
            currentDirectory.directories.set(name, newDir);
          }
        } else {
          const [size, name] = s.split(" ");

          if (!currentDirectory.files.has(name)) {
            currentDirectory.files.set(name, { name, size: parseNumber(size) });

            let dir: Directory | null = currentDirectory;

            while (dir !== null) {
              dir.size += parseNumber(size);
              dir = dir.parent;
            }
          }
        }
      }
    } else if (command[0] === "cd ..") {
      currentDirectory = currentDirectory.parent!;
    } else if (command[0].startsWith("cd ")) {
      const name = command[0].slice(3);
      currentDirectory = currentDirectory.directories.get(name)!;
    }
  }

  return root;
};

const flattenDirectories = (directory: Directory): Directory[] => [
  directory,
  ...[...directory.directories.values()].flatMap((dir) =>
    flattenDirectories(dir)
  ),
];

const solve1 = (root: Directory): number => {
  const smallDirectories = flattenDirectories(root).filter(
    (dir) => dir.size <= 100_000
  );

  return sum(smallDirectories.map(prop("size")));
};

const solve2 = (root: Directory): number => {
  const usedSpace = root.size;
  const availableSpace = 70_000_000 - usedSpace;
  const requiredSpace = 30_000_000 - availableSpace;

  const bigEnoughDirectories = flattenDirectories(root).filter(
    (dir) => dir.size >= requiredSpace
  );

  return bigEnoughDirectories.reduce(
    (min, dir) => Math.min(min, dir.size),
    Infinity
  );
};

export const solvePart1 = (input: string) => solve1(getRootDocument(input));
export const solvePart2 = (input: string) => solve2(getRootDocument(input));
