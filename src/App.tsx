import * as React from "react";
import "./App.css";
import { useConfig } from "./hooks/config";
import { useGame } from "./hooks/game";
import { supportedLetters, useLetter } from "./hooks/letter";

function FocusedInput(props: React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  return <input {...props} autoFocus ref={ref} />;
}

function App() {
  const { config } = useConfig();

  const { letterIndex, word, nextLetter } = useLetter({
    wordGenerator: config.wordGenerator,
  });
  const { attempt, result } = useGame({
    matchingStrategy: config.matchingStrategy,
    letter: word[letterIndex],
    nextLetter,
  });

  React.useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (!supportedLetters.includes(e.key)) {
        console.debug(`Ignoring keystroke: ${e.key}`);
        return;
      }

      attempt(e.key);
    }

    document.body.addEventListener("keypress", handleKeyPress);
    return () => {
      document.body.removeEventListener("keypress", handleKeyPress);
    };
  }, [attempt]);

  return (
    <main>
      <output className={result ?? undefined}>
        {word.split("").map((letter, index) => (
          <span
            className={
              index < letterIndex
                ? "right"
                : index === letterIndex
                ? `current ${result}`
                : "upcoming"
            }
            key={index}
          >
            {letter}
          </span>
        ))}
      </output>
      <FocusedInput
        value=""
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          attempt((e.nativeEvent as any)?.data);
        }}
      />
    </main>
  );
}

export default App;
