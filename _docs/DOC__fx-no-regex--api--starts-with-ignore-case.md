# DOC: fx-no-regex -- startsWithIgnoreCase

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Checks whether a string starts with a given prefix, ignoring case.

## The Regex It Replaces

```txt
new RegExp("^" + prefix, "i").test(input)
```

## Why The Regex Version Gets Risky

Building a dynamic RegExp from a runtime prefix has the same escaping problem as `trimCharacter` above -- a prefix containing `.`, `*`, `+`, or `(` changes the meaning of the pattern instead of being matched literally.

## The Plain-String Way

```ts
startsWithIgnoreCase("SPEC__directive", "spec") // true
```

## How It Works

- **A**: Lowercase both the input and the prefix.
- **B**: Call the built-in `startsWith`, which needs no pattern at all, dynamic or otherwise.

## Examples

| Input | Output |
|-------|--------|
| `startsWithIgnoreCase("DOC__session", "doc")` | `true` |
| `startsWithIgnoreCase("DOC__session", "spec")` | `false` |

## Edge Cases And Limits

Case-insensitive only -- it does not trim whitespace or normalize unicode composition; combine with `trimCharacter` first if the input might have a leading space.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `startsWithIgnoreCase` implementation. |
