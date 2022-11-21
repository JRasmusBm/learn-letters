import * as React from "react";

export const supportedLetters =
  "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789";

const state = { i: 0 };

const wordGenerators = {
  randomLetters({ nRandomLetters }: { nRandomLetters: number }) {
    return Array.from({ length: nRandomLetters }, () =>
      supportedLetters.charAt(
        Math.floor(Math.random() * supportedLetters.length)
      )
    ).join("");
  },
  loopWords({ words }: { words: string[] }) {
    state.i += 1;
    return words[state.i % words.length];
  },
};

export interface UseLetterArgs {
  wordGenerator: keyof typeof wordGenerators;
  nRandomLetters: number;
  words: string[];
}

export function useLetter({
  wordGenerator,
  ...wordGeneratorArgs
}: UseLetterArgs) {
  const initialWord = React.useMemo(
    () => wordGenerators[wordGenerator](wordGeneratorArgs),
    []
  );
  const [word, setWord] = React.useState(initialWord);
  const [letterIndex, setLetterIndex] = React.useState(0);

  return {
    word,
    letterIndex,
    nextLetter() {
      if (letterIndex === word.length - 1) {
        setWord(wordGenerators[wordGenerator](wordGeneratorArgs));
        setLetterIndex(0);
        return;
      }

      setLetterIndex(letterIndex + 1);
    },
  };
}
