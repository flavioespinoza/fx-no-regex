/**
 * Replaces: /_([a-z])/g -> (match, letter) => letter.toUpperCase()
 *
 * Converts snake_case to camelCase, e.g. "user_profile_id" becomes
 * "userProfileId". No regex: split on the underscore, capitalize the
 * first letter of every part after the first, and join with nothing.
 */
export function snakeToCamel(input: string): string {
  const parts = input.split("_")
  let result = ""

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (part.length === 0) {
      continue
    }
    if (i === 0) {
      result = result + part
    } else {
      const firstChar = part.charAt(0).toUpperCase()
      const rest = part.slice(1)
      result = result + firstChar + rest
    }
  }

  return result
}
