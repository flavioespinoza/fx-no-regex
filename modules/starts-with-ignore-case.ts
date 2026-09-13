/**
 * Replaces: new RegExp("^" + prefix, "i").test(input)
 *
 * Checks whether a string starts with a prefix, ignoring case.
 * No regex: lowercase both sides and use the built-in startsWith,
 * which needs no dynamic pattern at all.
 */
export function startsWithIgnoreCase(input: string, prefix: string): boolean {
  return input.toLowerCase().startsWith(prefix.toLowerCase())
}
