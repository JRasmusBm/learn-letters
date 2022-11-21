import * as React from "react";
import "./App.css";
import { useConfig } from "./hooks/config";
import { useGame } from "./hooks/game";
import { GameUI } from "./GameUI";
import { supportedLetters, useLetter } from "./hooks/letter";
import { Settings } from "./Settings";

function App() {
  const { config, updateConfig } = useConfig();

  const { letterIndex, word, nextLetter } = useLetter(config);
  const { attempt, result } = useGame({
    matchingStrategy: config.matchingStrategy,
    letter: word[letterIndex],
    nextLetter,
  });
  const [route, setRoute] =
    React.useState<"playing" | "configuring">("configuring");

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
      <button
        type="button"
        onClick={() =>
          setRoute((r) => (r === "playing" ? "configuring" : "playing"))
        }
      >
        {route === "playing" ? "Settings" : "Play"}
      </button>

      {route === "playing" ? (
        <GameUI
          result={result}
          word={word}
          letterIndex={letterIndex}
          attempt={attempt}
        />
      ) : (
        <Settings />
      )}
    </main>
  );
}

export default App;
