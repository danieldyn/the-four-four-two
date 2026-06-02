import { LineupEntry } from "../types/football";

/* Relevant constants for absolute positioning */
const RIGHT_X = 85;
const RLEFT_X = 65;
const CENTRE_X = 50;
const CLEFT_X = 35;
const LEFT_X = 15;

const GK_Y = 92;
const DEF_Y = 75;
const MID_Y = 50;
const AMID_Y = 35;
const WING_Y = 25;
const ATT_Y = 17;
const DEPTH_GROUPING_FACTOR = 12; // Used for grouping players based on depth similarity

/**
 * The pair of coordinates necessary for absolute positining.
 */
export interface Coordinates {
  x: number;
  y: number;
}

/**
 * A mapped player includes all LineupEntry data plus coordinates.
 */
export interface PositionedPlayer extends LineupEntry {
  x: number;
  y: number;
}

export const positionCoords: Record<string, Coordinates> = {
  GK: { x: CENTRE_X, y: GK_Y },
  LB: { x: LEFT_X - 2, y: DEF_Y },
  LCB: { x: CLEFT_X, y: DEF_Y },
  CB: { x: CENTRE_X, y: DEF_Y },
  RCB: { x: RLEFT_X, y: DEF_Y },
  RB: { x: RIGHT_X + 2, y: DEF_Y },
  LWB: { x: LEFT_X - 2, y: DEF_Y - 8 },
  RWB: { x: RIGHT_X + 2, y: DEF_Y - 8 },
  LDM: { x: CLEFT_X, y: MID_Y + 5 },
  CDM: { x: CENTRE_X, y: MID_Y + 5 },
  RDM: { x: RLEFT_X, y: MID_Y + 5 },
  LCM: { x: CLEFT_X - 3, y: MID_Y },
  RCM: { x: RLEFT_X + 3, y: MID_Y },
  LAM: { x: CLEFT_X, y: AMID_Y },
  CAM: { x: CENTRE_X, y: AMID_Y },
  RAM: { x: RLEFT_X, y: AMID_Y },
  LM: { x: LEFT_X - 2, y: MID_Y - 5 },
  RM: { x: RIGHT_X + 2, y: MID_Y - 5 },
  LW: { x: LEFT_X + 5, y: WING_Y },
  RW: { x: RIGHT_X - 5, y: WING_Y },
  LS: { x: CLEFT_X, y: ATT_Y },
  ST: { x: CENTRE_X, y: ATT_Y },
  RS: { x: RLEFT_X, y: ATT_Y },
  CF: { x: CENTRE_X, y: AMID_Y - 5 },
  SS: { x: RLEFT_X, y: ATT_Y + 3 }
};

export function mapLineupToPositions(lineup: LineupEntry[]): PositionedPlayer[] {
  // Assign static coordinates first, resulting in a draft of the mapped positions
  const positioned = lineup.map(player => {
    const coords = (player.position && positionCoords[player.position]) 
      || { x: CENTRE_X, y: MID_Y };

    return {
      ...player,
      x: coords.x,
      y: coords.y
    };
  });

  // Separate outfield players for rearranging, sorting them based on depth (Y)
  const keeper = positioned.filter(p => p.position === 'GK');
  const outfielders = positioned.filter(p => p.position !== 'GK');
  outfielders.sort((a, b) => b.y - a.y);

  const rows: PositionedPlayer[][] = [];
  let currentRow: PositionedPlayer[] = [];

  // Group players into rows based on depth (Y) to emulate the compartments of a real lineup
  outfielders.forEach(player => {
    if (currentRow.length === 0) {
      currentRow.push(player);
    } else {
      // Include players in the current group based on the global factor
      const rowDeepestY = currentRow[0].y;
      if (Math.abs(rowDeepestY - player.y) <= DEPTH_GROUPING_FACTOR) {
        currentRow.push(player);
      } else {
        rows.push(currentRow);
        currentRow = [player];
      }
    }
  });
  if (currentRow.length > 0)
    rows.push(currentRow);

  // Distribute X coordinates based on row size
  const rowSpreads: Record<number, number[]> = {
    1: [50],
    2: [35, 65],             // Usage: 2 Centre Backs, 2 Defensive Midfielders, or 2 Strikers
    3: [20, 50, 80],         // Usage: 3 at the back, or Winger duo plus Striker in attack
    4: [15, 38, 62, 85],     // Usage: Classic back 4 or flat midfield 4
    5: [12, 31, 50, 69, 88]  // Usage: Condensed back 5
  };

  rows.forEach(row => {
    // Sort the grouped players based on their initial static X
    row.sort((a, b) => a.x - b.x);

    const count = row.length;
    const spread = rowSpreads[count];

    // Aplly dynamically determined X coordinate
    row.forEach((player, index) => { player.x = spread[index]; });
  });

  // Combine GK back with the repositioned outfielders
  return [...keeper, ...rows.flat()];
}
