import { cubeConundrum } from "./cubeConundrum";

describe("2023/02", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await cubeConundrum.partA.getExampleInput();

      const output = cubeConundrum.partA.solve(input);

      expect(output).toBe(8);
    });

    it("should solve the puzzle input", async () => {
      const input = await cubeConundrum.partA.getPuzzleInput();

      const output = cubeConundrum.partA.solve(input);

      expect(output).toBe(2_317);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await cubeConundrum.partB.getExampleInput();

      const output = cubeConundrum.partB.solve(input);

      expect(output).toBe(2_286);
    });

    it("should solve the puzzle input", async () => {
      const input = await cubeConundrum.partB.getPuzzleInput();

      const output = cubeConundrum.partB.solve(input);

      expect(output).toBe(74_804);
    });
  });
});
