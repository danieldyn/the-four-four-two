/**
 * Normalises a name: accents and punctuation are removed, 
 * spaces are replaced with hyphens and the string is lowercased.
 */
export default function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // All diacritics are removed
    .replace(/[^a-z0-9\s-]/g, "")    // Allows alphanumerics, spaces and hyphens
    .replace(/\s+/g, "-")            // Spaces become hyphens
    .replace(/-+/g, "-")             // Multiples hyphens are merged into a single one
}
