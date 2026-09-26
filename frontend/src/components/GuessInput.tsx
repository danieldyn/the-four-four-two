import React, { useState } from "react";

/**
 * The shape of the Guess Input panel's attributes.
 * Requires a callback for hints, one for resigning and one for handling local guesses.
 */
interface GuessInputProps {
  onGuess: (guess: string) => void;
  onHint: () => void;
  isFinished: boolean;
  onResign: () => void;
}

/**
 * Captures and processes user input locally against the match data obtained from the server.
 * Also supports the in-game hint system.
 */
const GuessInput: React.FC<GuessInputProps> = ({ onGuess, onHint, isFinished, onResign }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedGuess = value.trim();
    if (!trimmedGuess || isFinished)
      return;

    onGuess(trimmedGuess);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-1.5 flex justify-between items-center gap-2 w-full max-w-[360px] flex-nowrap">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Enter player name"
        disabled={isFinished}
        className="flex-1 min-w-0 p-2 font-bold text-base rounded-md border border-white/20 bg-black/40 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onHint}
          disabled={isFinished}
          className="m-0 py-2 px-3 bg-[#253fb3] hover:bg-[#2054a8] text-cyan-200 text-base font-medium rounded-md border-0 cursor-pointer whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Hint
        </button>
        <button
          type="button"
          onClick={onResign}
          disabled={isFinished}
          className="m-0 py-2 px-3 bg-[#bb4419] hover:bg-[#ba260c] text-rose-200 text-base font-medium rounded-md border-0 cursor-pointer whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFinished ? "Game Over" : "Resign"}
        </button>
      </div>
    </form>
  );
};

export default GuessInput;
