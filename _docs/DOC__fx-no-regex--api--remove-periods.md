# DOC: fx-no-regex -- removePeriods

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Removes every period from a string.

## The Regex It Replaces

```txt
/\./g -> \"\"
```

## Why The Regex Version Gets Risky

A period is a regex metacharacter (matches any character) -- forgetting to escape it as \. is one of the single most common regex mistakes, and an unescaped `.` silently matches far more than intended.

## The Plain-String Way

```ts
removePeriods("v1.2.3") // "v123"
```

## How It Works

- **A**: One call: `input.replaceAll(".", "")`.
- **B**: `replaceAll` with a plain string argument is a literal match, so there is no metacharacter to escape in the first place.

## Examples

| Input | Output |
|-------|--------|
| `"a.b.c."` | `"abc"` |
| `"no periods"` | `"no periods"` |
| `"..."` | `""` |

## Edge Cases And Limits

This is the reference example from the coding-standards spec (`name.replaceAll(".", "")`) -- the absorption-test answer for the whole no-regex rule.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `removePeriods` implementation. |
