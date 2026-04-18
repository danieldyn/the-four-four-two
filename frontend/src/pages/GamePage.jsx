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
 *            - A left container (two side-by-side pitches)
 *            - A right container (a list of masked and guessed names and the input form)
 */
export default function GamePage() {

  const [match, setMatch] = useState(null)
  const [guesses, setGuesses] = useState([])
  const [hintsUsed, setHintsUsed] = useState({})

  useEffect(() => {
    fetch("http://localhost:4000/matches/random")
      .then(res => res.json())
      .then(data => setMatch(data))
  }, [])

  const addGuess = (slug, result, playerData) => {
    if (result === "correct") {
      const fullName = playerData.player.firstName + " " + playerData.player.lastName

      setGuesses(prev => [
        ...prev,
        {
          guess: slug,
          result,
          display: fullName
        }
      ])
    } else {
      setGuesses(prev => [
        ...prev,
        {
          guess: slug,
          result,
          display: slug
        }
      ])
    }
  }

  // Using a hint wll reveal several letters from the mask of a player
  const handleHint = () => {
    const availablePlayers = match.lineups.filter(p => {
      const slug = p.player.slug

      const alreadyGuessed = guesses.some(g => g.guess === slug)
      const alreadyHinted = hintsUsed[slug]

      return !alreadyGuessed && !alreadyHinted
    })

    if (!availablePlayers.length) return

    const randomPlayer =
      availablePlayers[Math.floor(Math.random() * availablePlayers.length)]

    setHintsUsed(prev => ({
      ...prev,
      [randomPlayer.player.slug]: true
    }))
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

        </div>

        <div className="side-panel right-panel">
          <GuessInput
            matchId={match.id}
            addGuess={addGuess}
            onHint={handleHint}
          />

          <GuessHistory 
            homeLineup={homeLineup}
            awayLineup={awayLineup}
            guesses={guesses}
            hintsUsed={hintsUsed}
          />
        </div>

      </div>
    </div>
  )
}
