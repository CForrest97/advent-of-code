/* eslint-disable no-param-reassign */
import { parseNumber } from "../../helpers/parsers";
import { Day } from "../../helpers/types";

type Recipe = {
  value: number;
  left: Recipe;
  right: Recipe;
  id: number;
};

type ParsedInput = {
  elf1: Recipe;
  elf2: Recipe;
  lastRecipe: Recipe;
};

const combineRecipes = (
  recipe1: Recipe,
  recipe2: Recipe,
  lastRecipe: Recipe,
): Recipe => {
  const sum = recipe1.value + recipe2.value;
  if (sum < 10) {
    const newRecipe: Recipe = {
      left: lastRecipe,
      right: lastRecipe.right,
      value: sum,
      id: lastRecipe.id + 1,
    };
    lastRecipe.right.left = newRecipe;
    lastRecipe.right = newRecipe;
    return newRecipe;
  }
  const firstRecipe: Recipe = {
    left: lastRecipe,
    right: lastRecipe,
    value: 1,
    id: lastRecipe.id + 1,
  };
  const secondRecipe: Recipe = {
    left: firstRecipe,
    right: lastRecipe.right,
    value: sum % 10,
    id: lastRecipe.id + 2,
  };

  lastRecipe.right.left = secondRecipe;
  lastRecipe.right = firstRecipe;
  firstRecipe.right = secondRecipe;

  return secondRecipe;
};

const parseInput = (input: string): ParsedInput => {
  const values = input.split("");
  const recipes: any[] = values.map((value, id) => ({
    value: parseNumber(value),
    left: null,
    right: null,
    id: id + 1,
  }));

  recipes.forEach((recipe, i) => {
    recipe.left = recipes.at(i - 1);
    recipe.right = recipes.at((i + 1) % recipes.length);
  });

  return {
    elf1: recipes.at(0)!,
    elf2: recipes.at(1)!,
    lastRecipe: recipes.at(-1)!,
  };
};

const solve1 = (input: ParsedInput): number => {
  let { elf1, elf2, lastRecipe } = input;

  while (lastRecipe.id <= 580_741 + 10) {
    lastRecipe = combineRecipes(elf1, elf2, lastRecipe);
    const elf1Steps = elf1.value + 1;
    const elf2Steps = elf2.value + 1;

    for (let i = 0; i < elf1Steps; i += 1) elf1 = elf1.right;
    for (let i = 0; i < elf2Steps; i += 1) elf2 = elf2.right;
  }

  const arr = [];
  if (lastRecipe.id > 580_741 + 10) {
    lastRecipe = lastRecipe.left;
  }
  while (arr.length < 10) {
    arr.unshift(lastRecipe.value);
    lastRecipe = lastRecipe.left;
  }

  return parseNumber(arr.join(""));
};

const solve2 = (input: ParsedInput, target: string): number => {
  let { elf1, elf2, lastRecipe } = input;

  for (let tick = 1; ; tick += 1) {
    if (tick % 100000 === 0) console.log(tick);

    lastRecipe = combineRecipes(elf1, elf2, lastRecipe);
    const elf1Steps = elf1.value + 1;
    const elf2Steps = elf2.value + 1;

    for (let i = 0; i < elf1Steps; i += 1) elf1 = elf1.right;
    for (let i = 0; i < elf2Steps; i += 1) elf2 = elf2.right;

    const arr = [];

    let last = lastRecipe;

    while (arr.length < target.length) {
      arr.unshift(last.value);
      last = last.left;
    }
    if (arr.join("") === target) {
      return lastRecipe.id - target.length;
    }

    const arr2 = [];

    let last2 = lastRecipe.left;

    while (arr2.length < target.length) {
      arr2.unshift(last2.value);
      last2 = last2.left;
    }

    if (arr2.join("") === target) {
      return lastRecipe.left.id - target.length;
    }
  }
};

const solvePart1 = (input: string) => solve1(parseInput(input));
const solvePart2 = (input: string) => solve2(parseInput("37"), input);

export const chocolateCharts: Day = {
  day: 14,
  year: 2018,
  getSimpleInput: async () => "580741",
  getPuzzleInput: async () => "580741",
  solvePart1,
  solvePart2,
};
