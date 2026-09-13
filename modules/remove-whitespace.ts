/**
 * Replaces: /\s+/g -> ""
 *
 * Removes every space, tab, newline, and carriage return from a string.
 * No regex: each whitespace character is stripped with its own
 * replaceAll call so every occurrence is removed, not just the first.
 */
export function removeWhitespace(input: string): string {
  return input
    .replaceAll(" ", "")
    .replaceAll("\t", "")
    .replaceAll("\n", "")
    .replaceAll("\r", "")
}
