import * as React from "react";

const key = "LearnLetters-LetterState";
const previousState = localStorage.getItem(key);
const state = previousState ? JSON.parse(previousState) : { i: 0 };

function setLetterState({ i }: { i: number }) {
  state.i = i;
  localStorage.setItem(key, JSON.stringify(state));
}

export const wordGenerators = {
  randomLetters({
    supportedCharacters,
    nRandomLetters,
  }: {
    nRandomLetters: number;
    supportedCharacters: string;
  }) {
    return Array.from({ length: nRandomLetters }, () =>
      supportedCharacters.charAt(
        Math.floor(Math.random() * supportedCharacters.length)
      )
    ).join("");
  },
  loopWords({ words }: { words: string[] }) {
    const result = words[state.i % words.length];
    setLetterState({ i: state.i + 1 });
    return result;
  },
};

export interface UseLetterArgs {
  supportedCharacters: string;
  wordGenerator: keyof typeof wordGenerators;
  nRandomLetters: number;
  words: string[];
}

export function useLetter(args: UseLetterArgs) {
  const nextWord = React.useCallback(() => {
    return wordGenerators[args.wordGenerator](args);
  }, []);
  const initialWord = React.useMemo(() => nextWord(), [nextWord]);

  const [word, setWord] = React.useState(initialWord);
  const [letterIndex, setLetterIndex] = React.useState(0);

  return {
    word,
    letterIndex,
    nextLetter() {
      if (letterIndex === word.length - 1) {
        setWord(wordGenerators[args.wordGenerator](args));
        setLetterIndex(0);
        return;
      }

      setLetterIndex(letterIndex + 1);
    },
  };
}
