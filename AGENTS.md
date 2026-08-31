# AGENTS.md — Mechanical Computing Playground execution contract

This repository is intended to be continued by coding/research agents without repeated human replanning.

## Mission

Build a public interactive playground that makes computation visible as **mechanical state transitions, information flow, human operations, constraints, and evidence boundaries**.

The project is not a collection of vintage calculator skins. A result such as `0099 + 1 = 0100` is insufficient unless the model can expose which state changed, which carry became pending, how carry propagated, which operation phase caused each change, and—when a historical machine is named—what source supports the claimed mechanism.

The hand-crank backpropagation exhibit is a counterfactual pedagogical machine, not a historical reconstruction. It must make forward state, error, reverse/adjoint propagation, gradients, learning-rate scaling, and parameter updates explicit.

## Source of truth and read order

The repository has already accumulated implementation faster than some old planning checklists were updated. **Do not infer current work from unchecked boxes alone.**

Read in this order before changing code or research:

1. `README.md` — project boundary and current public framing;
2. `STATUS.md` — **authoritative current-state ledger**;
3. `docs/EVIDENCE_POLICY.md` — claim types and evidence strength;
4. `docs/RESEARCH_GAPS.md` — prioritized research gaps;
5. `docs/PRIOR_ART.md` — existing simulators, museums, and historical resources;
6. `docs/ANCIENT_BACKPROP.md` — counterfactual backprop boundary when relevant;
7. `docs/PUBLISHING.md` — publishing/privacy boundary when relevant;
8. `ROADMAP.md` — forward tracks, not a status ledger;
9. `TODO.md` — next bounded tasks;
10. relevant source, tests, fixtures, research notes, and recent commits;
11. `IMPLEMENTATION_PLAN.md` only as a historical design/dependency specification.

`IMPLEMENTATION_PLAN.md` contains stale checkboxes from an earlier construction phase. Never reimplement a task merely because that file still marks it incomplete. Inspect the tree, tests, current UI, `STATUS.md`, and recent commits first.

## Default execution behavior

- Move forward by default; do not stop at analysis if a bounded implementation or research slice can proceed.
- Start from `STATUS.md` and `TODO.md`, then verify the actual code/research state before selecting work.
- Prefer the highest-value dependency-safe gap, not the earliest unchecked line in an old plan.
- Continue through adjacent tasks while tests/build and evidence boundaries remain healthy.
- Verification should resolve decisions and prove mechanisms, not become an excuse for endless research.
- If a historical/mechanical claim is uncertain, verify authoritative sources, narrow the claim, record uncertainty, choose a conservative model, and continue.
- Documentation-only work does not complete an implementation milestone, but source/provenance work **does** count as substantive progress when historical claims are the actual blocker.
- Do not ask the human to choose routine implementation details already settled by repository contracts.
- When the repository and an old planning document disagree, the implemented tree/tests plus `STATUS.md` win; update the documentation rather than duplicating work.

## Required stack and repository shape

Use the established browser-first TypeScript project unless a later repository decision explicitly changes it.

Preferred tools:

- TypeScript
- Vite
- Vitest
- npm with committed lockfile
- SVG/DOM/CSS for first-generation mechanism visualization
- Canvas only when it materially simplifies a specific exhibit
- WebGL/3D/physics only after a written decision proves 2D state visualization insufficient
- GitHub Actions for test/build and Project Pages deployment

Current high-level shape:

```text
src/
  core/
  mechanisms/
  machines/
  backprop/
  exhibits/
  ui/
fixtures/
research/
tests/
```

No backend is required for the core public playground.

## Architecture rules

### 1. Mechanism state is the source of truth

Mechanical correctness must live in deterministic state/transition logic, not animation timing.

A mechanism transition should be inspectable/replayable as an event sequence such as:

```text
CRANK_BEGIN
DIGIT_ADVANCE wheel=0 9->0
CARRY_PENDING 0->1
CARRY_PROPAGATE wheel=1 9->0
CARRY_PENDING 1->2
CARRY_PROPAGATE wheel=2 0->1
CRANK_END
```

The exact vocabulary may evolve, but UI must consume the core state/event stream rather than secretly recomputing results.

### 2. Separate claim type from evidence strength

Follow `docs/EVIDENCE_POLICY.md`.

Claim types:

- **M** — mathematical / computational;
- **H** — historical record;
- **R** — engineering reconstruction / interpretation;
- **P** — pedagogical / counterfactual model.

For H/R claims, record historical evidence strength separately:

- **E1** — direct / primary;
- **E2** — authoritative reconstruction / institutional synthesis;
- **E3** — reliable secondary;
- **E4** — open / inference.

Do not call a mathematical theorem “grade A.” Do not call a teaching abstraction “weak historical evidence.” They are different kinds of claims.

Older A–D badges may remain for UI compatibility, but new research and edited claims should use the two-axis policy.

### 3. Prefer isolated mechanisms before whole-machine emulators

Before implementing a complete Pascaline, Comptometer, Millionaire, Curta, Difference Engine, Analytical Engine, etc., check prior art and identify the explanatory increment.

Prefer:

```text
existing artifact/source/simulator
→ mechanism study
→ isolated state model
→ explanatory exhibit
→ cross-machine comparison
```

over rewriting a full emulator with a different skin.

Add a machine only when it introduces a new mechanism, representation, operator protocol, or evidence question.

### 4. Mechanical constraints should shape the algorithm

Expose where relevant:

- carry propagation;
- crank/revolution count;
- carriage shift;
- latch/detent state;
- transfer ratio;
- sequencing/phase;
- key-driven input;
- human operations;
- capacity/overflow;
- correction/interlocks;
- zeroing/clearing;
- operation direction/mode;
- backlash/error only when historically or experimentally justified.

### 5. Human operation is part of the computation

Do not assume every machine follows `set value → crank`.

The repository should be able to represent different protocols, for example:

```text
stylus rotates dial
setting levers → crank
keypress → accumulate
multiplier selector → direct multiplication cycle
continuous shaft coupling
```

An operator action is not “mere UI” when it determines arithmetic sequencing, repetition, place value, correction, or stopping conditions.

### 6. Hand-crank backprop must not be ordinary hidden JavaScript with gear decoration

The neural-network core can and should be deterministic numerical code, but it must produce explicit phases/events that the mechanical mapping consumes.

At minimum expose:

```text
LOAD_INPUT
FORWARD_MULTIPLY
FORWARD_ACCUMULATE
READ_OUTPUT
SET_TARGET
LOSS_COMPARE
BACKPROP_OUTPUT
BACKPROP_HIDDEN (Stage B)
GRADIENT_READY
LEARNING_RATE_SCALE
WEIGHT_UPDATE
```

Every displayed gradient must correspond to a reference value in tested core state.

## Testing contract

Tests are mandatory for core logic.

Existing tests and fixtures already cover significant parts of carry, finite differences, carriage shifting, revolution counting, continuous integration, Stage A/B gradients, phase behavior, and learning-rate behavior. Before creating new tests, inspect what is already covered.

Future mechanism work should add tests appropriate to its new explanatory claim, for example:

- direct multiplication operation traces;
- key-driven accumulator transitions;
- subtraction/complement protocol where modeled;
- division operator loop where modeled;
- correction/interlock invalid transitions;
- source-linked named-machine behavior only at the abstraction level actually implemented.

Do not validate a mechanical model solely by watching animation.

Before code milestone commits, run the full test suite, type-check, and production build. Update `docs/VERIFICATION.md` after meaningful code or deployment changes.

## Research contract

When an implementation or historical explanation depends on mechanical facts, create or update a note under `research/` containing:

```text
Question
Claim type(s)
Sources
What each source directly establishes
What is reconstructed/inferred
What this repository simplifies
Implementation consequence
Uncertainties
Date checked
```

Prefer:

1. surviving artifacts / museum catalog with provenance;
2. original patents, drawings, manuals, contemporary technical descriptions;
3. documented reconstructions and scholarly histories using primary sources;
4. established specialist references;
5. generic summaries only for low-precision orientation.

Precision rule:

> The more specific the geometry, timing, revision, or originality claim, the more specific the source location must be.

Record model/revision, patent number/figure/claim, manual edition/page, drawing identifier, or reconstruction basis when the claim needs that precision.

Do not treat a patent as proof that every described feature was manufactured exactly as patented. Distinguish intended design, produced machine, surviving artifact, later reconstruction, and teaching model.

For mechanical neural networks/physical learning, distinguish real physical learning research from this repository's pedagogical counterfactual machine.

## Visualization contract

Default to 2D/SVG because it is easier to inspect and synchronize with deterministic state.

A good exhibit should allow:

- single-step;
- crank/drag/key interaction when appropriate;
- pause/replay;
- visible active mechanism;
- state table/event log;
- explanation without requiring motion;
- optional math/details rather than hiding them permanently;
- visible claim/evidence boundary when a historical machine is named.

No meaning should depend only on color or animation.

A visually realistic gear, lever, or linkage that lacks source support must be labeled as schematic/pedagogical or removed. Visual realism must never silently upgrade evidence strength.

## Current research priorities

Read `docs/RESEARCH_GAPS.md` for detail. The current highest-value lines are:

1. historically grounded carry comparison (Pascaline / key-driven carry);
2. multiplication architecture including direct multiplication / Millionaire;
3. key-driven computation / Comptometer;
4. subtraction, complements, division, zeroing, correction, and interlocks;
5. simulator comparison matrix;
6. deeper Curta / Analytical Engine / Differential Analyzer source maps;
7. cross-machine representation and operator-protocol comparisons;
8. reliability/torque/tolerance only when evidence supports it.

Do not displace these with a new famous-machine page unless it adds a distinct mechanism lesson.

## Commit discipline

Commit coherent checkpoints.

Examples:

- `research: ground carry model in Pascaline sources`
- `research: add direct multiplication architecture`
- `feat: model direct multiplication control`
- `research: map key-driven Comptometer operation`
- `feat: add key-driven accumulator transitions`
- `research: document subtraction and division protocols`
- `docs: reconcile current implementation status`
- `test: verify direct multiplication operation trace`

Do not commit generated planning churn as if it were product progress.

## Stop conditions

Stop or redirect if the work becomes:

- a vintage calculator skin whose arithmetic is hidden elsewhere;
- a whole-machine rewrite already covered by mature simulators with no explanatory increment;
- a 3D physics project before deterministic mechanism logic exists;
- a historical claim inferred only from modern computer terminology;
- a historical geometry/timing claim with no source chain;
- an animation that cannot be reproduced from state/events;
- an operator action hidden even though it is part of the arithmetic algorithm;
- a claim that the counterfactual hand-crank backprop machine historically existed;
- a claim that mechanical neural-network backpropagation is original to this repository;
- ordinary backpropagation with decorative gears and no explicit reverse-phase state;
- duplicate work caused by trusting a stale planning checkbox over the actual repository.

## Definition of done

The repository is substantially mature when:

- key mechanisms are deterministic, tested, replayable, and understandable without animation;
- historical claims are source-backed at the precision displayed;
- reconstruction and teaching abstractions are explicit;
- cross-machine exhibits explain not just results but representation, operation sequence, and human-machine division of arithmetic labor;
- key exhibits work publicly without cloning;
- `STATUS.md`, tests, verification, and public documentation agree about what exists.

Until then, continue the highest-value dependency-safe task from the current status/research queue—not the oldest unchecked item in a historical plan.