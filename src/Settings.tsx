import * as React from "react";

import { useConfig } from "./hooks/config";
import { wordGenerators } from "./hooks/letter";

type SettingsProps = ReturnType<typeof useConfig>;

export function Settings({ config, updateConfig }: SettingsProps) {
  const [word, setWord] = React.useState("");

  return (
    <>
      <label>
        <span>Mode</span>
        <select
          value={config.wordGenerator}
          onChange={(e) =>
            updateConfig({
              ...config,
              wordGenerator: e.target.value as keyof typeof wordGenerators,
            })
          }
        >
          {Object.keys(wordGenerators).map((mode) => {
            return (
              <option key={mode} value={mode}>
                {mode}
              </option>
            );
          })}
        </select>
      </label>

      {config.wordGenerator === "loopWords" ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!word) {
                return;
              }

              updateConfig({
                ...config,
                words: [...config.words, word],
              });

              setWord("");
            }}
          >
            <label>
              <span>Add word</span>
              <input
                type="text"
                name="newWord"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </label>
          </form>
          <ul className="word-config">
            {config.words.map((w, i) => {
              return (
                <li>
                  {w}
                  <button
                    className="danger"
                    type="button"
                    onClick={() =>
                      updateConfig({
                        ...config,
                        words: config.words
                          .slice(0, i)
                          .concat(config.words.slice(i + 1)),
                      })
                    }
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <label>
          <span>Characters to Loop</span>
          <textarea
            value={config.letters}
            onChange={(e) =>
              updateConfig({ ...config, letters: e.target.value })
            }
          />
        </label>
      )}
    </>
  );
}
