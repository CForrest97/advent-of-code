import { mirageMaintenance } from "./mirageMaintenance";

describe("2023/09", () => {
  describe("part A", () => {
    it("should solve the example input", async () => {
      const input = await mirageMaintenance.partA.getExampleInput();

      const output = mirageMaintenance.partA.solve(input);

      expect(output).toBe(114);
    });

    it("should solve the puzzle input", async () => {
      const input = await mirageMaintenance.partA.getPuzzleInput();

      const output = mirageMaintenance.partA.solve(input);

      expect(output).toBe(1_798_691_765);
    });
  });

  describe("part B", () => {
    it("should solve the example input", async () => {
      const input = await mirageMaintenance.partB.getExampleInput();

      const output = mirageMaintenance.partB.solve(input);

      expect(output).toBe(2);
    });

    it("should solve the puzzle input", async () => {
      const input = await mirageMaintenance.partB.getPuzzleInput();

      const output = mirageMaintenance.partB.solve(input);

      expect(output).toBe(1_104);
    });
  });
});
