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
    <form onSubmit={handleSubmit} className="guess-form">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Enter player last name"
        className="guess-input"
        disabled={isFinished}
      />
      <div className="button-group">
        <button
          type="button"
          className="hint-button"
          onClick={onHint}
          disabled={isFinished}
        >
          Hint
        </button>
        <button
          type="button"
          className="resign-button"
          onClick={onResign}
          disabled={isFinished}
        >
          {isFinished ? "Game Over" : "Resign"}
        </button>
      </div>
    </form>
  );
};

export default GuessInput;
