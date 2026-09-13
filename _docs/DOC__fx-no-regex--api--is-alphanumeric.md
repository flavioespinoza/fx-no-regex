# DOC: fx-no-regex -- isAlphanumeric

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Checks whether a string is made up of nothing but letters and digits.

## The Regex It Replaces

```txt
/^[a-zA-Z0-9]+$/.test(input)
```

## Why The Regex Version Gets Risky

The two anchors (`^` and `$`) both have to be present and both have to be correct, or the check silently becomes a substring search instead of a whole-string match -- a missing `$` is a classic validation bypass.

## The Plain-String Way

```ts
isAlphanumeric("fxNoRegex123") // true
isAlphanumeric("fx-no-regex")  // false
```

## How It Works

- **A**: Reject the empty string immediately (the regex's `+` already requires at least one character).
- **B**: Walk every character and check it against a constant string of all 62 allowed characters.
- **C**: Return false the moment one character is not in the allowed set; true if the walk finishes.

## Examples

| Input | Output |
|-------|--------|
| `"abc123"` | `true` |
| `"has space"` | `false` |
| `""` | `false` |

## Edge Cases And Limits

ASCII letters and digits only, same as the regex it replaces -- it does not accept accented or non-Latin letters.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `isAlphanumeric` implementation. |
