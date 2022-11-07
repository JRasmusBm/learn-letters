import * as React from "react";
import "./App.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789";
interface RandomLetterArgs {
  exclude?: string;
}
function randomLetter({ exclude }: RandomLetterArgs = {}): string {
  const newLetter = letters.charAt(Math.floor(Math.random() * letters.length));

  if (exclude && newLetter.toLowerCase() === exclude.toLowerCase()) {
    return randomLetter({ exclude });
  }

  return newLetter;
}

function useLetter() {
  const initalLetter = React.useMemo(() => randomLetter, []);
  const [letter, setLetter] = React.useState(initalLetter);

  return {
    letter,
    nextLetter() {
      setLetter(randomLetter({ exclude: letter }));
    },
  };
}

function useGame() {
  const { letter, nextLetter } = useLetter();
  const [lastAttempt, setLastAttempt] = React.useState<null | string>(null);
  const [result, setResult] = React.useState<null | "right" | "wrong">(null);

  const attempt = React.useCallback(
    (guess: string) => {
      if (guess?.toLowerCase() === lastAttempt?.toLowerCase()) {
        return;
      }

      if (guess?.toLowerCase() === letter?.toLowerCase()) {
        nextLetter();
        setResult("right");
      } else {
        setResult("wrong");
      }

      setLastAttempt(guess);
    },
    [letter, lastAttempt, result]
  );

  return {
    letter,
    result,
    attempt,
  };
}

function App() {
  const { letter, attempt, result } = useGame();

  React.useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      attempt(e.key);
    }

    document.body.addEventListener("keypress", handleKeyPress);
    return () => {
      document.body.removeEventListener("keypress", handleKeyPress);
    };
  }, [attempt]);

  return (
    <main>
      <input
        className={result ?? undefined}
        value={letter}
        onChange={Event.prototype.preventDefault}
        autoFocus
      />
    </main>
  );
}

export default App;
