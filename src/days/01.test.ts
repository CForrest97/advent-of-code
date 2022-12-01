import { readFile } from "fs/promises";
import { solvePart1, solvePart2 } from "./01";

const readInput = (path: string): Promise<string> =>
  readFile(path, "utf8").then((s) => s.toString().trim());

describe("Day 01", () => {
  it.each([
    ["simpleInput", 24_000, 45_000],
    ["puzzleInput", 69_177, 207_456],
  ])(
    "solve %s",
    async (filename: string, expectedPart1: number, expectedPart2: number) => {
      const input = await readInput(`${__dirname}/${filename}.txt`);

      expect(solvePart1(input)).toBe(expectedPart1);
      expect(solvePart2(input)).toBe(expectedPart2);
    }
  );
});
