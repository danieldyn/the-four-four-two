/**
 * 
 * @param {string} firstName 
 * @param {string} lastName  
 * @returns The last name with all letters replaced by underscores
 */
export function maskName(firstName, lastName) {
	const fullName = `${firstName} ${lastName}`.trim()

  return fullName
    .split("")
    .map(char => {
      if (char === " ")
        return " "
      return "•"
    })
    .join("")
}
