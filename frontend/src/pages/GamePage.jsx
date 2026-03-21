import { useState, useEffect } from "react"
import GuessInput from "../components/GuessInput"
import GuessHistory from "../components/GuessHistory"
import LineupBoard from "../components/LineupBoard"
import MatchHeader from "../components/MatchHeader"
import GameHeader from "../components/GameHeader"

/**
 * 
 * @returns The Game Page component, containing:
 *            - The header (game name + return to Home Page button)
 *            - A left container (TODO what it contains)
 *            - A central container (the lineups + the guessing form)
 *            - A right container (TODO what it contains)
 */
export default function GamePage() {

  const [match, setMatch] = useState(null)
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/matches/random")
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

  // Return a basic answer if loading the match fails
  if (!match)
    return <div>Loading...</div>

  const homeLineup = match.lineups.filter(p => p.team === match.homeTeam)
  const awayLineup = match.lineups.filter(p => p.team === match.awayTeam)

  return (
    <div className="game-page">

      <GameHeader />

      <div className="game-layout">

        <div className="side-panel left-panel">
          {/* TODO: Future content */}
        </div>

        <div className="main-content">

          <MatchHeader match={match} />

          <div className="pitches">
            <div>
              <h2>{match.homeTeam}</h2>
              <LineupBoard
                lineup={homeLineup}
                guesses={guesses}
              />
            </div>

            <div>
              <h2>{match.awayTeam}</h2>
              <LineupBoard
                lineup={awayLineup}
                guesses={guesses}
              />
            </div>
          </div>

          <GuessInput
            matchId={match.id}
            addGuess={addGuess}
          />

          <GuessHistory guesses={guesses} />

        </div>

        <div className="side-panel right-panel">
          {/* TODO: Future content */}
        </div>

      </div>
    </div>
  )
}
