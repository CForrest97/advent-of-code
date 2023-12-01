import { subterraneanSustainability } from "./subterraneanSustainability";

describe(`${subterraneanSustainability.year}/${subterraneanSustainability.day}`, () => {
  describe("part A", () => {
    it("should solve the simple input", async () => {
      const input = await subterraneanSustainability.partA.getExampleInput();

      const output = subterraneanSustainability.partA.solve(input);

      expect(output).toBe(325);
    });

    it("should solve the puzzle input", async () => {
      const input = await subterraneanSustainability.partA.getPuzzleInput();

      const output = subterraneanSustainability.partA.solve(input);

      expect(output).toBe(3725);
    });
  });

  describe("part B", () => {
    it("should solve the simple input", async () => {
      const input = await subterraneanSustainability.partB.getExampleInput();

      const output = subterraneanSustainability.partB.solve(input);

      expect(output).toBe(999_999_999_374);
    });

    it("should solve the puzzle input", async () => {
      const input = await subterraneanSustainability.partB.getPuzzleInput();

      const output = subterraneanSustainability.partB.solve(input);

      expect(output).toBe(3_100_000_000_293);
    });
  });
});
