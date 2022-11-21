import * as React from "react";

import { useGame } from "./hooks/game";

interface GameUIProps {
  result: ReturnType<typeof useGame>["result"];
  word: string;
  letterIndex: number;
  attempt: (guess: string) => void;
}

function FocusedInput(props: React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  return <input {...props} autoFocus ref={ref} />;
}

export function GameUI({ result, word, letterIndex, attempt }: GameUIProps) {
  return (
    <>
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
    </>
  );
}
