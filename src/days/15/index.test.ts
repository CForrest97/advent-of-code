import { solvePart1, solvePart2 } from "./index";
import { InputType, readInput } from "../../helpers/readInput";

describe("Day 15", () => {
  describe.each<[InputType, number, number, number]>([
    ["simpleInput", 10, 26, 56000011],
    ["puzzleInput", 2000000, 4879972, 12525726647448],
  ])("%s", (filename, targetY, expectedPart1, expectedPart2) => {
    it.skip("should solve part 1", async () => {
      const input = await readInput(__dirname, filename);

      expect(solvePart1(input, targetY)).toBe(expectedPart1);
    });

    it("should solve part 2", async () => {
      const input = await readInput(__dirname, filename);

      expect(solvePart2(input, targetY)).toBe(expectedPart2);
    });
  });
});
