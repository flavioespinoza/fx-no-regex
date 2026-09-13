/**
 * Replaces: /^[a-zA-Z0-9]+$/.test(input)
 *
 * Checks whether a string is made up of nothing but letters and
 * digits. No regex: a character loop against a fixed allowed set,
 * same technique as removeDigits, applied as a test instead of a
 * strip.
 */
const ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

export function isAlphanumeric(input: string): boolean {
  if (input.length === 0) {
    return false
  }
  for (const char of input) {
    if (!ALPHANUMERIC.includes(char)) {
      return false
    }
  }
  return true
}
