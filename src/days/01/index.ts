import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { add, reduce } from "ramda";
import { parseNumbers } from "../../helpers/parsers";

const parseInventories = (inventories: string): number[][] =>
  inventories.split("\n\n").map(parseNumbers);

const sumMaxCalories = (
  inventories: number[][],
  numberOfElves: number
): number => {
  const caloriesQueue = new MinPriorityQueue<number>();

  const pushToQueue = (calories: number) => {
    caloriesQueue.push(calories);
    if (caloriesQueue.size() > numberOfElves) caloriesQueue.pop();
  };

  const calorieTotals = inventories.map(reduce(add, 0));
  calorieTotals.forEach(pushToQueue);

  return caloriesQueue.toArray().reduce(add);
};

export const solvePart1 = (input: string) =>
  sumMaxCalories(parseInventories(input), 1);
export const solvePart2 = (input: string) =>
  sumMaxCalories(parseInventories(input), 3);
