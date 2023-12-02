/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { parseNumber } from "../../helpers/parsers";
import { Day } from "../../helpers/types";

type Recipe = {
  value: number;
  right: Recipe;
};

const combineRecipes = (
  recipe1: Recipe,
  recipe2: Recipe,
  lastRecipe: Recipe,
): [Recipe] | [Recipe, Recipe] => {
  const sum = recipe1.value + recipe2.value;
  if (sum < 10) {
    const newRecipe: Recipe = {
      right: lastRecipe.right,
      value: sum,
    };
    lastRecipe.right = newRecipe;
    return [newRecipe];
  }
  const secondRecipe: Recipe = {
    right: lastRecipe.right,
    value: sum % 10,
  };
  const firstRecipe: Recipe = {
    right: secondRecipe,
    value: 1,
  };

  lastRecipe.right = firstRecipe;

  return [firstRecipe, secondRecipe];
};

const initialiseRecipes = (): [Recipe, Recipe] => {
  const recipe1: Recipe = {
    value: 3,
    right: {} as Recipe,
  };
  const recipe2: Recipe = {
    right: recipe1,
    value: 7,
  };
  recipe1.right = recipe2;

  return [recipe1, recipe2];
};

const solve1 = (numberOfWarmupRecipes: number): number => {
  let numberOfRecipesMade = 2;
  let [elf1, elf2] = initialiseRecipes();
  const firstRecipe = elf1;
  let lastRecipe = elf2;

  while (numberOfRecipesMade < numberOfWarmupRecipes + 10) {
    const newRecipes = combineRecipes(elf1, elf2, lastRecipe);
    numberOfRecipesMade += newRecipes.length;
    lastRecipe = newRecipes.at(-1)!;

    const elf1Steps = elf1.value + 1;
    const elf2Steps = elf2.value + 1;

    for (let i = 0; i < elf1Steps; i += 1) elf1 = elf1.right;
    for (let i = 0; i < elf2Steps; i += 1) elf2 = elf2.right;
  }

  let recipe = firstRecipe;
  for (let _ = 0; _ < numberOfWarmupRecipes; _ += 1) recipe = recipe.right;

  let s = "";

  for (let _ = 0; _ < 10; _ += 1) {
    s += recipe.value;
    recipe = recipe.right;
  }

  return parseNumber(s);
};

const compareRecipes = (recipe: Recipe, numbers: number[]): boolean => {
  let currentRecipe = recipe;

  for (const n of numbers) {
    if (currentRecipe.value !== n) return false;
    currentRecipe = currentRecipe.right;
  }

  return true;
};

const solve2 = (target: number[]): number => {
  let [elf1, elf2] = initialiseRecipes();
  let numberOfRecipes = 2;
  let numberOfRecipesToLeft = 0;

  let lastRecipe = elf2;
  let currentRecipe = elf1;

  while (true) {
    while (numberOfRecipes - numberOfRecipesToLeft < target.length) {
      const newRecipes = combineRecipes(elf1, elf2, lastRecipe);
      numberOfRecipes += newRecipes.length;
      lastRecipe = newRecipes.at(-1)!;

      const elf1Steps = elf1.value + 1;
      const elf2Steps = elf2.value + 1;

      for (let i = 0; i < elf1Steps; i += 1) elf1 = elf1.right;
      for (let i = 0; i < elf2Steps; i += 1) elf2 = elf2.right;
    }

    if (compareRecipes(currentRecipe, target)) return numberOfRecipesToLeft;

    currentRecipe = currentRecipe.right;
    numberOfRecipesToLeft += 1;
  }
};

const solvePartA = (numberOfWarmupRecipes: number) =>
  solve1(numberOfWarmupRecipes);
const solvePartB = (numberOfWarmupRecipes: number) =>
  solve2(numberOfWarmupRecipes.toString().split("").map(parseNumber));

export const chocolateCharts: Day<number> = {
  day: 14,
  year: 2018,
  partA: {
    getExampleInput: async () => 2_018,
    getPuzzleInput: async () => 580_741,
    solve: solvePartA,
  },
  partB: {
    getExampleInput: async () => 59_414,
    getPuzzleInput: async () => 580_741,
    solve: solvePartB,
  },
};
