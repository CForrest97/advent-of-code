import { chronalCharge } from "./chronalCharge";

describe("2018/11", () => {
  describe("part A", () => {
    it("should solve the simple input", async () => {
      const input = await chronalCharge.partA.getExampleInput();

      const output = chronalCharge.partA.solve(input);

      expect(output).toBe("21,61");
    });

    it("should solve the puzzle input", async () => {
      const input = await chronalCharge.partA.getPuzzleInput();

      const output = chronalCharge.partA.solve(input);

      expect(output).toBe("20,43");
    });
  });

  describe("part B", () => {
    it("should solve the simple input", async () => {
      const input = await chronalCharge.partB.getExampleInput();

      const output = chronalCharge.partB.solve(input);

      expect(output).toBe("232,251,12");
    });

    it("should solve the puzzle input", async () => {
      const input = await chronalCharge.partB.getPuzzleInput();

      const output = chronalCharge.partB.solve(input);

      expect(output).toBe("233,271,13");
    });
  });
});
