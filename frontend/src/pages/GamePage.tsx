import React, { useState, useEffect } from "react";
import GuessInput from "../components/GuessInput";
import GuessHistory from "../components/GuessHistory";
import LineupBoard from "../components/LineupBoard";
import MatchHeader from "../components/MatchHeader";
import GameHeader from "../components/GameHeader";
import { Match, GuessResponse } from "../types/football";

/**
 * The shape of a guess' tracker.
 */
export interface Guess {
  guess: string;
  result: "correct" | "wrong";
  display: string;
}

// Key-value pair for hints
type HintsUsed = Record<string, boolean>;

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * The Game Page component, containing:
 *            - The header (game name + return to Home Page button)
 *            - A left container (two side-by-side pitches)
 *            - A right container (a list of masked and guessed names and the input form)
 */
const GamePage: React.FC = () => {
  const [match, setMatch] = useState<Match | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [hintsUsed, setHintsUsed] = useState<HintsUsed>({});

  useEffect(() => {
    fetch(`${apiUrl}/matches/random`)
      .then((res) => res.json())
      .then((data: Match) => setMatch(data))
      .catch((err) => console.error("Failed to fetch match:", err));
  }, []);

  // Process the guess
  const addGuess = (slug: string, result: "correct" | "wrong", playerData: GuessResponse | null) => {
    if (result === "correct" && playerData?.player) {
      const fullName = `${playerData.player.firstName} ${playerData.player.lastName}`;

      setGuesses((prev) => [
        ...prev,
        {
          guess: slug,
          result,
          display: fullName,
        },
      ]);
    } else {
      setGuesses((prev) => [
        ...prev,
        {
          guess: slug,
          result,
          display: slug,
        },
      ]);
    }
  };

  // Using a hint wll reveal several letters from the mask of a player
  const handleHint = () => {
    if (!match)
      return;

    const availablePlayers = match.lineups.filter((p) => {
      const slug = p.player.slug;
      const alreadyGuessed = guesses.some((g) => g.guess === slug);
      const alreadyHinted = hintsUsed[slug];

      return !alreadyGuessed && !alreadyHinted;
    });

    if (!availablePlayers.length)
      return;

    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];

    if (randomPlayer) {
      setHintsUsed((prev) => ({
        ...prev,
        [randomPlayer.player.slug]: true,
      }));
    }
  };

   // Return a basic answer if loading the match fails
  if (!match)
    return <div className="loading">The players are still warming up...</div>;

  const homeLineup = match.lineups.filter((p) => p.team === match.homeTeam);
  const awayLineup = match.lineups.filter((p) => p.team === match.awayTeam);

  return (
    <div className="game-page">
      <GameHeader />

      <div className="game-layout">
        <div className="main-content">
          <MatchHeader match={match} />

          <div className="pitches">
            <div>
              <h2>{match.homeTeam}</h2>
              <LineupBoard lineup={homeLineup} guesses={guesses} />
            </div>

            <div>
              <h2>{match.awayTeam}</h2>
              <LineupBoard lineup={awayLineup} guesses={guesses} />
            </div>
          </div>
        </div>

        <div className="side-panel right-panel">
          <GuessInput
            matchId={match.id}
            addGuess={addGuess}
            onHint={handleHint}
          />

          <GuessHistory
            homeLineup={homeLineup}
            awayLineup={awayLineup}
            guesses={guesses}
            hintsUsed={hintsUsed}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
