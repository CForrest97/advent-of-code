import { add } from "ramda";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";
import { parseNumber } from "../../helpers/parsers";

type Lens = {
  label: string;
  focalLength: number;
};

type RemoveLens = {
  operation: "remove";
  box: number;
  lensLabel: string;
};

type AddLens = {
  operation: "add";
  box: number;
  lens: Lens;
};

type Step = AddLens | RemoveLens;

const hash = (s: string) =>
  s
    .split("")
    .map((char) => char.codePointAt(0)!)
    .reduce((curr, code) => ((curr + code) * 17) % 256, 0);

const parseSteps = (input: string) =>
  input.split(",").map((step): Step => {
    if (step.includes("-")) {
      return {
        operation: "remove",
        box: hash(step.slice(0, -1)),
        lensLabel: step.slice(0, -1),
      };
    }

    const [label, focalLength] = step.split("=");

    return {
      operation: "add",
      box: hash(label),
      lens: {
        label,
        focalLength: parseNumber(focalLength),
      },
    };
  });

const solvePartA = (input: string) => input.split(",").map(hash).reduce(add);

const solvePartB = (input: string) => {
  const steps = parseSteps(input);
  const boxes: Lens[][] = Array.from({ length: 256 }, () => []);

  steps.forEach((step) => {
    if (step.operation === "remove") {
      boxes[step.box] = boxes[step.box].filter(
        (l) => l.label !== step.lensLabel,
      );
    } else {
      const index = boxes[step.box].findIndex(
        (l) => l.label === step.lens.label,
      );

      if (index === -1) {
        boxes[step.box].push(step.lens);
      } else {
        boxes[step.box][index] = step.lens;
      }
    }
  });

  return boxes
    .map(
      (box, i) =>
        (i + 1) *
        box.map((lens, j) => lens.focalLength * (j + 1)).reduce(add, 0),
    )
    .reduce(add);
};

export const lensLibrary: Day = {
  day: 15,
  year: 2023,
  partA: {
    getExampleInput: () => readInput(__dirname, "input/example"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartA,
  },
  partB: {
    getExampleInput: () => readInput(__dirname, "input/example"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartB,
  },
};
