# DOC: fx-no-regex -- countWords

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Counts words, where a word is any run of non-whitespace characters.

## The Regex It Replaces

```txt
input.split(/\s+/).filter(Boolean).length
```

## Why The Regex Version Gets Risky

This is a common one-liner, but `split(/\s+/)` on a string that STARTS with whitespace produces a leading empty string that `Boolean` has to filter back out -- easy to forget, and an easy off-by-one in a word count that feeds a billing or a rate limit.

## The Plain-String Way

```ts
countWords("the quick  brown\tfox\njumps") // 5
```

## How It Works

- **A**: Split on the space character first.
- **B**: Split each of those pieces again on tab, then again on newline -- nesting the splits instead of trying to match one character class.
- **C**: Count every non-empty piece that survives all three splits.

## Examples

| Input | Output |
|-------|--------|
| `"one two three"` | `3` |
| `"   "` | `0` |
| `""` | `0` |

## Edge Cases And Limits

Counts a run of non-whitespace as one word regardless of punctuation -- "don't" and "well-known" each count as one word, matching the regex it replaces.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `countWords` implementation. |
