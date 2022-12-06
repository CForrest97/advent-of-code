import { range } from "ramda";

const solve = (n: number) => (input: string) => {
  for (let i = 0; ; i += 1) {
    const set = new Set(range(i, i + n).map((j) => input.charAt(j)));
    if (set.size === n) return i + n;
  }
};

export const solvePart1 = solve(4);
export const solvePart2 = solve(14);
