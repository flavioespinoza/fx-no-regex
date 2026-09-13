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
  sanitizeFilename,
  stripHtmlTags,
  snakeToCamel,
  countWords,
  stripSurroundingQuotes,
  looksLikeEmail
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

test("stripHtmlTags removes tags and keeps the text between them", () => {
  assert.equal(stripHtmlTags("<p>hello <b>world</b></p>"), "hello world")
})

test("snakeToCamel converts underscores to camel humps", () => {
  assert.equal(snakeToCamel("user_profile_id"), "userProfileId")
  assert.equal(snakeToCamel("already"), "already")
})

test("countWords counts runs of non-whitespace characters", () => {
  assert.equal(countWords("the quick  brown\tfox\njumps"), 5)
  assert.equal(countWords("   "), 0)
})

test("stripSurroundingQuotes removes one matching pair only", () => {
  assert.equal(stripSurroundingQuotes("\"hello\""), "hello")
  assert.equal(stripSurroundingQuotes("'hello'"), "hello")
  assert.equal(stripSurroundingQuotes("\"mismatched'"), "\"mismatched'")
  assert.equal(stripSurroundingQuotes("no quotes"), "no quotes")
})

test("looksLikeEmail checks the loose shape, not full RFC 5322", () => {
  assert.equal(looksLikeEmail("flavio.espinoza@gmail.com"), true)
  assert.equal(looksLikeEmail("not-an-email"), false)
})
