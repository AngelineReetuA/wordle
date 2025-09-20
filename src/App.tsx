import { useState } from "react";
import { AppWrapper } from "./components/AppWrapper";
import { BoxRow } from "./components/BoxRow";
import { GameProvider } from "./context/GameContext";
import { GameGrid } from "./components/GameGrid";

function App() {
  return (
    <GameProvider>
      <AppWrapper>
        <GameGrid />
      </AppWrapper>
    </GameProvider>
  );
}

export default App;
