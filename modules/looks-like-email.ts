/**
 * The one regex in this package.
 *
 * A real email address is not a fixed-shape string -- the local part
 * allows quoted strings, escaped characters, and a long list of
 * special characters, and the domain part allows internationalized
 * labels. Decomposing that correctly with string methods means
 * re-implementing a small parser by hand, character by character,
 * which is far more code, far easier to get subtly wrong, and no
 * more honest than a regex about what it actually checks (this is a
 * SHAPE check, not a deliverability check either way).
 *
 * Per the coding-standards rule, regex is allowed here because no
 * plain-string workaround is actually simpler or safer. This checks
 * one non-whitespace run, an "@", and one more non-whitespace run
 * containing at least one period -- a loose shape check, not RFC 5322
 * validation.
 */
const LOOSE_EMAIL_SHAPE = /^\S+@\S+\.\S+$/

export function looksLikeEmail(input: string): boolean {
  return LOOSE_EMAIL_SHAPE.test(input)
}
