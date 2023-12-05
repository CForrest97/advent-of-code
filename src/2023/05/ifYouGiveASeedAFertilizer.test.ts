import { ifYouGiveASeedAFertilizer } from "./ifYouGiveASeedAFertilizer";

describe(`2023/05`, () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await ifYouGiveASeedAFertilizer.partA.getExampleInput();

      const output = ifYouGiveASeedAFertilizer.partA.solve(input);

      expect(output).toBe(35);
    });

    it("should solve the puzzle input", async () => {
      const input = await ifYouGiveASeedAFertilizer.partA.getPuzzleInput();

      const output = ifYouGiveASeedAFertilizer.partA.solve(input);

      expect(output).toBe(240_320_250);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await ifYouGiveASeedAFertilizer.partB.getExampleInput();

      const output = ifYouGiveASeedAFertilizer.partB.solve(input);

      expect(output).toBe(46);
    });

    it("should solve the puzzle input", async () => {
      const input = await ifYouGiveASeedAFertilizer.partB.getPuzzleInput();

      const output = ifYouGiveASeedAFertilizer.partB.solve(input);

      expect(output).toBe(28_580_589);
    });
  });
});
