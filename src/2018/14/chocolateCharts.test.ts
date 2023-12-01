import { chocolateCharts } from "./chocolateCharts";

describe("2018/14", () => {
  describe("part 1", () => {
    it("should solve the simple input", async () => {
      const input = await chocolateCharts.getSimpleInput();

      const output = chocolateCharts.solvePart1(input);

      expect(output).toBe(-1);
    });

    it("should solve the puzzle input", async () => {
      const input = await chocolateCharts.getPuzzleInput();

      const output = chocolateCharts.solvePart1(input);

      expect(output).toBe(-1);
    });
  });

  describe("part 2", () => {
    it("should solve the simple input", async () => {
      const input = await chocolateCharts.getSimpleInput();

      const output = chocolateCharts.solvePart2(input);

      expect(output).toBe(-1);
    });

    it("should solve the puzzle input", async () => {
      const input = await chocolateCharts.getPuzzleInput();

      const output = chocolateCharts.solvePart2(input);

      expect(output).toBe(-1);
    });
  });
});
