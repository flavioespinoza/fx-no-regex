# DOC: fx-no-regex -- stripHtmlTags

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Removes every HTML or XML tag from a string, keeping the text between them.

## The Regex It Replaces

```txt
/<[^>]*>/g -> \"\"
```

## Why The Regex Version Gets Risky

This exact pattern is the textbook example of "do not parse HTML with regex" -- it breaks the moment a tag's attribute contains a literal `>` inside a quoted string (`<a title="5 > 3">`), because the character class has no idea it is inside a quote.

## The Plain-String Way

```ts
stripHtmlTags("<p>hello <b>world</b></p>") // "hello world"
```

## How It Works

- **A**: Walk the string once, tracking an `insideTag` flag.
- **B**: Seeing `<` turns the flag on and is not copied to the output; seeing `>` turns it off and is not copied either.
- **C**: Any character seen while the flag is off is copied to the result.

## Examples

| Input | Output |
|-------|--------|
| `"<b>bold</b>"` | `"bold"` |
| `"plain text"` | `"plain text"` |

## Edge Cases And Limits

Shares the exact same limitation as the regex it replaces: a `>` inside a quoted attribute value will end the tag early. For real HTML, use an actual HTML parser -- this function is for simple, well-formed tag stripping only, and says so.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `stripHtmlTags` implementation. |
