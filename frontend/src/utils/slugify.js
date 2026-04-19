/**
 * 
 * @param {string} name 
 * @returns {string} The normalised name (accents and punctuation are removed, 
 * spaces are replaced with hyphens and the string is lowercased)
 */
export default function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
