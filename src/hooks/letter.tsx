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
    letters,
    nRandomLetters,
  }: {
    nRandomLetters: number;
    letters: string;
  }) {
    return Array.from({ length: nRandomLetters }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join("");
  },
  loopWords({ words }: { words: string[] }) {
    const result = words[state.i % words.length];
    setLetterState({ i: state.i + 1 });
    return result;
  },
};

export interface UseLetterArgs {
  letters: string;
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

  const nextLetter = React.useCallback(() => {
    const check = letterIndex === word.length - 1
    console.dir(
      {
        file: "src/hooks/letter.tsx",
        line: 53,
        letterIndex,
        length: word.length,
        check
      },
      { depth: 20 }
    );

    if (check) {
      console.log(2);

      setWord(wordGenerators[args.wordGenerator](args));
      setLetterIndex(0);
      return;
    }
    console.log(3);

    setLetterIndex((letterIndex) => letterIndex + 1);
  }, [letterIndex, setWord, setLetterIndex, args, wordGenerators]);

  return {
    word,
    letterIndex,
    nextLetter,
  };
}
