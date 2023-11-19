import { Position } from "../../helpers/Position";
import { parseLines, parseNumber } from "../../helpers/parsers";

type Sensor = {
  position: Position;
  beaconPosition: Position;
  distanceToBeacon: number;
};

const getDistance = (pos1: Position, pos2: Position): number =>
  Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);

const countNonBeaconPositions = (sensors: Sensor[], y: number): number => {
  const minX = sensors
    .map((sensor) => sensor.position.x - sensor.distanceToBeacon)
    .reduce((a, b) => Math.min(a, b));
  const maxX = sensors
    .map((sensor) => sensor.position.x + sensor.distanceToBeacon)
    .reduce((a, b) => Math.max(a, b));

  let total = 0;

  for (let x = minX; x <= maxX; x += 1) {
    const matchingSensor = sensors.find(
      (sensor) =>
        getDistance(sensor.position, { x, y }) <= sensor.distanceToBeacon
    );

    if (matchingSensor) {
      const circleEdgeXPosition =
        matchingSensor.position.x +
        matchingSensor.distanceToBeacon -
        Math.abs(y - matchingSensor.position.y);

      total += circleEdgeXPosition - x + 1;
      x = circleEdgeXPosition;
    }
  }

  const beacons = sensors
    .filter(({ beaconPosition }) => beaconPosition.y === y)
    .map(({ beaconPosition }) => beaconPosition.y);

  return total - new Set(beacons).size;
};

const findMissingBeacon = (sensors: Sensor[], gridSize: number): number => {
  for (let y = 0; y <= gridSize; y += 1) {
    for (let x = 0; x <= gridSize; x += 1) {
      const matchingSensor = sensors.find(
        (sensor) =>
          getDistance(sensor.position, { x, y }) <= sensor.distanceToBeacon
      );

      if (!matchingSensor) return 4_000_000 * x + y;

      x =
        matchingSensor.position.x +
        matchingSensor.distanceToBeacon -
        Math.abs(y - matchingSensor.position.y);
    }
  }

  throw new Error("Beacon not found :(");
};

const parseSensorsAndBeacons = (lines: string[]): Sensor[] =>
  lines.map((line) => {
    const match = line.match(
      /Sensor at x=(.+), y=(.+): closest beacon is at x=(.+), y=(.+)/
    );
    if (!match) throw new Error(`cannot parse line: ${line}`);
    const [, sensorX, sensorY, beaconX, beaconY] = match;

    const sensor = { x: parseNumber(sensorX), y: parseNumber(sensorY) };
    const beaconPosition = { x: parseNumber(beaconX), y: parseNumber(beaconY) };

    return {
      position: sensor,
      beaconPosition,
      distanceToBeacon: getDistance(sensor, beaconPosition),
    };
  });

export const solvePart1 = (input: string, targetY: number) =>
  countNonBeaconPositions(parseSensorsAndBeacons(parseLines(input)), targetY);
export const solvePart2 = (input: string, targetY: number) =>
  findMissingBeacon(parseSensorsAndBeacons(parseLines(input)), targetY * 2);
