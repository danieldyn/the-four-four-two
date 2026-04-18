import { maskName } from "../utils/maskName"

/**
 * 
 * @param {*} guesses 
 * @returns A component which contains the player's guess history
 */
export default function GuessHistory({ homeLineup, awayLineup, guesses, hintsUsed }) {
  // Extract the user's guesses
  const guessedSlugs = guesses
    .filter(g => g.result === "correct")
    .map(g => g.guess)

  const renderTeam = (teamName, lineup) => {
    const sorted = [...lineup].sort((a, b) => a.shirtNumber - b.shirtNumber)

    return (
      <div className="team-block">
        <h4>{teamName}</h4>

        <ul>
          {sorted.map(p => {
            const isGuessed = guessedSlugs.includes(p.player.slug)

            return (
              <li key={p.id} className={`player-row ${isGuessed ? "revealed" : ""}`}>

                <span className="shirt-number">
                  {p.shirtNumber}
                </span>

                <span className="history-player-name">
                  {isGuessed
                    ? `${p.player.firstName} ${p.player.lastName}`
                    : maskName(p.player.firstName, p.player.lastName, hintsUsed[p.player.slug])
                  }
                </span>

              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="guess-history">
      {renderTeam(homeLineup[0]?.team, homeLineup)}
      {renderTeam(awayLineup[0]?.team, awayLineup)}

    </div>
  )
}
