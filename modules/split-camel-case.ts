/**
 * Replaces: /([a-z0-9])([A-Z])/g -> "$1 $2"
 *
 * Inserts a space before every uppercase letter that follows a
 * lowercase letter or digit, turning "camelCase" into "camel Case".
 * This is the classic capture-group regex; the non-regex version
 * walks the string once and compares each character to its own
 * upper and lower case forms to decide whether it is a capital.
 */
export function splitCamelCase(input: string): string {
  let result = ""
  let previous = ""

  for (const char of input) {
    const isUpper = char !== char.toLowerCase() && char === char.toUpperCase()
    const previousIsLowerOrDigit =
      previous.length > 0 && previous === previous.toLowerCase() && previous !== previous.toUpperCase()

    if (isUpper && previousIsLowerOrDigit) {
      result = result + " " + char
    } else {
      result = result + char
    }

    previous = char
  }

  return result
}
