import { useGame } from "../context/GameContext";

type BoxProps = {
  rowIndex: number;
  colIndex: number;
};

export function Box({ rowIndex, colIndex }: BoxProps) {
  const { guesses, statuses } = useGame();
  const value = guesses[rowIndex][colIndex];
  const valueStatus = statuses[rowIndex][colIndex];

  let bgColor = "bg-gray-400";

  if (valueStatus === "absent") bgColor = "bg-gray-700";
  else if (valueStatus === "present") bgColor = "bg-yellow-500";
  else if (valueStatus === "correct") bgColor = "bg-green-600";

  return (
    <div
      className={`w-12 h-12 content-center border border-gray-400 rounded-sm text-center text-3xl text-white ${bgColor} transition-colors duration-300`}
    >
      {value}
    </div>
  );
}
