# DOC: fx-no-regex -- Overview

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** Overview
**Created:** Sep 13 2026
**See-Also:** DOC__fx-no-regex--cookbook--regex-patterns.md

---

## Summary

`fx-no-regex` is a TypeScript ESM module of string utilities that
replace common regex patterns with plain string operations: built-in
methods (`replaceAll`, `split`, `join`, `slice`, `lastIndexOf`,
`includes`, `startsWith`) where one exists, or a character loop where
it does not. This file is the index into the sixteen function docs
below and the reasoning behind the whole project.

## Why This Exists

Regex is compact, but it fails in three specific ways that plain
string code does not:

- **A**: **It Is Opaque To Read Back Later** -- `/([a-z0-9])([A-Z])/g` does not say "insert a space before a capital that follows a lowercase letter or digit" to anyone who has not already decoded it. The equivalent character loop says exactly that, in the loop body itself.
- **B**: **It Fails Quietly On Edge Cases** -- a missing `g` flag stops after the first match with no error; an unescaped `.` matches any character instead of a literal period; a dynamic pattern built from a runtime string needs its special characters escaped or it means something else entirely. Every one of these is a silent bug, not a thrown exception.
- **C**: **It Is A Recurring Source Of Real Incidents** -- the coding-standards rule this package follows exists because a `$` followed by a backtick in a `.replace()` replacement string corrupted a real file during the fx-renamer build on Sep 13 2026. A plain-string replacement never has a replacement-string special-character problem, because it does not have a replacement-string mini-language at all.

## The One Exception

`looksLikeEmail` uses one regex, deliberately, and says why in a
comment on the line: an email address's real shape is not
decomposable into simple substring checks without re-implementing a
parser by hand, which is more code and no more correct. See
`DOC__fx-no-regex--api--looks-like-email.md`. Everything else in this
package has zero regex.

## The Sixteen Functions

| Function | Regex it replaces | Doc |
|----------|-------------------|-----|
| `removeWhitespace` | `/\s+/g` -> `""` | `DOC__fx-no-regex--api--remove-whitespace.md` |
| `collapseSpaces` | `/[ ]{2,}/g` -> `" "` | `DOC__fx-no-regex--api--collapse-spaces.md` |
| `removePeriods` | `/\./g` -> `""` | `DOC__fx-no-regex--api--remove-periods.md` |
| `trimCharacter` | dynamic `RegExp` anchored at both ends | `DOC__fx-no-regex--api--trim-character.md` |
| `getFileExtension` | `/\.[^.]+$/` | `DOC__fx-no-regex--api--get-file-extension.md` |
| `collapseDashes` | `/-{2,}/g` -> `"-"` | `DOC__fx-no-regex--api--collapse-dashes.md` |
| `startsWithIgnoreCase` | dynamic `RegExp` with the `i` flag | `DOC__fx-no-regex--api--starts-with-ignore-case.md` |
| `removeDigits` | `/[0-9]/g` -> `""` | `DOC__fx-no-regex--api--remove-digits.md` |
| `splitCamelCase` | `/([a-z0-9])([A-Z])/g` -> `"$1 $2"` | `DOC__fx-no-regex--api--split-camel-case.md` |
| `isAlphanumeric` | `/^[a-zA-Z0-9]+$/.test(s)` | `DOC__fx-no-regex--api--is-alphanumeric.md` |
| `sanitizeFilename` | a chain of three regexes | `DOC__fx-no-regex--api--sanitize-filename.md` |
| `stripHtmlTags` | `/<[^>]*>/g` -> `""` | `DOC__fx-no-regex--api--strip-html-tags.md` |
| `snakeToCamel` | `/_([a-z])/g` with a replacer function | `DOC__fx-no-regex--api--snake-to-camel.md` |
| `countWords` | `input.split(/\s+/).filter(Boolean).length` | `DOC__fx-no-regex--api--count-words.md` |
| `stripSurroundingQuotes` | two anchored regexes, one per quote style | `DOC__fx-no-regex--api--strip-surrounding-quotes.md` |
| `looksLikeEmail` | `/^\S+@\S+\.\S+$/` (kept, documented exception) | `DOC__fx-no-regex--api--looks-like-email.md` |

## Two Techniques That Cover Most Of This

Nearly every function above is one of two shapes:

- **D**: **Split, Filter, Join** -- `collapseSpaces` and `collapseDashes` both split on the repeated character, drop the empty strings the repetition produces, and join back with one instance of that character. This is the general answer to "collapse a run of X into one X."
- **E**: **Character Loop Against A Fixed Set** -- `removeDigits` and `isAlphanumeric` both walk the string once and check each character against a constant string of allowed or disallowed characters. This is the general answer to "match a character class," which is the one thing no single built-in string method covers on its own.

## Extending It

Find a new regex-shaped problem, add a new file in `modules/`, export
it from `modules/index.ts` and the root `index.ts`, write a test next
to it, and document it here the same way. `DOC__fx-no-regex--cookbook--regex-patterns.md`
lists patterns that are not implemented yet, as a starting list for
the next addition.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the sixteen-function API doc set, on Flavio's request for comprehensive documentation. |
