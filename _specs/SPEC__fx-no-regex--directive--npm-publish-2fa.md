# SPEC: Directive -- npm Publish, The 2FA Staging Step

v1 | Sep 13 2026 - 06:30 AM (MDT)

**Status:** Active
**Type:** Directive
**Created:** Sep 13 2026
**See-Also:** _docs/DOC__fx-no-regex--api--overview.md

---

## Summary

`fx-no-regex` is built, tested, documented, and pushed to GitHub, but not
yet on the npm registry. The one remaining step needs a live human 2FA
action that a remote or unattended session cannot complete. This spec
hands that step to whichever Helper picks it up, with the decision
already narrowed to two options.

## Where Things Stand

- **A**: **The Package** -- `flavioespinoza/fx-no-regex`, GitHub `main` at commit `1b15153` (sixteen functions, `_docs/` with one file per function plus an overview and a cookbook, sixteen tests passing, `tsc` clean).
- **B**: **The Registry** -- not yet published. `npm publish --access public` from a remote session failed with `EOTP` -- the granular access token used required a one-time password, which a remote non-interactive session cannot supply.
- **C**: **The npmjs.org Warning** -- Flavio was warned, when generating that token, that bypass-2FA tokens with direct-publish access are being deprecated (removed entirely in Jan 2027), and was steered toward a "Read and write (stage only)" token instead.

## Why This Cannot Be Finished Remotely

npm's rule is about live human presence at the moment of publish, not
about which machine or which agent runs the command. A "stage only"
token lets any agent, local or remote, upload the package, but the
release still needs a human to approve it on npmjs.com with their own
2FA session afterward. That approval step cannot be scripted away by
design -- this is npm's response to stolen-token supply-chain attacks,
and it applies equally to a local agent with full Bash and to this
remote one.

## The Decision Helper Is Making

- **D**: **Option One -- 1Password** -- if an npm login item with OTP already exists in 1Password, `op item get "npm" --otp` prints a live code from the terminal, and `npm publish --otp=$(op item get "npm" --otp)` runs the whole publish in one command with no staging step and no browser click. Preferred if 1Password is already in use, because the secret stays inside its encrypted vault rather than as a raw string on disk.
- **E**: **Option Two -- A Stage-Only Token** -- generate a "Read and write (stage only)" granular access token on npmjs.com, use it for `npm publish` from either Twin, and then Flavio finishes with one approval click on npmjs.com. No secret to store at all, at the cost of one manual step per release.
- **F**: **What NOT To Do** -- do not store a raw TOTP secret (the base32 setup key, via `oathtool`) anywhere a script can read it unattended. That recreates the exact risk the deprecated bypass-token type carried: whoever holds the secret can auto-publish forever with no human in the loop. Flagged, not forbidden -- Helper's call if the tradeoff is accepted, but it should be a deliberate choice, not a default.

## What To Do

- **G**: **Pull This Repo** -- `flavioespinoza/fx-no-regex`, `main` branch, already has everything except the registry publish.
- **H**: **Set Up Whichever Option Is Chosen** -- a 1Password item, or a fresh stage-only token. Neither belongs in this repo, in `.env.local`, or in any file `fx-no-regex` tracks -- per GC S, npm-specific machine credentials belong in `.zkeys` if they need to persist at all, or in 1Password itself.
- **I**: **Publish** -- `cd` into the repo, `npm install`, `npm run build`, `npm test` (sixteen tests should pass), then `npm publish --access public` with whichever 2FA mechanism was set up.
- **J**: **Verify** -- `npm view fx-no-regex` should show version `1.0.0` on the registry after the finishing step completes.

## Unresolved Questions

- **K**: Does 1Password already have an npm login item, or does one need to be created from scratch?

---

## Change Log

| Date | Version | Change |
|------|---------|--------|
| Sep 13 2026 | v1 | Written by Sol Angel Blacksmith (remote, Claude Code on the web) after a remote publish attempt hit npm's 2FA staging requirement. Handed to iMac Helper per Flavio's instruction, since finishing the publish is Helper's jurisdiction and needs a decision this session cannot make alone. |
