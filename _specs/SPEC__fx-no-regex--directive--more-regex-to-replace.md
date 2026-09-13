# SPEC: Directive -- Researched Candidates For More Regex To Replace

v1 | Sep 13 2026 - 06:46 AM (MDT)

**Status:** Active
**Type:** Directive
**Created:** Sep 13 2026
**See-Also:** _docs/DOC__fx-no-regex--cookbook--regex-patterns.md

---

## Summary

Web research done on request, into two things: what an MCP server on
GitHub actually offers for regex work, and what the standard
reference cheat sheets list as the common validation patterns
developers reach for regex to solve. Five of the findings are proposed as real functions, motivated
directly by Flavio's own production story about a regex that failed
to reject underscores in a password field. Nothing here is built yet
on purpose -- this is the spec first, build on request second. The
rest are candidates for a further pass after that.

## What Flavio's War Story Actually Was, And What It Proves

- **A**: **The Story** -- a form needed to reject certain characters (underscore, ampersand, and others) from a password or email field. The regex-based approach on Stack Overflow could not reliably reject a string containing an underscore. A plain string containing the whole forbidden character set, checked with membership, did the job correctly.
- **B**: **The Pushback** -- other developers on the thread objected that the string approach cost a few milliseconds more than a regex would. Flavio's own numbers: roughly 300ms either way, single-digit milliseconds apart -- immaterial next to a validation rule that has to actually work.
- **C**: **The Lesson, Generalized** -- a check that is correct and 2ms slower beats a check that is fast and wrong, every time a form is involved. This is not new to this package -- it is the same trade this whole library makes, with numbers attached now instead of just a feeling. Proposed as `containsForbiddenCharacter` (checks) and `removeForbiddenCharacters` (cleans), same character-loop-against-a-fixed-set technique `isAlphanumeric` and `removeDigits` already use, applied as a deny list instead of an allow list.
- **D**: **Prior Art, Found During Research** -- [`Speuta/noRegex`](https://github.com/Speuta/noRegex) on GitHub is a small existing library built for exactly this: regex-free validation with a configurable `forbiddenChars` option. Flavio's approach was not an eccentric workaround; it is a recognized pattern with its own library already, independently arrived at.

## The MCP Servers On GitHub -- What They Actually Are

Several exist. None of them do what might be hoped for here.

- **E**: **What Was Found** -- [`rog0x/mcp-regex-tools`](https://github.com/rog0x/mcp-regex-tools), [`PatzEdi/MCPGex`](https://github.com/PatzEdi/MCPGex), and the Regex Toolkit MCP server (via Glama) all test, explain, debug, and generate regex patterns against sample input. `jbenshetler/mcp-ragex` uses regex (via ripgrep) as one of several code-search modes, alongside semantic and symbolic search.
- **F**: **What They Are For** -- decoding a regex someone else wrote, or generating one from a natural-language description. Useful the day this package needs to understand an unfamiliar pattern someone hands over, before converting it -- feed it to one of these, get the explanation, then write the plain-string version by hand the way every function in this package already does.
- **G**: **What They Are Not For** -- none of them maintain a curated list of "regex patterns and their non-regex replacements." That list is what `_docs/DOC__fx-no-regex--cookbook--regex-patterns.md` already is, and what this spec adds to. No MCP server did that research; a plain web search for cheat sheets did.

## Candidates From The Cheat-Sheet Research

- **H**: **Password Strength, Composed** -- the classic lookahead regex, `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/`, is fully replaceable by composing three more proposed functions -- `hasUppercaseLetter`, `hasLowercaseLetter`, `hasDigit` -- with the length check and `containsForbiddenCharacter` above: `hasUppercaseLetter(input) && hasLowercaseLetter(input) && hasDigit(input) && input.length >= 8`. No single do-everything function needed -- see item L below for why that is deliberate, not an oversight.
- **I**: **US Phone Number Shape** -- `/^(\+1)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/`. A plain-string version means stripping optional punctuation first (`removeForbiddenCharacters(input, " ().-")` handles most of it once the leading `+1` is checked separately with `startsWith`), then checking the stripped result is exactly ten digits with `hasDigit`-style membership. Candidate for a `looksLikePhoneNumber` function.
- **J**: **Basic Email Pattern, The Cheat-Sheet Version** -- `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` is a tighter shape check than the one `looksLikeEmail` already uses. Not a new function -- the existing `looksLikeEmail` doc already explains why this package deliberately does not chase a tighter regex here: any fixed pattern is still just a shape check, and the honest answer for real validation is sending a message and getting a response, not a better regex.
- **K**: **URL Validation** -- the cheat-sheet pattern is long and this package's own `_docs/DOC__fx-no-regex--cookbook--regex-patterns.md` already covers this case at item H: use the built-in `URL` class, not a regex and not a hand-rolled parser. Nothing to add here; the existing entry stands.

## What NOT To Add, And Why

- **L**: **A Single Do-Everything `validatePassword` Function** -- composing the existing has* functions inline (item H above) is more flexible than baking one opinionated policy into the package. A caller decides their own minimum length and special-character set; the package supplies the building blocks, not the policy.
- **M**: **A `looksLikePhoneNumber` That Guesses At International Formats** -- the cheat-sheet pattern is US-specific already, and international phone number shapes vary enough that a single plain-string check would either be too loose to catch mistakes or too strict to accept real numbers. This is the same "genuinely hard without regex" territory the cookbook doc already names for full email and URL validation -- flagged here so it does not get added on a future pass without someone re-deciding this on purpose.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written from actual web research (MCP regex-tool servers, validation cheat sheets) done on Flavio's request, after Flavio's own war story about a regex that failed to reject underscores in a password field produced five real functions in the same push. |
