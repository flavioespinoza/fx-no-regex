/**
 * Replaces: /-{2,}/g -> "-"
 *
 * Collapses any run of two or more dashes down to a single dash.
 * No regex: same split-filter-join technique as collapseSpaces,
 * split on the dash character instead of a space.
 */
export function collapseDashes(input: string): string {
  const parts = input.split("-")
  const nonEmpty: string[] = []
  for (const part of parts) {
    if (part.length > 0) {
      nonEmpty.push(part)
    }
  }
  return nonEmpty.join("-")
}
