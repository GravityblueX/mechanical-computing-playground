# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: roughly 60–90 minutes
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-operator-division.md`.

The previous enlarged slice still completed in about 30 minutes (roughly 459 additions / 17 deletions across 10 files, plus research, UI, tests and verification), and remote CI for `7bebcea2d187f0ed2411de4098c846963df8b32a` passed. This slice is therefore intentionally larger and more source-heavy. Do not compensate by weakening evidence checks or inventing historical geometry.

## Read before work

Fetch/pull remote `main`, then read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2, Priority 4, and the Curta source-map item
6. `research/subtraction-and-division.md`
7. `research/curta-source-map.md`
8. `research/simulator-matrix.md`
9. `src/machines/curta/` documentation
10. existing transition/event/replay patterns in direct multiplier, key-driven accumulator, and operator division
11. relevant tests and `docs/VERIFICATION.md`

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as the live task source.

# Objective

Build the repository's first explicit **control/interlock mechanism lesson**, and at the same time turn the Curta source map from a one-paragraph placeholder into a real provenance document.

The teaching question is:

> A lock does not represent a number. Why can it still be part of the computation?

This slice has three required parts and one optional early-finish part:

1. source-backed research on crank/setting interlocks and operator-control invariants;
2. a deterministic generic P/M setting–crank interlock state machine plus compact teaching integration;
3. a source-map hardening pass for Curta using patent/manual/operator-procedure evidence at the precision actually supported;
4. if the required work is complete substantially early, add a bounded cross-machine operator-protocol comparison rather than starting another machine implementation.

The generic interlock software is **P/M**. Historical Odhner/Curta statements are **H** or **H/R** with evidence strength separately stated. Do not label the generic software as an Odhner or Curta reconstruction.

---

# Part A — `research/control-and-interlocks.md`

Create a focused research note before or alongside implementation.

## A1. Odhner crank/setting mutual exclusion

Use Valentin Jakob Odhner, US 1,510,100 (1924):

<https://patents.google.com/patent/US1510100A/en>

The patent is useful because it explicitly discusses:

- a locking device that locks the crank in its zero position;
- a guiding arrangement that keeps the crank-locking device inactive during crank rotation except at zero;
- in the illustrated arrangement, a second lock relationship involving the calculating/cam discs, so setting-related elements and crank motion are not simply free at the same time.

Read the actual description/claims and state exactly what you use. The intended repository lesson is **mutual exclusion between setting and operating phases**, but the software must remain a P/M abstraction.

Important evidence rule:

- a patent is E1 evidence for what was claimed/designed in that patent;
- it is not by itself proof that every Odhner-family production machine used exactly that embodiment;
- do not generalize the depicted roll/notch/sector/cam geometry into a universal pinwheel-machine mechanism.

Record figure/claim references where practical. If the Google Patents transcription is ambiguous, narrow the prose rather than inferring missing geometry.

## A2. Curta operating-handle control

Use the Curta specialist manual archive/transcription already referenced by the repository:

<https://curta.org/wiki/CurtaManuals>

The operator material states, among other things, that the operating handle is turned clockwise, that the handle mechanism is locked against backward turns, and that a full turn completes when the handle returns to its home detent. Treat this as operator-procedure evidence hosted by a specialist archive; do not silently promote it to a production drawing.

Also re-use the division/operator material where relevant:

<https://curta.org/wiki/DivisionAlgorithm>

The point is to distinguish several kinds of control invariant:

```text
home / zero position
allowed direction
setting permitted vs operation active
correction/undo procedure
carriage position / counter state
```

Do not claim these are implemented by the same mechanism across Curta and Odhner families.

## A3. Control is computation

Explain, with claim types separated, why a mechanical interlock can carry algorithmic meaning even when it carries no numerical magnitude:

- it prevents a setting change during an operation;
- it prevents an operation before a setting is valid;
- it defines when one crank cycle is complete;
- it constrains legal direction/mode changes;
- it can force correction before the operator proceeds;
- it preserves invariants that arithmetic state assumes.

End the note with a **software abstraction decision** for Part B: what the generic model represents and what it refuses to claim.

---

# Part B — generic setting–crank interlock mechanism

Create a small module under `src/mechanisms/`, preferably `setting-crank-interlock/` unless current naming conventions suggest a clearer name.

This mechanism is not required to perform addition/multiplication itself. Its job is to make legal/illegal state transitions inspectable and replayable.

## Minimum state

Represent at least:

- a generic setting value or setting revision/version sufficient to demonstrate that settings can change only in the permitted phase;
- crank position/phase, at minimum `HOME` versus `ACTIVE` (more phases only if they add a tested explanatory value);
- crank lock state;
- setting/control lock state;
- completed crank-cycle count;
- human-operation count;
- enough cycle/sequence identity for deterministic replay;
- mechanism id and explicit invariant validation.

A clean initial invariant is acceptable, for example:

```text
crank at HOME
crank locked against operation until explicitly released/begun
setting control FREE
```

During an active operation the generic model should invert the relevant permissions:

```text
setting LOCKED
crank ACTIVE / permitted to complete cycle
```

When the cycle returns home, restore the home invariant.

Do not encode Odhner's literal roller/notch/cam geometry into the generic state.

## Actions/events

Choose names consistent with repository patterns. Observable semantics should cover actions equivalent to:

```text
CHANGE_SETTING
BEGIN_CRANK_CYCLE
COMPLETE_CRANK_CYCLE
```

and events equivalent to:

```text
SETTING_CHANGED
SETTING_LOCKED
CRANK_RELEASED / CYCLE_BEGUN
CRANK_CYCLE_COMPLETED
CRANK_RETURNED_HOME
CRANK_LOCKED
SETTING_RELEASED
```

It is fine for one action to emit several ordered events if that makes the invariant transition visible.

Do not add a decorative timer/animation state to core logic. No DOM or frame timing in the mechanism.

## Required invariant behavior

At minimum:

1. setting changes are allowed in the home/setting-free state;
2. beginning a crank cycle makes the setting unavailable before the active phase is exposed;
3. changing the setting while the crank is active is rejected explicitly;
4. beginning another crank cycle while already active is rejected;
5. completing a crank cycle while no cycle is active is rejected;
6. completion returns the crank to home and makes setting available again;
7. the transition result is deterministic;
8. reducer/replay validates derived lock/phase changes instead of trusting arbitrary serialized fields;
9. replay rejects tampering in sequence, lock transition, setting value/revision, cycle count, or final state.

Use safe-integer or otherwise explicit validation for any numeric setting/count fields.

## Direction policy

Do **not** bake a universal `clockwise-only` rule into the generic interlock merely because Curta documentation has one. If you want to represent direction at all, make it an explicit configurable policy with tests and label it P/M. It is also acceptable to leave direction out of the generic core and explain Curta's direction restriction only in research/UI provenance text.

Prefer the simpler model unless direction materially improves the lesson.

---

# Part C — teaching integration and Curta provenance hardening

## C1. Compact public control/interlock teaching path

Add a small public path, preferably `#/controls` if routing remains simple. Reuse existing shell/state/event components rather than redesigning the site.

Minimum visitor affordances:

- show the current setting value/revision;
- show crank position and both lock/permission states;
- allow a valid setting change at home;
- allow beginning a crank cycle;
- while active, make an attempted setting change visibly rejected/blocked with plain-language explanation;
- allow completing the crank cycle and show the return to home;
- show ordered events/state text, not animation-only meaning;
- reset;
- evidence note: **P/M generic interlock**, informed by historical lock/control evidence but not an Odhner/Curta geometry reconstruction.

The visitor should be able to answer:

> What arithmetic error or invalid state becomes possible if setting and operation are both free at the same time?

Do not needlessly create a full machine skin.

## C2. Replace placeholder `research/curta-source-map.md`

The current file is only one paragraph and still uses the old C/D grading vocabulary. Replace it with a real source map under `docs/EVIDENCE_POLICY.md`.

At minimum inspect and map:

### Curt Herzstark patent

US 2,525,352, published 1950:

<https://patents.google.com/patent/US2525352A/en>

Use it only for claims it actually supports. The patent describes a miniature four-operation calculating machine and discusses the result-counting and revolution-counting mechanisms arranged around a common driving member in the compact circular architecture. Record claim/figure/description anchors where useful.

Do **not** equate patent intent automatically with every production Curta Type I/II detail.

### Curta operator manuals

<https://curta.org/wiki/CurtaManuals>

Map operator-facing concepts such as:

- setting register;
- result/product dial/register;
- revolution/turns counter;
- carriage positions;
- operating-handle home detent / allowed direction;
- clearing controls;
- addition/subtraction and division operator procedures where supported by the hosted manual/transcription.

Identify the provenance limitation: Curta.org lists/transcribes multiple manual versions/languages and is a specialist archive, not itself the original manufacturer. Where exact edition/page/facsimile mapping is unavailable, say so.

### Existing simulator/reference landscape

Use `research/simulator-matrix.md` and existing Curta links to distinguish:

```text
historical source
specialist transcription/reference
whole-machine simulator
this repository's teaching abstraction
```

The source map should explicitly state what future Curta code/UI may claim safely and what still requires model/revision/page-level evidence.

## C3. Reconcile existing Curta docs

Inspect the small files under `src/machines/curta/` (`README.md`, `mechanism.md`, `state-model.md`, `operations.md`, `limitations.md`, `sources.md`). They currently contain placeholder-level prose and old C/D evidence language.

Update them enough to:

- point to the hardened source map;
- use M/H/R/P + E1–E4 terminology instead of extending the old C/D scale;
- distinguish operator-procedure facts from the repository's teaching model;
- avoid claiming source-specific internal geometry that is not yet mapped.

Do not implement a new full Curta emulator in this slice.

---

# Part D — optional early-finish work: operator-protocol comparison

Only if Parts A–C, tests, browser integration, documentation reconciliation, and verification are fully complete with substantial time remaining, create a bounded `docs/OPERATOR_PROTOCOLS.md`.

Compare only families already supported by repository research, for example:

```text
Pascaline: stylus/dial operation
Thomas/Odhner-style: setting → crank → carriage/revolution procedure
Comptometer: keypress → accumulate
Millionaire/direct multiplication: selector/table control → operation cycle
Curta: setting + carriage + controlled crank procedure
Differential Analyzer: coupled continuous shaft operation (only at the existing evidence precision)
```

Suggested columns:

```text
human action
what action selects
what action supplies energy/control
where place value lives
what must be locked/invariant during operation
what the operator must notice/correct
claim type + evidence source
```

Every row must be source-bounded. If a row would require guessing, leave it open rather than writing a smooth but unsupported comparison.

Do not start Analytical Engine source-map hardening in the same slice if this optional document is done.

---

# Required tests

Add focused Vitest coverage for the new generic interlock including at least:

1. initial home state has internally consistent lock/permission invariants;
2. setting change at home succeeds and produces inspectable event/state;
3. begin-cycle transitions lock setting before/while crank is active;
4. setting change while active is rejected;
5. begin while active is rejected;
6. complete while home/inactive is rejected;
7. valid completion increments cycle/human-operation state and restores home permissions;
8. same state + action is deterministic;
9. replay reproduces final state;
10. replay rejects several tampering cases (sequence, setting transition, lock/phase transition, cycle count, final state).

If UI helpers have pure state logic worth testing, add narrowly scoped tests; do not introduce a browser-testing framework solely for this task.

---

# Documentation reconciliation

After implementation/research/tests are real:

- update `STATUS.md` and remove the now-stale statement that remote CI for the previous PR head still needs to complete; remote CI run `33437862103` for `7bebcea...` succeeded;
- update `TODO.md` only for genuinely completed control/Curta source-map work;
- update `docs/VERIFICATION.md` with commands/results actually run and the resulting test count;
- update README / `docs/TEACHING_PATH.md` only if the control path actually exists;
- keep `ROADMAP.md` changes minimal and only correct statements that become false.

Do not broadly rewrite unrelated research.

---

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a bounded browser smoke check of `#/controls` if that route exists. Test at desktop width and, if practical, one narrow/mobile width; record only checks actually performed.

One coherent checkpoint is fine. A research commit followed by implementation/docs is also fine if both are pushed before stopping.

After push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision. Do not autonomously start Analytical Engine, Difference Engine, differential-analyzer source-map hardening, or source-specific Odhner/Curta geometry.

Suggested commit subject:

```text
feat: add control interlock mechanism lesson
```

---

# Evidence / stop conditions

Stop and leave a precise blocker rather than guessing if:

- the Odhner patent text does not support a claimed lock relationship at the precision you want to write;
- Curta manual/version provenance is too weak for a source-specific claim; narrow the claim instead of inventing edition details;
- implementing the generic interlock requires source-specific gear/linkage geometry;
- a concurrent implementation of the same control/interlock track lands on remote `main`;
- shared event/replay changes would require a broad incompatible migration.

The intended result is not “a lock animation.” It is a tested demonstration that **legal state transitions are part of mechanical computation**, plus a Curta evidence map strong enough that future work stops treating a one-paragraph placeholder as provenance.
