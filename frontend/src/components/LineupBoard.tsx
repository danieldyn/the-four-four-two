import React from "react";
import { mapLineupToPositions, PositionedPlayer } from "../utils/formation";
import { LineupEntry } from "../types/football";
import { Guess } from "../pages/GamePage";

interface LineupBoardProps {
  lineup: LineupEntry[];
  guesses: Guess[];
  primaryColour?: string | null;
  secondaryColour?: string | null;
  isFinished: boolean;
}

/**
 * Renders a football pitch containing a team's starting lineup.
 */
const LineupBoard: React.FC<LineupBoardProps> = ({ 
  lineup = [],
  guesses = [],
  primaryColour,
  secondaryColour,
  isFinished
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
        const isMissing = !isGuessed && isFinished;
        const showPlayer = isGuessed || isFinished;

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

            {/* Added relative wrapper for the badges */}
            <div style={{ position: "relative" }}>
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

              {/* Goals - Top Right */}
              {p.goalsScored > 0 && (
                <div
                  className="player-goals"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-12px",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 10,
                    filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.5))"
                  }}
                >
                  {"⚽".repeat(p.goalsScored)}
                </div>
              )}

              {/* Captain Badge - Bottom Right */}
              {p.isCaptain && (
                <div
                  className="player-captain"
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    right: "-8px",
                    backgroundColor: "#fbbf24",
                    color: "#000",
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "1px 4px",
                    borderRadius: "3px",
                    border: "1px solid #d97706",
                    pointerEvents: "none",
                    lineHeight: 1
                  }}
                  title="Captain"
                >
                  C
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LineupBoard;
