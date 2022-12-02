import { compose, map } from "ramda";

export const parseLines = (s: string): string[] => s.split("\n");

const parseNumber = (s: string): number => parseInt(s, 10);

export const parseNumbers: (s: string) => number[] = compose(
  map(parseNumber),
  parseLines
);
