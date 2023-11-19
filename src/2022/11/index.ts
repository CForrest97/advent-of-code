/* eslint-disable no-param-reassign */
import { map, negate, prop, sortBy, take } from "ramda";

export type Monkey = {
  items: number[];
  operate: (n: number) => number;
  divisor: number;
  trueTarget: number;
  falseTarget: number;
  count: number;
};
const isDivisible = (n: number, d: number): boolean => n % d === 0;

const solve = (
  monkeys: Monkey[],
  numberOfRounds: number,
  worryDivisor: number
) => {
  const base = monkeys.map(prop("divisor")).reduce((a, b) => a * b, 1);

  for (let i = 0; i < numberOfRounds; i += 1) {
    monkeys.forEach((monkey) => {
      monkey.items
        .map((item) => Math.floor(monkey.operate(item) / worryDivisor) % base)
        .forEach((worryLevel) => {
          const target = isDivisible(worryLevel, monkey.divisor)
            ? monkey.trueTarget
            : monkey.falseTarget;
          monkeys[target].items.push(worryLevel);
        });

      monkey.count += monkey.items.length;
      monkey.items = [];
    });
  }

  const [top, second] = take(2, sortBy(negate)(map(prop("count"), monkeys)));
  return top * second;
};

export const solvePart1 = (monkeys: Monkey[]) => solve(monkeys, 20, 3);
export const solvePart2 = (monkeys: Monkey[]) => solve(monkeys, 10000, 1);
