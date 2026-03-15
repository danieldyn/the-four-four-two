import { useState } from "react"
import slugify from "../utils/slugify"

export default function GuessInput({ matchId, addGuess }) {
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

    addGuess(data.player.slug, data.result, {
      player: data.player,
      team: data.team
    })

    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter player last name"
      />
      <button type="submit">Guess</button>
    </form>
  )
}
