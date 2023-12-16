import { lensLibrary } from "./lensLibrary";

describe("2023/15", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await lensLibrary.partA.getExampleInput();

      const output = lensLibrary.partA.solve(input);

      expect(output).toBe(1_320);
    });

    it("should solve the puzzle input", async () => {
      const input = await lensLibrary.partA.getPuzzleInput();

      const output = lensLibrary.partA.solve(input);

      expect(output).toBe(505_427);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await lensLibrary.partB.getExampleInput();

      const output = lensLibrary.partB.solve(input);

      expect(output).toBe(145);
    });

    it("should solve the puzzle input", async () => {
      const input = await lensLibrary.partB.getPuzzleInput();

      const output = lensLibrary.partB.solve(input);

      expect(output).toBe(243_747);
    });
  });
});
