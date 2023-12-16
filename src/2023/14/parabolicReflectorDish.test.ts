import { parabolicReflectorDish } from "./parabolicReflectorDish";

describe("2023/14", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await parabolicReflectorDish.partA.getExampleInput();

      const output = parabolicReflectorDish.partA.solve(input);

      expect(output).toBe(136);
    });

    it("should solve the puzzle input", async () => {
      const input = await parabolicReflectorDish.partA.getPuzzleInput();

      const output = parabolicReflectorDish.partA.solve(input);

      expect(output).toBe(113_525);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await parabolicReflectorDish.partB.getExampleInput();

      const output = parabolicReflectorDish.partB.solve(input);

      expect(output).toBe(64);
    });

    it("should solve the puzzle input", async () => {
      const input = await parabolicReflectorDish.partB.getPuzzleInput();

      const output = parabolicReflectorDish.partB.solve(input);

      expect(output).toBe(101_292);
    });
  });
});
