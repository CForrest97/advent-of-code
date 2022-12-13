import { solvePart1, solvePart2 } from "./index";
import { InputType, readInputWithoutTrim } from "../../helpers/readInput";

describe("Day 05", () => {
  describe.each<[InputType, string, string]>([
    ["simpleInput", "CMZ", "MCD"],
    ["puzzleInput", "HNSNMTLHQ", "RNLFDJMCT"],
  ])("%s", (filename, expectedPart1, expectedPart2) => {
    it("should solve part 1", async () => {
      const input = await readInputWithoutTrim(__dirname, filename);

      expect(solvePart1(input)).toBe(expectedPart1);
    });

    it("should solve part 2", async () => {
      const input = await readInputWithoutTrim(__dirname, filename);

      expect(solvePart2(input)).toBe(expectedPart2);
    });
  });
});
