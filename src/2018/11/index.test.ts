import { chronalCharge } from "./index";

describe("2023/11", () => {
  describe("part 1", () => {
    it("should solve the simple input", async () => {
      const input = await chronalCharge.getSimpleInput();

      const output = chronalCharge.solvePart1(input);

      expect(output).toBe("21,61");
    });

    it("should solve the puzzle input", async () => {
      const input = await chronalCharge.getPuzzleInput();

      const output = chronalCharge.solvePart1(input);

      expect(output).toBe("20,43");
    });
  });

  describe("part 2", () => {
    it("should solve the simple input", async () => {
      const input = await chronalCharge.getSimpleInput();

      const output = chronalCharge.solvePart2(input);

      expect(output).toBe("232,251,12");
    });

    it("should solve the puzzle input", async () => {
      const input = await chronalCharge.getPuzzleInput();

      const output = chronalCharge.solvePart2(input);

      expect(output).toBe("233,271,13");
    });
  });
});
