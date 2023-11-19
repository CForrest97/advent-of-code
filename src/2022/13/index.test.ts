import { Packet, solvePart1, solvePart2 } from "./index";
import { pairs as simpleInput } from "./simpleInput";
import { pairs as puzzleInput } from "./puzzleInput";

describe("Day 13", () => {
  describe.each<[string, [Packet, Packet][], number, number]>([
    ["simpleInput", simpleInput, 13, 140],
    ["puzzleInput", puzzleInput, 5003, 20280],
  ])("%s", (_, pairs, expectedPart1, expectedPart2) => {
    it("should solve part 1", async () => {
      expect(solvePart1(pairs)).toBe(expectedPart1);
    });

    it("should solve part 2", async () => {
      expect(solvePart2(pairs)).toBe(expectedPart2);
    });
  });
});
