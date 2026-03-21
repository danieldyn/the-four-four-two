import format_date from "../utils/format_date"

/**
 * 
 * @param {*} match  
 * @returns A component that contains the date, competition and venue of the respective match. 
 */
export default function MatchHeader({ match }) {
  return (
    <div>
      <h3>{format_date(match.date)}, {match.competition} -- {match.venue}</h3>
    </div>
  )
}
