import { trebuchet } from "./trebuchet";

describe("2023/01", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await trebuchet.partA.getExampleInput();

      const output = trebuchet.partA.solve(input);

      expect(output).toBe(142);
    });

    it("should solve the puzzle input", async () => {
      const input = await trebuchet.partA.getPuzzleInput();

      const output = trebuchet.partA.solve(input);

      expect(output).toBe(56_049);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await trebuchet.partB.getExampleInput();

      const output = trebuchet.partB.solve(input);

      expect(output).toBe(281);
    });

    it("should solve the puzzle input", async () => {
      const input = await trebuchet.partB.getPuzzleInput();

      const output = trebuchet.partB.solve(input);

      expect(output).toBe(54_530);
    });
  });
});
