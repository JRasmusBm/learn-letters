import * as React from "react";
import "./App.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789";
function randomLetter({ exclude }: RandomLetterArgs = {}): string {
  const newLetter = letters.charAt(Math.floor(Math.random() * letters.length));

  if (exclude && newLetter.toLowerCase() === exclude.toLowerCase()) {
    return randomLetter({ exclude }) 
  }

  return newLetter 
}

type Result = null | "right" | "wrong";
interface RandomLetterArgs {
  exclude?: string
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
  const [lastAttempt, setLastAttempt] = React.useState<null| string>(null);
  const [result, setResult] = React.useState<Result>(null);
  

  return {
    letter,
    result,
    attempt(guess: string) {
      if (guess?.toLowerCase() === lastAttempt?.toLowerCase()) {
        return
      }
      
      if (guess?.toLowerCase() === letter?.toLowerCase()) {
        nextLetter()
        setResult("right")
      }
        else{
        setResult("wrong")
      }
      setLastAttempt(guess)
    },
  };
}

function App() {
  const { letter, attempt, result } = useGame();
  

  return (
    <main>
      <input
      style={{
        backgroundColor: result === "right" ? "darkgreen" : result === "wrong" ? "darkred" : "inherit"
      }}
        value={letter}
        onChange={(e) => {
          e.preventDefault();
          attempt((e.nativeEvent as any)?.data)
        }}
        autoFocus
      />
    </main>
  );
}

export default App;
