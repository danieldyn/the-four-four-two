import React, { useState } from "react";
import slugify from "../utils/slugify";
import { GuessResponse } from "../types/football";

/**
 * The shape of the Guess Input panel's attributes.
 * Requires a callback for hints, one for resigning and one for adding guesses.
 */
interface GuessInputProps {
  matchId: number;
  addGuess: (slug: string, result: "correct" | "wrong", playerData: GuessResponse | null) => void;
  onHint: () => void;
  hasResigned: boolean;
  onResign: () => void;
}

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Captures and processes user input, communicating with the backend.
 * Also supports the in-game hint system.
 */
const GuessInput: React.FC<GuessInputProps> = ({ matchId, addGuess, onHint, hasResigned, onResign }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() || hasResigned)
      return;

    // Normalise all user input before sending
    const normalisedGuess = slugify(value);

    try {
      const res = await fetch(`${apiUrl}/guess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId, guess: normalisedGuess }),
      });

      if (!res.ok)
        throw new Error("Server error");

      const data: GuessResponse = await res.json();

      if (data.result === "correct" && data.player) {
        addGuess(data.player.slug, data.result, data);
        setValue("");
      } else {
        // Fallback for wrong user guesses
        addGuess(normalisedGuess, "wrong", null);
      }
    } catch (err) {
      console.error("Guess submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="guess-form">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Enter player last name"
        className="guess-input"
        disabled={hasResigned}
      />
      <div className="button-group">
        <button
          type="button"
          className="hint-button"
          onClick={onHint}
          disabled={hasResigned}
        >
          Hint
        </button>
        <button
          type="button"
          className="resign-button"
          onClick={onResign}
          disabled={hasResigned}
        >
          {hasResigned ? "Game Over" : "Resign"}
        </button>
      </div>
    </form>
  );
};

export default GuessInput;
