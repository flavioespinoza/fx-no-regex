/**
 * Replaces: /[0-9]/g -> ""
 *
 * Removes every digit from a string. No single string method covers
 * a character class, so this is the coding-standards fallback: a
 * character loop, checking each character against a fixed digit set,
 * building the result with concatenation.
 */
const DIGITS = "0123456789"

export function removeDigits(input: string): string {
  let result = ""
  for (const char of input) {
    if (!DIGITS.includes(char)) {
      result = result + char
    }
  }
  return result
}
