# Current Agent Task

Issued: 2026-09-01
Owner: local coding agent
Target duration: about one hour
Repository authority: remote `main`

## Read before coding

Read, in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`
6. `research/multiplication-mechanisms.md`
7. existing multiplication/carriage/revolution mechanism code and tests

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as proof that something is missing. Inspect the current tree and tests first.

## Objective

Implement the repository's first **direct-multiplication functional model** and connect it to the existing multiplication comparison path.

This is a pedagogical functional model informed by the Otto Steiger / Millionaire research already in the repository. It is **not** a geometric reconstruction of the Millionaire and must not invent source-specific cams, gears, tooth profiles, linkages, timing, or dimensions.

The conceptual contrast to preserve is:

- repeated-addition baseline: operator repeats additions;
- stepped drum / pinwheel paths: operator-level multiplication still largely decomposes into repeated cranks plus carriage shifts;
- direct-multiplication path: a multiplier digit selects a pre-encoded multiple in one operating cycle, so part of the multiplication table is represented by the machine/control model rather than repeated by the operator.

## Bounded implementation slice

### 1. Add a direct-multiplication mechanism module

Create an appropriately named module under `src/mechanisms/` (for example `direct-multiplier/`, but follow existing naming conventions).

Model only the functional state required to explain one decimal multiplier digit at a time. Suggested explicit state/events:

- multiplicand;
- selected multiplier digit `0..9`;
- carriage/decimal offset;
- selected multiple;
- accumulator before/after;
- operation-cycle count;
- human operation event(s);
- shift event(s) when moving to the next multiplier digit.

Use deterministic transitions. No DOM, timers, random state, or animation logic in the mechanism core.

Do not silently call a generic `a * b` and expose only the result. The trace must make visible that a multiplier digit selected a particular multiple and then accumulated it at the active decimal place.

### 2. Add tests

Add focused Vitest coverage for at least:

- selecting digit `0` produces no numerical contribution;
- selecting digit `1` selects one multiplicand;
- selecting a non-trivial digit such as `7` selects seven times the multiplicand;
- carriage offset changes the contribution's decimal place deterministically;
- a full `314 × 27` direct-multiplication trace reaches `8478`;
- the direct path uses two digit-selection/operation cycles for multiplier `27`, rather than modeling twenty-seven repeated addition cranks;
- replay/determinism if the existing mechanism/event infrastructure provides a natural hook.

Do not fake a historical crank count beyond the abstraction actually modeled. Prefer names such as `operationCycle` or `selectionCycle` if `crank` would imply unsupported mechanical detail.

### 3. Connect to multiplication comparison

Extend the existing multiplication comparison exhibit/model so the same default example `314 × 27` includes a fourth path:

1. repeated addition;
2. stepped drum;
3. pinwheel;
4. direct multiplication.

Expose, in text/state form:

- final result;
- operator repetitions / operation-cycle count;
- carriage shifts;
- where the multiplication-table work lives (operator repetition vs machine-selected multiple);
- evidence/simplification label consistent with `docs/EVIDENCE_POLICY.md`.

Do not attempt source-specific Millionaire artwork in this slice. A clear state/event comparison is preferred over new decorative gears.

### 4. Documentation touch only where necessary

Update `STATUS.md` and/or `TODO.md` only after the implementation and tests actually exist.

If the implementation reveals that `research/multiplication-mechanisms.md` needs one short clarification about the software abstraction, add it, but do not spend this slice doing another broad research pass.

## Acceptance

Before committing:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

All must pass.

The finished slice should let a visitor or test trace answer:

> Why is the direct-multiplication path algorithmically different from simply changing the actuator from stepped drum to pinwheel?

The answer must be observable from state/events, not only prose.

## Stop conditions

Stop and leave a clear note instead of guessing if:

- implementing the comparison requires inventing internal Millionaire geometry not supported by repository sources;
- current architecture makes the task substantially larger than one bounded slice;
- a conflicting implementation already landed on remote `main`;
- tests reveal an existing core semantic conflict that should be resolved before direct multiplication.

Do not start the Comptometer/key-driven task in the same slice unless the direct-multiplication work, tests, build, docs reconciliation, commit, and push are fully complete with substantial time remaining.

## Git discipline

- Pull/fetch remote `main` first.
- Work from current remote state.
- Make one coherent implementation checkpoint.
- Commit with a descriptive message such as `feat: add direct multiplication mechanism path`.
- Push the work to the remote repository according to the repository's normal workflow.
- Do not leave uncommitted generated files or unrelated cleanup.

After push, stop. The hourly reviewer will inspect the result and decide whether the next slice should be larger, smaller, corrective, or move to key-driven computation.
