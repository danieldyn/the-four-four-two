/* Relevant constants for absolute positioning */
const RIGHT_X = 85;
const RLEFT_X = 65;
const CENTRE_X = 50;
const CLEFT_X = 35;
const LEFT_X = 15;

const DEF_Y = 75;
const MID_Y = 50;
const AMID_Y = 35;
const WING_Y = 25;
const ATT_Y = 17;

export const positionCoords = {
  /* Goalkeeper  */
  GK: { x: CENTRE_X, y: 92 },

  /* Defence (standard back 4 plus support for 3-centre-back formations) */
  LB: { x: LEFT_X - 2, y: DEF_Y },
  LCB: { x: CLEFT_X, y: DEF_Y },
  CB: { x: CENTRE_X, y: DEF_Y },
  RCB: { x: RLEFT_X, y: DEF_Y },
  RB: { x: RIGHT_X + 2, y: DEF_Y },

  /* Wingbacks (if needed) */
  LWB: { x: LEFT_X - 2, y: DEF_Y - 8 },
  RWB: { x: RIGHT_X + 2, y: DEF_Y - 8 },

  /* Midfield (all possibilities) */
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

  /* Attack (includes right-sided second striker) */
  LW: { x: LEFT_X + 5, y: WING_Y },
  RW: { x: RIGHT_X - 5, y: WING_Y },

  LS: { x: CLEFT_X, y: ATT_Y },
  ST: { x: CENTRE_X, y: ATT_Y },
  RS: { x: RLEFT_X, y: ATT_Y },

  CF: { x: CENTRE_X, y: AMID_Y - 5 },
  SS: { x: RLEFT_X, y: ATT_Y + 3 }
}

export function mapLineupToPositions(lineup) {
  return lineup.map(player => {
    const coords = positionCoords[player.position] || { x: CENTRE_X, y: MID_Y }

    return {
      ...player,
      x: coords.x,
      y: coords.y
    }
  })
}
