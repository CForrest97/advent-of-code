import { cosmicExpansion } from "./cosmicExpansion";

describe("2023/11", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await cosmicExpansion.partA.getExampleInput();

      const output = cosmicExpansion.partA.solve(input);

      expect(output).toBe(374);
    });

    it("should solve the puzzle input", async () => {
      const input = await cosmicExpansion.partA.getPuzzleInput();

      const output = cosmicExpansion.partA.solve(input);

      expect(output).toBe(10_490_062);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await cosmicExpansion.partB.getExampleInput();

      const output = cosmicExpansion.partB.solve(input);

      expect(output).toBe(82_000_210);
    });

    it("should solve the puzzle input", async () => {
      const input = await cosmicExpansion.partB.getPuzzleInput();

      const output = cosmicExpansion.partB.solve(input);

      expect(output).toBe(382_979_724_122);
    });
  });
});
