import { day } from "./theFloorWillBeLava";

describe("2023/16", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await day.partA.getExampleInput();

      const output = day.partA.solve(input);

      expect(output).toBe(46);
    });

    it("should solve the puzzle input", async () => {
      const input = await day.partA.getPuzzleInput();

      const output = day.partA.solve(input);

      expect(output).toBe(8_539);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await day.partB.getExampleInput();

      const output = day.partB.solve(input);

      expect(output).toBe(51);
    });

    it("should solve the puzzle input", async () => {
      const input = await day.partB.getPuzzleInput();

      const output = day.partB.solve(input);

      expect(output).toBe(8_674);
    });
  });
});
