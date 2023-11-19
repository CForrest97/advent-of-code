import { add, multiply } from "ramda";
import { Monkey, solvePart1, solvePart2 } from "./index";
import { InputType } from "../../helpers/readInput";

const simpleInput = (): Monkey[] => [
  {
    items: [79, 98],
    operate: multiply(19),
    trueTarget: 2,
    falseTarget: 3,
    count: 0,
    divisor: 23,
  },
  {
    items: [54, 65, 75, 74],
    operate: add(6),
    trueTarget: 2,
    falseTarget: 0,
    count: 0,
    divisor: 19,
  },
  {
    items: [79, 60, 97],
    operate: (n) => n * n,
    trueTarget: 1,
    falseTarget: 3,
    count: 0,
    divisor: 13,
  },
  {
    items: [74],
    operate: add(3),
    trueTarget: 0,
    falseTarget: 1,
    count: 0,
    divisor: 17,
  },
];

const puzzleInput = (): Monkey[] => [
  {
    items: [85, 79, 63, 72],
    operate: multiply(17),
    trueTarget: 2,
    falseTarget: 6,
    count: 0,
    divisor: 2,
  },
  {
    items: [53, 94, 65, 81, 93, 73, 57, 92],
    operate: (n) => n * n,
    trueTarget: 0,
    falseTarget: 2,
    count: 0,
    divisor: 7,
  },
  {
    items: [62, 63],
    operate: add(7),
    trueTarget: 7,
    falseTarget: 6,
    count: 0,
    divisor: 13,
  },
  {
    items: [57, 92, 56],
    operate: add(4),
    trueTarget: 4,
    falseTarget: 5,
    count: 0,
    divisor: 5,
  },
  {
    items: [67],
    operate: add(5),
    trueTarget: 1,
    falseTarget: 5,
    count: 0,
    divisor: 3,
  },
  {
    items: [85, 56, 66, 72, 57, 99],
    operate: add(6),
    trueTarget: 1,
    falseTarget: 0,
    count: 0,
    divisor: 19,
  },
  {
    items: [86, 65, 98, 97, 69],
    operate: multiply(13),
    trueTarget: 3,
    falseTarget: 7,
    count: 0,
    divisor: 11,
  },
  {
    items: [87, 68, 92, 66, 91, 50, 68],
    operate: add(2),
    trueTarget: 4,
    falseTarget: 3,
    count: 0,
    divisor: 17,
  },
];

describe("Day 11", () => {
  describe.each<[InputType, () => Monkey[], number, number]>([
    ["simpleInput", simpleInput, 10605, 2713310158],
    ["puzzleInput", puzzleInput, 118674, 32333418600],
  ])("%s", (filename, monkeys, expectedPart1, expectedPart2) => {
    it("should solve part 1", async () => {
      expect(solvePart1(monkeys())).toBe(expectedPart1);
    });

    it("should solve part 2", async () => {
      expect(solvePart2(monkeys())).toBe(expectedPart2);
    });
  });
});
