# DOC: fx-no-regex -- stripSurroundingQuotes

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Removes one matching pair of quotes from the very start and end of a string, double or single, but only if both ends match.

## The Regex It Replaces

```txt
/^\"(.*)\"$/ -> \"$1\" and /^'(.*)'$/ -> \"$1\"
```

## Why The Regex Version Gets Risky

The `.*` in the middle of that pattern is greedy by default, which is usually fine here but is the same construct that causes catastrophic backtracking in more complex patterns -- and two separate regexes (one per quote style) is two places to keep in sync instead of one.

## The Plain-String Way

```ts
stripSurroundingQuotes('"hello"') // "hello"
```

## How It Works

- **A**: Bail out immediately on a string shorter than two characters -- there cannot be a matching pair.
- **B**: Read the first and last character directly.
- **C**: If both are `"` or both are `'`, slice them off; otherwise return the input unchanged.

## Examples

| Input | Output |
|-------|--------|
| `'\'hello\''` | `"hello"` |
| `'"mismatched\''` | `'"mismatched\'' (unchanged, ends do not match)` |
| `"no quotes"` | `"no quotes" (unchanged)` |

## Edge Cases And Limits

Removes exactly one pair -- a doubly-quoted string (`'"hello"'` with an extra layer) needs the function called twice on purpose, not automatically, so a caller stays in control of how many layers come off.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `stripSurroundingQuotes` implementation. |
