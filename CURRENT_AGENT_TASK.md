# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-de2-differential-analyzer-publication-precision.md`.

The DE2 + Differential Analyzer publication-precision slice landed as `9684eaf20bf1f80b83c59bc3a6dabb7d428a11ad` about 36 minutes after assignment and recorded 223 tests across 19 files plus typecheck/build/diff and bilingual browser smoke. The reviewer then merged PR #7, `fix: harden revolution counter replay`, as `4af0c1adc5fbd122adddb328b092dcfe1ba2bbd9`; the current remote `main` has advanced again with task-archive/assignment commits, so **fetch/pull before doing anything and treat actual remote state as authoritative**.

One correctness PR remains open: PR #6, `Fix operator division at quotient-nine and exact-zero boundaries`, exact head `7a81ad80068f97ca6fed1dd79a860cb250b64911`. Its exact-head CI run `33498447405` passed, and its source/test patch is substantively good, but after later main changes it is currently non-mergeable. Do not discard or ignore it. This slice should reconcile that fix onto current main and then use the corrected operator-division model to sharpen the historical-procedure evidence boundary.

Several consecutive substantial slices have completed in roughly 30–42 minutes, so this assignment is intentionally two-part but one coherent question:

> **Can the generic operator-division trace become causally/replay correct at its arithmetic boundaries, while the repository also becomes more precise about which real-machine division/correction procedures are actually documented rather than back-filled from the generic P/M model?**

This is not permission to make the generic division loop imitate one named machine.

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priorities 3, 4 and 5
6. `research/subtraction-and-division.md`
7. `research/control-and-zeroing-source-map.md`
8. `src/mechanisms/operator-division/index.ts`
9. `tests/operator-division.test.ts`
10. the `#/operator-division` UI in `src/main.ts`
11. open PR #6 and exact head `7a81ad80068f97ca6fed1dd79a860cb250b64911`
12. `docs/VERIFICATION.md`

Before editing, run the full current-main typecheck/tests once and record the actual baseline. Do not assume any old test count; PR #7 and later task commits have moved main since PR #6 was validated.

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Part A — reconcile PR #6 onto current main

PR #6 has already identified and tested four real semantic/replay defects in the generic P/M operator-division model:

1. quotient digit exactly 9 with non-zero remainder (for example `19 ÷ 2`) needs a tenth subtraction attempt to *discover* overshoot before add-back; the old guard rejected that attempt too early;
2. exact zero reached above the units place (for example `100 ÷ 10`) must shift through implied lower zero quotient places before completion;
3. `OVERSHOOT_DETECTED` must be causally meaningful rather than replay-removable/no-op;
4. replay must bind actions, cycle ownership, event order and final state instead of accepting self-consistent forged traces.

The reviewed PR patch introduces an explicit `OVERSHOOT_PENDING` phase, temporary quotient digit 10 only while correction is in flight, exact-zero place exhaustion/shift semantics, and action-derived replay validation. Those ideas are accepted for integration unless current main reveals a new incompatibility.

## A1. Integrate, do not blindly overwrite

Prefer a clean rebase/cherry-pick of PR #6's exact source/test/UI change onto current main if practical. If `docs/VERIFICATION.md` conflicts, preserve all later main verification sections and append/reconcile the division-fix record; do **not** replace the current file with the older PR version.

The relevant PR files are:

- `src/mechanisms/operator-division/index.ts`
- `tests/operator-division.test.ts`
- the operator-division portion of `src/main.ts`
- `docs/VERIFICATION.md`

Do not overwrite unrelated later source-atlas, revolution-counter, research, or verification work.

If the exact PR patch no longer applies because current main independently fixed the same defect, prove equivalence with tests/diff and do not duplicate code.

## A2. Required arithmetic/replay regressions

At minimum ensure tests prove:

- `19 ÷ 2` reaches quotient `9`, remainder `1`, and the tenth attempted subtraction is visible only as an overshoot/correction cycle rather than a stored final quotient digit 10;
- `100 ÷ 10` completes as quotient `10`, remainder `0`, including required place shift through the lower zero position;
- `8478 ÷ 314` still reaches quotient `27`, remainder `0` with visible overshoot → detection → correction where applicable;
- `OVERSHOOT_DETECTED` cannot be removed from a trace without replay failure;
- negative residual after subtraction is in an explicit pending phase before correction becomes legal;
- missing/duplicated/forged actions or cycle ids fail replay;
- forged event-cycle ownership or collapsing multiple actions into one fake cycle fails;
- non-canonical initial state or incomplete final state fails;
- a tenth subtraction that does **not** overshoot is rejected as an undersized quotient-register configuration;
- current revolution-counter hardening from merged PR #7 remains green.

Retain or reproduce PR #6's bounded arithmetic sweep if it can be run cheaply. A useful target is dividends `0..500`, divisors `1..50`, offsets `0..2`, comparing every fitting configuration to ordinary integer quotient/remainder and requiring explicit rejection of undersized configurations. Record the exact sweep result if run; do not invent numbers from the old PR body if the current result differs.

## A3. UI causal visibility

Keep the operator-division UI small. It should make the corrected causality visible:

```text
SUBTRACT_ONCE -> negative residual / OVERSHOOT_PENDING
OVERSHOOT_DETECTED -> CORRECTION_REQUIRED
CORRECT_ADD_BACK -> corrected residual / quotient digit
```

A visitor must be able to see the negative residual before the UI tells them to add back. Do not add named-machine bell/crank artwork.

# Part B — sharpen real operator-procedure provenance

Once Part A is green, spend the remaining slice on exact procedure evidence. The generic model is now stronger, so the historical boundary should become stronger too.

## B1. Thomas 1868 operating instructions: bounded facsimile attempt

The repository already identifies the Smithsonian record for Thomas operating instructions (1868), object `nmah_904757`:

<https://www.americanhistory.si.edu/collections/object/nmah_904757>

Make a bounded attempt to locate and directly inspect a lawful scan/facsimile of this exact or clearly identified instruction edition through Smithsonian attachments, Internet Archive, Google Books, HathiTrust, Gallica, or another stable institutional/public-domain host.

If a facsimile is found:

- record exact title/edition/date/language;
- record exact pages actually inspected;
- extract only operator-procedure facts actually stated there: setup/zeroing, mode selection, carriage movement, division repetition, quotient/revolution counter use, overrun/undo/correction if present;
- keep mechanism geometry claims out unless the page actually contains and supports them;
- distinguish instructions for a particular revision from later Thomas-family practice.

If no stable facsimile is accessible, leave the Smithsonian record at **catalog identity only** and state the access boundary. Do not infer instruction steps from catalog existence.

## B2. Curta division facsimile/edition precision

The current note relies conservatively on Curta.org manual transcription. Try to map the division procedure to an exact directly inspected manual/facsimile/edition from the Curta manual archive or another stable lawful scan.

Useful starting point:

<https://curta.org/wiki/CurtaManuals>

If a directly inspectable manual is available, record:

- exact manual title and model/type applicability;
- edition/date/language where visible;
- exact page(s) for division, carriage movement, counter/quotient behavior, overstep and undo/add-back procedure;
- whether the source describes Type I, Type II, or both;
- which generic P/M concepts line up with the operator procedure and which do not.

Do not call a specialist transcription H/E1 if the facsimile itself was not inspected. If only transcription remains available, preserve the current E2–E3 boundary.

## B3. Optional Burkhardt overshoot anchor

Only if time remains and a directly inspectable primary/operator source is easy to obtain, strengthen the Burkhardt bell/overshoot procedure beyond the current Smithsonian catalog. Do not spend the slice on broad hunting.

# Part C — research/typed boundary updates

Update `research/subtraction-and-division.md` so it explicitly separates:

```text
generic tested P/M trace
Thomas identified object/catalog evidence
Thomas 1868 instruction facsimile, if actually inspected
Burkhardt overshoot indicator evidence
Curta exact operator-manual procedure, if actually inspected
specialist transcription where facsimile remains unavailable
```

Update `research/control-and-zeroing-source-map.md` only where direct procedure evidence changes a control/zeroing/correction claim.

If the existing typed provenance adapter has a natural place for exact operator-procedure anchors, extend it minimally. Do not create a new source-atlas subsystem just for division.

The key historical rule is:

> A P/M state transition such as `OVERSHOOT_PENDING -> CORRECTION_REQUIRED -> ADD_BACK` can be mathematically and pedagogically useful without proving that Thomas, Burkhardt or Curta used that exact internal state sequence.

Keep source/model/revision labels attached to claims.

# Part D — reconciliation and verification

After Parts A–C are real:

- update `STATUS.md` with the operator-division correctness fix and strongest procedure-source state actually achieved;
- add one concise completed line to `TODO.md` rather than growing another roadmap;
- update `docs/RESEARCH_GAPS.md` Priority 3/4 wording only to the strongest new evidence actually obtained;
- update `docs/VERIFICATION.md` with current baseline/final test counts, sweep results if run, and browser routes actually checked;
- update README/TEACHING_PATH only if navigation meaningfully changes (it probably should not).

If public UI changes, perform bilingual browser smoke for:

```text
#/operator-division
#/arithmetic-labor
#/about
```

Quick-regress `#/source-atlas` or `#/controls` if shared evidence components are touched. Check desktop and one narrow viewport for horizontal overflow and runtime JS errors.

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

All must pass.

Also verify:

- PR #7 revolution-counter changes remain present and tested;
- later DE2/Differential Analyzer/Curta/Analytical source-atlas work is not lost in conflict resolution;
- operator-division replay rejects missing causal events and forged action/cycle provenance;
- any historical procedure page/figure claim has an exact inspected source location;
- inaccessible sources remain explicitly inaccessible rather than being filled from secondary summaries.

After push:

- confirm remote `main` contains the completion commit;
- inspect CI/Pages if they finish during the slice and record only completed results;
- stop after the coherent commit/push and wait for the next task revision.

Suggested commit subject:

```text
fix: harden operator division and procedure provenance
```

# Evidence boundaries

- `src/mechanisms/operator-division/`: **M/P generic operator-procedure model**.
- The negative residual and explicit pending/detection/correction phases are repository modeling choices; do not claim historical machines had those named states.
- Thomas/Burkhardt/Curta operator-procedure claims are **H** only at the exact model/edition/page precision directly supported.
- Smithsonian object/catalog records support identified controls/roles at catalog precision, not universal family procedure or hidden geometry.
- Specialist transcriptions remain **E2–E3** unless the underlying facsimile is directly inspected and matched.
- A patent/manual can establish intended or instructed behavior without proving every surviving production revision used identical geometry.
- Do not invent bell timing, crank direction, counter sign, zeroing linkage, interlock geometry, force/torque, tolerances, or operator throughput.

# Stop conditions

Stop and leave a clear note rather than guessing if:

- reconciling PR #6 conflicts with later main semantics beyond documentation/straightforward UI integration;
- the division fix would require weakening current replay/state validation elsewhere;
- the Thomas or Curta source can only be found as metadata/transcription and page-level claims cannot be directly verified;
- completing a historical claim would require generalizing across machine revisions or inventing geometry;
- the source hunt threatens to consume the entire slice after Part A is already complete.

If Part A and the two bounded source attempts finish substantially before the one-hour target, use remaining time for focused replay/property tests and precise source-location cleanup. **Do not start a new machine family, physics model, or reliability simulation.**