# DOC: fx-no-regex -- snakeToCamel

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Converts snake_case to camelCase, e.g. "user_profile_id" becomes "userProfileId".

## The Regex It Replaces

```txt
/_([a-z])/g -> (match, letter) => letter.toUpperCase()
```

## Why The Regex Version Gets Risky

A replacer FUNCTION as the second argument to `.replace()` is a step beyond a plain replacement string, and it is easy to forget that the match parameter includes the underscore itself, not just the captured letter -- an off-by-one here silently drops or duplicates a character.

## The Plain-String Way

```ts
snakeToCamel("user_profile_id") // "userProfileId"
```

## How It Works

- **A**: Split on the underscore.
- **B**: Keep the first piece exactly as it is.
- **C**: For every piece after the first, uppercase its first character and reattach the rest, then concatenate everything with no separator.

## Examples

| Input | Output |
|-------|--------|
| `"already"` | `"already"` |
| `"a_b_c"` | `"aBC"` |

## Edge Cases And Limits

An empty piece from a doubled underscore (`"a__b"`) is skipped rather than inserting an accidental capital -- `"a__b"` becomes `"aB"`, not `"a_B"`.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `snakeToCamel` implementation. |
