# DOC: fx-no-regex -- sanitizeFilename

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Strips a leading space, collapses a doubled period, and swaps a literal "{date}" placeholder for a real date, while keeping the extension's own period intact.

## The Regex It Replaces

```txt
a chain of regexes: a leading-space trim, a stray-period collapse, and a {date} placeholder swap
```

## Why The Regex Version Gets Risky

This is the composed case -- three separate regex fixes chained together on one filename is exactly the kind of patch that corrupted a real file during the fx-renamer build, because a fix for problem one can change the string in a way that breaks the anchor for problem two.

## The Plain-String Way

```ts
sanitizeFilename(" Test-problem..{date}.png", "2026-09-13")
// "Test-problem.2026-09-13.png"
```

## How It Works

- **A**: Call `trimCharacter` to remove a leading space.
- **B**: Call `replaceAll("{date}", dateStamp)` to swap the placeholder -- a plain string replaceAll, no pattern needed since `{date}` is matched literally.
- **C**: Call `getFileExtension` to find and hold onto the real extension.
- **D**: Split the remaining base name on periods, drop the empty pieces a doubled period produces, and join with a single period.
- **E**: Reattach the extension.

## Examples

| Input | Output |
|-------|--------|
| ` " report..{date}.pdf", "2026-09-13"` | `"report.2026-09-13.pdf"` |
| `"clean.png", "2026-09-13"` | `"clean.png"` |

## Edge Cases And Limits

Composes three of the other functions in this package on purpose -- it is the worked example that shows the functions are meant to be chained, not just used one at a time.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `sanitizeFilename` implementation. |
