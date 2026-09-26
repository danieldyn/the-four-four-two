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
    <div className="bg-black/25 border-l border-white/10 rounded-xl px-4 py-3 my-4 mx-auto w-full max-w-[1400px] text-center">
      <h3 className="text-base font-medium text-slate-300 m-0">{match.competition}</h3>
      <h3 className="text-base text-slate-400 font-normal mt-0.5 mb-2">
        {formatDate(match.date.toString())} &mdash; {match.venue}
      </h3>
      <h2 className="text-lg md:text-2xl font-bold text-sky-200 tracking-wide my-1">
        {match.homeTeam} vs {match.awayTeam}
      </h2>
      <h2 className="text-lg font-semibold text-emerald-400 m-0">Score: {match.score}</h2>
    </div>
  );
};

export default MatchHeader;
