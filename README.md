# fx-no-regex

A TypeScript ESM module that solves common string-manipulation problems without
regular expressions. Every function uses a plain string method, string
concatenation, or a character loop instead of a regex pattern.

## Why

Regex is compact, but it is also opaque to read back later, easy to get wrong
on edge cases (underscores, unicode, greedy quantifiers), and a recurring
source of subtle bugs. This module trades a little more code for something
that reads in plain English and is easy to extend: hit a new edge case, add a
new function.

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

Ten regex patterns, and what replaces them:

| Function | Regex it replaces | What it does |
|----------|-------------------|--------------|
| `removeWhitespace` | `/\s+/g` -> `""` | Strips every space, tab, newline, and carriage return |
| `collapseSpaces` | `/[ ]{2,}/g` -> `" "` | Collapses runs of spaces to one |
| `removePeriods` | `/\./g` -> `""` | Removes every period |
| `trimCharacter` | `new RegExp("^" + c + "+|" + c + "+$", "g")` -> `""` | Strips a chosen character from both edges only |
| `getFileExtension` | `/\.[^.]+$/` | Returns the extension, dot included |
| `collapseDashes` | `/-{2,}/g` -> `"-"` | Collapses runs of dashes to one |
| `startsWithIgnoreCase` | `new RegExp("^" + prefix, "i").test(s)` | Case-insensitive prefix check |
| `removeDigits` | `/[0-9]/g` -> `""` | Removes every digit |
| `splitCamelCase` | `/([a-z0-9])([A-Z])/g` -> `"$1 $2"` | Inserts a space before each capital |
| `isAlphanumeric` | `/^[a-zA-Z0-9]+$/.test(s)` | True if the string is only letters and digits |

Plus one worked example that combines several of the above:

| Function | What it does |
|----------|--------------|
| `sanitizeFilename` | Strips a leading space, collapses a doubled period, and swaps a `{date}` placeholder for a real date, while keeping the extension's period |

## Extending it

Find a new regex-shaped problem, add a new file in `modules/`, export it from
`modules/index.ts`, and it is part of the package. That is the whole
maintenance model: no regex to debug six months from now, just a small,
readable function with a test next to it.

## Development

```bash
npm install
npm run build   # compiles modules/ and test/ to dist/
npm test        # builds, then runs the suite with node --test
```

## License

MIT
