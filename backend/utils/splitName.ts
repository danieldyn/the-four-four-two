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
    "el", "al", "dos", "das", "mac",
    "van der", "van den", "De"
  ];

  const parts: string[] = fullName.trim().split(" ");

  // Handle one-word names separately
  if (parts.length === 1) {
    return {
      firstName: "",
      lastName: parts[0] ?? ""
    };
  }

  // Sort particles by word count to match longest particles first
  const sortedParticles = particles.sort((a, b) => 
    b.split(" ").length - a.split(" ").length
  );

  // Check each particle against the end of the name
  for (const particle of sortedParticles) {
    const particleWords = particle.split(" ");
    const particleLength = particleWords.length;

    // Need at least one word after the particle for the last name
    if (parts.length > particleLength + 1) {
      const checkStart = parts.length - particleLength - 1;
      const potentialParticle = parts
        .slice(checkStart, checkStart + particleLength)
        .map(p => p.toLowerCase())
        .join(" ");

      if (potentialParticle === particle.toLowerCase()) {
        return {
          firstName: parts.slice(0, checkStart).join(" "),
          lastName: parts.slice(checkStart).join(" ")
        };
      }
    }
  }

  // No particle matched, use default split
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1] ?? ""
  };
}
