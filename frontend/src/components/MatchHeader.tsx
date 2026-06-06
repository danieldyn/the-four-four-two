import React from "react";
import formatDate from "../utils/formatDate";
import { Match } from "../types/football";

/**
 * The shape of a match object.
 */
interface MatchHeaderProps {
  match: Match;
}

/**
 * Displays the key metadata of the match: Date, Competition, and Venue.
 */
const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  return (
    <div className="match-header">
      <h3>
        {formatDate(match.date.toString())}, {match.competition} — {match.venue}
      </h3>
      <h2> {match.score} </h2>
    </div>
  );
};

export default MatchHeader;
