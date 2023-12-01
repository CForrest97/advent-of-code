type Part<Input = string, Output = number> = {
  getExampleInput: () => Promise<Input>;
  getPuzzleInput: () => Promise<Input>;
  solve: (input: Input) => Output;
};

export type Day<Input = string, Output = number> = {
  day: number;
  year: number;
  partA: Part<Input, Output>;
  partB: Part<Input, Output>;
};
