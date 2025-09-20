import { Box } from "./Box";

type BoxRowProps = {
  rowIndex: number;
  isActive: Boolean;
};

export function BoxRow({ rowIndex, isActive }: BoxRowProps) {
  return (
    <div className="flex flex-row gap-2">
      {Array.from({ length: 5 }).map((_, colIndex) => (
        <div
          key={colIndex}
          className={
            isActive
              ? "ring-1 ring-white rounded-sm transition-shadow duration-300"
              : ""
          }
        >
          <Box rowIndex={rowIndex} colIndex={colIndex} />
        </div>
      ))}
    </div>
  );
}
