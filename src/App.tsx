import * as React from "react";
import "./App.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789";
function randomLetter() {
  return letters.charAt(Math.floor(Math.random() * letters.length));
}

function useLetter() {
  const initalLetter = React.useMemo(() => randomLetter, []);
  const [letter, setLetter] = React.useState(initalLetter);

  return {
    letter,
    attempt(guess: string) {
      if (guess?.toLowerCase() === letter?.toLowerCase()) {
        setLetter(randomLetter());
        return true;
      }
      return false;
    },
  };
}

type Result = null | "right" | "wrong";
function useResult() {
  const [result, setResult] = React.useState<Result>(null);

  return {
    result,
    setResult(result: Exclude<Result, null>) {
      setResult(result);
      setTimeout(() => {
        setResult(null);
      }, 1000);
    },
  };
}

function App() {
  const { letter, attempt } = useLetter();
  const { result, setResult } = useResult();
  

  return (
    <main>
      <input
      style={{
        backgroundColor: result === "right" ? "darkgreen" : result === "wrong" ? "darkred" : "inherit"
      }}
        value={letter}
        onKeyDown={(e) => {
          e.preventDefault();

          if (result) {
            return
            
          }

          

          if (attempt(e.key)) {
            setResult("right")
            return;
          }

          setResult("wrong")
        }}
        autoFocus
      />
    </main>
  );
}

export default App;
