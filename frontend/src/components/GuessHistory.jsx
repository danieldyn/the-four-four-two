/**
 * 
 * @param {*} guesses 
 * @returns A component which contains the player's guess history
 */
export default function GuessHistory({ guesses }) {
  if (!guesses.length)
    return null

  return (
    <div className="guess-history">
      <h3>Guesses</h3>

      <ul>
        {guesses.map((g, index) => (
          <li key={index}>
            {g.display} {g.result === "correct" ? "✔" : "✖"}
          </li>
        ))}
      </ul>

    </div>
  )
}
