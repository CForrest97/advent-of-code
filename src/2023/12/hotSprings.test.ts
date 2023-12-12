import { hotSprings } from "./hotSprings";

describe("2023/12", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await hotSprings.partA.getExampleInput();

      const output = hotSprings.partA.solve(input);

      expect(output).toBe(21);
    });

    it("should solve the puzzle input", async () => {
      const input = await hotSprings.partA.getPuzzleInput();

      const output = hotSprings.partA.solve(input);

      expect(output).toBe(7_047);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await hotSprings.partB.getExampleInput();

      const output = hotSprings.partB.solve(input);

      expect(output).toBe(525_152);
    });

    it("should solve the puzzle input", async () => {
      const input = await hotSprings.partB.getPuzzleInput();

      const output = hotSprings.partB.solve(input);

      expect(output).toBe(17_391_848_518_844);
    });
  });
});
