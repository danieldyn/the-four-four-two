import { useState, useEffect } from "react"
import GuessInput from "../components/GuessInput"
import GuessHistory from "../components/GuessHistory"
import LineupGrid from "../components/LineupBoard"

export default function GamePage() {

  const [match, setMatch] = useState(null)
  const [guesses, setGuesses] = useState([])
  const [revealed, setRevealed] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/matches/1")
      .then(res => res.json())
      .then(data => setMatch(data))
  }, [])

  const addGuess = (guess, result, playerData) => {

    setGuesses(prev => [...prev, { guess, result }])

    if (result === "correct") {
      setRevealed(prev => [...prev, playerData])
    }
  }

  if (!match) return <div>Loading...</div>

  return (
    <div style={{ padding: "20px" }}>

      <h2>{match.homeTeam} vs {match.awayTeam}</h2>
      <p>{match.competition}</p>

      <GuessInput matchId={match.id} addGuess={addGuess} />

      <GuessHistory guesses={guesses} />

      <LineupGrid revealed={revealed} />

    </div>
  )
}