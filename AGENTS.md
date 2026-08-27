# AGENTS.md — Mechanical Computing Playground execution contract

This repository is intended to be continued by coding/research agents without repeated human replanning.

## Mission

Build a public interactive playground that makes computation visible as **mechanical state transitions, information flow, human operations, and constraints**.

The project is not a collection of vintage calculator skins. A result such as `0099 + 1 = 0100` is insufficient unless the model can expose which wheel moved, which carry became pending, how carry propagated, and which operation phase caused each state change.

The hand-crank backpropagation exhibit is a counterfactual pedagogical machine, not a historical reconstruction. It must make forward state, error, reverse/adjoint propagation, gradients, learning-rate scaling, and parameter updates explicit.

## Read order before changing code

1. `README.md`
2. `docs/PRIOR_ART.md`
3. `docs/ANCIENT_BACKPROP.md`
4. `docs/PUBLISHING.md`
5. `ROADMAP.md`
6. `IMPLEMENTATION_PLAN.md`
7. relevant existing source/tests/research

Do not invent a new project roadmap when an unfinished dependency-safe task already exists.

## Default execution behavior

- Move forward by default; do not stop at analysis if implementation can proceed.
- Choose the earliest unfinished task whose dependencies are satisfied.
- Continue through adjacent tasks while tests/build remain healthy.
- Verification should resolve decisions and prove mechanisms, not become an excuse for endless research.
- If a historical/mechanical claim is uncertain, verify authoritative sources, label the evidence grade, choose a conservative model, and continue.
- Documentation-only work is not completion of a mechanism milestone.
- Do not ask the human to choose routine implementation details already settled here.

## Required stack and repository shape

Use a browser-first TypeScript project unless an existing implementation establishes an equivalent tested stack.

Preferred tools:

- TypeScript
- Vite
- Vitest
- npm with committed lockfile
- SVG/DOM/CSS for first-generation mechanism visualization
- Canvas only when it materially simplifies a specific exhibit
- WebGL/3D/physics only after a written decision proves 2D state visualization insufficient
- GitHub Actions for test/build and Project Pages deployment

Expected high-level shape:

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

The exact event vocabulary may evolve, but UI must consume the core state/event stream rather than secretly recomputing results.

### 2. Separate historical machine facts from pedagogical abstractions

Use evidence grades consistently:

- A: preserved physical machine/direct measurement;
- B: original drawing/manual plus faithful reconstruction;
- C: historically documented but interpretation is required;
- D: pedagogical simplification/counterfactual model.

Every machine/mechanism note must identify when a visualization is D rather than implying 1:1 historical construction.

### 3. Prefer isolated mechanisms before whole-machine emulators

Before implementing a complete Pascaline, Curta, Difference Engine, Analytical Engine, etc., check prior art and ask what explanatory mechanism is missing.

Prefer:

```text
existing simulator/source
→ mechanism study
→ isolated state model
→ explanatory exhibit
```

over rewriting a full emulator with a different skin.

### 4. Mechanical constraints should shape the algorithm

Expose where relevant:

- carry propagation;
- crank/revolution count;
- carriage shift;
- latch/detent state;
- transfer ratio;
- sequencing/phase;
- human operations;
- capacity/overflow;
- backlash/error as a pedagogical model only when justified.

### 5. Hand-crank backprop must not be ordinary hidden JavaScript with gear decoration

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

Mechanical core must eventually cover:

- `0009 + 1 -> 0010` with visible carry event;
- `0099 + 1 -> 0100` with two carry propagations;
- `9999 + 1` overflow/carry-out behavior;
- deterministic event replay;
- finite-difference generation for known polynomials;
- stepped-drum/pinwheel conceptual operation sequences where implemented;
- carriage shift behavior;
- serialization/replay of a complete operation cycle.

Backprop core must cover:

- forward reference values;
- analytic gradient versus finite difference;
- one-step weight update;
- loss decrease under a stable learning rate for selected fixtures;
- overshoot/oscillation fixture under an intentionally excessive learning rate;
- Stage B chain-rule reference values;
- phase/event order and serialization/replay.

Do not validate a mechanical model solely by watching animation.

Before milestone commits, run the full test suite and production build.

## Research contract

When an implementation depends on historical/mechanical facts, create or update a note under `research/` containing:

- question;
- primary/museum/manual/patent/source material where possible;
- existing simulator/source code inspected;
- evidence grade;
- what is known versus simplified;
- project decision;
- date checked.

Prefer museum material, patents/manuals/original drawings, scholarly reconstruction, and established specialist references over generic summaries.

For mechanical neural networks/physical learning, distinguish real physical learning research from this repository's pedagogical counterfactual machine.

## Visualization contract

Default to 2D/SVG because it is easier to inspect and synchronize with deterministic state.

A good exhibit should allow:

- single-step;
- crank/drag interaction when appropriate;
- pause/replay;
- visible active mechanism;
- state table/event log;
- explanation without requiring motion;
- optional math/details rather than hiding them permanently.

No meaning should depend only on color or animation.

## Commit discipline

Commit coherent checkpoints.

Examples:

- `build: bootstrap mechanical playground harness`
- `feat: add decimal wheel transition core`
- `feat: model multi-stage carry propagation`
- `feat: add visible carry exhibit`
- `research: document stepped drum and pinwheel differences`
- `feat: add finite difference crank model`
- `feat: add stage-a backprop core`
- `test: verify analytic gradients against finite difference`
- `feat: map backprop phases to hand-crank events`

Do not commit generated planning churn as if it were product progress.

## Stop conditions

Stop or redirect if the work becomes:

- a vintage calculator skin whose arithmetic is hidden elsewhere;
- a whole-machine rewrite already covered by mature simulators with no explanatory increment;
- a 3D physics project before deterministic mechanism logic exists;
- a historical claim inferred only from modern computer terminology;
- an animation that cannot be reproduced from state/events;
- a claim that the counterfactual hand-crank backprop machine historically existed;
- a claim that mechanical neural-network backpropagation is original to this repository;
- ordinary backpropagation with decorative gears and no explicit reverse-phase state.

## Definition of done

The repository is substantially complete when required milestones in `IMPLEMENTATION_PLAN.md` are implemented, tested, documented, and deployed to Project Pages; the key exhibits work without cloning; historical versus pedagogical claims are labeled; and the user can answer not merely “what result did the machine produce?” but “what moved, in what order, and why?”

Until then, continue implementing the next dependency-safe unfinished task.