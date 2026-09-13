# DOC: fx-no-regex -- collapseDashes

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Collapses any run of two or more dashes down to a single dash.

## The Regex It Replaces

```txt
/-{2,}/g -> \"-\"
```

## Why The Regex Version Gets Risky

Identical shape to the space-collapsing case, and identical failure mode: the quantifier is easy to get subtly wrong, and inside a character class later a bare `-` can be misread as a range operator.

## The Plain-String Way

```ts
collapseDashes("a--b---c") // "a-b-c"
```

## How It Works

- **A**: Split on the single dash character.
- **B**: Filter out the empty strings a run of dashes produces.
- **C**: Join what remains with one dash.

## Examples

| Input | Output |
|-------|--------|
| `"sol--bot"` | `"sol-bot"` |
| `"a-b-c"` | `"a-b-c"` |
| `"----"` | `""` |

## Edge Cases And Limits

Same technique as `collapseSpaces` -- the two functions are the same shape applied to a different delimiter, which is the whole point of the split-filter-join pattern: it generalizes.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `collapseDashes` implementation. |
