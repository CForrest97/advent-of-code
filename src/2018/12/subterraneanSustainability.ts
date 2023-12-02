import { add } from "ramda";
import { parseLines } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Pot = { hasPlant: boolean; potIndex: number };
type Rule = {
  before: [boolean, boolean, boolean, boolean, boolean];
  after: boolean;
};

type ParsedInput = { initialState: Pot[]; rules: Rule[] };
const toBool = (char: string) => char === "#";

const parseInput = (input: string): ParsedInput => {
  const [stateLine, , ...ruleLines] = parseLines(input);

  const initialState: Pot[] = stateLine
    .slice(15)
    .split("")
    .map((char, potIndex) => ({ hasPlant: toBool(char), potIndex }));

  const rules: Rule[] = ruleLines.map((line) => ({
    before: [
      toBool(line.charAt(0)),
      toBool(line.charAt(1)),
      toBool(line.charAt(2)),
      toBool(line.charAt(3)),
      toBool(line.charAt(4)),
    ],
    after: line.at(-1) === "#",
  }));

  return {
    initialState,
    rules,
  };
};

const buildGetNextState =
  (rules: Rule[]) =>
  (plants: Rule["before"]): boolean => {
    const matchingRule = rules.find(
      (rule) =>
        rule.before[0] === plants[0] &&
        rule.before[1] === plants[1] &&
        rule.before[2] === plants[2] &&
        rule.before[3] === plants[3] &&
        rule.before[4] === plants[4],
    );

    return matchingRule?.after ?? false;
  };

const getPlantsAfterNGenerations = (
  numberOfGenerations: number,
  { initialState, rules }: ParsedInput,
) => {
  let state = initialState;
  const getNextState = buildGetNextState(rules);

  for (let generation = 0; generation < numberOfGenerations; generation += 1) {
    const firstPotIndex = state[0].potIndex;
    const lastPotIndex = state.at(-1)!.potIndex;
    state = [
      { hasPlant: false, potIndex: firstPotIndex - 4 },
      { hasPlant: false, potIndex: firstPotIndex - 3 },
      { hasPlant: false, potIndex: firstPotIndex - 2 },
      { hasPlant: false, potIndex: firstPotIndex - 1 },
      ...state,
      { hasPlant: false, potIndex: lastPotIndex + 1 },
      { hasPlant: false, potIndex: lastPotIndex + 2 },
      { hasPlant: false, potIndex: lastPotIndex + 3 },
      { hasPlant: false, potIndex: lastPotIndex + 4 },
    ];
    const nextState: Pot[] = [];

    for (let i = 0; i < state.length - 5; i += 1) {
      nextState.push({
        potIndex: state[i + 2].potIndex,
        hasPlant: getNextState([
          state[i + 0].hasPlant,
          state[i + 1].hasPlant,
          state[i + 2].hasPlant,
          state[i + 3].hasPlant,
          state[i + 4].hasPlant,
        ]),
      });
    }
    state = nextState;
  }

  return state
    .map(({ hasPlant, potIndex }) => (hasPlant ? potIndex : 0))
    .reduce(add);
};

const predictPlantsAfterManyGenerations = (
  numberOfGenerations: number,
  parsedInput: ParsedInput,
) => {
  const after100 = getPlantsAfterNGenerations(100, parsedInput);
  const after101 = getPlantsAfterNGenerations(101, parsedInput);

  return after100 + (numberOfGenerations - 100) * (after101 - after100);
};

const solvePartA = (input: string) =>
  getPlantsAfterNGenerations(20, parseInput(input));
const solvePartB = (input: string) =>
  predictPlantsAfterManyGenerations(50_000_000_000, parseInput(input));

export const subterraneanSustainability: Day = {
  day: 12,
  year: 2018,
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
