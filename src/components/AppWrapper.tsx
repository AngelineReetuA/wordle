import type { ReactNode } from "react";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-900 w-full h-screen p-4 flex">
      <div className="mockup-window border border-gray-600 w-full flex-1">
        <div className="border-t border-base-300 h-full self-center">
          <div className="text-3xl font-semibold text-gray-400 text-center py-4">Wordle</div>
          {children}
        </div>
      </div>
    </div>
  );
}
