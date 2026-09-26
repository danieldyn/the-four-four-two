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
    <div
      className="relative w-[420px] h-[480px] rounded-xl p-5 overflow-hidden flex flex-col justify-between items-center border-[3px] border-white/70 shadow-[inset_0_0_60px_rgba(0,0,0,0.6),0_10px_30px_rgba(0,0,0,0.4)] bg-[repeating-linear-gradient(to_bottom,#4caf50,#4caf50_40px,#43a047_40px,#43a047_80px)]"
    >
      {/* Centre Markings */}
      <div className="absolute w-full h-[2px] bg-white/70 top-1/2 left-0 -translate-y-1/2 z-[1]" />
      <div className="absolute w-[120px] h-[120px] border-2 border-white/70 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]" />
      <div className="absolute w-1.5 h-1.5 bg-white/70 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]" />

      {/* Top Goal Area */}
      <div className="absolute w-[200px] h-[90px] border-2 border-white/70 border-t-0 left-1/2 -translate-x-1/2 top-0 z-[1]" />
      <div className="absolute w-[90px] h-[35px] border-2 border-white/70 border-t-0 left-1/2 -translate-x-1/2 top-0 z-[1]" />
      <div className="absolute w-[70px] h-[35px] top-[90px] rounded-b-[70px] border-2 border-white/70 border-t-0 left-1/2 -translate-x-1/2 z-[1]" />
      <div className="absolute w-[5px] h-[5px] bg-white/70 rounded-full left-1/2 -translate-x-1/2 top-[65px] z-[1]" />

      {/* Bottom Goal Area */}
      <div className="absolute w-[200px] h-[90px] border-2 border-white/70 border-b-0 left-1/2 -translate-x-1/2 bottom-0 z-[1]" />
      <div className="absolute w-[90px] h-[35px] border-2 border-white/70 border-b-0 left-1/2 -translate-x-1/2 bottom-0 z-[1]" />
      <div className="absolute w-[70px] h-[35px] bottom-[90px] rounded-t-[70px] border-2 border-white/70 border-b-0 left-1/2 -translate-x-1/2 z-[1]" />
      <div className="absolute w-[5px] h-[5px] bg-white/70 rounded-full left-1/2 -translate-x-1/2 bottom-[65px] z-[1]" />

      {/* Players */}
      {positioned.map((p) => {
        const isGuessed = guesses.some((g) => g.guess === p.player.slug);
        const isMissing = !isGuessed && isFinished;
        const showPlayer = isGuessed || isFinished;

        return (
          <div
            key={p.id}
            className="absolute flex flex-col items-center z-[2]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Player Name Pill */}
            {showPlayer && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 text-[0.75rem] font-semibold text-white mb-1.5 text-center whitespace-nowrap z-[3] tracking-[0.5px] bg-black/50 py-[3px] px-2 rounded-xl border border-white/15 backdrop-blur-[2px]"
                style={{ color: isMissing ? "#ef4444" : undefined }}
              >
                {p.player.display || p.player.lastName}
              </div>
            )}

            {/* Shirt Token + Badges */}
            <div className="relative">
              <div
                className="w-[50px] h-[50px] rounded-full border-2 flex items-center justify-center font-bold"
                style={{
                  backgroundColor: primaryColour || defaultPrimary,
                  color: secondaryColour || defaultSecondary,
                  borderColor: secondaryColour || defaultSecondary,
                }}
              >
                {p.shirtNumber ?? "?"}
              </div>

              {/* Goals */}
              {p.goalsScored > 0 && (
                <div className="absolute -top-2 -right-3 text-[15px] whitespace-nowrap pointer-events-none z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  {"⚽".repeat(p.goalsScored)}
                </div>
              )}

              {/* Captain Badge */}
              {p.isCaptain && (
                <div
                  className="absolute -bottom-1 -right-2 bg-[#fbbf24] text-black text-[11px] font-bold py-[1px] px-1 rounded-[3px] border border-[#d97706] pointer-events-none leading-none"
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
