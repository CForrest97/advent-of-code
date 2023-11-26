import { subterraneanSustainability } from "./subterraneanSustainability";

describe("2018/12", () => {
  describe("part 1", () => {
    it("should solve the simple input", async () => {
      const input = await subterraneanSustainability.getSimpleInput();

      const output = subterraneanSustainability.solvePart1(input);

      expect(output).toBe(325);
    });

    it("should solve the puzzle input", async () => {
      const input = await subterraneanSustainability.getPuzzleInput();

      const output = subterraneanSustainability.solvePart1(input);

      expect(output).toBe(3725);
    });
  });

  describe("part 2", () => {
    it("should solve the simple input", async () => {
      const input = await subterraneanSustainability.getSimpleInput();

      const output = subterraneanSustainability.solvePart2(input);

      expect(output).toBe(999_999_999_374);
    });

    it("should solve the puzzle input", async () => {
      const input = await subterraneanSustainability.getPuzzleInput();

      const output = subterraneanSustainability.solvePart2(input);

      expect(output).toBe(3_100_000_000_293);
    });
  });
});
