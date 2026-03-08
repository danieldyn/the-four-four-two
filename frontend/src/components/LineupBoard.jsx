export default function LineupGrid({ revealed }) {

  const france = revealed.filter(p => p.team === "France")
  const italy = revealed.filter(p => p.team === "Italy")

  return (
    <div style={{ marginTop: "20px" }}>

      <h3>France</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 120px)", gap: "10px" }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} style={{ border: "1px solid black", padding: "10px", minHeight: "40px" }}>
            {france[i]?.player || ""}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "20px" }}>Italy</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 120px)", gap: "10px" }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} style={{ border: "1px solid black", padding: "10px", minHeight: "40px" }}>
            {italy[i]?.player || ""}
          </div>
        ))}
      </div>

    </div>
  )
}
