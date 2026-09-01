# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-differential-analyzer-primary-source-retry.md`.

The previous Differential Analyzer assignment landed as `e155be76ea08095e57aa06029bdd0aa0f697de06` about 30 minutes after assignment, changed 7 files (about `+55/-15`), retained 292 tests across 21 files, and passed exact-head CI `33545157498` plus Deploy Pages `33545157546`.

Since that completion, administrator review merged PR #10 (`Bind direct multiplication replay to recorded actions`) into `main` as squash commit `794f8e1d1ed55b452b6410d11546ba6b636369ca`. PR #11 (`Bind Analytical Engine replay to fixture provenance`) is independently reviewed and exact-head CI-green at `4a98fb186978356af5e860b76d0c15d811a28586`, but became non-mergeable only because PR #10 touched overlapping core/status/verification lines. The PR bodies record a previously tested synthesis of the two changes with 319/319 tests; do not treat that claim as a substitute for re-running verification on current `main`.

This assignment is intentionally broader because the agent has repeatedly completed substantive bounded slices in roughly 30–35 minutes.

> **Question for this slice:** can we integrate the already-reviewed Analytical Engine fixture-provenance hardening cleanly on top of the merged direct-multiplication replay hardening, then use the remaining time to improve one concrete Curta Type II primary-source boundary without inventing production geometry or chronology?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2 and `Files to deepen next`
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-differential-analyzer-primary-source-retry.md`
8. current `src/core/trace.ts`
9. current `src/mechanisms/direct-multiplier/` and its tests, only to preserve the just-merged PR #10 semantics
10. PR #11 exact head/diff (`4a98fb186978356af5e860b76d0c15d811a28586`) and `src/exhibits/analytical-engine-flow/` + tests
11. `research/curta-source-map.md`
12. `src/exhibits/source-atlas/` and `tests/source-atlas.test.ts`

Run current-main typecheck/tests before editing and record the actual baseline. Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as a task source.

# Part A — integrate PR #11 on top of current main

PR #11 solves a real fail-open replay boundary in the P/M Analytical Engine teaching trace: the recorded `fixture` could be descriptive while a substituted canonical event/final-state trace for another fixture still replayed successfully. Its exact reviewed head is:

```text
4a98fb186978356af5e860b76d0c15d811a28586
```

Its original base was `e155be76...`; current `main` now also contains PR #10's direct-multiplication action-bound replay hardening.

## A1. Preserve both hardening lines

Integrate the **behavioral content** of PR #11 onto current `main` without regressing PR #10.

You may fetch/cherry-pick/rebase the PR branch or reapply its focused patch, but resolve overlaps deliberately. Do not overwrite newer status/evidence records with an older PR copy.

The resulting Analytical Engine trace must retain these reviewed properties:

- exact enumerable fixture contract `{ a, b, c, d }` with safe integers;
- reject unknown enumerable string or Symbol fixture fields;
- derive canonical initial state, ordered events and final state from the fixture;
- reject fixture-only tampering and replacement of events/final state by another valid fixture trace;
- `stateAtAnalyticalEvent()` must validate full trace provenance/final state before returning a partial state;
- object member insertion order is not semantic;
- arrays remain ordered, length/index presence matters, sparse/extended arrays do not collapse into equality;
- non-finite values, enumerable `undefined` extensions and Symbol/enumerable extensions do not disappear through JSON-style coercion;
- final-state tampering fails closed.

At the same time, preserve current direct-multiplication PR #10 behavior:

- recorded `DIRECT_MULTIPLY` action remains authoritative;
- action/event substitution for another multiplier fails closed;
- current direct-multiplier tests remain green.

Do not generalize this into a repository-wide trace redesign unless a concrete shared helper is already present and the change is obviously dependency-safe. Minimal integration is preferred.

## A2. Tests

At minimum, after integration ensure the focused Analytical Engine suite covers:

- alternate-fixture event/final substitution rejection;
- fixture-only tampering rejection;
- non-canonical initial/final state rejection;
- event stepping cannot bypass provenance validation;
- unknown enumerable fixture fields including Symbol keys;
- member insertion order tolerance;
- event-array order/shape authority;
- non-finite / enumerable-undefined / sparse-array adversarial cases covered by PR #11's reviewed behavior.

Run both focused suites:

```text
Analytical Engine flow tests
direct multiplier tests
```

If current-main changes make the old expected combined count `319` obsolete, record the actual count rather than forcing that number.

## A3. PR bookkeeping

If PR #11 has become mergeable or already merged by the time this task starts, do not duplicate it; verify current `main` contains the behavior and skip integration.

If you integrate equivalent PR #11 behavior directly into `main` because the fork PR remains conflict-blocked, mention PR #11 and exact head in the completion commit/verification note so attribution/provenance is not lost. Do not close or rewrite the contributor's fork history unless repository permissions and normal workflow make that clearly appropriate.

# Part B — Curta Type II primary-source precision

After Part A is complete and green, use the remaining time for one bounded Curta source-map pass. Do **not** implement Curta geometry.

Current source state in `research/curta-source-map.md` already includes:

- Herzstark US 2,525,352 patent;
- directly inspected two-page Contina operator guide (Model I `8×6×11`, Model II `11×8×15`, Model I illustrated);
- 1967 Type I service-manual cover;
- Type II 43-page assembled service scan with directly inspected PDF pages 1–2, 6/leaf `N I-a`, 10/leaf `O-1-2`, 34/leaf `S 3`;
- explicit warning that the Type II service scan contains replacement leaves/latest modifications and may reuse Model I pictures whose details/proportions differ.

The remaining target is **document/revision precision**, not prettier mechanism claims.

## B1. Inspect primary/manufacturer Type II documents exposed by the existing Curta indexes

Start from the already recorded access layers:

- `https://www.mycurta.com/cu.htm`
- `https://vcalc.org/cu.htm`
- the currently cited Type II service scan

Look for directly inspectable manufacturer-origin Type II documents such as service leaves, parts lists/BOMs, drawing sets, operator booklets, or cover/index pages.

Priority questions:

1. Can a Type II document directly establish `11×8×15` capacity independently of the dual-model operator guide?
2. Does any directly inspectable Type II cover/index/leaf expose an issue date, revision date, replacement-leaf date/code, document number, or revision identifier?
3. Can the replacement-leaf chronology be bounded at all from printed leaf metadata, or must it remain an assembled-undated/latest-modifications warning?
4. Which document explicitly identifies itself as Type II versus merely being linked under a collector index filename?
5. Are there directly readable parts-list/drawing document identities that improve source provenance **without** interpreting hidden geometry?

A collector filename or HTML link label is not manufacturer metadata. Record printed/document-internal identity separately from access-host labeling.

## B2. Evidence boundaries

- directly inspected manufacturer document text/cover/leaf = **H/E1 at the exact identity/page/leaf precision inspected**;
- specialist mirror/index = access provenance only unless the underlying document is actually inspected;
- production chronology synthesized across documents = **H/R** unless a primary source explicitly states it;
- patent embodiment is not production revision proof;
- do not infer part equality across Type I/II from reused illustrations;
- do not infer tooth profiles, ratios, transfer timing, tolerances, safe speed, or hidden interlock linkage from assembly names or exploded drawings alone.

If the Type II capacity/date/revision question remains unresolved after a bounded search, say exactly what was inspected and preserve the open gap. Do not fill it from unsourced collector prose.

## B3. Source-atlas update only if evidence really improves

If Part B produces a new directly inspected Curta primary document or materially better page/leaf identity:

- update `research/curta-source-map.md`;
- update the existing Curta typed source-atlas anchor(s), not a parallel evidence model;
- add/update focused `tests/source-atlas.test.ts` assertions for the new support/not-established boundary.

If no new primary-source precision is gained, leave the atlas unchanged and record the bounded access result only in the research note if it is useful and non-redundant.

Do not change `#/curta` runtime geometry/animation in this slice.

# Part C — reconciliation and verification

After Parts A/B:

- update `STATUS.md` to reflect the Analytical Engine replay hardening and only Curta precision actually gained;
- add one concise completed line to `TODO.md` for this slice;
- narrow `docs/RESEARCH_GAPS.md` only where a stated Curta gap genuinely closes;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and checks;
- preserve the completed Bush/Shannon, Scheutz, and PR #10 records; do not overwrite them with stale PR status text.

If Part B changes source-atlas/UI data, perform bilingual browser smoke for:

```text
#/source-atlas
#/curta
#/about
```

Part A alone changes validation/provenance but not rendering, so do not falsely claim a browser smoke if none was performed.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Also run focused Analytical Engine, direct-multiplier, and source-atlas tests for the touched areas.

All must pass.

The finished slice should answer:

> Is the Analytical Engine fixture now the authoritative source of the trace, or can a valid trace from another fixture still be substituted?

> Did integrating that hardening preserve the just-merged direct-multiplication action-bound replay contract?

> What new Type II Curta document identity/revision fact was directly inspected, and what production chronology or geometry still remains unestablished?

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect exact-head push CI and Deploy Pages when they complete and record only completed outcomes if available before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
fix: integrate analytical replay provenance and deepen Curta sources
```

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- PR #11 integration would require discarding or weakening PR #10 semantics;
- the current trace core has diverged enough that reproducing PR #11 behavior requires a broad redesign;
- a Curta PDF/index exists but its actual pages cannot be inspected;
- Type II chronology is available only in collector prose without directly inspected document support;
- a drawing invites geometric reverse engineering not supported by caption/text;
- source-atlas changes would require broad route/layout refactors;
- the task starts expanding into a full Curta emulator, production serial-number census, or 3D/physics model.

If Part A and a meaningful Part B source improvement both finish substantially before one hour, use remaining time to tighten exact page/leaf anchors and adversarial tests. Do not start another machine family.
