export default function GuessHistory({ guesses }) {
  if (!guesses.length)
    return null

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Guesses:</h3>
      <ul>
        {guesses.map((g, i) => (
          <li key={i}>
            {g.guess} — {g.result === "correct" ? "✔" : "✖"}
          </li>
        ))}
      </ul>
    </div>
  )
}
