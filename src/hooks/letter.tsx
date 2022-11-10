import * as React from "react";

export const supportedLetters =
  "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789";

const state = { i: 0 };
const words = localStorage.getItem("LEARN_LETTERS_WORDS") || [
  "Mary",
  "had",
  "a",
  "little",
  "lamb",
];

const wordGenerators = {
  randomLetters() {
    return Array.from({ length: 5 }, () =>
      supportedLetters.charAt(
        Math.floor(Math.random() * supportedLetters.length)
      )
    ).join("");
  },
  loopWords() {
    state.i += 1;
    return words[state.i % words.length];
  },
  loopLetters() {
    return supportedLetters;
  },
};

interface UseLetterArgs {
  wordGenerator: keyof typeof wordGenerators;
}

export function useLetter({ wordGenerator }: UseLetterArgs) {
  const initialWord = React.useMemo(() => wordGenerators[wordGenerator](), []);
  const [word, setWord] = React.useState(initialWord);
  const [letterIndex, setLetterIndex] = React.useState(0);

  return {
    word,
    letterIndex,
    nextLetter() {
      if (letterIndex === word.length - 1) {
        setWord(wordGenerators[wordGenerator]());
        setLetterIndex(0);
        return;
      }

      setLetterIndex(letterIndex + 1);
    },
  };
}
