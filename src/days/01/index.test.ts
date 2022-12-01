import { solvePart1, solvePart2 } from "./index";
import { InputType, readInput } from "../../helpers/readInput";

describe("Day 01", () => {
  it.each<[InputType, number, number]>([
    ["simpleInput", 24_000, 45_000],
    ["puzzleInput", 69_177, 207_456],
  ])("solve %s", async (filename, expectedPart1, expectedPart2) => {
    const input = await readInput(__dirname, filename);

    expect(solvePart1(input)).toBe(expectedPart1);
    expect(solvePart2(input)).toBe(expectedPart2);
  });
});
