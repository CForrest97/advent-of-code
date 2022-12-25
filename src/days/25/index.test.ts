import { solvePart1 } from "./index";
import { InputType, readInput } from "../../helpers/readInput";

describe("Day 25", () => {
  describe.each<[InputType, string]>([
    ["simpleInput", "2=-1=0"],
    ["puzzleInput", "2011-=2=-1020-1===-1"],
  ])("%s", (filename, expectedPart1) => {
    it("should solve part 1", async () => {
      const input = await readInput(__dirname, filename);

      expect(solvePart1(input)).toBe(expectedPart1);
    });
  });
});
