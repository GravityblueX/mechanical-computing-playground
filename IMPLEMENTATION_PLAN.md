# Complete Implementation Plan — Mechanical Computing Playground

This is the executable backlog. Work in dependency order. Check boxes only when implementation, tests, and production build all pass.

## Phase 0 — Project bootstrap

### M0.1 Browser TypeScript harness

Create:

```text
package.json
package-lock.json
tsconfig.json
vite.config.ts
src/
tests/
fixtures/
research/
```

Requirements:

- TypeScript strict mode;
- Vite browser build;
- Vitest;
- scripts for `dev`, `test`, `build`;
- no backend;
- deployable to GitHub Project Pages.

Acceptance:

- [x] clean install succeeds;
- [x] tests run;
- [x] production build succeeds.

### M0.2 CI

Add GitHub Actions for install, typecheck/test, and build on push/PR.

Acceptance:

- [ ] CI green on main.

---

# Part I — Shared mechanical state model

## Phase 1 — Core vocabulary and deterministic event engine

### M1.1 Core state/event types

Create `src/core/types.ts` and `src/core/events.ts`.

Define stable vocabulary for:

- mechanism id;
- crank/operation cycle;
- phase;
- wheel/dial position;
- signed step/rotation;
- carry pending/propagated/carry-out;
- transfer ratio;
- carriage offset;
- latch/detent state where used;
- human operation event;
- warning/overflow/error condition.

Do not encode machine-specific history into generic types unnecessarily.

### M1.2 Deterministic transition interface

Create `src/core/transition.ts`.

A transition must accept explicit state + action and return:

```text
next state
ordered events
warnings/errors
```

No timers, DOM, animation frames, or random state inside core transitions.

Acceptance:

- [ ] same state/action yields identical serialized result;
- [ ] transition output can be replayed independently of UI.

### M1.3 Event serialization/replay

Create stable JSON serialization and replay helpers.

Acceptance:

- [ ] golden event traces can be stored in fixtures;
- [ ] a complete crank cycle can be replayed.

### M1.4 Model documentation

Write `docs/MODEL.md` from the implemented model.

Include explicit distinction among:

- mathematical value;
- mechanical representation;
- operation phase;
- event;
- visualization.

---

# Part II — Decimal wheels and carry

## Phase 2 — Decimal wheel

### M2.1 Single decimal wheel

Create `src/mechanisms/decimal-wheel/`.

State:

- position 0–9;
- optional direction/mode if justified;
- carry request/carry-out result as event, not hidden mutation.

Required tests:

- [ ] 0 + 1 → 1;
- [ ] 8 + 1 → 9;
- [ ] 9 + 1 → 0 + carry event;
- [ ] deterministic reverse/decrement behavior if subtraction is implemented.

### M2.2 Multi-wheel register

Create composable register logic without yet pretending to reproduce a particular historical machine.

Acceptance:

- [ ] width configurable;
- [ ] overflow behavior explicit;
- [ ] wheel identity/order stable.

## Phase 3 — Carry chain

### M3.1 Carry propagation state machine

Create `src/mechanisms/carry-chain/`.

Required canonical traces:

```text
0009 + 1 -> 0010
0099 + 1 -> 0100
9999 + 1 -> 0000 + carry-out
```

The event log must expose every propagated stage.

### M3.2 Carry fixtures

Create `fixtures/carry/` with expected states/events.

Acceptance:

- [ ] golden traces verify the number/order of carry events;
- [ ] UI is not needed for correctness.

### M3.3 Research note

Write `research/carry-is-the-hard-part.md` comparing the conceptual simplicity of representing a digit with the mechanical complexity of reliable carry, using cited historical/mechanical sources.

Label which statements are general mechanism observations versus claims about specific machines.

---

# Part III — First public exhibit

## Phase 4 — Visible Carry exhibit

Create `src/exhibits/visible-carry/`.

Default scenario: `0099 + 1`.

Required modes:

- step one event;
- advance one crank/operation phase;
- automatic replay;
- reset;
- adjustable animation speed without changing core state.

Required panes:

- visible decimal wheels;
- active wheel/carry path;
- state table;
- ordered event log;
- short explanation of why `0100` required multiple mechanical actions.

Acceptance:

- [ ] event-by-event result matches fixture trace;
- [ ] disabling animation does not change result;
- [ ] keyboard controls exist;
- [ ] motion is not required to understand state.

---

# Part IV — Finite difference computing

## Phase 5 — Research and mathematical model

### M5.1 Design note

Write `research/finite-difference-design.md`.

Explain separately:

- mathematical finite differences;
- why repeated addition can generate polynomial tables;
- which sequencing is a pedagogical abstract model;
- which claims correspond to Babbage's Difference Engine designs/reconstructions.

### M5.2 Difference-column mechanism

Create `src/mechanisms/difference-column/`.

Support at least first through fourth differences.

State must explicitly encode the update order used by the pedagogical model.

Required tests:

- [ ] square-number table;
- [ ] cubic polynomial table;
- [ ] custom initial difference row;
- [ ] replay of at least 10 crank cycles.

## Phase 6 — Finite Difference exhibit

Create `src/exhibits/finite-difference/`.

Required presets:

- `n²`;
- `n³`;
- custom starting difference table.

Required display:

- each difference column;
- current crank number;
- which column updates now;
- before/after state;
- generated output sequence;
- optional “show math” panel.

Acceptance:

- [ ] a visitor can infer that constant higher differences allow repeated addition to generate the table;
- [ ] historical/pedagogical boundary is visible.

---

# Part V — Multiplication mechanisms

## Phase 7 — Prior-art study: stepped drum vs pinwheel

Write `research/multiplication-mechanisms.md` before visualization work.

Cover:

- Leibniz stepped drum / arithmometer family;
- Odhner-style pinwheel family;
- carriage shift;
- revolution counting;
- known simulators/diagrams/manuals;
- exact explanatory increment this repository will add.

Use evidence grades A–D.

## Phase 8 — Shared carriage and revolution mechanisms

### M8.1 Carriage shift

Create `src/mechanisms/carriage-shift/`.

Tests must show how the same digit contribution changes decimal place when carriage offset changes.

### M8.2 Revolution counter

Create a minimal counter mechanism that records crank repetitions as state/events.

## Phase 9 — Stepped-drum conceptual model

Create `src/mechanisms/stepped-drum/`.

This is allowed to be evidence-grade D if simplified, but must clearly explain:

- how a set digit changes effective engagement/steps;
- repeated crank accumulation;
- role of carriage shift.

Do not claim geometric fidelity without source support.

## Phase 10 — Pinwheel conceptual model

Create `src/mechanisms/pinwheel/`.

Expose:

- number of effective pins/teeth as configured state;
- crank accumulation;
- carriage shift;
- distinction from stepped drum.

## Phase 11 — Same multiplication, multiple mechanisms exhibit

Create `src/exhibits/multiplication-compare/`.

Default example: `314 × 27`.

Compare at least:

- repeated addition baseline;
- stepped-drum conceptual path;
- pinwheel conceptual path.

Report:

- crank count;
- carriage shifts;
- carry events where modeled;
- state transitions;
- human operations.

Acceptance:

- [ ] comparison is about mechanism/operation decomposition, not a fake benchmark;
- [ ] each result is reproducible from core events.

---

# Part VI — Curta case study

## Phase 12 — Curta research map

Write `research/curta-source-map.md` using manuals/patents/specialist mechanical references and existing simulators.

Identify:

- setting register;
- result counter;
- revolution counter;
- carriage position;
- addition/subtraction mode;
- what can be reused from shared mechanism core;
- what would be misleading to simplify.

## Phase 13 — Curta teaching model

Only implement enough state to expose the operation path.

Create `src/machines/curta/` with:

```text
README.md
mechanism.md
state-model.md
operations.md
limitations.md
sources.md
```

Add code only for mechanisms needed by the teaching exhibit.

Stop if this becomes a cosmetic full emulator already covered elsewhere.

Acceptance:

- [ ] one addition and one multi-digit multiplication can be stepped through as operations/events;
- [ ] the model labels simplifications/evidence grade.

---

# Part VII — Analytical Engine information flow

## Phase 14 — Research and emulator inspection

Write `research/analytical-engine-information-flow.md` after inspecting strong historical sources and existing emulators such as the John Walker/Fourmilab lineage.

Do not invent a new instruction set.

## Phase 15 — Information-flow exhibit

Create `src/exhibits/analytical-engine-flow/`.

Focus on a small card-program example and visualize:

```text
cards
→ control/operation
→ Mill ↔ Store
→ output
```

Required:

- one small deterministic program trace;
- data movement events;
- explicit warning that modern CPU terminology is analogy, not identity.

Acceptance:

- [ ] exhibit adds explanatory flow beyond merely running an emulator.

---

# Part VIII — Continuous mechanical computing

## Phase 16 — Differential Analyzer research

Write `research/differential-analyzer.md`.

Cover:

- continuous quantity representation by shaft rotation;
- mechanical integration;
- coupling/feedback;
- error accumulation;
- historical sources/simulators;
- whether 2D visualization is sufficient.

## Phase 17 — Minimal continuous integrator exhibit

Only if research finds a clear explanatory increment, implement a pedagogical continuous integrator model.

This is the first phase where Canvas or a physics-oriented approach may be considered, but the decision must be recorded before introducing it.

---

# Part IX — Hand-Crank Backpropagation Machine

This track is required because it is a distinctive public exhibit. Follow `docs/ANCIENT_BACKPROP.md` and keep it explicitly counterfactual/pedagogical.

## Phase 18 — Backprop prior-art verification

Write `research/backprop-prior-art.md`.

At minimum verify and discuss:

- Li & Mao, 2024, all-mechanical neural networks with in-situ backpropagation;
- their forward/adjoint mechanical fields;
- which parameter updates are physical/numerical in the demonstrated workflow;
- other relevant physical learning/mechanical neural-network work discovered during research;
- what is genuinely different about this repository's hand-operated explanatory machine.

Required conclusion categories:

```text
REAL MECHANICAL LEARNING RESULT
PEDAGOGICAL TRANSLATION
COUNTERFACTUAL MACHINE ELEMENT
OPEN ENGINEERING QUESTION
```

Do not call the core idea original if prior art exists.

## Phase 19 — Stage A numerical core

Create `src/backprop/core/stage-a.ts`.

Initial model:

```text
y = w1*x1 + w2*x2
loss = a simple explicitly documented differentiable loss
```

Expose:

- inputs;
- weights;
- output;
- target;
- loss;
- analytic gradients;
- learning rate;
- updated weights.

Required tests:

- [ ] forward reference values;
- [ ] analytic gradient matches finite difference within justified epsilon/tolerance;
- [ ] one-step update matches reference calculation;
- [ ] selected stable-learning-rate fixture decreases loss over several cycles.

## Phase 20 — Training phase/event machine

Create `src/backprop/phases.ts` and `src/backprop/events.ts`.

A cycle must be serializable and explicitly phase-driven:

```text
LOAD_INPUT
FORWARD_MULTIPLY
FORWARD_ACCUMULATE
READ_OUTPUT
SET_TARGET
LOSS_COMPARE
BACKPROP_OUTPUT
GRADIENT_READY
LEARNING_RATE_SCALE
WEIGHT_UPDATE
```

Acceptance:

- [ ] automatic and single-step execution consume the same phase machine;
- [ ] complete cycle replay produces the same state/events.

## Phase 21 — Mechanical mapping layer

Create `src/backprop/mechanical-mapping/`.

Map tested numerical state to pedagogical mechanism state such as:

- input sliders/dials;
- weight ratio dials;
- accumulator shaft;
- target scale;
- error differential;
- signed reverse/gradient shafts;
- learning-rate reduction gear;
- weight update dial movement.

Rules:

- mapping is evidence grade D unless a specific real mechanism is sourced;
- one displayed mechanical movement must correspond to an explicit phase/event/value;
- no decorative free-running gears unrelated to computation.

## Phase 22 — Stage A hand-crank exhibit

Create `src/exhibits/hand-crank-backprop/`.

Required modes:

- automatic cycle;
- single-step phase;
- actual drag/turn hand-crank interaction that gates phase progress;
- reset/load preset.

Required simultaneous layers:

1. mechanical view;
2. state values;
3. event/phase log;
4. optional math details.

Acceptance:

- [ ] default fixture visibly lowers loss over repeated cycles;
- [ ] every gradient shown equals the core reference state;
- [ ] the exhibit is understandable without the formulas expanded.

## Phase 23 — Learning-rate overshoot exhibit

Add a preset where an excessive learning rate causes overshoot/oscillation or divergence in the chosen simple model.

Display the same mechanism with a visibly more aggressive learning-rate gear ratio.

Acceptance:

- [ ] behavior is generated by tested core values, not a scripted animation;
- [ ] stable and unstable presets are both reproducible.

## Phase 24 — Stage B 2→2→1 network

Create `src/backprop/core/stage-b.ts`.

Use a small network with a clearly documented activation. If a piecewise-linear activation is used for pedagogical mapping, label it as a teaching choice rather than a historical mechanical solution.

Expose chain-rule quantities explicitly:

```text
∂L/∂y
∂L/∂h1, ∂L/∂h2
output-side weight gradients
input-side weight gradients
```

Required tests:

- [ ] full forward reference values;
- [ ] analytic gradients vs finite differences for all trainable weights;
- [ ] selected training fixture decreases loss;
- [ ] phase serialization/replay.

## Phase 25 — Stage B reverse-crank visualization

Extend the exhibit so the user can see error contribution propagate from output to hidden units and then to input-side weights.

Required interaction:

- forward crank;
- error comparison;
- reverse/adjoint crank through output layer;
- reverse/adjoint crank through hidden layer;
- gradient readout;
- weight update;
- forward check again.

Acceptance:

- [ ] UI values are directly bound to tested Stage B core state;
- [ ] chain rule is visible as staged dependency, not a single “backprop happened” event.

## Phase 26 — Reality comparison tab

Create a concise comparison between:

- this pedagogical hand-crank machine;
- real all-mechanical/physical learning work from verified prior art.

Compare representation, physical substrate, parameter meaning, forward/adjoint process, and parameter update mechanism.

No marketing-style originality claims.

---

# Part X — Shared public site and publishing

## Phase 27 — Project Pages shell

Create a coherent static site with routes approximately:

```text
/
/visible-carry
/finite-difference
/multiplication
/curta
/analytical-engine
/continuous
/hand-crank-backprop
/about
```

Routes may be omitted until the corresponding exhibit exists; do not ship empty marketing pages.

Shared components should include:

- state inspector;
- event timeline;
- evidence-grade badge;
- source/method note;
- single-step/replay controls;
- optional math/detail disclosure.

## Phase 28 — Project Pages deployment

Add GitHub Actions deployment.

Requirements:

- correct Vite repository base path;
- tests/build gate deployment;
- no dependency on `tmzncty.github.io`;
- static hosting only unless a future requirement explicitly changes this.

Acceptance:

- [ ] live Pages URL works with assets/routes;
- [ ] visitors do not need to clone to use key exhibits.

---

# Part XI — Historical documentation set

## Phase 29 — Machine/mechanism documentation normalization

For each implemented substantial mechanism/machine, maintain the repository convention:

```text
README.md
mechanism.md
state-model.md
operations.md
limitations.md
sources.md
```

Not every tiny shared helper needs this full set. Use it for named historical machines/mechanism studies where provenance matters.

## Phase 30 — Essays/teaching notes

Write concise source-grounded essays after implementations exist:

- `docs/WHY_DIFFERENCE_ENGINE_NEEDS_ADDITION.md` — why finite differences allow table generation by addition, carefully separating math from specific mechanical construction;
- `docs/CURTA_AS_MECHANICAL_ALGORITHM_MACHINE.md` — why Curta operation reflects mechanical algorithm decomposition rather than being merely a strange pre-electronic calculator;
- `docs/TEACHING_PATH.md` — suggested visitor sequence from visible carry to backprop.

Do not prioritize essays over unfinished core exhibits.

---

# Part XII — Final verification

## Phase 31 — Browser and replay matrix

Create `docs/VERIFICATION.md` recording:

- date;
- test commands/results;
- production build result;
- browser smoke tests;
- fixture/event replay results;
- accessibility/keyboard smoke test;
- known limitations.

At minimum verify:

- visible carry canonical fixtures;
- finite-difference presets;
- multiplication comparison default case;
- Stage A gradients and training;
- Stage B gradients if implemented;
- learning-rate overshoot preset;
- Pages deployment.

---

# Cross-cutting requirements

## Historical honesty

Every historical structure claim needs provenance appropriate to its precision. When in doubt, simplify and label D rather than inventing detail.

## Determinism

State/event logic must be deterministic. Animation speed and rendering frame rate must not alter calculation.

## Replayability

A major operation should be serializable/replayable so screenshots are never the only evidence of what happened.

## Accessibility

All important information must exist in text/state form as well as motion. Keyboard controls are required for key exhibits. Avoid meaning conveyed only by color.

## Performance

Prefer simple vector graphics and small state models. Do not introduce heavy 3D dependencies for visual prestige.

## Playfulness

This is a playground/lab. Keep the public experience tactile: crank, step, inspect, replay, deliberately trigger carry, overshoot, or alternate mechanism behavior. Do not turn it into a museum catalog with no interaction.

# Required completion threshold

A strong first public release requires:

- Phases 0–6 (core + visible carry + finite difference);
- Phases 18–23 (Stage A hand-crank backprop + overshoot);
- Phases 27–28 (public Pages shell/deploy);
- relevant research/evidence notes;
- final test/build verification.

A fuller release should continue through multiplication comparison, Curta/Analytical Engine explanatory modules, and Stage B backprop.

Differential Analyzer/continuous mechanics is an extension and should not block the first polished release.

Agents should keep moving through the earliest dependency-safe unfinished tasks until a genuine blocker or completion threshold is reached.