/**
 * Masks or partially reveals a player's name using dots.
 * Revealing causes approximately 1/3 of the letters to become visible.
 * 
 * @param {string} firstName 
 * @param {string} lastName  
 * @param {boolean} revealHint
 * @returns The masked or partially revealed name
 */
export function maskName(firstName, lastName, revealHint=false) {
	const fullName = `${firstName} ${lastName}`.trim()

  // Defaults to no hints unless specified
  if (!revealHint)
    return fullName
      .split("")
      .map(char => (char === " " ? " " : "•"))
      .join("")

  // Hint random logic
  const chars = fullName.split("")

  // Get indexes of letters only
  const letterIndexes = chars
    .map((char, i) => (char !== " " ? i : null))
    .filter(i => i !== null)

  // REVIEW: Create a fairer logic (long names are easy to detect with 1/3 of the letters)
  const revealCount = Math.ceil(letterIndexes.length / 3)

  // REVIEW: Evenly distribute revealed letters (maybe not later)
  const step = Math.floor(letterIndexes.length / revealCount)

  const revealedIndexes = new Set()
  for (let i = 0; i < letterIndexes.length; i += step) {
    revealedIndexes.add(letterIndexes[i])
  }

  return chars
    .map((char, i) => {
      if (char === " ") return " "
      return revealedIndexes.has(i) ? char : "•"
    })
    .join("")
}
