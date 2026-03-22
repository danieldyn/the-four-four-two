/**
 * 
 * @param {string} name 
 * @returns {string} The normalised name (accents are removed, spaces are replaced 
 * with hyphens and the string is lowercased)
 */
export default function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}
