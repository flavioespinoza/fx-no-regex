# SPEC: Directive -- Starting A New npm Module With Claude

v1 | Sep 13 2026 - 06:38 AM (MDT)

**Status:** Active
**Type:** Directive
**Created:** Sep 13 2026
**See-Also:** _specs/SPEC__fx-no-regex--directive--npm-publish-2fa.md

---

## Summary

Three ways to start a brand-new npm module with Claude, which one
avoids the permission wall this session hit today, and a direct
answer to whether Claude Code on the web is even required. This spec
was written from inside `fx-no-regex`, the repo it was built to
document, but the content applies to any future project -- it is
filed here only because this is the repo with write access at the
time it was written. It is a candidate for Claude Helper to relocate
into keymaster's global `_specs/` if Flavio wants it available to
every project on startup.

## The Permission Wall Hit Today, As Evidence

Building `fx-no-regex` from inside Claude Code on the web, a direct
`create_repository` call failed with `403 Resource not accessible by
integration`. The GitHub App installed for this session is scoped to
specific repositories, not the whole account, so creating a brand-new
repo from nothing is not something a web session can always do by
itself. The fix that worked: Flavio created the empty repo on
github.com by hand, then the session attached it with `add_repo` and
pushed the built content. That detour is exactly what path B below
exists to skip.

## Three Paths

- **A**: **Local Claude Code (iMac Or MacBook Pro Helper)** -- runs under Flavio's own authenticated `gh` CLI and git, with no GitHub App scoping at all. `gh repo create fx-whatever --public` (or `--private`) just works, first try, every time. This is the path with the least friction for the CREATION step specifically.
- **B**: **Claude Code On The Web, Starting Fresh** -- works, but only cleanly when one of two things is true: the GitHub App already has "all repositories" access on the account, or Flavio creates the empty repo by hand first (one click on github.com) and the session attaches it with `add_repo`. Skipping straight to "have Claude create the repo" is a coin flip on whether the App's scope allows it that day.
- **C**: **Hybrid -- Create Locally, Continue On The Web** -- Helper creates and pushes the initial scaffold locally (path A, no friction), then Flavio opens a Claude Code on the web session pointed at that already-existing repo to keep building. This is Flavio's own proposal from this session, and it is the right call: by the time the web session opens, the repo already exists, so the only GitHub operation the web session needs is a clone, not a create, which is exactly the operation the GitHub App is scoped for.

## Recommendation

Path C, for any new project going forward. Create and push the first
commit locally with Helper, where repo creation has zero permission
friction, then switch to Claude Code on the web (or back to local, or
back and forth) for the rest of the build. Reserve path B's
attach-an-empty-repo detour for the case where Flavio is not at a
machine with Helper running.

## Answering Flavio's Specific Questions

- **D**: **"Do I have to do it with Claude Code online?"** -- No. Path A (local Helper) creates a new repo with no permission wall at all, and is the recommended first step for a brand-new project either way.
- **E**: **"Do I have to come in and just hit New, or add you just to the default?"** -- This is a Claude Code on the web UI mechanics question (how a session gets tied to a repo and an environment) that this spec cannot answer with certainty from inside a running session -- verifying current button labels and flow would need a browser, which this session does not use, per the house rule against touching Flavio's browser. The authoritative, current answer is `https://code.claude.com/docs/en/claude-code-on-the-web`. What holds regardless of the exact UI: a session is tied to one repository (an existing one), so for path B, the repo needs to exist first -- either via the App's own create call succeeding, or via the by-hand creation and `add_repo` detour above.
- **F**: **"I don't know how to do it from scratch with you."** -- The honest answer, given today's evidence: doing it "from scratch" purely inside a web session is not guaranteed to work on the first try, because it depends on the GitHub App's current repository scope. Path C sidesteps needing to know the answer to that question at all.
- **G**: **"I guess it would be easier to just always go up to GitHub, right?"** -- Yes, confirmed by what happened today, not just a guess.

## Pull Before Continuing -- Flavio's Addition

- **H**: **Why It Matters** -- a Claude Code on the web session clones the repo once, at session start. If Helper pushes new commits locally AFTER that clone happened -- finishing the npm publish from the handoff spec, for instance -- the web session's copy is now behind and does not know it.
- **I**: **The Rule** -- before making any change in a Claude Code on the web session against a repo that a local Helper might also be touching, run `git fetch origin` and `git status` (or `git pull`) first, and only proceed once the branch is confirmed level with `origin/main`. This applies in both directions: Helper should do the same before pushing, if a web session might have moved the branch first.

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written by Sol Angel Blacksmith (remote, Claude Code on the web) after hitting the GitHub App's repository-creation scope limit while building fx-no-regex, and after Flavio proposed the create-locally-then-continue-on-the-web workflow that avoids it. |
