/**
 * Replaces: /<[^>]*>/g -> ""
 *
 * Removes every HTML/XML tag from a string, keeping the text between
 * them. No regex: walk the string once, track whether the cursor is
 * inside a tag (from "<" to the next ">"), and only copy characters
 * that are outside a tag.
 */
export function stripHtmlTags(input: string): string {
  let result = ""
  let insideTag = false

  for (const char of input) {
    if (char === "<") {
      insideTag = true
      continue
    }
    if (char === ">") {
      insideTag = false
      continue
    }
    if (!insideTag) {
      result = result + char
    }
  }

  return result
}
