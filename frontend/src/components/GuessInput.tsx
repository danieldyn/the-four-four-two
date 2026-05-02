import React, { useState } from "react";
import slugify from "../utils/slugify";
import { GuessResponse } from "../types/football";

/**
 * The shape of the Guess Input panel's attributes.
 * Requires a callback for hints and one for adding guesses.
 */
interface GuessInputProps {
  matchId: number;
  addGuess: (slug: string, result: "correct" | "wrong", playerData: GuessResponse | null) => void;
  onHint: () => void;
}

/**
 * Captures and processes user input, communicating with the backend.
 * Also supports the in-game hint system.
 */
const GuessInput: React.FC<GuessInputProps> = ({ matchId, addGuess, onHint }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    // Normalise all user input before sending
    const normalisedGuess = slugify(value);

    try {
      const res = await fetch("http://localhost:4000/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId, guess: normalisedGuess }),
      });

      if (!res.ok)
        throw new Error("Server error");

      const data: GuessResponse = await res.json();

      if (data.result === "correct" && data.player) {
        addGuess(data.player.slug, data.result, data);
      } else {
        // Fallback for wrong user guesses
        addGuess(normalisedGuess, "wrong", null);
      }
    } catch (err) {
      console.error("Guess submission error:", err);
    }

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
      />
      <div className="button-group">
        <button type="submit" className="submit-button">
          Guess
        </button>
        <button type="button" className="hint-button" onClick={onHint}>
          Hint
        </button>
      </div>
    </form>
  );
};

export default GuessInput;
