import { useEffect } from "react";
import { useGame } from "../context/GameContext";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

type KeyboardProps = {
  currentRow: number;
};

export function Keyboard({ currentRow }: KeyboardProps) {
  const { guesses, setGuess } = useGame();

  const onEnter = () => {
    const row = guesses[currentRow];

    if (row.includes("")) return;

    const guess = row.join("");
    const result = Array(5).fill("absent");
    const answerArr = "REETU".split("");

    // GREEN pass
    guess.split("").forEach((ch, i) => {
      if (ch === answerArr[i]) {
        result[i] = "correct";
        answerArr[i] = "";
      }
    });

    // YELLOW pass
    guess.split("").forEach((ch, i) => {
      if (result[i] === "absent" && answerArr.includes(ch)) {
        result[i] = "present";
        answerArr[answerArr.indexOf(ch)] = "";
      }
    });

    // Apply status to each box
    result.forEach((status, colIndex) => {
      setGuess(currentRow, colIndex, row[colIndex], status);
    });
  };

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
      if (row.includes("")) {
        alert("Please complete entering 5 letters");
        return;
      }
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
