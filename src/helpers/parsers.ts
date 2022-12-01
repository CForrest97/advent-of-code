import { map } from "ramda";

export const splitLines = (s: string): string[] => s.split("\n");

export const parseNumber = (s: string): number => parseInt(s, 10);

export const parseNumbers: (lines: string[]) => number[] = map(parseNumber);
