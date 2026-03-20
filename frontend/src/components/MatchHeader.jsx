export default function MatchHeader({ match }) {
  return (
    <div>
      <h1>The Four-Four-Two</h1>
      <h3>{match.homeTeam} vs {match.awayTeam}, {match.competition} -- {match.venue}</h3>
    </div>
  )
}
