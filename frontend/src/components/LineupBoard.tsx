import React from "react";
import { mapLineupToPositions, PositionedPlayer } from "../utils/formation";
import { LineupEntry } from "../types/football";
import { Guess } from "../pages/GamePage";

interface LineupBoardProps {
  lineup: LineupEntry[];
  guesses: Guess[];
  primaryColour?: string | null;
  secondaryColour?: string | null;
  hasResigned: boolean;
}

/**
 * Renders a football pitch containing a team's starting lineup.
 */
const LineupBoard: React.FC<LineupBoardProps> = ({ 
  lineup = [],
  guesses = [],
  primaryColour,
  secondaryColour,
  hasResigned
}) => {
  if (!lineup.length)
    return null;

  // This adds the .x and .y properties based on the player's position
  const positioned: PositionedPlayer[] = mapLineupToPositions(lineup);

  // Define default fallback colours in case their are not included
  const defaultPrimary = "#2e7d32";
  const defaultSecondary = "#ffffff";

  return (
    <div className="pitch">
      {/* Pitch Markings */}
      <div className="center-line"></div>
      <div className="center-circle"></div>
      <div className="center-spot"></div>

      {/* Top Goal Area */}
      <div className="penalty-box top"></div>
      <div className="goal-box top"></div>
      <div className="penalty-arc top"></div>
      <div className="penalty-spot top"></div>

      {/* Bottom Goal Area */}
      <div className="penalty-box bottom"></div>
      <div className="goal-box bottom"></div>
      <div className="penalty-arc bottom"></div>
      <div className="penalty-spot bottom"></div>

      {/* Player Rendering */}
      {positioned.map((p) => {
        const isGuessed = guesses.some((g) => g.guess === p.player.slug);
        const isMissing = !isGuessed && hasResigned;
        const showPlayer = isGuessed || hasResigned;

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
            {showPlayer && (
              <div 
                className="player-name"
                style={{ color: isMissing ? "#ef4444" : undefined }}
              >
                {p.player.display || p.player.lastName} 
              </div>
            )}

            <div
              className={`player-slot ${showPlayer ? "revealed" : ""}`}
              style={{
                backgroundColor: primaryColour || defaultPrimary,
                color: secondaryColour || defaultSecondary,
                borderColor: secondaryColour || defaultSecondary
              }}
            >
              {p.shirtNumber ?? "?"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LineupBoard;
