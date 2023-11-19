import { compose, map, sum } from "ramda";
import { parseLines } from "../../helpers/parsers";

const digitToDecimal = {
  "2": 2,
  "1": 1,
  "0": 0,
  "-": -1,
  "=": -2,
};

const toDecimal = (snafu: string): number => {
  const digits = snafu.split("") as (keyof typeof digitToDecimal)[];

  return sum(
    digits.map((digit, index) => {
      const power = 5 ** (snafu.length - 1 - index);
      return power * digitToDecimal[digit];
    })
  );
};

export const toSnafu = (num: number): string => {
  const snafu = [];
  let current = num;
  let pow = 1;

  while (current > 0) {
    const remainder = (current % (5 * pow)) / pow;
    if (remainder < 3) {
      snafu.unshift(`${remainder}`);
    } else if (remainder === 3) {
      current += 5 * pow;
      snafu.unshift("=");
    } else if (remainder === 4) {
      current += 5 * pow;
      snafu.unshift("-");
    }

    current -= remainder * pow;

    pow *= 5;
  }

  return snafu.join("");
};

export const solvePart1 = compose(toSnafu, sum, map(toDecimal), parseLines);
