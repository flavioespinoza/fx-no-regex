/**
 * Replaces: /\.[^.]+$/ -> matched extension
 *
 * Returns the file extension, dot included, or "" if there is none.
 * No regex: find the last period with lastIndexOf and slice from
 * there, which is exactly what "the last dot to the end" means.
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".")
  if (lastDot === -1 || lastDot === filename.length - 1) {
    return ""
  }
  return filename.slice(lastDot)
}
