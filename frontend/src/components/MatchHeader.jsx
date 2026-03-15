export default function MatchHeader({ match }) {
  return (
    <div>
      <h1>{match.homeTeam} vs {match.awayTeam}</h1>
      <p>{match.competition} — {match.venue}</p>
    </div>
  )
}
