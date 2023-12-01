import { mineCartMadness } from "./mineCartMadness";

describe(`${mineCartMadness.year}/${mineCartMadness.day}`, () => {
  describe("part A", () => {
    it("should solve the simple input", async () => {
      const input = await mineCartMadness.partA.getExampleInput();

      const output = mineCartMadness.partA.solve(input);

      expect(output).toBe("2,0");
    });

    it("should solve the puzzle input", async () => {
      const input = await mineCartMadness.partA.getPuzzleInput();

      const output = mineCartMadness.partA.solve(input);

      expect(output).toBe("14,42");
    });
  });

  describe("part B", () => {
    it("should solve the simple input", async () => {
      const input = await mineCartMadness.partB.getExampleInput();

      const output = mineCartMadness.partB.solve(input);

      expect(output).toBe("6,4");
    });

    it("should solve the puzzle input", async () => {
      const input = await mineCartMadness.partB.getPuzzleInput();

      const output = mineCartMadness.partB.solve(input);

      expect(output).toBe("8,7");
    });
  });
});
