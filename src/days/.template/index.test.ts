import { solvePart1, solvePart2 } from "./index";
import { InputType, readInput } from "../../helpers/readInput";

describe.skip("Day __", () => {
  it.each<[InputType, number, number]>([
    ["simpleInput", 0, 0],
    // ["puzzleInput", 0, 0]
  ])("solve %s", async (filename, expectedPart1, expectedPart2) => {
    const input = await readInput(__dirname, filename);

    expect(solvePart1(input)).toBe(expectedPart1);
    expect(solvePart2(input)).toBe(expectedPart2);
  });
});
