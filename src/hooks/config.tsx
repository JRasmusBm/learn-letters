import { UseGameArgs } from "./game";
import { UseLetterArgs } from "./letter";

type Config = Pick<UseGameArgs, "matchingStrategy"> &
  Pick<UseLetterArgs, "wordGenerator">;

export function useConfig() {
  const config: Config = {
    wordGenerator: "loopWords",
    matchingStrategy: "caseInsensitive",
  };

  return { config };
}
