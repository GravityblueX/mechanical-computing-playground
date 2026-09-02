# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-pascaline-complement-subtraction.md`.

Administrator review accepted completion commit `ac65e47f1df84688c893099ac680b1956b2ef5b6` (`feat: add complement-register subtraction lesson`). Exact-head CI run `33585386764` and Deploy Pages run `33585386792` both passed. Assignment-to-completion was about 45 minutes with a 10-file / 362-line diff and the test suite rose from 362 to 375 tests, so this slice is slightly broader while remaining one coherent correction/teaching question.

**Fetch/pull current remote `main` before doing anything.** The administrator archive commit is `631584d0cbbed026f0bb0b8cc5151d8369481d5b`.

> **Question for this slice:** can the new complement-register lesson represent one bounded forward-add action and its carry consequences without generating one event per unit of the subtrahend—or accidentally suggesting that `+345` means 345 historically meaningful Pascaline operation cycles?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0 carry and Priority 3 subtraction
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-pascaline-complement-subtraction.md`
8. `research/pascaline-subtraction-source-map.md`
9. `research/carry-architecture-source-map.md`
10. `research/subtraction-and-division.md`
11. `src/mechanisms/complement-register/index.ts`
12. `tests/complement-register.test.ts`
13. the visible-carry rendering path in `src/main.ts`
14. the hardened decimal-register/carry trace implementation only for patterns worth reusing

Run the current-main baseline before editing and record the actual test count. Do not weaken any existing fail-closed replay contract.

# Part A — replace unit-event explosion with bounded action-level semantics

The accepted complement-register model is mathematically correct for its fixtures, but `transitionComplementRegister()` currently loops once per unit of `subtrahend` and emits one `REGISTER_INCREMENTED` event each time. With width up to 15 digits, a valid action can therefore request an enormous event list. The public panel also currently reports `+345` as `345 generic increments`, which is a P/M implementation artifact and can be mistaken for a physical/operator cycle count.

Refactor the complement lesson so trace size is bounded by decimal width / event vocabulary, **not by the magnitude of the subtrahend**.

## Required semantic result

Represent one generic forward-add action at action level:

```text
encoded physical/addition value before
+ subtrahend delta
→ encoded physical/addition value after
→ complementary/subtraction readout after
```

Expose carry consequences compactly, for example as one typed summary per decimal boundary/order with a crossing count, or another deterministic O(width) representation.

A good compact model could expose concepts equivalent to:

```text
FORWARD_ADD_BEGIN
CARRY_SUMMARY order=0 count=...
CARRY_SUMMARY order=1 count=...
...
REGISTER_ADVANCED before=... delta=... after=...
FORWARD_ADD_END
```

The exact event names are your implementation choice. The important properties are:

- no loop whose iteration count is proportional to `subtrahend`;
- no event list whose length is proportional to `subtrahend`;
- carry information remains inspectable by decimal order;
- final arithmetic remains exact for the supported safe-integer width;
- the trace stays deterministic, serialized, action-derived and fail-closed;
- replay must validate the compact carry summary against the action/state rather than trusting serialized counts.

Do not call the compact event count a historical crank/stroke count. It is P/M inspection structure.

## Carry-summary arithmetic

You may derive boundary-crossing counts mathematically instead of simulating every unit. For a no-wrap forward delta, a useful invariant for the boundary at `10^(order+1)` is the change in the corresponding quotient between before and after. Use a formulation that remains exact under the repository's safe-integer constraints and test it thoroughly.

The existing `0 <= B <= A` rule means `C(A)+B <= 10^width-1`, so this bounded lesson need not invent register wrap/sign handling.

## Trace version / compatibility

If the serialized event shape changes incompatibly, bump the complement trace version rather than pretending old and new envelopes are identical. This repository has no requirement to preserve persisted user traces for this new lesson, so prefer an explicit version boundary over ambiguous compatibility glue.

Reject unsupported old/new envelope shapes fail-closed. Do not silently coerce them.

# Part B — required tests, including a large valid input

Update/add focused Vitest coverage for at least:

1. existing arithmetic examples still hold:
   - `5678 - 1234 = 4444`;
   - `1200 - 345 = 855`;
   - `B = 0`;
   - `B = A`;
2. carry summaries are correct for a fixture with multiple decimal boundaries;
3. trace/event count is bounded independently of `B`—assert a structural bound, **not wall-clock timing**;
4. one large valid width-15 case (for example values near `10^15-1`) produces the correct final subtraction readout while keeping the event list bounded to a small function of width;
5. there is no exported/public helper on the transition path that still performs a loop proportional to `subtrahend` merely to reconstruct the trace;
6. same state + action yields identical compact events/result;
7. replay reproduces final state and fails closed on tampered action, carry summary, event order, final state, envelope/version, extra serialized fields and unknown discriminators;
8. invalid width/value and `B > A` remain explicit errors.

Do not add flaky performance timers to CI.

# Part C — public panel must stop implying 345 physical cycles

Update the `#/visible-carry` complement panel so it no longer says or visually implies that `1200 - 345` requires `345 generic increments` as a meaningful operation count.

Instead expose compact P/M state such as:

```text
physical/addition register before = C(1200)
forward delta = +345
physical/addition register after = ...
complement/subtraction readout = 855
carry boundary summaries by order
```

If the compact trace naturally supports stepping, add a very small step/replay control using the new events; otherwise a text/state summary is sufficient. Do not create a new route or redesign the whole visible-carry page.

The visitor must be able to answer:

> What part is historical evidence, what part is mathematical complement representation, and what part is the repository's compact P/M inspection trace?

Keep the existing explicit statement that this is not “Pascal's subtraction algorithm.”

# Part D — one bounded Belair figure/text re-check, only if it resolves a real open claim

Spend a small bounded research pass on the exact Belair 1659 material already used—especially the reproduced figure/text around 1923 DjVu p.373 and immediately adjacent pages—to answer only this question:

> Does the directly readable reproduced figure/text itself establish the complete digit-pair mapping for the dual display, or only opposite ordering plus the one `1/8 → 0/9` transition already recorded?

Rules:

- if the scan/figure visibly establishes all pairs at usable precision, record exactly what can be read and where;
- if it does not, keep the current uncertainty explicitly—**do not derive a full historical table from the mathematical nines-complement function**;
- do not start a Pascaline object census, sautoir geometry reconstruction, mixed-radix currency study, or new machine family;
- update `research/pascaline-subtraction-source-map.md` only if this re-check materially sharpens the claim boundary.

This research subpart is intentionally small; the main deliverable is the trace semantic correction.

# Part E — reconciliation and verification

After code/UI/research work:

- update `STATUS.md` only for the bounded compact-trace correction actually landed;
- add one concise completed line to `TODO.md`;
- update `docs/RESEARCH_GAPS.md` only if the Belair digit-pair uncertainty genuinely changes;
- update `docs/VERIFICATION.md` with baseline/final test counts and commands actually run;
- do not modify Thomas, Controlled-Key, Millionaire, Curta, Analytical Engine, Differential Analyzer, Scheutz, printing-ledger, continuous, or backprop tracks in this slice.

If the visible-carry panel changes, attempt bilingual browser smoke for:

```text
#/visible-carry
#/about
```

If browser tooling is unavailable, state that explicitly; build/tests are not browser smoke.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Run the complement-register focused tests separately as well. All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head CI and Deploy Pages outcomes that complete before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
fix: bound complement-register trace semantics
```

# Evidence boundaries

- Pascal *Avis* operational statements = **H/E1 via edited reproduction** at the exact pages already recorded;
- Belair 1659 one-direction/dual-display/carry statements = **H/E1 contemporary description** at the exact readable precision;
- full fixed-width nines complement and carry-summary arithmetic = **M**;
- compact complement-register transition/events/UI = **P/M**;
- event counts, carry-summary counts and event ordering are repository inspection semantics, not historical cycle/timing claims;
- do not infer reverse carry, sautoir/linkage geometry, force, wear, safe speed, universal revision applicability or a historical operator procedure from the P/M trace.

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- bounded carry summaries cannot be derived without losing arithmetic/replay correctness;
- a compact trace would require weakening the hardened decimal-register/carry core;
- Belair's reproduced figure remains unreadable or ambiguous at digit-pair precision;
- the work starts expanding into full Pascaline geometry, mixed-radix historical machines, or source-specific timing.

If Parts A–D finish substantially before one hour, spend remaining time on adversarial replay/property-style tests, accessibility/text-state visibility, and exact source-location wording. **Do not start another machine family.**

## Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect current code/tests before changing abstractions;
- keep this one coherent correction/research checkpoint;
- run all acceptance commands;
- inspect diff for unrelated edits;
- update status/verification only after tests pass;
- commit and push to remote `main` according to the repository's established workflow;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.
