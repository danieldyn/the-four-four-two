import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

/**
 * The shape of the Game Header panel's attributes.
 * It needs access to the callback for starting a new random game.
 */
interface GameHeaderProps {
  onRestart: () => void
}

/**
 * Displays the game title and a navigation button to return to the Home Page.
 */
const GameHeader: React.FC<GameHeaderProps> = ({ onRestart }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <header className="w-full bg-[#0f2b0f]/90 border-b border-white/10 px-4 py-3 sm:px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="m-0 text-center sm:text-left text-lg sm:text-xl font-bold tracking-tight text-emerald-200">
          The Four-Four-Two
        </h2>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            className="flex-1 sm:flex-initial py-2 px-3.5 bg-[#2e7d32] hover:bg-[#1b5e20] active:scale-[0.98] text-lime-200 rounded-lg border-0 text-base sm:text-sm font-semibold tracking-wide whitespace-nowrap text-center transition-all cursor-pointer shadow-sm"
            onClick={onRestart}
          >
            New Game
          </button>
          <button
            type="button"
            className="flex-1 sm:flex-initial py-2 px-3.5 bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/15 text-mist-200 rounded-lg text-base sm:text-sm font-semibold tracking-wide whitespace-nowrap text-center transition-all cursor-pointer shadow-sm"
            onClick={() => {
              localStorage.removeItem("playedMatches");
              navigate("/");
            }}
          >
            Home
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
