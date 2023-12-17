import { clumsyCrucible } from "./clumsyCrucible";

describe("2023/17", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await clumsyCrucible.partA.getExampleInput();

      const output = clumsyCrucible.partA.solve(input);

      expect(output).toBe(102);
    });

    it("should solve the puzzle input", async () => {
      const input = await clumsyCrucible.partA.getPuzzleInput();

      const output = clumsyCrucible.partA.solve(input);

      expect(output).toBe(907);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await clumsyCrucible.partB.getExampleInput();

      const output = clumsyCrucible.partB.solve(input);

      expect(output).toBe(94);
    });

    it("should solve the puzzle input", async () => {
      const input = await clumsyCrucible.partB.getPuzzleInput();

      const output = clumsyCrucible.partB.solve(input);

      expect(output).toBe(1_057);
    });
  });
});
