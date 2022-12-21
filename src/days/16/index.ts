import assert from "assert";
import { max, xprod } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";

type Valve = {
  id: string;
  flowRate: number;
  connections: Valve[];
};

type ValveGraph = Map<Valve, Map<Valve, number>>;

const buildDistanceMap = (valve: Valve): Map<Valve, number> => {
  const distances = new Map();

  const valves: Valve[] = [valve];
  const seen = new Set<Valve>();

  let distance = 1;

  while (valves.length > 0) {
    const { length } = valves;

    for (let i = 0; i < length; i += 1) {
      const v = valves.shift()!;

      if (v.flowRate > 0) distances.set(v, distance);

      v.connections.forEach((connection) => {
        if (!seen.has(connection)) {
          valves.push(connection);
          seen.add(connection);
        }
      });
    }

    distance += 1;
  }

  return distances;
};

const buildValvesGraph = (valves: Valve[]): ValveGraph => {
  const graph: ValveGraph = new Map();

  valves
    .filter((valve) => valve.flowRate > 0 || valve.id === "AA")
    .forEach((valve) => graph.set(valve, buildDistanceMap(valve)));

  return graph;
};

const parseValves = (lines: string[]): Valve[] => {
  const valves: Map<string, Valve> = new Map();

  const parsedLines = lines.map((line) => {
    const match = line.match(
      /Valve (.*) has flow rate=(\d+); .* .* to valves? (.*)/
    );
    assert(match, `cannot parse ${line}`);
    const [, id, flowRate, connections] = match;

    return { id, flowRate, connections: connections.split(", ") };
  });

  parsedLines.forEach(({ id, flowRate }) => {
    valves.set(id, { id, flowRate: parseNumber(flowRate), connections: [] });
  });

  parsedLines.forEach(({ id, connections }) => {
    connections.forEach((connection) => {
      valves.get(id)!.connections.push(valves.get(connection)!);
    });
  });

  return [...valves.values()];
};

const backtrack1 = (
  graph: ValveGraph,
  valve: Valve,
  seen: Set<Valve>,
  remaining: number
): number => {
  if (remaining <= 0) return 0;

  const connections = [...graph.keys()].filter(
    (connection) => !seen.has(connection)
  );

  const scores = connections.map((connection) => {
    seen.add(connection);

    const distance = graph.get(valve)!.get(connection)!;
    const pressureFromConnection = (remaining - distance) * connection.flowRate;

    const recursivePressure =
      pressureFromConnection > 0
        ? backtrack1(graph, connection, seen, remaining - distance)
        : 0;

    seen.delete(connection);

    return pressureFromConnection + recursivePressure;
  });

  return scores.reduce(max, 0);
};

const backtrack2 = (
  graph: ValveGraph,
  valve1: Valve,
  valve2: Valve,
  distance1: number,
  distance2: number,
  seen: Set<Valve>,
  remaining: number,
  cache: Map<string, number>
): number => {
  if (remaining <= 0) {
    return 0;
  }

  if (distance1 > 0 && distance2 > 0) {
    const min = Math.min(distance1, distance2);

    return backtrack2(
      graph,
      valve1,
      valve2,
      distance1 - min,
      distance2 - min,
      seen,
      remaining - min,
      cache
    );
  }

  const connections = [...graph.keys()].filter(
    (connection) => !seen.has(connection)
  );

  if (distance1 > 0) {
    const scores = connections.map((connection) => {
      seen.add(connection);

      const distance = graph.get(valve2)!.get(connection)!;
      const pressureFromConnection =
        (remaining - distance) * connection.flowRate;

      const recursivePressure =
        pressureFromConnection > 0
          ? backtrack2(
              graph,
              valve1,
              connection,
              distance1 - 1,
              distance - 1,
              seen,
              remaining - 1,
              cache
            )
          : 0;

      seen.delete(connection);

      return pressureFromConnection + recursivePressure;
    });

    return scores.reduce(max, 0);
  }
  if (distance2 > 0) {
    const scores = connections.map((connection) => {
      seen.add(connection);

      const distance = graph.get(valve1)!.get(connection)!;
      const pressureFromConnection =
        (remaining - distance) * connection.flowRate;

      const recursivePressure =
        pressureFromConnection > 0
          ? backtrack2(
              graph,
              connection,
              valve2,
              distance - 1,
              distance2 - 1,
              seen,
              remaining - 1,
              cache
            )
          : 0;

      seen.delete(connection);

      return pressureFromConnection + recursivePressure;
    });

    return scores.reduce(max, 0);
  }

  const scores = xprod(connections, connections).map(
    ([connection1, connection2]) => {
      if (connection1 === connection2) return 0;
      seen.add(connection1);
      seen.add(connection2);

      const connection1Distance = graph.get(valve1)!.get(connection1)!;
      const connection2Distance = graph.get(valve2)!.get(connection2)!;

      const pressureFromConnection1 = Math.max(
        0,
        (remaining - connection1Distance) * connection1.flowRate
      );
      const pressureFromConnection2 = Math.max(
        0,
        (remaining - connection2Distance) * connection2.flowRate
      );

      const recursivePressure = backtrack2(
        graph,
        connection1,
        connection2,
        connection1Distance - 1,
        connection2Distance - 1,
        seen,
        remaining - 1,
        cache
      );

      seen.delete(connection1);
      seen.delete(connection2);

      return (
        pressureFromConnection1 + pressureFromConnection2 + recursivePressure
      );
    }
  );

  return scores.reduce(max, 0);
};

const solve = (graph: ValveGraph, start: Valve): number =>
  backtrack1(graph, start, new Set([start]), 30);

const solve2 = (graph: ValveGraph, start: Valve): number =>
  backtrack2(graph, start, start, 0, 0, new Set([start]), 26, new Map());

export const solvePart1 = (input: string) => {
  const valves = parseValves(parseLines(input));
  const start = valves.find((valve) => valve.id === "AA")!;
  return solve(buildValvesGraph(valves), start);
};
export const solvePart2 = (input: string) => {
  const valves = parseValves(parseLines(input));
  const start = valves.find((valve) => valve.id === "AA")!;
  return solve2(buildValvesGraph(valves), start);
};
