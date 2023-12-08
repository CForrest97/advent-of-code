import { gearRatios } from "./gearRatios";

describe("2023/03", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await gearRatios.partA.getExampleInput();

      const output = gearRatios.partA.solve(input);

      expect(output).toBe(4_361);
    });

    it("should solve the puzzle input", async () => {
      const input = await gearRatios.partA.getPuzzleInput();

      const output = gearRatios.partA.solve(input);

      expect(output).toBe(525_181);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await gearRatios.partB.getExampleInput();

      const output = gearRatios.partB.solve(input);

      expect(output).toBe(467_835);
    });

    it("should solve the puzzle input", async () => {
      const input = await gearRatios.partB.getPuzzleInput();

      const output = gearRatios.partB.solve(input);

      expect(output).toBe(84_289_137);
    });
  });
});
