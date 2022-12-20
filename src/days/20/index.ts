/* eslint-disable no-param-reassign */
import { compose, map, multiply } from "ramda";
import { parseNumbers } from "../../helpers/parsers";

type DoubleLinkedNode = {
  prev: DoubleLinkedNode;
  next: DoubleLinkedNode;
  value: number;
};

const mod = (n: number, base: number) => {
  if (n >= 0) return n % base;
  return (n % base) + base;
};

const parseNodes = (numbers: number[]): DoubleLinkedNode[] => {
  const nodes: any[] = numbers.map((n) => ({
    prev: null,
    value: n,
    next: null,
  }));

  nodes.forEach((node, index) => {
    node.next = nodes[(index + 1) % nodes.length];
    node.prev = nodes[(index + nodes.length - 1) % nodes.length];
  });

  return nodes;
};

const mixSequence = (mixes: number) => (list: DoubleLinkedNode[]) => {
  for (let mix = 0; mix < mixes; mix += 1) {
    list.forEach((node) => {
      const amountToShift = mod(node.value, list.length - 1);

      if (amountToShift !== 0) {
        node.next.prev = node.prev;
        node.prev.next = node.next;

        let curr = node;

        for (let i = 0; i < amountToShift; i += 1) {
          curr = curr.next;
        }

        const { next } = curr;
        const prev = curr;

        node.next = next;
        node.prev = prev;

        prev.next = node;
        next.prev = node;
      }
    });
  }

  let curr = list.find((node) => node.value === 0)!;

  for (let i = 0; i < 1000; i += 1) curr = curr.next;
  const node1000 = curr;

  for (let i = 0; i < 1000; i += 1) curr = curr.next;
  const node2000 = curr;

  for (let i = 0; i < 1000; i += 1) curr = curr.next;
  const node3000 = curr;

  return node1000.value + node2000.value + node3000.value;
};

export const solvePart1 = compose(mixSequence(1), parseNodes, parseNumbers);
export const solvePart2 = compose(
  mixSequence(10),
  parseNodes,
  map(multiply(811589153)),
  parseNumbers
);
