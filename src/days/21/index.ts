import assert from "assert";
import { parseLines, parseNumber } from "../../helpers/parsers";

const humanId = "humn";

type Operation = "*" | "+" | "-" | "/";

type Monkey = {
  id: string;
  isHumanDependent: boolean;
  dependents: Monkey[];
} & (
  | {
      type: "operator";
      monkey1: Monkey;
      monkey2: Monkey;
      operation: Operation;
    }
  | { type: "yell"; value: number }
);

const parseMonkeys = (lines: string[]): Monkey[] => {
  const monkeyMap: Map<string, Monkey> = new Map();

  lines.forEach((line) => {
    const id = line.split(":")[0];
    monkeyMap.set(id, {
      id,
      dependents: [] as Monkey[],
      isHumanDependent: false,
    } as Monkey);
  });

  lines.forEach((line) => {
    const [id, tail] = line.split(": ");
    const monkey = monkeyMap.get(id)!;

    if (tail.includes(" ")) {
      const [monkey1, operation, monkey2] = tail.split(" ");

      monkeyMap.get(monkey1)!.dependents.push(monkey);
      monkeyMap.get(monkey2)!.dependents.push(monkey);

      monkey.type = "operator";
      if (monkey.type === "operator") {
        monkey.monkey1 = monkeyMap.get(monkey1)!;
        monkey.monkey2 = monkeyMap.get(monkey2)!;
        monkey.operation = operation as Operation;
      }
    } else {
      monkey.type = "yell";
      if (monkey.type === "yell") {
        monkey.value = parseNumber(tail);
      }
    }
  });

  const monkeys = [...monkeyMap.values()];

  const human = monkeys.find((monkey) => monkey.id === humanId)!;
  const dependents = [human];

  while (dependents.length > 0) {
    const dependent = dependents.pop()!;
    dependent.isHumanDependent = true;
    dependents.push(...dependent.dependents);
  }

  return monkeys;
};

const evaluateMonkeyValue = (monkey: Monkey): number => {
  if (monkey.type === "yell") return monkey.value;

  const monkey1Value = evaluateMonkeyValue(monkey.monkey1);
  const monkey2Value = evaluateMonkeyValue(monkey.monkey2);

  if (monkey.operation === "+") return monkey1Value + monkey2Value;
  if (monkey.operation === "-") return monkey1Value - monkey2Value;
  if (monkey.operation === "*") return monkey1Value * monkey2Value;
  return monkey1Value / monkey2Value;
};

const findRootValue = (monkeys: Monkey[]) => {
  const root = monkeys.find((monkey) => monkey.id === "root")!;

  return evaluateMonkeyValue(root);
};

const findHumanValue = (monkey: Monkey, target: number): number => {
  if (monkey.id === humanId) return target;

  assert(monkey.type === "operator", `monkey ${monkey} is not an operator`);

  const { monkey1, monkey2 } = monkey;

  const dependentMonkey = monkey1.isHumanDependent ? monkey1 : monkey2;
  const independentMonkey = monkey1.isHumanDependent ? monkey2 : monkey1;

  const independentValue = evaluateMonkeyValue(independentMonkey);

  if (monkey.operation === "+") {
    return findHumanValue(dependentMonkey, target - independentValue);
  }

  if (monkey.operation === "*") {
    return findHumanValue(dependentMonkey, target / independentValue);
  }

  if (monkey.operation === "-") {
    if (monkey1.isHumanDependent) {
      return findHumanValue(monkey1, target + independentValue);
    }
    return findHumanValue(monkey2, independentValue - target);
  }

  if (monkey1.isHumanDependent) {
    return findHumanValue(monkey1, target * independentValue);
  }
  return findHumanValue(monkey2, independentValue / target);
};

const findHumanValueFromRoot = (monkeys: Monkey[]) => {
  const root = monkeys.find((monkey) => monkey.id === "root")!;

  assert(root.type === "operator", "root is not an operator");

  const { monkey1, monkey2 } = root;

  const dependentMonkey = monkey1.isHumanDependent ? monkey1 : monkey2;
  const independentMonkey = monkey1.isHumanDependent ? monkey2 : monkey1;

  const target = evaluateMonkeyValue(independentMonkey);

  return findHumanValue(dependentMonkey, target);
};

export const solvePart1 = (input: string) =>
  findRootValue(parseMonkeys(parseLines(input)));
export const solvePart2 = (input: string) =>
  findHumanValueFromRoot(parseMonkeys(parseLines(input)));
