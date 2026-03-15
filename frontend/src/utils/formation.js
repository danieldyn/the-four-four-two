export const positionLines = {
  GK: "goalkeeper",
  LB: "defence", CB: "defence", RB: "defence", LCB: "defence", RCB: "defence", LWB: "defence", RWB: "defence",
  CDM: "midfield", CM: "midfield", CAM: "midfield", LM: "midfield", RM: "midfield",
  LW: "attack", RW: "attack", ST: "attack", CF: "attack"
}

export function groupLineup(lineup) {
  const groups = {
    goalkeeper: [],
    defence: [],
    midfield: [],
    attack: []
  }

  lineup.forEach(p => {
    const line = positionLines[p.position] || "midfield"
    groups[line].push(p)
  })

  return groups
}
