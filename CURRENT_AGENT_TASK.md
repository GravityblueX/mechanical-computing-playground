# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-operator-division-reconciliation.md`.

The previous assignment landed its implementation at `eec04b45ed075f52548c0a4a0796000e5104e4d6` about 16 minutes after assignment and its completed research/docs reconciliation at `36550f2fd169151962e30cd9347e9ba9c2795afa` about 33 minutes after assignment. It finished at 251 tests across 19 files with typecheck/build/diff checks passing, retained the 61,845-case fitting arithmetic sweep plus 13,305 explicit undersized-register rejections, and kept Thomas/Curta procedure evidence narrower than the generic P/M division trace. No PR is currently open.

Several substantial slices have now finished in roughly 30–40 minutes, so this task intentionally combines one bounded primary-source investigation with one closely related tested control mechanism. Do not broaden beyond this pair.

> **Question for this slice: what changes when a key-driven calculator treats an incomplete keystroke as a control-state error that must be resolved before ordinary arithmetic can continue?**

The historical target is the Felt & Tarrant **Controlled-Key** Comptometer line. The software target remains a generic P/M integrity/interlock model; do not turn secondary descriptions into Model E/F linkage geometry.

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priorities 2, 4 and 5
6. `research/key-driven-computation.md`
7. `research/control-and-zeroing-source-map.md`
8. `src/mechanisms/key-driven-accumulator/index.ts`
9. tests for key-driven accumulator and setting/crank interlock
10. `src/exhibits/control-provenance/` and the `#/controls` UI in `src/main.ts`
11. `docs/VERIFICATION.md`

Before editing, run current-main typecheck/tests once and record the actual baseline. `STATUS.md` still has an older headline verification count even though `docs/VERIFICATION.md` records the newer 251-test operator-division checkpoint; treat the actual tree/tests as authoritative and reconcile that stale headline after the slice is green.

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Part A — Controlled-Key source pass

The repository currently knows that Turck/Felt material supports immediate key actuation and that Felt US960528A supports canceling/carry-strain recovery, but **partial/incomplete-stroke correction is still intentionally unsourced at primary-page precision**. Resolve as much of that boundary as a bounded pass allows.

## A1. Directly inspect J. A. V. Turck's 1921 public-domain account

Locate and directly inspect a lawful facsimile of:

**J. A. V. Turck, _Origin of Modern Calculating Machines_ (1921).**

A public-domain scan is available through Internet Archive/Wikimedia; one current entry point is:

<https://upload.wikimedia.org/wikipedia/commons/e/e1/Origin_of_modern_calculating_machines%3B_a_chronicle_of_the_evolution_of_the_principles_that_form_the_generic_make_up_of_the_modern_calculating_machine_%28IA_originofmodernca00turcrich%29.pdf>

Find the exact printed/viewer pages around the **Controlled-key Comptometer**, `full-stroke` safeguarding, incomplete/erroneous key action, blocking/locking of other orders/columns, and the correction/recovery procedure.

Record:

- exact title/edition/date visible in the scan;
- exact printed pages and viewer pages inspected;
- what Turck actually says the controlled-key function does;
- whether he describes operator recovery steps or only mechanism purpose;
- model/revision wording actually present;
- whether any patent number or inventor attribution is explicitly given there.

Turck is a contemporary insider/technical historical source, but source type and potential retrospective/company framing must still be stated. Do not silently treat every sentence as production geometry proof.

## A2. Smithsonian Controlled-Key manual/object boundary

Inspect the Smithsonian record:

<https://americanhistory.si.edu/collections/object/nmah_905178>

for **_Applied Mechanical Arithmetic As Practiced on the Controlled Key Comptometer_**, 1920 revision of the 1914 company publication.

Use IIIF/manifest/attachments only if they actually expose readable pages. If a scan is directly accessible, inspect only a bounded set of pages relevant to:

- imperfect/incomplete keystrokes;
- controlled-key error indication;
- correction/release procedure;
- start-from-clear or related operator safeguards if immediately adjacent and model-relevant.

If only the catalog description is accessible, keep it at catalog-identity/description precision. Do not convert “the book contains instructions” into invented page-level procedure.

## A3. Identified surviving controlled-key object

Directly inspect the Science Museum Group record for the identified Model F controlled-key section:

<https://collection.sciencemuseumgroup.org.uk/objects/co60749/section-of-model-f-controlled-key-comptometer-by-felt-and-tarrant-manufacturing-co-model-calculating-machine>

Record object number, date/maker/model identity and exactly what the catalog establishes. If IIIF images are available, photographs may establish visible parts only; they are not self-interpreting internal-function proof.

## A4. Secondary orientation is allowed, but stays secondary

John Wolff's Comptometer history/technical pages are useful orientation for Model E/F controlled-key behavior:

<https://www.johnwolff.au/calculators/Comptometer/FT.htm>

Use them as specialist secondary evidence (**E3**) unless a statement is independently anchored to a directly inspected primary/manual/patent/object source. In particular, do not upgrade trigger geometry, interference guards, release-button sequence, upstroke ratchet behavior, or model chronology solely from this page.

If a primary patent for the controlled-key/full-stroke device can be identified **from a directly inspected source or reliable bibliographic trail**, inspect it and record patent/figure/claim precision. Do not guess a patent number from model dates.

### Research deliverable

Update `research/key-driven-computation.md` and/or `research/control-and-zeroing-source-map.md` with a compact, model-separated section:

```text
Turck 1921 directly inspected pages
Smithsonian manual/object boundary
Science Museum Model F object identity
specialist secondary orientation
what remains unestablished
```

The key boundary to preserve is:

> Historical sources may establish that incomplete strokes were detected/blocked/corrected in particular controlled-key contexts without establishing the repository's event names, exact trigger geometry, timing, or one universal Comptometer mechanism.

# Part B — generic key-stroke integrity/interlock model

After Part A establishes at least the historical **problem/control responsibility** at defensible precision, add a small generic P/M mechanism that makes incomplete-stroke recovery observable.

Prefer **wrapping/reusing** `key-driven-accumulator` for the arithmetic commit rather than creating a second accumulator implementation. Inspect existing architecture first.

An appropriate module name might be `src/mechanisms/key-stroke-integrity/`, but follow repository conventions and avoid parallel arithmetic logic.

## B1. Minimum state

Model only the functional control state needed for this lesson:

- underlying key-driven accumulator state;
- active/errant column and digit when a stroke is in progress;
- a phase such as `IDLE`, `STROKE_IN_PROGRESS`, `ERROR_LOCKED`, `ERRANT_STROKE_COMPLETED`, or a cleaner equivalent;
- whether ordinary other-column input is currently permitted;
- integrity/correction cycle count and human-operation count where meaningful.

Do **not** model millimeters of travel, spring force, trigger shape, ratchets, interference guards, or source-specific linkage timing.

## B2. Required actions and causal behavior

Use deterministic actions/events equivalent in explanatory power to:

```text
BEGIN_KEY_STROKE column=... digit=...
COMPLETE_KEY_STROKE
```

for an ordinary full stroke, plus an interrupted path such as:

```text
BEGIN_KEY_STROKE
RELEASE_INCOMPLETE
INCOMPLETE_STROKE_DETECTED
INPUT_LOCKED
COMPLETE_ERRANT_STROKE
ARITHMETIC_COMMIT (reuse key-driven accumulator)
RELEASE_ERROR_LOCK
RETURN_TO_IDLE
```

The exact event names are P/M vocabulary. The model must not claim that a historical machine emitted these named phases.

Important semantic requirement:

- the incomplete path must not silently mutate the accumulator before the arithmetic commit point;
- completing the errant stroke must commit the selected key value **exactly once** through the existing key-driven arithmetic semantics;
- while error-locked, an unrelated key/column action must fail explicitly;
- release/reset must not erase or duplicate the corrected arithmetic result.

If directly inspected source evidence supports a different operator-level correction responsibility, adapt the pedagogical action names conservatively while keeping source-specific geometry out.

## B3. Required tests

Add focused Vitest coverage for at least:

1. a normal full units-column `7` stroke reaches accumulator `7` and returns to idle without a separate crank;
2. releasing a started stroke incomplete leaves the accumulator unchanged and enters an explicit locked/error state;
3. another-column stroke is rejected while locked;
4. completing the errant stroke commits its value exactly once;
5. releasing/resetting the integrity lock after correction preserves the corrected accumulator and permits the next ordinary stroke;
6. a carry case still delegates correctly to the existing accumulator semantics (for example initial `99`, errant/recovered units `7` -> `106`);
7. identical initial state + action sequence yields identical events/final state;
8. replay rejects a missing detection/lock event, duplicated arithmetic commit, forged errant key identity, illegal release order, and forged final state;
9. invalid digit/column/cycle/state is rejected explicitly;
10. existing key-driven accumulator and setting-crank interlock tests remain green.

Do not simulate simultaneous multi-column Duplex timing in this slice.

# Part C — small public control lesson

Integrate the new generic P/M flow into the existing `#/controls` area rather than opening a large new route unless the current UI architecture makes a tiny route genuinely simpler.

The visitor should be able to inspect one deterministic scenario such as:

```text
begin units-key 7
→ release early
→ keyboard/input locked
→ complete the errant 7 stroke
→ arithmetic commits once
→ release integrity lock
→ ordinary input allowed again
```

Show:

- accumulator before/after;
- active/errant key identity;
- current permission/lock state;
- ordered events;
- a concise source/evidence card separating the generic P/M trace from any directly inspected Turck/manual/object facts.

No decorative controlled-key trigger artwork.

Bilingual text is required if the surrounding route is bilingual. No meaning should depend only on color.

# Part D — reconciliation and verification

After Parts A–C are real:

- reconcile the stale verification headline/top section in `STATUS.md` to the actual current baseline/final state;
- update the remaining-gap wording for key-driven correction/control only to the strongest evidence actually obtained;
- add one concise completed line to `TODO.md` rather than another roadmap;
- update `docs/RESEARCH_GAPS.md` Priorities 2/4 only if the evidence gap genuinely changed;
- update `docs/VERIFICATION.md` with the actual baseline/final test counts and browser checks;
- update typed control-provenance adapters only if a directly inspected historical source adds a precise source/model/control responsibility. Do not force every research note into UI metadata.

If the public control UI changes, perform bilingual browser smoke at least for:

```text
#/controls
#/arithmetic-labor
#/about
```

Quick-regress the key-driven arithmetic presentation wherever it currently appears. Check desktop and one narrow viewport for horizontal overflow and runtime JS errors.

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

- current operator-division quotient-nine/exact-zero regressions remain green;
- merged revolution-counter replay hardening remains green;
- no source-atlas/DE2/Differential Analyzer work is lost;
- the generic integrity controller cannot commit an incomplete stroke twice or accept unrelated input while locked;
- any historical controlled-key procedure claim has exact inspected source/page/object precision;
- secondary-only trigger/linkage claims remain secondary or omitted.

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect CI/Pages only if completed during the slice and record only completed outcomes;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: model key-stroke integrity and controlled-key boundary
```

# Evidence boundaries

- New key-stroke integrity mechanism/event sequence: **M/P generic teaching/control model**.
- Turck 1921: historical/technical source only at directly inspected page precision; note author/company context.
- Smithsonian `nmah_905178`: catalog identity/description unless actual pages are directly inspected.
- Science Museum Model F section `1921-16`: identified object/model evidence; visible photos are not automatic internal-function proof.
- John Wolff specialist pages: **E3 orientation**, not primary geometry proof.
- Existing Turck US1154897A establishes immediate key actuation for its patented design, not controlled-key correction geometry.
- Existing Felt US960528A establishes cancel/carry-strain recovery for its specified Duplex context, not generic incomplete-stroke correction.
- Do not generalize Model E/F/J, electric Model K, or later 3D-series controlled-key behavior across revisions.

# Stop conditions

Stop and leave a clear note rather than guessing if:

- no directly inspectable source can establish even the controlled-key problem/control responsibility beyond current secondary summaries;
- implementation would require inventing trigger geometry, stroke thresholds, spring forces, or source-specific timing;
- wrapping the existing key-driven accumulator would require weakening its fail-closed replay guarantees;
- the generic incomplete-stroke model cannot preserve a single clear arithmetic commit point;
- source access turns into a broad patent hunt that threatens to consume the whole slice.

If the direct source pass and integrity model finish substantially before the one-hour target, use remaining time for replay/property tests, provenance precision, and control-route accessibility. **Do not start simultaneous Duplex multi-column timing, Model H start-from-clear mechanics, operator productivity measurement, or a new machine family in this slice.**
