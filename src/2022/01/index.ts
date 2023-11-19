import { compose, map, negate, sortBy, split, sum, take } from "ramda";
import { parseNumbers } from "../../helpers/parsers";

const sumMaxCalories = (numberOfElves: number) =>
  compose(
    sum,
    take(numberOfElves),
    sortBy(negate),
    map(sum),
    map(parseNumbers),
    split("\n\n")
  );

export const solvePart1 = sumMaxCalories(1);
export const solvePart2 = sumMaxCalories(3);
