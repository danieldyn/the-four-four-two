import { useState } from "react"
import slugify from "../utils/slugify"

export default function GuessInput({ matchId, addGuess, onHint }) {
  const [value, setValue] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    if (!value)
      return

    // Normalise all user input before sending
    const normalisedGuess = slugify(value)

    const res = await fetch("http://localhost:4000/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, guess: normalisedGuess })
    })

    const data = await res.json()

    if (data.result === "correct") {
    addGuess(data.player.slug, data.result, {
      player: data.player,
      team: data.team
    })
    } else {
      // Fallback for wrong user guesses
      addGuess(normalisedGuess, "wrong", null)
    }

    setValue("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter player last name"
      />
      <button type="submit" className="submit-button">Guess</button>
      <button type="button" className="hint-button" onClick={onHint}>Hint</button>
    </form>
  )
}
