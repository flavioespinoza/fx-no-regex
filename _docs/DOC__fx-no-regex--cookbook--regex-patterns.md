# DOC: fx-no-regex -- Cookbook, Regex Patterns Not Yet In This Package

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** Reference
**Created:** Sep 13 2026
**See-Also:** DOC__fx-no-regex--api--overview.md

---

## Summary

Common regex use cases beyond the sixteen functions already shipped,
each with a plain-string approach where one is practical, and an
honest flag where it is not. This is a starting list for the next
person adding a function, not a promise that every row here is
implemented.

## Straightforward -- Good Candidates For The Next Addition

- **A**: **Normalize Path Separators** -- `/\\\\/g -> "/"`. `path.split("\\\\").join("/")`, or `path.replaceAll("\\\\", "/")` since `replaceAll` takes a plain string, not a pattern.
- **B**: **Remove Control Characters** -- `/[\x00-\x1F]/g -> ""`. A character loop comparing each character's `charCodeAt(0)` against `0` and `31` inclusive -- a numeric-range check, not a string membership check, but still no regex.
- **C**: **Split On Multiple Delimiters** -- `input.split(/[,;]/)`. Split on `","` first, then split each piece again on `";"`, flattening the result -- the same nested-split technique `countWords` already uses for space, tab, and newline.
- **D**: **Repeat A Character N Times** -- `"x".repeat(n)` needs no regex and never did; listed here because people reach for `/x{n}/`-flavored thinking when the built-in already does it.
- **E**: **Check For A Numeric String** -- `/^-?\d+(\.\d+)?$/.test(s)`. `Number.isFinite(Number(s)) && s.trim().length > 0` handles the common case without a pattern; it accepts a slightly wider set (leading `+`, exponent notation) which is usually a feature, not a bug, for a numeric check.
- **F**: **Slugify A Title** -- `title.toLowerCase().replace(/[^a-z0-9]+/g, "-")`. Combine `isAlphanumeric`'s character-loop technique (keep only allowed characters, else emit a dash) with `collapseDashes` to fold repeated dashes, then `trimCharacter` to strip a leading or trailing dash.
- **G**: **Pluralize A Simple Word** -- `/s$|x$|z$|ch$|sh$/`. `endsWith` checked against each suffix in a loop, no regex alternation needed -- English pluralization rules well beyond this are a dictionary problem, not a string-method problem, regex or not.

## Genuinely Hard Without Regex -- Say So Rather Than Force It

- **H**: **Full URL Parsing** -- a URL's grammar (scheme, authority, path, query, fragment, each with their own escaping rules) is exactly what `URL` (built into Node and every modern JS runtime) already parses correctly. Reach for `new URL(input)` before reaching for either a regex or a hand-rolled string walk -- this is not a case for `fx-no-regex` at all.
- **I**: **Full Email Validation (RFC 5322)** -- `looksLikeEmail` in this package intentionally does NOT attempt this. The real grammar allows quoted local parts and escaped characters that no reasonable character loop should try to reproduce. If a project needs true RFC 5322 validation, that is a dedicated parsing library's job, not a regex's and not this package's.
- **J**: **Balanced Delimiter Matching** -- matching balanced parentheses, brackets, or nested quotes is not a regular language in the formal sense (regex proper cannot do it either, without an engine-specific recursive extension). This needs an actual stack-based parser regardless of which string tool is doing the matching.
- **K**: **Unicode Normalization And Grapheme Clusters** -- `/./gu` behaves differently across engines once combining characters, emoji with modifiers, or right-to-left text are involved. `Intl.Segmenter` (built in) is the correct tool for "iterate by user-perceived character," not a regex and not a naive character loop.

## The Rule This List Follows

Per `SPEC__directive--coding-standards.md`: no regex when a plain-string
workaround exists; when one genuinely does not, use regex and say why
in a comment on that line, the same way `looksLikeEmail` does. Rows H
through K are the "say why" cases -- they are not omissions, they are
the honest answer.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written as a companion to the overview doc, listing patterns for future additions and naming the cases where regex (or a dedicated tool) is the honest answer. |
