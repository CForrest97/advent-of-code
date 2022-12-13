import { sum } from "ramda";

export type Packet = (number | Packet)[];

const compare = (packet1: Packet, packet2: Packet): -1 | 0 | 1 => {
  const head1 = packet1[0];
  const head2 = packet2[0];

  if (head1 === undefined && head2 === undefined) return 0;
  if (head1 === undefined) return 1;
  if (head2 === undefined) return -1;

  if (typeof head1 === "number" && typeof head2 === "number") {
    if (head1 < head2) return 1;
    if (head1 > head2) return -1;

    return compare(packet1.slice(1), packet2.slice(1));
  }
  if (typeof head1 === "object" && typeof head2 === "object") {
    const headComparison = compare(head1, head2);

    if (headComparison === 0)
      return compare(packet1.slice(1), packet2.slice(1));

    return headComparison;
  }

  if (typeof head1 === "number") {
    return compare([[head1], ...packet1.slice(1)], packet2);
  }

  return compare(packet1, [[head2], ...packet2.slice(1)]);
};

const isInOrder = (packet1: Packet, packet2: Packet): boolean =>
  compare(packet1, packet2) >= 0;

const solve = (pairs: [Packet, Packet][]): number =>
  sum(pairs.map((pair, i) => (isInOrder(pair[0], pair[1]) ? i + 1 : 0)));

const solve2 = (pairs: [Packet, Packet][]): number => {
  const packets = pairs.flat(1);
  packets.push([[2]], [[6]]);

  packets.sort((a, b) => compare(b, a));

  const x = packets.findIndex(
    (packet) => JSON.stringify([[2]]) === JSON.stringify(packet)
  );
  const y = packets.findIndex(
    (packet) => JSON.stringify([[6]]) === JSON.stringify(packet)
  );
  return (x + 1) * (y + 1);
};

export const solvePart1 = (pairs: [Packet, Packet][]) => solve(pairs);
export const solvePart2 = (pairs: [Packet, Packet][]) => solve2(pairs);
