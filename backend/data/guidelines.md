# Match Importing Guidelines

## 1. Match Metadata and Formatting

- homeTeam / awayTeam: Full, official team name.
- competition: Full competition name, year, and leg/stage identifier when applicable (e.g., "Champions League Semi Final 2024 (1st Leg)").
- venue: Stadium name and city (e.g., "Stade de France, Paris").
- date: Match date formatted strictly as "YYYY-MM-DD".
- score: Exact score formatted with spaces around hyphens, including extra time or penalty shootouts if applicable:
  - Regular: "3 - 0"
  - Extra Time: "1 - 1 (a.e.t.)"
  - Penalty Shootout: "1 - 1 (4 - 2 on pens)"

## 2. Kit Colours

- Fields Affected: homePrimaryColour, homeSecondaryColour, awayPrimaryColour, awaySecondaryColour.
- Hex Codes: All colours represented as 6-digit hex values (e.g., "#FFFFFF").
- Match-Specific Kit Accuracy: Colours reflect the specific kit worn on that exact match day (not just general colours associated with a team).
- Contrast Requirement: The secondary color must be contrasting and legible when rendered as text over the primary color background.

## 3. Lineup Data

- Starting Eleven Only: Contains strictly the 11 starting players who kicked off the match (no substitutes or bench players).
- Player Object Fields:
  - number: Jersey number as an integer.
  - name: Player's full legal name, including correct accents/diacritics (e.g., "Vinícius José Paixão de Oliveira Júnior").
  - position: Standard tactical position abbreviation (e.g., "GK", "RB", "RCB", "LCB", "LB", "CDM", "RCM", "LCM", "CAM", "RW", "LW", "ST", "LS", "RS", "SS").

## 4. Optional Fields: alias and display

- Condition for Inclusion: Included only for players widely known in the footballing world by a single-word moniker or nickname rather than their legal surname (e.g., Brazilian/Portuguese single names, or monikers like "Chicharito", "Koke", "Memphis").
- alias: Strictly lowercase, no special accents, must be separated by hyphens and should avoid abbreviations (e.g., "vinicius-junior", "gilberto-silva", "cafu").
- display: Appears every time alias is present. Contains the properly capitalised and accented version as shown on official TV graphics or shirt names (e.g., "Roberto Carlos", "Thiago Silva", "Vinícius Júnior"). It is possible to have display without an alias for names that are very complex but no aliases exist (e.g., "Miguel Ángel Nadal", "Bruno Martins Indi", "Juan Sebastián Verón")
- Standard Names: If a player is known by their standard legal surname (e.g., "David Beckham", "Oliver Kahn", "Lionel Messi"), both "alias" and "display" are completely omitted.

## 5. Format Sample

```JSON
[
  {
    "homeTeam": "A",
    "homePrimaryColour": "#000000",
    "homeSecondaryColour": "#FFFFFF",
    "awayTeam": "B",
    "awayPrimaryColour": "#FFFFFF",
    "awaySecondaryColour": "#000000",
    "competition": "C",
    "venue": "D",
    "date": "2000-10-20",
    "score": "3 - 0",
    //"score": "1 - 1 (a.e.t.)",
    //"score": "1 - 1 (4 - 2 on pens)",

    "homeLineup": [
      { "number": 1, "name": "A B", "position": "GK", "alias": "normalised-alias", "display": "Capitalised Display Name" },
      { "number": 2, "name": "C D", "position": "RB" },
      { "number": 3, "name": "E F", "position": "RCB" },
      { "number": 4, "name": "G H", "position": "LCB" },
      { "number": 5, "name": "I J", "position": "LB" },
      { "number": 6, "name": "K L", "position": "RCM" },
      { "number": 7, "name": "M N", "position": "CDM" },
      { "number": 8, "name": "O P", "position": "LCM" },
      { "number": 9, "name": "Q R", "position": "RW" },
      { "number": 10, "name": "S T", "position": "ST" },
      { "number": 11, "name": "U V", "position": "LW" }
    ],

    "awayLineup": [
      // same layout
    ]
  },

  {
    // next match
  },

  {
    // etc.
  }
]
```
