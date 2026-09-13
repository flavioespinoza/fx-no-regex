/**
 * Replaces: input.split(/\s+/).filter(Boolean).length
 *
 * Counts words, where a word is any run of non-whitespace characters.
 * No regex: split on the single space character first, then split
 * each resulting piece again on tab and newline, and count the
 * non-empty pieces that remain.
 */
export function countWords(input: string): number {
  const bySpace = input.split(" ")
  let count = 0

  for (const chunk of bySpace) {
    const byTab = chunk.split("\t")
    for (const tabPiece of byTab) {
      const byNewline = tabPiece.split("\n")
      for (const piece of byNewline) {
        if (piece.length > 0) {
          count = count + 1
        }
      }
    }
  }

  return count
}
