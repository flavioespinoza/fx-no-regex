/**
 * Replaces: /[ ]{2,}/g -> " "
 *
 * Collapses any run of two or more spaces down to a single space.
 * No regex: split on the single space character, drop the empty
 * strings a run of spaces produces, and join back with one space.
 */
export function collapseSpaces(input: string): string {
  const parts = input.split(" ")
  const nonEmpty: string[] = []
  for (const part of parts) {
    if (part.length > 0) {
      nonEmpty.push(part)
    }
  }
  return nonEmpty.join(" ")
}
