import { waitForIt } from "./waitForIt";

describe("2023/6", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await waitForIt.partA.getExampleInput();

      const output = waitForIt.partA.solve(input);

      expect(output).toBe(288);
    });

    it("should solve the puzzle input", async () => {
      const input = await waitForIt.partA.getPuzzleInput();

      const output = waitForIt.partA.solve(input);

      expect(output).toBe(160_816);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await waitForIt.partB.getExampleInput();

      const output = waitForIt.partB.solve(input);

      expect(output).toBe(71_503);
    });

    it("should solve the puzzle input", async () => {
      const input = await waitForIt.partB.getPuzzleInput();

      const output = waitForIt.partB.solve(input);

      expect(output).toBe(46_561_107);
    });
  });
});
