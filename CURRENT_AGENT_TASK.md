# Current Agent Task

Issued: 2026-09-01
Owner: local coding agent
Target duration: about one hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-direct-multiplication.md`.

## Read before coding

Fetch/pull remote `main`, then read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`
6. `research/key-driven-computation.md`
7. `research/multiplication-mechanisms.md`
8. `src/mechanisms/direct-multiplier/index.ts`
9. existing decimal-wheel / carry / core event infrastructure and relevant tests

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as the live task source.

## Objective

Complete two dependency-safe pieces in one bounded slice:

1. make the direct-multiplication model actually expose an inspectable **encoded-multiple table/control state**, rather than calculating the selected multiple through a hidden repeated-addition loop at selection time;
2. implement the repository's first **generic key-driven accumulator** so `keypress → accumulate` becomes a first-class operation protocol distinct from `set → crank`.

The key-driven model is informed by the Comptometer research, but it is a **P/M pedagogical mechanism model**, not a source-specific reconstruction of a particular Felt & Tarrant model.

## Part A — direct-multiplier semantic cleanup

The accepted direct-multiplier slice is arithmetically correct, but `selectEncodedMultiple()` currently derives a selected multiple with an internal loop of repeated additions. That weakens the exhibit's central distinction because the multiplication-table work is still being performed at selection time, merely out of sight.

Refactor conservatively so the machine/control representation is explicit and inspectable.

Required behavior:

- create or expose an immutable encoded-multiple table for digits `0..9` associated with the multiplicand;
- the table must be visible in state or in a clearly typed machine/control object that is included in traces/inspection paths;
- multiplier-digit selection must select the corresponding table entry rather than execute a repeated-addition loop;
- an event or inspected state must make the lookup relationship visible: digit → encoded multiple;
- preserve deterministic replay and existing public behavior;
- do not invent historical Millionaire geometry or timing.

It is fine for software initialization to calculate the ten mathematical values. The important modeling requirement is that **selection is a lookup from represented machine/control state**, not an invisible repeated-addition operation performed during the selection transition.

Add/update tests proving that selection reads the encoded table and that the `314 × 27` trace still reaches `8478` in two operation cycles.

Keep this cleanup small; do not redesign the whole multiplication module.

## Part B — generic key-driven accumulator mechanism

Create a small module under `src/mechanisms/` using repository naming conventions, for example `key-driven-accumulator/`.

### Scope

Model functional behavior needed to explain:

```text
press key
→ the keypress itself is the compute/energy-control action
→ place-value contribution enters accumulator
→ carry becomes observable
→ key returns / cycle completes
```

Do **not** build a full Comptometer emulator, keyboard artwork, historical correction mechanism, duplex timing model, or source-specific key geometry in this slice.

### Minimum state

Use the current core conventions where practical. State should make at least these concepts inspectable:

- register width / accumulator digits or equivalent deterministic decimal register state;
- active key column / decimal place;
- pressed digit `1..9` (allow `0` only if the model has a clear reason; a no-op helper is acceptable but do not invent a historical zero key);
- accumulator before/after;
- key-stroke count / human-operation count;
- cycle phase or explicit ordered events;
- carry events or a clear bridge to the existing carry-chain semantics.

Do not silently reduce every stroke to `accumulator += digit * 10**column` and expose only the final integer. The trace must show the place-value contribution and any carry propagation that changes higher columns.

### Required actions/events

Choose names consistent with repository vocabulary, but the observable sequence should be equivalent to:

```text
KEY_STROKE_BEGIN column=... digit=...
PLACE_VALUE_CONTRIBUTION ...
DIGIT_ADVANCE / CARRY_PENDING / CARRY_PROPAGATED ... as needed
KEY_STROKE_END
```

The exact event vocabulary is pedagogical and must be labeled P/M rather than claimed as historical Comptometer terminology.

### Required cases/tests

Add focused Vitest coverage for at least:

1. units-column `7` on zero accumulator produces `7` in one key-stroke cycle and requires no separate crank event;
2. pressing units `7` then units `4` produces `11` and exposes the carry into tens;
3. pressing tens-column `3` contributes `30` deterministically;
4. a place-value example such as tens `3` + units `4` produces `34` with two key-stroke cycles;
5. a multi-digit carry case such as accumulator `99` + units-key `7` reaches `106` with the carry path observable;
6. identical state + action yields identical event sequence / result;
7. replay reproduces final state if the existing infrastructure supports a natural reducer/replay path;
8. invalid column/digit/state is rejected explicitly rather than coerced.

Do not model simultaneous multi-column/duplex operation yet. The research note explicitly says that timing and model/revision differences require stronger historical sourcing.

## Part C — minimal comparison / teaching integration

Add a compact comparison to the existing public shell or an appropriate exhibit path so a visitor can inspect the protocol difference between at least:

```text
lever/crank style: SET_VALUE → CRANK
key-driven style:  KEY_STROKE → ACCUMULATE
```

Reuse existing UI components where possible. No large redesign.

The comparison must state explicitly:

- key-driven is a generic pedagogical model informed by Comptometer history;
- it is not a reconstruction of a particular Comptometer model;
- the important difference is that the human keypress is itself the arithmetic operation cycle rather than merely setting a value for a later crank.

If adding a new route is much larger than this slice, integrate the comparison into the existing about/mechanism teaching area instead of creating routing churn.

## Documentation

After code/tests exist:

- update `STATUS.md` to mark the key-driven functional model present;
- update `TODO.md` accordingly;
- update `docs/VERIFICATION.md` with the new test count and commands actually run;
- add at most a short software-model clarification to `research/key-driven-computation.md` if needed;
- do not broaden this into the future subtraction/correction/interlock research pass.

## Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

All must pass.

The finished slice must make these two questions answerable from state/events rather than prose alone:

> In the direct-multiplier model, where does the selected multiplication-table entry live before an operation cycle?

> In the key-driven model, why is pressing `7` an arithmetic operation rather than merely setting an input for a later crank?

## Evidence boundaries

- Direct-multiplier encoded table: claim type **P/M**, informed by Steiger/Millionaire historical research; no source-specific geometry.
- Generic key-driven accumulator: claim type **P/M**.
- Historical statements about actual Comptometers: only repeat what `research/key-driven-computation.md` supports and keep model/revision uncertainty visible.
- Do not claim simultaneous multi-column behavior for the generic model merely because Model A documentation exists.
- Do not invent partial-stroke correction, interlocks, subtraction controls, or key-travel geometry.

## Stop conditions

Stop and record a blocker rather than guessing if:

- integrating carries requires changing shared carry semantics in a way that could break existing exhibits;
- the current core cannot represent key-stroke/carry events without a broader event-vocabulary migration;
- a conflicting key-driven implementation already landed on remote `main`;
- source-specific Comptometer mechanism detail becomes necessary to proceed.

If Part A + Part B + minimal integration are complete substantially before the target duration, spend remaining time improving focused tests/replay/accessibility/text-state visibility. **Do not start subtraction/division or interlock research in this slice.**

## Git discipline

- remote `main` is authoritative;
- pull/fetch before work;
- inspect existing code before creating parallel abstractions;
- one coherent implementation checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after tests pass;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: add key-driven accumulator mechanism
```
