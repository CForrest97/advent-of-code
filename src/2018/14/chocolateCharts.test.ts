import { chocolateCharts } from "./chocolateCharts";

describe("2018/14", () => {
  describe("part A", () => {
    it("should solve the simple input", async () => {
      const input = await chocolateCharts.partA.getExampleInput();

      const output = chocolateCharts.partA.solve(input);

      expect(output).toBe(5_941_429_882);
    });

    it("should solve the puzzle input", async () => {
      const input = await chocolateCharts.partA.getPuzzleInput();

      const output = chocolateCharts.partA.solve(input);

      expect(output).toBe(6_910_849_249);
    });
  });

  describe("part B", () => {
    it("should solve the simple input", async () => {
      const input = await chocolateCharts.partB.getExampleInput();

      const output = chocolateCharts.partB.solve(input);

      expect(output).toBe(2_018);
    });

    it("should solve the puzzle input", async () => {
      const input = await chocolateCharts.partB.getPuzzleInput();

      const output = chocolateCharts.partB.solve(input);

      expect(output).toBe(20_330_673);
    });
  });
});
