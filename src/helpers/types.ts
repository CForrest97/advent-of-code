export type Day<Input = string, Output = number> = {
  day: number;
  year: number;
  getSimpleInput: () => Promise<Input>;
  getPuzzleInput: () => Promise<Input>;
  solvePart1: (input: Input) => Output;
  solvePart2: (input: Input) => Output;
};
