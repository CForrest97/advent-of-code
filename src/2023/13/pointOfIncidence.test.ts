import { pointOfIncidence } from "./pointOfIncidence";

describe("2023/13", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await pointOfIncidence.partA.getExampleInput();

      const output = pointOfIncidence.partA.solve(input);

      expect(output).toBe(405);
    });

    it("should solve the puzzle input", async () => {
      const input = await pointOfIncidence.partA.getPuzzleInput();

      const output = pointOfIncidence.partA.solve(input);

      expect(output).toBe(27_664);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await pointOfIncidence.partB.getExampleInput();

      const output = pointOfIncidence.partB.solve(input);

      expect(output).toBe(400);
    });

    it("should solve the puzzle input", async () => {
      const input = await pointOfIncidence.partB.getPuzzleInput();

      const output = pointOfIncidence.partB.solve(input);

      expect(output).toBe(33_991);
    });
  });
});
