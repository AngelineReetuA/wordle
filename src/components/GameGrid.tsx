import { useState } from "react";
import { BoxRow } from "./BoxRow";
import { Keyboard } from "./Keyboard";

export function GameGrid() {
  const [currentRow, setCurrentRow] = useState(0);

  const EnterCheck = () => {}

  return (
    <>
      <div className="flex flex-col gap-2 p-4 items-center">
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <BoxRow
            key={rowIndex}
            rowIndex={rowIndex}
            isActive={rowIndex === currentRow}
          />
        ))}
      </div>
      <Keyboard
        currentRow={currentRow}
      />
    </>
  );
}
