import { camelCards } from "./camelCards";

describe("2023/7", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await camelCards.partA.getExampleInput();

      const output = camelCards.partA.solve(input);

      expect(output).toBe(6_440);
    });

    it("should solve the puzzle input", async () => {
      const input = await camelCards.partA.getPuzzleInput();

      const output = camelCards.partA.solve(input);

      expect(output).toBe(250_120_186);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await camelCards.partB.getExampleInput();

      const output = camelCards.partB.solve(input);

      expect(output).toBe(5_905);
    });

    it("should solve the puzzle input", async () => {
      const input = await camelCards.partB.getPuzzleInput();

      const output = camelCards.partB.solve(input);

      expect(output).toBe(250_665_248);
    });
  });
});
