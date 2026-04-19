import { mapLineupToPositions } from "../utils/formation"

export default function LineupBoard({ lineup = [], guesses = [] }) {
  if (!lineup.length)
    return null

  const positioned = mapLineupToPositions(lineup)

  return (
    <div className="pitch">
      <div className="center-line"></div>
      <div className="center-circle"></div>
      <div className="penalty-box top"></div>
      <div className="penalty-box bottom"></div>
      <div className="goal-box top"></div>
      <div className="goal-box bottom"></div>

      {positioned.map(p => {
        const guessed = guesses.some(g => g.guess === p.player.slug)

        return (
          <div
            key={p.id}
            className="player-wrapper"
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            {guessed && (
              <div className="player-name">
                {p.player.display}
              </div>
            )}

            <div className="player-slot">
              {p.shirtNumber}
            </div>
          </div>
        )
      })}
    </div>
  )
}
