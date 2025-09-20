import { useEffect } from "react";
import { useGame } from "../context/GameContext";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

type KeyboardProps = {
  currentRow: number;
  onEnter: () => void;
};

export function Keyboard({ currentRow, onEnter }: KeyboardProps) {
  const { guesses, setGuess } = useGame();

  const handleKey = (key: string) => {
    const row = guesses[currentRow];
    const firstEmptyIndex = row.findIndex((v) => v === "");

    if (key === "Backspace") {
      const lastFilledIndex = row
        .slice()
        .reverse()
        .findIndex((v) => v !== "");
      if (lastFilledIndex !== -1) {
        const colIndex = 4 - lastFilledIndex;
        setGuess(currentRow, colIndex, "", "");
      }
      return;
    }

    if (key === "Enter") {
      onEnter();
      return;
    }

    if (/^[a-zA-Z]$/.test(key) && firstEmptyIndex !== -1) {
      setGuess(currentRow, firstEmptyIndex, key.toUpperCase(), "");
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      handleKey(e.key);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [currentRow, guesses]);

  return (
    <div className="flex flex-col gap-2 mt-4">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 active:bg-gray-500 transition"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
