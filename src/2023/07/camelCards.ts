import { add } from "ramda";
import { parseLines, parseNumber } from "../../helpers/parsers";
import { readInput } from "../../helpers/readInput";
import { Day } from "../../helpers/types";

const cardsWithJacks = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;
const cardsWithJokers = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
] as const;
type CardRankings = typeof cardsWithJacks | typeof cardsWithJokers;
type Card = CardRankings[number];

type Hand = number[];

type isHand = (hand: Hand) => boolean;
const isFiveOfAKind: isHand = (hand) => hand.includes(5);
const isFourOfAKind: isHand = (hand) => hand.includes(4);
const isFullHouse: isHand = (hand) => hand.includes(3) && hand.includes(2);
const isThreeOfAKind: isHand = (hand) => hand.includes(3);
const isTwoPair: isHand = (hand) =>
  hand.filter((count) => count === 2).length === 2;
const isOnePair: isHand = (hand) => hand.includes(2);
const highCard: isHand = () => true;

const handRankings: isHand[] = [
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isThreeOfAKind,
  isTwoPair,
  isOnePair,
  highCard,
];

type Player = {
  hand: Hand;
  bid: number;
  handRanking: number;
  cards: Card[];
};

const parseInput = (input: string, cardRankings: CardRankings): Player[] =>
  parseLines(input).map((line) => {
    const [handString, bidString] = line.split(" ");
    const cards = handString.split("") as Card[];
    const hand = cardRankings.map(
      (card) => cards.filter((c) => c === card).length,
    );

    return {
      hand,
      bid: parseNumber(bidString),
      handRanking: handRankings.findIndex((ranking) => ranking(hand)),
      cards,
    };
  });

const applyJokers = (player: Player): Player => {
  const hand = [...player.hand];
  let highestIndex = 0;
  let highestCount = 0;

  for (let i = 0; i < 12; i += 1)
    if (hand[i] > highestCount) {
      highestCount = hand[i];
      highestIndex = i;
    }

  hand[highestIndex] += hand[12];
  hand[12] = 0;

  const handRanking = handRankings.findIndex((ranking) => ranking(hand));

  return {
    ...player,
    hand,
    handRanking,
  };
};

const getTotalWinnings = (players: Player[], cards: CardRankings): number =>
  players
    .toSorted((a, b) => cards.indexOf(b.cards[4]) - cards.indexOf(a.cards[4]))
    .toSorted((a, b) => cards.indexOf(b.cards[3]) - cards.indexOf(a.cards[3]))
    .toSorted((a, b) => cards.indexOf(b.cards[2]) - cards.indexOf(a.cards[2]))
    .toSorted((a, b) => cards.indexOf(b.cards[1]) - cards.indexOf(a.cards[1]))
    .toSorted((a, b) => cards.indexOf(b.cards[0]) - cards.indexOf(a.cards[0]))
    .toSorted((a, b) => b.handRanking - a.handRanking)
    .map((player, place) => player.bid * (place + 1))
    .reduce(add);

const solvePartA = (input: string) =>
  getTotalWinnings(parseInput(input, cardsWithJacks), cardsWithJacks);

const solvePartB = (input: string) =>
  getTotalWinnings(
    parseInput(input, cardsWithJokers).map(applyJokers),
    cardsWithJokers,
  );

export const camelCards: Day = {
  day: 7,
  year: 2023,
  partA: {
    getExampleInput: () => readInput(__dirname, "input/example"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartA,
  },
  partB: {
    getExampleInput: () => readInput(__dirname, "input/example"),
    getPuzzleInput: () => readInput(__dirname, "input/puzzle"),
    solve: solvePartB,
  },
};
