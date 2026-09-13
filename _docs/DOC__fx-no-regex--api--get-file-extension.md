# DOC: fx-no-regex -- getFileExtension

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Returns a filename's extension, dot included, or an empty string if there is none.

## The Regex It Replaces

```txt
/\.[^.]+$/
```

## Why The Regex Version Gets Risky

A negated character class anchored to the end (`[^.]+$`) reads backwards from how most people think about the problem, and it is easy to get the anchor or the negation wrong on a file with multiple dots (`archive.tar.gz`).

## The Plain-String Way

```ts
getFileExtension("report.final.pdf") // ".pdf"
```

## How It Works

- **A**: Find the position of the LAST period with `lastIndexOf(".")` -- this is naturally "rightmost", no anchoring tricks needed.
- **B**: If there is no period, or the period is the very last character, there is no real extension: return `""`.
- **C**: Otherwise slice from that period to the end of the string.

## Examples

| Input | Output |
|-------|--------|
| `"archive.tar.gz"` | `".gz"` |
| `"no-extension"` | `""` |
| `"trailing."` | `""` |

## Edge Cases And Limits

Returns only the final extension for a multi-dot name (`.gz` for `archive.tar.gz`, not `.tar.gz`) -- call it twice against the base name if a project genuinely needs a compound extension.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `getFileExtension` implementation. |
