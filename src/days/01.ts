import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { add } from "ramda";

const parseInput = (input: string): number[][] =>
  input.split("\n\n").map((elf) => elf.split("\n").map((s) => parseInt(s, 10)));

const solve = (elfCalories: number[][], capacity: number) => {
  const caloriesQueue = new MinPriorityQueue<number>();

  elfCalories.forEach((calories) => {
    const totalCalories = calories.reduce(add);
    caloriesQueue.push(totalCalories);
    if (caloriesQueue.size() > capacity) caloriesQueue.pop();
  });

  return caloriesQueue.toArray().reduce(add);
};

export const solvePart1 = (input: string) => solve(parseInput(input), 1);
export const solvePart2 = (input: string) => solve(parseInput(input), 3);
