/**
 * Masks or partially reveals a player's name using dots.
 * Revealing causes approximately 1/3 of the letters to become visible.
 * 
 * @param firstName 
 * @param lastName  
 * @param revealHint - Whether to reveal a portion of the name
 * @returns The masked or partially revealed name
 */
export function maskName(
  firstName: string, 
  lastName: string, 
  revealHint: boolean = false
): string {
  const fullName: string = `${firstName} ${lastName}`.trim();

  // Defaults to no hints unless specified
  if (!revealHint) {
    return fullName
      .split("")
      .map((char: string) => (char === " " ? " " : "•"))
      .join("");
  }

  // Hint random logic
  const chars: string[] = fullName.split("");

  // Get indexes of letters only (ignoring spaces)
  const letterIndexes: number[] = chars
    .map((char, i) => (char !== " " ? i : null))
    .filter((i): i is number => i !== null);

  // REVIEW: Create a fairer logic (long names are easy to guess with 1/3 of the letters)
  const revealCount: number = Math.ceil(letterIndexes.length / 3);

  // REVIEW: Evenly distribute revealed letters (maybe not later)
  const step: number = Math.floor(letterIndexes.length / revealCount);

  const revealedIndexes: Set<number> = new Set();
  for (let i = 0; i < letterIndexes.length; i += (step || 1)) {
    const targetIndex = letterIndexes[i];
    if (targetIndex !== undefined) {
      revealedIndexes.add(targetIndex);
    }
  }

  return chars
    .map((char, i) => {
      if (char === " ") return " ";
      return revealedIndexes.has(i) ? char : "•";
    })
    .join("");
}
