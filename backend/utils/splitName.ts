/**
 * The standard interpretation of a player's name.
 * We need to expect players to have more last names
 * or be better known through their alias.
 * This model ignores such situations because the guess
 * service and the database properly use multiple names
 * and/or aliases to match user expectations in the UI
 * without compromising the backend logic.
 */
export interface NameSplit {
  firstName: string;
  lastName: string;
}

/**
 * Separates a player's first and last name, accounting for common 
 * particles found in footballers' names.
 */
export default function splitName(fullName: string): NameSplit {
  // REVIEW: Have any particles been forgotten?
  const particles: string[] = [
    "di", "de", "del", "della", "da",
    "van", "von", "le", "la", "den",
    "el", "al", "dos", "das", "mac"
  ];

  const parts: string[] = fullName.trim().split(" ");

  // Handle one-word names separately
  if (parts.length === 1) {
    return {
      firstName: "",
      lastName: parts[0] ?? ""
    };
  }

  const lastPart = parts[parts.length - 1] ?? "";
  const secondLast = parts[parts.length - 2]?.toLowerCase();

  // Check if the second to last part is a particle from the dictionary
  if (secondLast && particles.includes(secondLast)) {
    return {
      firstName: parts.slice(0, -2).join(" "),
      lastName: parts.slice(-2).join(" ")
    };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: lastPart
  };
}
