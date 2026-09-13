# DOC: fx-no-regex -- trimCharacter

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Strips a chosen character from the leading and trailing edges of a string only, leaving occurrences in the middle untouched.

## The Regex It Replaces

```txt
new RegExp(\"^\" + c + \"+|\" + c + \"+$\", \"g\") -> \"\"
```

## Why The Regex Version Gets Risky

Building a RegExp from a runtime string means the character has to be escaped if it happens to be a regex metacharacter itself (a dash, a period, a plus sign) -- a dynamic pattern built from unescaped user input is also a known injection surface (ReDoS-adjacent, or simply a broken pattern) when the character comes from outside the code.

## The Plain-String Way

```ts
trimCharacter("  hello  ", " ") // "hello"
trimCharacter("--a-b--", "-")  // "a-b"
```

## How It Works

- **A**: Walk in from the start while the character at the cursor equals the target character, advancing a `start` index.
- **B**: Walk in from the end the same way, retreating an `end` index.
- **C**: Return `input.slice(start, end)` -- the middle is never touched because the two scans only move inward from the edges.

## Examples

| Input | Output |
|-------|--------|
| `trimCharacter("xxhixx", "x")` | `"hi"` |
| `trimCharacter("hi", "x")` | `"hi"` |
| `trimCharacter("xxxx", "x")` | `""` |

## Edge Cases And Limits

Takes exactly one character as the target; pass a multi-character string and it is compared as a whole unit against single characters, which will never match -- this is a single-character trim, not a substring trim.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `trimCharacter` implementation. |
