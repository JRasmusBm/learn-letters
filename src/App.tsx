import * as React from "react";
import "./App.css";
import { useGame } from "./hooks/game";
import { supportedLetters, useLetter } from "./hooks/letter";

function App() {
  const { letterIndex, word, nextLetter } = useLetter({
    wordGenerator: "randomLetters",
  });
  const { attempt, result } = useGame({
    matchingStrategy: "caseInsensitive",
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
      <output
        className={result ?? undefined}
        onChange={Event.prototype.preventDefault}
      >
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
    </main>
  );
}

export default App;
