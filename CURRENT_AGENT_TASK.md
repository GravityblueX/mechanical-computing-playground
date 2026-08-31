# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: roughly 45–75 minutes
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-key-driven-accumulator.md`.

Two recent local-agent implementation slices each completed in about eleven minutes, so this slice is intentionally several times larger. Do not interpret the larger scope as permission to skip evidence work or verification.

## Read before work

Fetch/pull remote `main`, then read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 3 and Priority 4
6. `research/key-driven-computation.md`
7. `research/multiplication-mechanisms.md`
8. existing `src/mechanisms/carriage-shift/`, `revolution-counter/`, decimal/carry core, event/replay helpers, and tests
9. `docs/VERIFICATION.md`

Also note that PR #2 has already been merged into `main`; inspect the current direct-multiplier implementation rather than recreating its replay hardening/workbench.

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as the live task source.

# Objective

Build the repository's first source-grounded **subtraction/division operator-procedure track**.

The central teaching question is:

> When a mechanical calculator has no single `divide(a, b)` instruction, which parts of division are represented by machine state and which parts remain an operator decision loop?

This slice has four parts:

1. write a source-backed cross-machine research note on subtraction/division/control;
2. implement a deterministic generic **operator-driven division** mechanism with explicit repeated subtraction, carriage place, quotient/revolution counting, overshoot, correction, and replay;
3. add a compact interactive/text-state teaching path for `8478 ÷ 314 = 27` without pretending to reproduce a particular machine;
4. create the long-planned simulator/prior-art matrix if the first three parts remain healthy.

The software mechanism is claim type **P/M**. Historical claims about actual machines must remain separately sourced and must not leak into generic mechanism geometry.

---

# Part A — `research/subtraction-and-division.md`

Create the note before or alongside implementation. It must distinguish at least these historical/operator strategies:

## A1. stepped-drum / arithmometer family

Use Smithsonian material to establish only what the records actually support:

- Thomas-style machines have a setting/input mechanism, operating crank, movable carriage, revolution register/result register, and an addition/multiplication versus subtraction/division control;
- some documented arithmometers have revolution-counter direction associated with subtraction/division;
- a documented Burkhardt example has a bell that sounds when subtraction passes through zero and is described as especially intended for division.

Strong starting sources:

- Smithsonian stepped-drum group: <https://americanhistory.si.edu/it/collections/object-groups/calculating-machines/stepped-drum-calculating-machines>
- Thomas Arithmometer object: <https://americanhistory.si.edu/collections/object/nmah_690684>
- Burkhardt Arithmometer object: <https://www.americanhistory.si.edu/collections/object/nmah_690681>
- 1868 Thomas operating-instructions pamphlet record: <https://www.americanhistory.si.edu/collections/object/nmah_904757>

Do not infer internal gear geometry from the catalog prose.

## A2. Curta operator procedure

Use the original-manual material/transcription available through the specialist Curta archive as an operator-procedure source, while identifying the hosting/provenance precisely:

- <https://curta.org/wiki/CurtaManuals>
- <https://curta.org/wiki/DivisionAlgorithm>

Relevant documented procedure includes carriage position, divisor in the setting register, result/turns registers, overshooting and undoing a turn, and subtractive division via the reversing control. Do not turn these operating instructions into claims that every stepped-drum/pinwheel machine behaves identically.

## A3. complement subtraction

The repository already mentions Pascaline/complement subtraction. Re-check the actual source currently cited in the repository before strengthening that section. If the available source does not support the exact mechanism/procedure claim, state the uncertainty instead of filling the gap from memory.

## A4. control is computation

Explain why these are not mere UI details:

- mode/reversing control;
- carriage position;
- revolution/quotient register;
- zeroing;
- overshoot indication;
- correction/add-back;
- locks/interlocks that restrict invalid transitions.

For every historical paragraph, use `docs/EVIDENCE_POLICY.md`: claim type first, historical evidence strength separately. A patent/manual/object description is not permission to generalize to all calculator families.

The note should end with an explicit **software abstraction decision** describing what the new generic model will represent and what it will refuse to claim.

---

# Part B — deterministic generic operator-driven division mechanism

Create a module under `src/mechanisms/`, preferably `operator-division/` unless existing conventions suggest a better name.

Do not implement a hidden `Math.floor(dividend / divisor)` and then manufacture an animation. The arithmetic result must emerge from the same explicit operations the visitor can inspect.

## Minimum state

Represent at least:

- divisor;
- signed residual/result register value;
- carriage/decimal offset;
- per-place quotient/revolution counts, or an equivalently inspectable quotient-register state;
- operation/revolution count;
- human-operation count;
- phase such as ready vs overshoot/correction-required;
- current contribution `divisor × 10^offset` when relevant;
- enough identity/cycle information for deterministic event replay.

Reuse/adapt existing carriage/revolution concepts where useful, but do not force a bad abstraction merely to import a helper. If the generic revolution counter is insufficient for per-place quotient digits, compose or extend conservatively rather than silently duplicating contradictory semantics.

## Required operator actions

Use clear P/M event/action vocabulary equivalent to:

```text
SUBTRACT_ONCE
OVERSHOOT_DETECTED
CORRECT_ADD_BACK
SHIFT_CARRIAGE_DOWN
DIVISION_COMPLETE / TRACE_COMPLETE
```

A subtraction cycle at offset `k` subtracts `divisor × 10^k` from the residual and changes the quotient/revolution state at that decimal place.

### Overshoot/correction semantics

Model overshoot explicitly rather than silently predicting the quotient digit in advance.

A useful generic procedure is:

1. operator subtracts once;
2. if residual crosses below zero, state enters `CORRECTION_REQUIRED`;
3. no further subtraction or carriage shift is allowed until correction;
4. correction adds the last place-value contribution back and reverses the just-counted quotient/revolution step;
5. operator may then shift to the next lower decimal position.

This is a **pedagogical operator-procedure model**, not a claim that every real calculator used signed arithmetic internally or the same physical correction path.

Use safe-integer checks and explicit invalid-state errors. Division by zero must be rejected.

## Default worked trace

The canonical exhibit/test is:

```text
8478 ÷ 314 = 27 remainder 0
```

Start with carriage offset 1, and make the state/event path visible:

```text
8478
- 3140 => 5338   quotient tens 1
- 3140 => 2198   quotient tens 2
- 3140 => -942   overshoot
+ 3140 => 2198   correction, quotient tens back to 2
shift offset 1 -> 0
- 314 repeated seven times
=> residual 0, quotient 27
```

The point is not that this exact event vocabulary is historical. The point is that the quotient emerges from repeated machine operations + carriage position + operator decisions.

Also support a non-exact example such as:

```text
1000 ÷ 64 = 15 remainder 40
```

without calling a built-in division operator to choose quotient digits.

## Replay integrity

Given the repository's newly hardened direct-multiplier replay, do not regress to trusting arbitrary serialized derived fields.

At minimum validate during replay:

- contiguous event sequence;
- contribution matches divisor and carriage offset;
- residual before/after arithmetic;
- quotient/revolution counter before/after;
- correction exactly reverses the immediately pending overshoot step;
- carriage shift only occurs in a valid phase and follows the recorded offset;
- recorded final state matches replayed state.

Do not over-generalize this into a repository-wide event framework migration in this slice.

---

# Part C — tests and teaching integration

## Required tests

Add focused Vitest coverage for at least:

1. one subtraction cycle at a known carriage offset changes residual and quotient/revolution state correctly;
2. `8478 ÷ 314` reaches quotient `27`, remainder `0` through visible repeated subtraction and one overshoot/correction at the tens place;
3. the trace does not contain a single hidden `DIVIDE_RESULT` shortcut event that jumps directly to `27`;
4. `1000 ÷ 64` reaches quotient `15`, remainder `40` with explicit operator cycles;
5. overshoot enters a correction-required state;
6. subtract/shift while correction is required is rejected;
7. correction restores the prior non-overshot residual and reverses the just-counted quotient step;
8. division by zero and invalid offsets/state are rejected;
9. deterministic same state + action yields identical events/state;
10. replay reproduces the final state and rejects at least several tampering cases (sequence, residual arithmetic, quotient count, correction payload, or final state).

## Public teaching path

Add a compact browser path, preferably a dedicated hash route such as `#/division` if routing remains small. If a new route causes disproportionate churn, integrate a clearly separated section into an existing arithmetic/mechanism view.

Minimum visitor affordances:

- default `8478 ÷ 314` scenario;
- one-event step or one-operator-action step;
- reset;
- visible residual/result register;
- visible divisor and carriage place;
- visible quotient/revolution count by place;
- visible `CORRECTION_REQUIRED` state after overshoot;
- plain-language event log;
- evidence/model note saying **P/M generic operator procedure**, not Thomas/Curta geometry;
- text remains understandable without animation/color.

The visitor should be able to answer:

> Why is `27` not stored as a magically computed quotient, and what did the operator have to notice/do to obtain its tens and units digits?

Update README/teaching navigation only if the new path actually exists.

---

# Part D — `research/simulator-matrix.md`

The previous two local slices finished far below the one-hour target, so complete the long-planned simulator/prior-art matrix in the same checkpoint after Parts A–C are working.

Inspect the strong prior-art links already collected in `docs/PRIOR_ART.md` and record a compact matrix for at least:

- a Difference Engine simulator/reconstruction resource;
- John Walker/Fourmilab Analytical Engine emulator lineage;
- one Curta simulator/reference implementation;
- at least one stepped-drum/pinwheel calculator resource;
- this repository's own corresponding explanatory increment.

Columns/fields should include where knowable:

```text
resource
machine/family
source/emulator/reconstruction
input model
can single-step?
internal state visible?
event/operation trace visible?
license / reuse status
last-maintained signal (if responsibly verifiable)
what this repository should reuse/link instead of rewrite
what explanatory gap remains
checked date
```

Do not guess licenses or maintenance dates. If outbound web access is unavailable, record that as a bounded blocker and complete Parts A–C; do not invent matrix values.

This matrix is research/provenance work, not a request to copy code from third parties.

---

# Documentation reconciliation

After implementation/tests exist and verification passes:

- update `STATUS.md` so its verification paragraph reflects current code reality rather than old 32-test language;
- update `TODO.md` only for genuinely completed items;
- update `docs/VERIFICATION.md` with commands/results actually run and the resulting test count;
- update `docs/TEACHING_PATH.md` if a new division route becomes part of the public visitor sequence;
- keep `ROADMAP.md` changes minimal and status-oriented only where its current wording is now false.

Do not broadly rewrite unrelated historical notes.

---

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

If practical in the existing environment, perform a browser smoke test of the new division path at desktop and narrow/mobile width and record only checks actually performed.

One coherent checkpoint may include Parts A–D. If the work naturally separates into a research commit and an implementation commit, that is also acceptable, but both must be pushed before stopping unless a genuine blocker occurs.

After push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision. Do not autonomously start source-specific interlocks, Pascaline geometry, automatic division mechanisms, or Curta internals.

Suggested final commit subject if using one commit:

```text
feat: add operator-driven division procedure
```

---

# Evidence / stop conditions

Stop and leave a precise blocker rather than guessing if:

- historical operator procedure cannot be supported by the cited source at the precision needed;
- implementing generic division requires assuming source-specific gear/carry geometry;
- shared carry/revolution semantics would need a broad incompatible migration;
- a concurrent implementation of the same division track lands on remote `main`;
- outbound web is unavailable for Part D (in that case finish A–C from available sources/repository evidence and note Part D blocked rather than fabricating metadata).

Do not ask the human for routine implementation decisions already settled above.
