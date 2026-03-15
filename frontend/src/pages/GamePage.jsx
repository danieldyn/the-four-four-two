import { useState, useEffect } from "react"
import GuessInput from "../components/GuessInput"
import GuessHistory from "../components/GuessHistory"
import LineupBoard from "../components/LineupBoard"
import MatchHeader from "../components/MatchHeader"

export default function GamePage() {

  const [match, setMatch] = useState(null)
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/matches/1")
      .then(res => res.json())
      .then(data => setMatch(data))
  }, [])

  const addGuess = (slug, result, playerData) => {
    setGuesses(prev => [...prev, {
      guess: slug,
      result,
      display: playerData.player.lastName
    }])
  }

if (!match)
  return <div>Loading...</div>

const homeLineup = match.lineups.filter(p => p.team === match.homeTeam)
const awayLineup = match.lineups.filter(p => p.team === match.awayTeam)

return (
  <div style={{ padding: "20px" }}>
    <MatchHeader match={match} />

    <div style={{ display: "flex", gap: "40px" }}>
      <div>
        <h2>{match.homeTeam}</h2>
          <LineupBoard lineup={homeLineup} guesses={guesses} />
      </div>

      <div>
        <h2>{match.awayTeam}</h2>
          <LineupBoard lineup={awayLineup} guesses={guesses} />
      </div>
    </div>

    <GuessInput matchId={match.id} addGuess={addGuess} />

    <GuessHistory guesses={guesses} />
  </div>
)
}
