# DOC: fx-no-regex -- removeWhitespace

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Removes every space, tab, newline, and carriage return from a string.

## The Regex It Replaces

```txt
/\s+/g -> \"\"
```

## Why The Regex Version Gets Risky

\s matches more than people expect (form feed, vertical tab, several unicode space characters depending on engine and flags), and a missing /g silently stops after the first hit.

## The Plain-String Way

```ts
removeWhitespace("a b\tc\nd") // "abcd"
```

## How It Works

- **A**: Chain four `replaceAll` calls, one per whitespace character actually in use: space, tab, newline, carriage return.
- **B**: Each `replaceAll` removes every occurrence of that one character, not just the first.
- **C**: The chain is explicit about exactly which characters are treated as whitespace, instead of trusting an engine's `\s` class.

## Examples

| Input | Output |
|-------|--------|
| `"a b c"` | `"abc"` |
| `"line1\nline2"` | `"line1line2"` |
| `"no-spaces-here"` | `"no-spaces-here"` |

## Edge Cases And Limits

Does not strip unicode whitespace (non-breaking space, em space, and similar) -- add a `replaceAll` for a specific character if a project needs one.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `removeWhitespace` implementation. |
