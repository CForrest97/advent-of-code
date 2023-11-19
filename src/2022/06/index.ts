import { range } from "ramda";

const getSizeOfMarker = (n: number) => (input: string) => {
  for (let i = 0; ; i += 1) {
    const set = new Set(range(i, i + n).map((j) => input.charAt(j)));
    if (set.size === n) return i + n;
  }
};

export const solvePart1 = getSizeOfMarker(4);
export const solvePart2 = getSizeOfMarker(14);
