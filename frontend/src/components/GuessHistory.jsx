export default function GuessHistory({ guesses }) {
  if (!guesses.length)
    return null

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Guesses:</h3>
      <ul>
        {guesses.map(g => (
          <div key={g.guess}>
            {g.display} {g.result === "correct" ? "✔" : "✖"}
          </div>
        ))}
      </ul>
    </div>
  )
}
