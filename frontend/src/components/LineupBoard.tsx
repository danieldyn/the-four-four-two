import React from "react";
import { mapLineupToPositions, PositionedPlayer } from "../utils/formation";
import { LineupEntry } from "../types/football";
import { Guess } from "../pages/GamePage";

interface LineupBoardProps {
  lineup: LineupEntry[];
  guesses: Guess[];
}

/**
 * Renders a football pitch containing a team's starting lineup.
 */
const LineupBoard: React.FC<LineupBoardProps> = ({ lineup = [], guesses = [] }) => {
  if (!lineup.length)
    return null;

  // This adds the .x and .y properties based on the player's position
  const positioned: PositionedPlayer[] = mapLineupToPositions(lineup);

  return (
    <div className="pitch">
      {/* Pitch Markings */}
      <div className="center-line"></div>
      <div className="center-circle"></div>
      <div className="penalty-box top"></div>
      <div className="penalty-box bottom"></div>
      <div className="goal-box top"></div>
      <div className="goal-box bottom"></div>

      {/* Player Rendering */}
      {positioned.map((p) => {
        const isGuessed = guesses.some((g) => g.guess === p.player.slug);

        return (
          <div
            key={p.id}
            className="player-wrapper"
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {isGuessed && (
              <div className="player-name">
                {p.player.display || p.player.lastName}
              </div>
            )}

            <div className={`player-slot ${isGuessed ? "revealed" : ""}`}>
              {p.shirtNumber ?? "?"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LineupBoard;
