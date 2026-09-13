# fx-no-regex

A TypeScript ESM module that solves common string-manipulation problems without
regular expressions. Every function uses a plain string method, string
concatenation, or a character loop instead of a regex pattern -- with exactly
one documented exception.

## Why

Regex is compact, but it is also opaque to read back later, easy to get wrong
on edge cases (a missing flag, an unescaped metacharacter, a dynamic pattern
that needed escaping and did not get it), and a recurring source of subtle
bugs. This module trades a little more code for something that reads in plain
English and is easy to extend: hit a new edge case, add a new function.

## Install

```bash
npm install fx-no-regex
```

## Usage

```ts
import { removePeriods, sanitizeFilename } from "fx-no-regex"

removePeriods("v1.2.3") // "v123"
sanitizeFilename(" report..{date}.pdf", "2026-09-13") // "report.2026-09-13.pdf"
```

## Functions

Sixteen functions, covering fifteen regex patterns removed and one kept on
purpose. Full documentation, with the exact regex each one replaces, why the
regex version gets risky, and how the plain-string version works step by
step, lives in [`_docs/`](_docs/DOC__fx-no-regex--api--overview.md):

| Function | Doc |
|----------|-----|
| `removeWhitespace` | [`DOC__fx-no-regex--api--remove-whitespace.md`](_docs/DOC__fx-no-regex--api--remove-whitespace.md) |
| `collapseSpaces` | [`DOC__fx-no-regex--api--collapse-spaces.md`](_docs/DOC__fx-no-regex--api--collapse-spaces.md) |
| `removePeriods` | [`DOC__fx-no-regex--api--remove-periods.md`](_docs/DOC__fx-no-regex--api--remove-periods.md) |
| `trimCharacter` | [`DOC__fx-no-regex--api--trim-character.md`](_docs/DOC__fx-no-regex--api--trim-character.md) |
| `getFileExtension` | [`DOC__fx-no-regex--api--get-file-extension.md`](_docs/DOC__fx-no-regex--api--get-file-extension.md) |
| `collapseDashes` | [`DOC__fx-no-regex--api--collapse-dashes.md`](_docs/DOC__fx-no-regex--api--collapse-dashes.md) |
| `startsWithIgnoreCase` | [`DOC__fx-no-regex--api--starts-with-ignore-case.md`](_docs/DOC__fx-no-regex--api--starts-with-ignore-case.md) |
| `removeDigits` | [`DOC__fx-no-regex--api--remove-digits.md`](_docs/DOC__fx-no-regex--api--remove-digits.md) |
| `splitCamelCase` | [`DOC__fx-no-regex--api--split-camel-case.md`](_docs/DOC__fx-no-regex--api--split-camel-case.md) |
| `isAlphanumeric` | [`DOC__fx-no-regex--api--is-alphanumeric.md`](_docs/DOC__fx-no-regex--api--is-alphanumeric.md) |
| `sanitizeFilename` | [`DOC__fx-no-regex--api--sanitize-filename.md`](_docs/DOC__fx-no-regex--api--sanitize-filename.md) |
| `stripHtmlTags` | [`DOC__fx-no-regex--api--strip-html-tags.md`](_docs/DOC__fx-no-regex--api--strip-html-tags.md) |
| `snakeToCamel` | [`DOC__fx-no-regex--api--snake-to-camel.md`](_docs/DOC__fx-no-regex--api--snake-to-camel.md) |
| `countWords` | [`DOC__fx-no-regex--api--count-words.md`](_docs/DOC__fx-no-regex--api--count-words.md) |
| `stripSurroundingQuotes` | [`DOC__fx-no-regex--api--strip-surrounding-quotes.md`](_docs/DOC__fx-no-regex--api--strip-surrounding-quotes.md) |
| `looksLikeEmail` | [`DOC__fx-no-regex--api--looks-like-email.md`](_docs/DOC__fx-no-regex--api--looks-like-email.md) -- the one documented exception |

[`DOC__fx-no-regex--cookbook--regex-patterns.md`](_docs/DOC__fx-no-regex--cookbook--regex-patterns.md)
lists further patterns for the next addition, including the honest cases
where regex, or a dedicated tool, is actually the right answer.

## Extending it

Find a new regex-shaped problem, add a new file in `modules/`, export it from
`modules/index.ts` and the root `index.ts`, write a test next to it, and add
its doc under `_docs/`. That is the whole maintenance model: no regex to
debug six months from now, just a small, readable function with a test and a
doc next to it.

## Development

```bash
npm install
npm run build   # compiles modules/ and test/ to dist/
npm test        # builds, then runs the suite with node --test
```

## License

MIT
