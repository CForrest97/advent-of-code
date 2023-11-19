/* eslint-disable no-param-reassign */
import assert from "assert";
import { parseLines, parseNumber } from "../../helpers/parsers";

type Cost = {
  ore: number;
  clay: number;
  obsidian: number;
};

type Blueprint = {
  id: number;
  ore: Cost;
  clay: Cost;
  obsidian: Cost;
  geode: Cost;
};

type Resources = {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
};

const canAfford = (storage: Resources, cost: Cost): boolean =>
  storage.ore >= cost.ore &&
  storage.clay >= cost.clay &&
  storage.obsidian >= cost.obsidian;

let max = 0;

const getMaxGeodes = (
  blueprint: Blueprint,
  storage: Resources,
  workers: Resources,
  nextPurchase: "ore" | "clay" | "obsidian" | "geode",
  remainingTime: number
): void => {
  if (remainingTime === 0) {
    max = Math.max(max, storage.geode);
    return;
  }

  if (
    max - storage.geode >
    ((workers.geode + remainingTime) * (workers.geode + remainingTime + 1)) /
      2 -
      (workers.geode * (workers.geode + 1)) / 2
  )
    return;

  if (canAfford(storage, blueprint[nextPurchase])) {
    storage.ore -= blueprint[nextPurchase].ore;
    storage.clay -= blueprint[nextPurchase].clay;
    storage.obsidian -= blueprint[nextPurchase].obsidian;

    storage.ore += workers.ore;
    storage.clay += workers.clay;
    storage.obsidian += workers.obsidian;
    storage.geode += workers.geode;

    workers[nextPurchase] += 1;

    if (
      workers.ore <
      Math.max(blueprint.geode.ore, blueprint.obsidian.ore, blueprint.clay.ore)
    )
      getMaxGeodes(blueprint, storage, workers, "ore", remainingTime - 1);

    if (workers.clay < blueprint.obsidian.clay)
      getMaxGeodes(blueprint, storage, workers, "clay", remainingTime - 1);

    if (workers.clay > 0 && workers.obsidian < blueprint.geode.obsidian)
      getMaxGeodes(blueprint, storage, workers, "obsidian", remainingTime - 1);

    if (workers.obsidian > 0)
      getMaxGeodes(blueprint, storage, workers, "geode", remainingTime - 1);

    workers[nextPurchase] -= 1;

    storage.ore -= workers.ore;
    storage.clay -= workers.clay;
    storage.obsidian -= workers.obsidian;
    storage.geode -= workers.geode;

    storage.ore += blueprint[nextPurchase].ore;
    storage.clay += blueprint[nextPurchase].clay;
    storage.obsidian += blueprint[nextPurchase].obsidian;
  } else {
    storage.ore += workers.ore;
    storage.clay += workers.clay;
    storage.obsidian += workers.obsidian;
    storage.geode += workers.geode;

    getMaxGeodes(blueprint, storage, workers, nextPurchase, remainingTime - 1);

    storage.ore -= workers.ore;
    storage.clay -= workers.clay;
    storage.obsidian -= workers.obsidian;
    storage.geode -= workers.geode;
  }
};

const parseBlueprints = (lines: string[]): Blueprint[] =>
  lines.map((line) => {
    const match = line.match(
      /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./
    );
    assert(match, `cannot parse line ${line}`);

    const [
      ,
      id,
      oreOreCost,
      clayOreCost,
      obsidianOreCost,
      obsidianClayCost,
      geodeOreCost,
      geodeObsidianCost,
    ] = match;

    return {
      id: parseNumber(id),
      ore: {
        ore: parseNumber(oreOreCost),
        clay: 0,
        obsidian: 0,
      },
      clay: {
        ore: parseNumber(clayOreCost),
        clay: 0,
        obsidian: 0,
      },
      obsidian: {
        ore: parseNumber(obsidianOreCost),
        clay: parseNumber(obsidianClayCost),
        obsidian: 0,
      },
      geode: {
        ore: parseNumber(geodeOreCost),
        clay: 0,
        obsidian: parseNumber(geodeObsidianCost),
      },
    };
  });

const solve = (blueprints: Blueprint[]): number => {
  let total = 0;
  blueprints.forEach((blueprint) => {
    max = 0;
    getMaxGeodes(
      blueprint,
      { ore: 0, clay: 0, obsidian: 0, geode: 0 },
      { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      "ore",
      24
    );
    getMaxGeodes(
      blueprint,
      { ore: 0, clay: 0, obsidian: 0, geode: 0 },
      { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      "clay",
      24
    );
    total += max * blueprint.id;
  });

  return total;
};

const solve2 = (blueprints: Blueprint[]): number => {
  const results = blueprints.slice(0, 3).map((blueprint) => {
    max = 0;
    getMaxGeodes(
      blueprint,
      { ore: 0, clay: 0, obsidian: 0, geode: 0 },
      { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      "ore",
      32
    );
    getMaxGeodes(
      blueprint,
      { ore: 0, clay: 0, obsidian: 0, geode: 0 },
      { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      "clay",
      32
    );
    return max;
  });

  return results.reduce((a, b) => a * b);
};

export const solvePart1 = (input: string) =>
  solve(parseBlueprints(parseLines(input)));
export const solvePart2 = (input: string) =>
  solve2(parseBlueprints(parseLines(input)));
