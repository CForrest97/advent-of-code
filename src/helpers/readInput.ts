import { readFile as fsReadFile } from "fs/promises";

export type InputType = "simpleInput" | "puzzleInput";

export const readInput = (
  directory: string,
  filename: InputType
): Promise<string> =>
  fsReadFile(`${directory}/${filename}.txt`, "utf8").then((s) =>
    s.toString().trim()
  );
