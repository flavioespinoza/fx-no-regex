/**
 * Replaces: /\./g -> ""
 *
 * Removes every period from a string. This is the example from the
 * coding-standards spec: replaceAll, not replace, so every period
 * is removed and not just the first one.
 */
export function removePeriods(input: string): string {
  return input.replaceAll(".", "")
}
