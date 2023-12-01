/* eslint-disable no-continue */
/* eslint-disable default-case */
import { Position } from "../../helpers/Position";
import { parseLines } from "../../helpers/parsers";
import { readInputWithoutTrim } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

type Direction = "up" | "right" | "down" | "left";
type Track = {
  char: "/" | "\\" | "|" | "-" | "+";
  connections: {
    up: { position: Position; direction: Direction } | null;
    right: { position: Position; direction: Direction } | null;
    down: { position: Position; direction: Direction } | null;
    left: { position: Position; direction: Direction } | null;
  };
};

type Cart = {
  char: "^" | "v" | "<" | ">";
  position: Position;
  direction: keyof Track["connections"];
  decisionCount: number;
  hasCrashed: boolean;
};

type ParsedInput = {
  tracks: (Track | null)[][];
  carts: Cart[];
};

const cartDecisionMatrix = ["left", "straight", "right"] as const;

const decesionToDirection = (
  decision: (typeof cartDecisionMatrix)[number],
  direction: Direction,
): Direction => {
  if (decision === "left") {
    if (direction === "up") return "left";
    if (direction === "right") return "up";
    if (direction === "down") return "right";
    if (direction === "left") return "down";
  }

  if (decision === "straight") {
    if (direction === "up") return "up";
    if (direction === "right") return "right";
    if (direction === "down") return "down";
    if (direction === "left") return "left";
  }

  if (direction === "up") return "right";
  if (direction === "right") return "down";
  if (direction === "down") return "left";

  return "up";
};

const toTrack = (char: string, { x, y }: Position): Track => {
  if (char === "/") {
    return {
      char,
      connections: {
        up: { position: { x: x + 1, y }, direction: "right" },
        right: { position: { x, y: y - 1 }, direction: "up" },
        down: { position: { x: x - 1, y }, direction: "left" },
        left: { position: { x, y: y + 1 }, direction: "down" },
      },
    };
  }
  if (char === "-" || char === "<" || char === ">") {
    return {
      char: "-",
      connections: {
        up: null,
        right: { position: { x: x + 1, y }, direction: "right" },
        down: null,
        left: { position: { x: x - 1, y }, direction: "left" },
      },
    };
  }
  if (char === "\\") {
    return {
      char,
      connections: {
        up: { position: { x: x - 1, y }, direction: "left" },
        right: { position: { x, y: y + 1 }, direction: "down" },
        down: { position: { x: x + 1, y }, direction: "right" },
        left: { position: { x, y: y - 1 }, direction: "up" },
      },
    };
  }
  if (char === "|" || char === "v" || char === "^") {
    return {
      char: "|",
      connections: {
        up: { position: { x, y: y - 1 }, direction: "up" },
        right: null,
        down: { position: { x, y: y + 1 }, direction: "down" },
        left: null,
      },
    };
  }
  if (char === "+") {
    return {
      char,
      connections: {
        up: { position: { x, y: y - 1 }, direction: "up" },
        right: { position: { x: x + 1, y }, direction: "right" },
        down: { position: { x, y: y + 1 }, direction: "down" },
        left: { position: { x: x - 1, y }, direction: "left" },
      },
    };
  }

  throw new Error(`char "${char}" not recognised`);
};

const cartCharToDirection: Record<Cart["char"], Cart["direction"]> = {
  "^": "up",
  ">": "right",
  v: "down",
  "<": "left",
};

const toCart = (char: Cart["char"], position: Position): Cart => ({
  char,
  decisionCount: 0,
  direction: cartCharToDirection[char],
  position,
  hasCrashed: false,
});

const parseInput = (input: string): ParsedInput => {
  const lines = parseLines(input);

  const tracks = lines.map((line, y) =>
    line
      .split("")
      .map((char, x) => (char === " " ? null : toTrack(char, { x, y }))),
  );

  const carts: Cart[] = lines
    .flatMap((line, y) =>
      line
        .split("")
        .map((char, x) =>
          ["^", "v", "<", ">"].includes(char)
            ? toCart(char as Cart["char"], { x, y })
            : null,
        ),
    )
    .filter((maybeCart): maybeCart is Cart => Boolean(maybeCart));

  return { tracks, carts };
};

const solve = ({ tracks, carts }: ParsedInput, returnEarly: boolean) => {
  const currentCarts = carts;
  let remaining = carts.length;

  while (true) {
    currentCarts
      .sort((cart1, cart2) => cart1.position.x - cart2.position.x)
      .sort((cart1, cart2) => cart1.position.y - cart2.position.y);

    if (!returnEarly && remaining === 1) {
      const lastCart = carts.find((cart) => !cart.hasCrashed)!;
      return `${lastCart.position.x},${lastCart.position.y}`;
    }

    for (let i = 0; i < currentCarts.length; i += 1) {
      const cart = currentCarts[i];
      if (cart.hasCrashed) continue;

      const track = tracks[cart.position.y][cart.position.x];
      if (track === null)
        throw new Error(
          `no track found at ${cart.position.x},${cart.position.y}`,
        );

      const nextPosition =
        track.char === "+"
          ? track.connections[
              decesionToDirection(
                cartDecisionMatrix[cart.decisionCount++ % 3],
                cart.direction,
              )
            ]
          : track.connections[cart.direction];
      if (nextPosition === null)
        throw new Error("track does not move in that direction");
      const nextCart: Cart = {
        char: cart.char,
        decisionCount: cart.decisionCount,
        direction: nextPosition.direction,
        position: nextPosition.position,
        hasCrashed: cart.hasCrashed,
      };

      const crash = carts.find(
        ({ position: { x, y }, hasCrashed }) =>
          x === nextPosition.position.x &&
          y === nextPosition.position.y &&
          !hasCrashed,
      );

      if (crash) {
        if (returnEarly) return `${crash.position.x},${crash.position.y}`;
        crash.hasCrashed = true;
        nextCart.hasCrashed = true;
        remaining -= 2;
      }

      currentCarts[i] = nextCart;
    }
  }
};

const solvePartA = (input: string) => solve(parseInput(input), true);
const solvePartB = (input: string) => solve(parseInput(input), false);

export const mineCartMadness: Day<string, string> = {
  day: 13,
  year: 2018,
  partA: {
    getExampleInput: () => readInputWithoutTrim(__dirname, "input/example"),
    getPuzzleInput: () => readInputWithoutTrim(__dirname, "input/puzzle"),
    solve: solvePartA,
  },
  partB: {
    getExampleInput: () => readInputWithoutTrim(__dirname, "input/example"),
    getPuzzleInput: () => readInputWithoutTrim(__dirname, "input/puzzle"),
    solve: solvePartB,
  },
};
