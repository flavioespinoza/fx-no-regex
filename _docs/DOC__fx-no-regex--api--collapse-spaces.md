# DOC: fx-no-regex -- collapseSpaces

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Collapses any run of two or more spaces down to a single space.

## The Regex It Replaces

```txt
/[ ]{2,}/g -> \" \"
```

## Why The Regex Version Gets Risky

The quantifier `{2,}` is easy to mistype as `{2, }` (with a space) or `{,2}` (backwards), and both compile without error while doing the wrong thing.

## The Plain-String Way

```ts
collapseSpaces("a   b    c") // "a b c"
```

## How It Works

- **A**: Split the string on the single space character. A run of N spaces produces N-1 empty strings between real words.
- **B**: Filter out every empty string produced by the split.
- **C**: Join what is left with exactly one space.

## Examples

| Input | Output |
|-------|--------|
| `"one  two"` | `"one two"` |
| `"a     b"` | `"a b"` |
| `"no-extra-spaces"` | `"no-extra-spaces"` |

## Edge Cases And Limits

Only collapses the literal space character, not tabs or newlines mixed in with spaces -- run `removeWhitespace` first if the input has mixed whitespace types.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `collapseSpaces` implementation. |
