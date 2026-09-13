/**
 * Replaces: /^"(.*)"$/ -> "$1" and /^'(.*)'$/ -> "$1"
 *
 * Removes one matching pair of quotes from the very start and end of
 * a string, double or single, but only if both ends match. No regex:
 * compare the first and last character directly and slice them off.
 */
export function stripSurroundingQuotes(input: string): string {
  if (input.length < 2) {
    return input
  }

  const first = input.charAt(0)
  const last = input.charAt(input.length - 1)
  const isDoubleQuoted = first === "\"" && last === "\""
  const isSingleQuoted = first === "'" && last === "'"

  if (isDoubleQuoted || isSingleQuoted) {
    return input.slice(1, input.length - 1)
  }

  return input
}
