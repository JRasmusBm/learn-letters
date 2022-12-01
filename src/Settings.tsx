import { useConfig } from "./hooks/config";
import { wordGenerators } from "./hooks/letter";

type SettingsProps = ReturnType<typeof useConfig>;

export function Settings({ config, updateConfig }: SettingsProps) {
  return (
    <>
      <label>
        <span>Supported Characters</span>
        <textarea
          value={config.supportedCharacters}
          onChange={(e) =>
            updateConfig({ ...config, supportedCharacters: e.target.value })
          }
        />
      </label>

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

      <form
        onSubmit={(e) => {
          const data = new FormData(e.currentTarget);
          const newWord = data.get("newWord");

          if (!newWord) {
            return;
          }

          updateConfig({
            ...config,
            words: [...config.words, newWord.toString()],
          });
        }}
      >
        <label>
          <span>Add word</span>
          <input type="text" name="newWord" />
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
  );
}
