import { reservoirResearch } from "./reservoirResearch";

describe("2018/17", () => {
  describe("part A", () => {
    it("should solve the simple input", async () => {
      const input = await reservoirResearch.partA.getExampleInput();

      const output = reservoirResearch.partA.solve(input);

      expect(output).toBe(57);
    });

    it("should solve the puzzle input", async () => {
      const input = await reservoirResearch.partA.getPuzzleInput();

      const output = reservoirResearch.partA.solve(input);

      expect(output).toBe(39_367);
    });
  });

  describe("part B", () => {
    it("should solve the simple input", async () => {
      const input = await reservoirResearch.partB.getExampleInput();

      const output = reservoirResearch.partB.solve(input);

      expect(output).toBe(29);
    });
    it("should solve the puzzle input", async () => {
      const input = await reservoirResearch.partB.getPuzzleInput();

      const output = reservoirResearch.partB.solve(input);

      expect(output).toBe(33_061);
    });
  });
});
