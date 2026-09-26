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
  isFinished: boolean;
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ 
  homeLineup, 
  awayLineup, 
  guesses, 
  hintsUsed,
  isFinished
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
      <div className="my-1.5">
        <h4 className="text-left text-base font-semibold text-amber-200 my-1.5">{teamName ?? "Unknown Team"} &mdash; Starting XI</h4>

        <ul className="list-none p-0 m-0">
          {sorted.map((p) => {
            const isGuessed = guessedSlugs.includes(p.player.slug);
            const isMissing = !isGuessed && isFinished;
            const showRealName = isGuessed || isFinished;
            const correctAnswer = p.player.alias && p.player.display
                ? p.player.display
                : `${p.player.firstName} ${p.player.lastName}`;

            return (
              <li
                key={p.id}
                className={`flex items-center justify-between gap-2.5 my-0.5 text-base ${
                  isGuessed ? "text-[#bbe017]" : "text-white"
                }`}
              >
                <span className="w-6 text-right font-medium text-slate-300">{p.shirtNumber ?? "?"}</span>
                <span
                  className={`text-right font-mono tracking-widest transition-all duration-300 ${
                    isGuessed ? "animate-reveal" : ""
                  }`}
                  style={{ color: isMissing ? "#ef4444" : undefined }}
                >
                  {showRealName ? correctAnswer : maskName(correctAnswer, hintsUsed[p.player.slug])}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="text-white w-full">
      <hr className="border-t border-white/10 my-2" />
      {renderTeam(homeLineup[0]?.team, homeLineup)}
      <hr className="border-t border-white/10 my-2" />
      {renderTeam(awayLineup[0]?.team, awayLineup)}
    </div>
  );
};

export default GuessHistory;
