import { pipeMaze } from "./pipeMaze";

describe("2023/10", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await pipeMaze.partA.getExampleInput();

      const output = pipeMaze.partA.solve(input);

      expect(output).toBe(8);
    });

    it("should solve the puzzle input", async () => {
      const input = await pipeMaze.partA.getPuzzleInput();

      const output = pipeMaze.partA.solve(input);

      expect(output).toBe(6_882);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await pipeMaze.partB.getExampleInput();

      const output = pipeMaze.partB.solve(input);

      expect(output).toBe(10);
    });

    it("should solve the puzzle input", async () => {
      const input = await pipeMaze.partB.getPuzzleInput();

      const output = pipeMaze.partB.solve(input);

      expect(output).toBe(491);
    });
  });
});
