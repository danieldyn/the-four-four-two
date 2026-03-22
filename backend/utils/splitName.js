/**
 * 
 * @param {string} fullName 
 * @returns {string, string} The proper separation of a player's name and surname, taking common particles into account.
 */
export default function splitName(fullName) {
  // TODO: Always add new particles here
  const particles = [
    "di", "de", "del", "della", "da",
    "van", "von", "le", "la", "den",
    "el", "al", "dos", "das", "mac"
  ]

  const parts = fullName.trim().split(" ")

  if (parts.length === 1) {
    return {
      firstName: "",
      lastName: parts[0]
    }
  }

  const lastPart = parts[parts.length - 1]
  const secondLast = parts[parts.length - 2]?.toLowerCase()

  if (particles.includes(secondLast)) {
    return {
      firstName: parts.slice(0, -2).join(" "),
      lastName: parts.slice(-2).join(" ")
    }
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: lastPart
  }
}