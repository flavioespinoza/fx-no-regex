# DOC: fx-no-regex -- splitCamelCase

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Inserts a space before every uppercase letter that follows a lowercase letter or digit, turning "camelCase" into "camel Case".

## The Regex It Replaces

```txt
/([a-z0-9])([A-Z])/g -> \"$1 $2\"
```

## Why The Regex Version Gets Risky

Capture-group back-references (`$1`, `$2`) in the replacement string are exactly the mechanism behind the fx-renamer corruption this whole package is named after -- a stray `$` followed by a backtick or another `$` in that position does not mean what it looks like it means.

## The Plain-String Way

```ts
splitCamelCase("calcLivePnlResult") // "calc Live Pnl Result"
```

## How It Works

- **A**: Walk the string once, remembering the previous character seen.
- **B**: At each character, check whether it is uppercase by comparing it against its own `toLowerCase()` and `toUpperCase()` forms -- a true capital letter differs from its lowercase form and equals its uppercase form.
- **C**: If the current character is a capital and the previous one was lowercase or a digit, insert a space before it.
- **D**: Build the result with `+=` as the walk proceeds.

## Examples

| Input | Output |
|-------|--------|
| `"userId"` | `"user Id"` |
| `"HTMLParser"` | `"HTMLParser" (see edge case)` |
| `"lowercase"` | `"lowercase"` |

## Edge Cases And Limits

Consecutive capitals (an acronym like `HTMLParser`) are NOT split apart, by design -- a space is only inserted when a lowercase-or-digit character is immediately followed by a capital, matching the regex it replaces exactly.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `splitCamelCase` implementation. |
