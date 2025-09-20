import React, { createContext, useContext, useState, ReactNode } from "react";

type ValueStatus = "wrongLetter" | "wrongPlace" | "right" | "";

type GameState = {
  guesses: string[][];
  statuses: ValueStatus[][];
  setGuess: (
    row: number,
    col: number,
    value: string,
    status: ValueStatus
  ) => void;
};

const GameContext = createContext<GameState | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [guesses, setGuesses] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const [statuses, setStatuses] = useState<ValueStatus[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );

  const setGuess = (
    row: number,
    col: number,
    value: string,
    status: ValueStatus
  ) => {
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[row][col] = value;
      return newGuesses;
    });
    setStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[row][col] = status;
      return newStatuses;
    });
  };

  return (
    <GameContext.Provider value={{ guesses, statuses, setGuess }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
}
