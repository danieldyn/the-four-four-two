import { groupLineup } from "../utils/formation"

function Line({ players, guesses, justify = "center" }) {
  return (
    <div className="line" style={{ justifyContent: justify }}>
      {players.map(p => {
        const guessed = guesses.some(g => g.guess === p.player.slug)
        return (
          <div className="player-slot" key={p.id}>
            {guessed ? p.player.lastName : "?"}
          </div>
        )
      })}
    </div>
  )
}

export default function LineupBoard({ lineup = [], guesses = [] }) {
  if (!lineup.length) return <div>No lineup data</div>

  const groups = groupLineup(lineup)

  return (
    <div className="pitch">
      {/* Attack line */}
      <Line
        players={groups.attack}
        guesses={guesses}
        justify="space-around"
      />

      {/* Midfield line */}
      <Line
        players={groups.midfield}
        guesses={guesses}
        justify="space-around"
      />

      {/* Defence line */}
      <Line
        players={groups.defence}
        guesses={guesses}
        justify="space-around"
      />

      {/* Goalkeeper */}
      <Line
        players={groups.goalkeeper}
        guesses={guesses}
        justify="center"
      />
    </div>
  )
}
