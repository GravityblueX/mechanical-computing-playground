# Archived Agent Task — Thomas 1868 operator protocol

Status: **completed / accepted**

Assigned from administrator checkpoint: `2f3ec51c105540769013ff339b42ae8ecd5c47fb` (`docs: assign Thomas 1868 operator-protocol audit`)

Completion commit: `435301cef07306a8aedaf802db7c9e29c2a53999` (`research: ground Thomas 1868 operator protocol`)

Assignment-to-completion: about **49 minutes** (2026-09-02 01:12:03Z → 02:00:57Z).

## Completed bounded question

Audit the directly exposed Thomas 1868 instruction-pamphlet material and identified 1820/1867/ca.1873 Smithsonian machines to determine what can actually be claimed about register roles, mode selection, zeroing, carriage/revolution-register controls, and operator procedure, while keeping the repository's generic operator-division and dual-register event sequences explicitly P/M.

## Administrator review

Accepted.

The completion:

- resolved Smithsonian IIIF `NMAH-AHB2018q019415` and established that it exposes exactly one unnumbered title/legend opening rather than a readable procedure-page sequence;
- anchored the readable `A/B/C/D/M/N/O/P` control/register roles to that opening without inventing missing multiplication/division instructions;
- kept 1867 `MA.327900`, ca.1873 `MA.335215`, and ca.1820 `nmah_690692` object/revision boundaries separate;
- preserved the ca.1820 ribbon-operated/no-revolution-register machine as a negative boundary against back-filling later crank/dual-register procedure;
- did **not** rename generic `OVERSHOOT_PENDING → DETECTED → ADD_BACK` or lifecycle event timing as historical Thomas terminology;
- updated the bounded research/status/gap/public provenance layer and focused tests without changing generic division arithmetic semantics.

## Diff / verification

Compared with assignment checkpoint `2f3ec51`:

- 1 completion commit;
- 9 files changed;
- 137 additions / 20 deletions (157 changed lines);
- baseline: 361 tests across 21 files;
- final: 362 tests across 21 files;
- focused provenance/operator-division/register-lifecycle tests: 48 pass;
- `npm run typecheck` — pass;
- `npm test -- --run` — pass;
- `npm run build` — pass;
- `git diff --check` — pass.

Exact-head automation results for `435301c`:

- CI run `33581615620` — **success**;
- Deploy Pages run `33581615614` — **success**.

Browser smoke for `#/division`, `#/controls`, and `#/about` was attempted by the local agent but its browser extension was disconnected, so no manual browser smoke was claimed.

## Remaining boundary after this task

The exposed 1868 opening does **not** establish complete multiplication/division procedure, turn counts, shift order, overshoot/add-back, termination/remainder procedure, or hidden linkage/timing. Those remain open until exact primary procedure pages are directly inspectable.
