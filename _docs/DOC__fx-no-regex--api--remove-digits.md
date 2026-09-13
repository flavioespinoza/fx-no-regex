# DOC: fx-no-regex -- removeDigits

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Removes every digit from a string.

## The Regex It Replaces

```txt
/[0-9]/g -> \"\"
```

## Why The Regex Version Gets Risky

A character class is the one shape a single string method genuinely cannot express -- there is no `"abc".removeCharsIn("0-9")` built in, which is exactly why this is the coding-standards spec's designated fallback case.

## The Plain-String Way

```ts
removeDigits("v136 on Sep13") // "v on Sep"
```

## How It Works

- **A**: Hold the ten digit characters in one constant string, `"0123456789"`.
- **B**: Walk the input one character at a time.
- **C**: Keep a character only if `DIGITS.includes(char)` is false; build the result with `+`.

## Examples

| Input | Output |
|-------|--------|
| `"abc123"` | `"abc"` |
| `"no digits"` | `"no digits"` |
| `"2026"` | `""` |

## Edge Cases And Limits

This character-loop-against-a-fixed-set technique is the general answer to "remove every character in this class" -- swap the constant string for any other set of characters and the same function shape works.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `removeDigits` implementation. |
