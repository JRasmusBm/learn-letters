import * as React from "react";

const matchers = {
  caseInsensitive(a: string, b: string) {
    return a?.toLowerCase() === b?.toLowerCase();
  },
};

export interface UseGameArgs {
  letter: string;
  nextLetter: () => void;
  matchingStrategy: keyof typeof matchers;
}

export function useGame({
  letter,
  nextLetter,
  matchingStrategy,
}: UseGameArgs) {
  const [result, setResult] = React.useState<null | "right" | "wrong">(null);

  const attempt = React.useCallback(
    (guess: string) => {
      if (matchers[matchingStrategy](guess, letter)) {
        nextLetter();
        setResult(null);
      } else {
        setResult("wrong");
      }
    },
    [letter, nextLetter, result, setResult]
  );

  return {
    result,
    attempt,
  };
}
