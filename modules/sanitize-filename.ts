/**
 * Replaces: a chain of regexes a filename cleaner would normally
 * reach for -- /^\s+/ for a leading space, /\.(?=.*\.)/g for a stray
 * period that is not the extension's period, and a placeholder swap
 * for "{date}" that would otherwise need /\{date\}/g.
 *
 * Worked example, from a real messy filename:
 *
 *   input:  " Test-problem..{date}.png"
 *   output: "Test-problem.2026-09-13.png"
 *
 * The leading space is gone, the doubled period is collapsed to one,
 * and "{date}" is swapped for a real date, while the final period
 * before the extension is kept.
 */
import { trimCharacter } from "./trim-character.js"
import { getFileExtension } from "./get-file-extension.js"

export function sanitizeFilename(filename: string, dateStamp: string): string {
  const noLeadingSpace = trimCharacter(filename, " ")
  const withDate = noLeadingSpace.replaceAll("{date}", dateStamp)

  const extension = getFileExtension(withDate)
  const base = extension.length > 0 ? withDate.slice(0, withDate.length - extension.length) : withDate

  const parts = base.split(".")
  const nonEmptyParts: string[] = []
  for (const part of parts) {
    if (part.length > 0) {
      nonEmptyParts.push(part)
    }
  }
  const collapsedBase = nonEmptyParts.join(".")

  return collapsedBase + extension
}
