# DOC: fx-no-regex -- looksLikeEmail

v1 | Sep 13 2026 - 06:07 AM (MDT)

**Status:** Active
**Type:** API Reference
**Created:** Sep 13 2026

---

## Summary

Checks whether a string has the loose shape of an email address: one
non-whitespace run, an `@`, another non-whitespace run containing at
least one period. This is a shape check, not a deliverability check.

## The One Regex In This Package

```ts
const LOOSE_EMAIL_SHAPE = /^\S+@\S+\.\S+$/
```

Everything else in `fx-no-regex` is a plain-string replacement for a
regex. This function is the deliberate exception, and the coding
standard this package follows spells out exactly when an exception is
allowed: "Regex is allowed only where no plain-string version is
possible, and the code says why in a comment on that line."

## Why This Is The Exception, Not A Loophole

A real email address is not a fixed-shape string. The local part
(before the `@`) allows quoted strings, escaped characters, and a long
list of special characters; the domain part allows internationalized
labels. Writing that out with `split`, `includes`, and character loops
means re-implementing a small parser by hand, character by character.
That is more code, easier to get subtly wrong, and no more honest
about what it actually checks than the four-token regex above --
either way, this is a SHAPE check, not proof the address exists or can
receive mail.

## Usage

```ts
looksLikeEmail("flavio.espinoza@gmail.com") // true
looksLikeEmail("not-an-email")              // false
```

## Examples

| Input | Output |
|-------|--------|
| `"a@b.com"` | `true` |
| `"a@b"` | `false` (no period in the domain part) |
| `"a b@c.com"` | `false` (whitespace inside the local part) |
| `""` | `false` |

## Edge Cases And Limits

Passes plenty of strings that are not valid, deliverable addresses
(`"a@b..com"`, for one) and rejects some technically valid ones
(quoted local parts, IP-literal domains). Use it to catch an obviously
wrong value in a form, never as proof an address is real -- the only
way to prove that is to send a message and get a response.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written alongside the initial `looksLikeEmail` implementation, as the documented exception to the no-regex rule. |
