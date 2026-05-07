import React from "react";
import { maskName } from "../utils/maskName";
import { LineupEntry } from "../types/football";
import { Guess } from "../pages/GamePage";

/**
 * The shape of the Guess History panel's attributes.
 * It tracks down hints requested by the user, their guesses
 * and constantly needs to know the full lineups.
 */
interface GuessHistoryProps {
  homeLineup: LineupEntry[];
  awayLineup: LineupEntry[];
  guesses: Guess[];
  hintsUsed: Record<string, boolean>;
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ 
  homeLineup, 
  awayLineup, 
  guesses, 
  hintsUsed 
}) => {
  // Extract the slugs of players correctly guessed
  const guessedSlugs = guesses
    .filter((g) => g.result === "correct")
    .map((g) => g.guess);

  const renderTeam = (teamName: string | undefined, lineup: LineupEntry[]) => {
    // Sort by shirt number, handling potential null values
    const sorted = [...lineup].sort((a, b) => {
      const numA = a.shirtNumber ?? 0;
      const numB = b.shirtNumber ?? 0;
      return numA - numB;
    });

    return (
      <div className="team-block">
        <h4>{teamName ?? "Unknown Team"}</h4>

        <ul>
          {sorted.map((p) => {
            const isGuessed = guessedSlugs.includes(p.player.slug);
            const correctAnswer = (p.player.alias && p.player.display)
                                ? p.player.display 
                                : `${p.player.firstName} ${p.player.lastName}`;

            return (
              <li key={p.id} className={`player-row ${isGuessed ? "revealed" : ""}`}>
                <span className="shirt-number">
                  {p.shirtNumber ?? "?"}
                </span>

                <span className="history-player-name">
                  {isGuessed
                    ? correctAnswer
                    : maskName(correctAnswer, hintsUsed[p.player.slug])
                  }
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="guess-history">
      {renderTeam(homeLineup[0]?.team, homeLineup)}
      {renderTeam(awayLineup[0]?.team, awayLineup)}
    </div>
  );
};

export default GuessHistory;
