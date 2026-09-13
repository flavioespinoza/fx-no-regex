import { test } from "node:test"
import assert from "node:assert/strict"
import {
  removeWhitespace,
  collapseSpaces,
  removePeriods,
  trimCharacter,
  getFileExtension,
  collapseDashes,
  startsWithIgnoreCase,
  removeDigits,
  splitCamelCase,
  isAlphanumeric,
  sanitizeFilename
} from "../index.js"

test("removeWhitespace strips every space, tab, and newline", () => {
  assert.equal(removeWhitespace("a b\tc\nd"), "abcd")
})

test("collapseSpaces reduces runs of spaces to one", () => {
  assert.equal(collapseSpaces("a   b    c"), "a b c")
})

test("removePeriods removes every period, not just the first", () => {
  assert.equal(removePeriods("a.b.c."), "abc")
})

test("trimCharacter strips a leading and trailing character only", () => {
  assert.equal(trimCharacter("  hello  ", " "), "hello")
  assert.equal(trimCharacter("--a-b--", "-"), "a-b")
})

test("getFileExtension returns the extension including the dot", () => {
  assert.equal(getFileExtension("report.final.pdf"), ".pdf")
  assert.equal(getFileExtension("no-extension"), "")
})

test("collapseDashes reduces runs of dashes to one", () => {
  assert.equal(collapseDashes("a--b---c"), "a-b-c")
})

test("startsWithIgnoreCase matches regardless of case", () => {
  assert.equal(startsWithIgnoreCase("SPEC__directive", "spec"), true)
  assert.equal(startsWithIgnoreCase("DOC__session", "spec"), false)
})

test("removeDigits strips every digit", () => {
  assert.equal(removeDigits("v136 on Sep13"), "v on Sep")
})

test("splitCamelCase inserts a space before each capital", () => {
  assert.equal(splitCamelCase("calcLivePnlResult"), "calc Live Pnl Result")
})

test("isAlphanumeric rejects punctuation and spaces", () => {
  assert.equal(isAlphanumeric("fxNoRegex123"), true)
  assert.equal(isAlphanumeric("fx-no-regex"), false)
  assert.equal(isAlphanumeric(""), false)
})

test("sanitizeFilename fixes a leading space, a doubled period, and a date placeholder", () => {
  assert.equal(sanitizeFilename(" Test-problem..{date}.png", "2026-09-13"), "Test-problem.2026-09-13.png")
})
