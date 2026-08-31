/**
 * The shape of the player component.
 * Identical with the backend's interface
 */
export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  alias: string | null;
  display: string | null;
}

/**
 * The shape of the lineup component.
 * In addition to what the backend needs to know
 * for the guess service, the UI also accounts for
 * a player's shirt number, team and position.
 */
export interface LineupEntry {
  id: number;
  matchId: number;
  playerId: number;
  team: string;
  shirtNumber: number | null;
  position: string | null;
  starter: boolean;
  isCaptain: boolean;
  goalsScored: number;
  player: Player;
}

/**
 * The shape of the match component.
 * It brings together two lineups and general data
 * about the respective match, from the database.
 */
export interface Match {
  id: number;
  homeTeam: string;
  homePrimaryColour: string;
  homeSecondaryColour: string;
  awayTeam: string;
  awayPrimaryColour: string;
  awaySecondaryColour: string;
  competition: string;
  date: string | Date;
  venue: string;
  score: string;
  lineups: LineupEntry[];
}

/**
 * The shape of a guess response component.
 * It is returned by the backend via the guess/ endpoint.
 * Wrong guesses do not have a player or a team.
 */
export interface GuessResponse {
  result: "correct" | "wrong";
  player?: Player;
  team?: string;
}
