/**
 * Replaces: new RegExp("^" + char + "+|" + char + "+$", "g") -> ""
 *
 * Strips a chosen character from the leading and trailing edges of a
 * string, leaving occurrences in the middle alone. Built-in .trim()
 * only handles whitespace; this covers any single character (a
 * leading space, a stray leading dash, and so on) with a plain
 * character loop instead of a regex with dynamic flags.
 */
export function trimCharacter(input: string, char: string): string {
  let start = 0
  let end = input.length

  while (start < end && input.charAt(start) === char) {
    start = start + 1
  }

  while (end > start && input.charAt(end - 1) === char) {
    end = end - 1
  }

  return input.slice(start, end)
}
