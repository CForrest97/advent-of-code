import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { compose, map, split, sum } from "ramda";
import { parseNumbers } from "../../helpers/parsers";

const parseInventories = compose(map(parseNumbers), split("\n\n"));

const sumMaxCalories = (
  inventories: number[][],
  numberOfElves: number
): number => {
  const caloriesQueue = new MinPriorityQueue<number>();

  const pushToQueue = (calories: number) => {
    caloriesQueue.push(calories);
    if (caloriesQueue.size() > numberOfElves) caloriesQueue.pop();
  };

  const calorieTotals = map(sum, inventories);
  calorieTotals.forEach(pushToQueue);

  return sum(caloriesQueue.toArray());
};

export const solvePart1 = (input: string) =>
  sumMaxCalories(parseInventories(input), 1);
export const solvePart2 = (input: string) =>
  sumMaxCalories(parseInventories(input), 3);
