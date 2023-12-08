import { hauntedWasteland } from "./hauntedWasteland";

describe("2023/8", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await hauntedWasteland.partA.getExampleInput();

      const output = hauntedWasteland.partA.solve(input);

      expect(output).toBe(6);
    });

    it("should solve the puzzle input", async () => {
      const input = await hauntedWasteland.partA.getPuzzleInput();

      const output = hauntedWasteland.partA.solve(input);

      expect(output).toBe(18_113);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await hauntedWasteland.partB.getExampleInput();

      const output = hauntedWasteland.partB.solve(input);

      expect(output).toBe(6);
    });

    it("should solve the puzzle input", async () => {
      const input = await hauntedWasteland.partB.getPuzzleInput();

      const output = hauntedWasteland.partB.solve(input);

      expect(output).toBe(12_315_788_159_977);
    });
  });
});
