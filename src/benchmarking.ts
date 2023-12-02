import b, { suite } from "benny";
import assert from "assert";
import * as year2018 from "./2018";
import * as year2023 from "./2023";
import { Day } from "./helpers/types";
import { parseNumber } from "./helpers/parsers";

const days: Day[] = [
  ...Object.values(year2018),
  ...Object.values(year2023),
] as any;

const benchmarkDay = (day: Day) => {
  const scores: string[] = [];

  suite(
    `Year ${day.year} Day ${day.day} performance results`,
    b.add("partA", async () => {
      const input = await day.partA.getPuzzleInput();
      return day.partA.solve(input);
    }),
    b.add("partB", async () => {
      const input = await day.partB.getPuzzleInput();
      return day.partB.solve(input);
    }),
    b.cycle((result) => {
      const meanDuration = (result.details.mean * 1000).toFixed(1);
      console.log(`${result.name}: ${meanDuration}ms`);
      scores.push(meanDuration);
    }),
    b.complete(() => {
      console.log(`| ${day.day}   | ${scores[0]}ms | ${scores[1]}ms |`);
    }),
  );
};

const yearInput = process.argv[2];
const dayInput = process.argv[3];

assert(yearInput, "year is required");
assert(dayInput, "year is required");

const day = days.find(
  (d) => d.year === parseNumber(yearInput) && d.day === parseNumber(dayInput),
);

if (!day) {
  console.log(`no day found for ${yearInput}/${dayInput}`);
} else {
  benchmarkDay(day);
}
