import * as React from "react";
import { UseGameArgs } from "./game";
import { UseLetterArgs } from "./letter";

type Config = Pick<UseGameArgs, "matchingStrategy"> & UseLetterArgs;

const key = "LearnLetters-Config";

const defaultConfig: Config = {
  supportedCharacters:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  wordGenerator: "loopWords",
  matchingStrategy: "caseInsensitive",
  words: ["sheep", "bird", "cow", "dog", "horse", "chicken"],
  nRandomLetters: 5,
};

const raw = localStorage.getItem(key);
const loadedConfig = raw && (JSON.parse(raw) as Config);

export function useConfig() {
  const [config, setConfig] = React.useState({
    ...defaultConfig,
    ...loadedConfig,
  });

  return {
    config,
    updateConfig(newValues: Partial<Config>) {
      const newConfig = { ...config, ...newValues };
      setConfig(newConfig);
      localStorage.setItem(key, JSON.stringify(newConfig));
    },
  };
}
