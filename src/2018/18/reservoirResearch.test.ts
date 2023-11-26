import { reservoirResearch } from "./reservoirResearch";

describe("2018/18", () => {
  describe("part 1", () => {
    it("should solve the simple input", async () => {
      const input = await reservoirResearch.getSimpleInput();

      const output = reservoirResearch.solvePart1(input);

      expect(output).toBe(57);
    });

    it("should solve the puzzle input", async () => {
      const input = await reservoirResearch.getPuzzleInput();

      const output = reservoirResearch.solvePart1(input);

      expect(output).toBe(39_367);
    });
  });

  describe("part 2", () => {
    it("should solve the simple input", async () => {
      const input = await reservoirResearch.getSimpleInput();

      const output = reservoirResearch.solvePart2(input);

      expect(output).toBe(29);
    });
    it("should solve the puzzle input", async () => {
      const input = await reservoirResearch.getPuzzleInput();

      const output = reservoirResearch.solvePart2(input);

      expect(output).toBe(33_061);
    });
  });
});
