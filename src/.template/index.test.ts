import { day } from "./index";

describe("2023/__", () => {
  describe("part 1", () => {
    it("should solve the simple input", async () => {
      const input = await day.getSimpleInput();

      const output = day.solvePart1(input);

      expect(output).toBe(-1);
    });

    it("should solve the puzzle input", async () => {
      const input = await day.getPuzzleInput();

      const output = day.solvePart1(input);

      expect(output).toBe(-1);
    });
  });

  describe("part 2", () => {
    it("should solve the simple input", async () => {
      const input = await day.getSimpleInput();

      const output = day.solvePart2(input);

      expect(output).toBe(-1);
    });

    it("should solve the puzzle input", async () => {
      const input = await day.getPuzzleInput();

      const output = day.solvePart2(input);

      expect(output).toBe(-1);
    });
  });
});
