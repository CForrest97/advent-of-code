import { day } from "./index";

describe("2023/__", () => {
  describe("part 1", () => {
    it("should solve the example input", async () => {
      const input = await day.partA.getExampleInput();

      const output = day.partA.solve(input);

      expect(output).toBe(-1);
    });

    it("should solve the puzzle input", async () => {
      const input = await day.partA.getPuzzleInput();

      const output = day.partA.solve(input);

      expect(output).toBe(-1);
    });
  });

  describe("part 2", () => {
    it("should solve the example input", async () => {
      const input = await day.partB.getExampleInput();

      const output = day.partB.solve(input);

      expect(output).toBe(-1);
    });

    it("should solve the puzzle input", async () => {
      const input = await day.partB.getPuzzleInput();

      const output = day.partB.solve(input);

      expect(output).toBe(-1);
    });
  });
});
