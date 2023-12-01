import { readFile as fsReadFile } from "fs/promises";

export type InputType = string;

export const readInputWithoutTrim = (
  directory: string,
  filename: InputType,
): Promise<string> => fsReadFile(`${directory}/${filename}.txt`, "utf8");

export const readInput = (
  directory: string,
  filename: InputType,
): Promise<string> =>
  readInputWithoutTrim(directory, filename).then((s) => s.trim());
