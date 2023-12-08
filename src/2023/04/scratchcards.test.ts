import { scratchcards } from "./scratchcards";

describe("2023/04", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await scratchcards.partA.getExampleInput();

      const output = scratchcards.partA.solve(input);

      expect(output).toBe(13);
    });

    it("should solve the puzzle input", async () => {
      const input = await scratchcards.partA.getPuzzleInput();

      const output = scratchcards.partA.solve(input);

      expect(output).toBe(25_010);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await scratchcards.partB.getExampleInput();

      const output = scratchcards.partB.solve(input);

      expect(output).toBe(30);
    });

    it("should solve the puzzle input", async () => {
      const input = await scratchcards.partB.getPuzzleInput();

      const output = scratchcards.partB.solve(input);

      expect(output).toBe(9_924_412);
    });
  });
});
