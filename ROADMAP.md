# Roadmap

Mechanical Computing Playground advances by **mechanism → evidence → deterministic model → exhibit → comparison**.

For what is already implemented, read [`STATUS.md`](STATUS.md). This roadmap is forward-looking; it is not a second status ledger.

## Foundation — already established

The repository already has:

- TypeScript / Vite / Vitest browser harness;
- deterministic state / transition / event / replay primitives;
- decimal wheel and carry models with canonical fixtures;
- finite-difference, carriage, revolution-counter, stepped-drum, pinwheel, and continuous-integrator models;
- Stage A / Stage B backprop numerical models and phase exposure;
- browser views for the major teaching tracks;
- CI / build workflow and a Pages deployment workflow.

The main gap is now **research depth and provenance**, not absence of scaffolding.

---

# Track R0 — Evidence and repository reconciliation

**Status: current priority.**

Goal: make it impossible for a visitor or agent to confuse a mathematical fact, a surviving-machine fact, a reconstruction, and a teaching abstraction.

Work:

- [x] add `STATUS.md` as the current-state authority;
- [x] add `docs/EVIDENCE_POLICY.md` separating claim type from evidence strength;
- [x] add `docs/RESEARCH_GAPS.md`;
- [ ] migrate old research notes away from ambiguous “A–D for everything” wording;
- [ ] add source location details (patent figure/claim, manual page, museum object/revision) when mechanism specificity increases;
- [ ] add `research/simulator-matrix.md`.

Rule:

> More mechanical detail requires more source detail.

---

# Track R1 — Carry architectures

**Status: abstract model implemented; historical comparison now in progress.**

The repository already demonstrates visible multi-stage carry. The next step is not prettier gears; it is showing that real machines solve carry with different force and timing architectures.

## R1.1 Pascaline sautoir

Research:

- stored-energy / gravity-triggered carry;
- multi-place propagation implications;
- non-reversibility and complement subtraction;
- precise source boundary between surviving design, historical drawing, and modern reconstruction.

Current note: [`research/carry-is-the-hard-part.md`](research/carry-is-the-hard-part.md).

## R1.2 Key-driven carry

Use the Comptometer family to investigate:

- a key stroke as the compute action;
- multi-column entry;
- simultaneous add / receive / carry in later designs;
- incomplete stroke / correction / interlock questions.

## R1.3 Carry comparison exhibit

Only after source work is strong enough, compare:

```text
abstract serial carry
Pascaline sautoir
key-driven multi-column carry
```

The UI must show functional equivalence without implying geometric identity.

---

# Track R2 — Multiplication architectures

**Status: stepped-drum / pinwheel conceptual models exist; direct multiplication is missing.**

The strongest future comparison is not merely “two kinds of variable teeth.” It is **where multiplication repetition lives**.

## R2.1 Repeated addition baseline

Keep a machine-neutral baseline:

```text
314 × 27
= 314 added 7 times
+ carriage shift
+ 314 added 2 times at tens place
```

## R2.2 Stepped drum

Source and expose:

- digit setting → effective engagement count;
- repeated crank accumulation;
- carriage shift;
- accumulator / carry interaction.

Do not claim historical geometry from the current conceptual model.

## R2.3 Pinwheel

Source and expose:

- digit setting → effective pins;
- crank accumulation;
- carriage shift;
- family differences and shared operator algorithm.

## R2.4 Direct multiplication / Millionaire

**New high-priority branch.**

Research Otto Steiger's patents and surviving Millionaire machines. Build a functional model showing that a multiplier digit can select a mechanically encoded multiple rather than forcing the operator to repeat a crank that many times.

Current note: [`research/multiplication-mechanisms.md`](research/multiplication-mechanisms.md).

### R2 acceptance

For the same multiplication, expose:

- input settings;
- main-cycle count;
- carriage shifts;
- carry events where modeled;
- operator actions;
- which arithmetic knowledge is supplied by the operator;
- which arithmetic knowledge is encoded by mechanism geometry/control.

---

# Track R3 — Key-driven computation and human-machine protocol

**Status: research track opened.**

Current note: [`research/key-driven-computation.md`](research/key-driven-computation.md).

Goal: break the repository's crank-centric assumption.

## R3.1 Minimal key-driven mechanism

Model:

```text
key press
→ digit-specific mechanical stroke
→ accumulator transition
→ carry interaction
→ key return
```

Do not build a full Comptometer emulator first.

## R3.2 Human error and correction

Research and later expose:

- partial keystrokes;
- correction controls;
- zeroing;
- operator locks;
- valid/invalid simultaneous inputs;
- carry inhibition where historically relevant.

These are computation-state constraints, not UI decoration.

## R3.3 Cross-machine operator comparison

Compare:

```text
stylus/dial
set-lever + crank
key-driven accumulation
multiplier-selector + crank
continuous coupled motion
```

This should become one of the repository's central comparative views.

---

# Track R4 — Arithmetic protocols beyond multiplication

**Status: weak / mostly unwritten.**

## R4.1 Subtraction

Write `research/subtraction-and-division.md` covering at least:

- complement arithmetic;
- reverse crank / direction where supported;
- dedicated add/subtract modes;
- carry consequences;
- operator aids such as complementary key legends.

## R4.2 Division

Show division as an operator + mechanism loop:

```text
repeated subtraction
→ revolution count
→ carriage shift
→ overshoot/correction where appropriate
```

Do not hide historical operator procedure behind a single software division function.

## R4.3 Derived procedures

Square root and other procedures may be added when a historical manual makes the operator algorithm clear. Treat them as programs performed *on* a limited machine, not as magical built-in instructions.

---

# Track R5 — Named machine case studies

**Status: software/explanatory shells exist; source maps need deepening.**

## R5.1 Curta

Upgrade `research/curta-source-map.md` to identify:

- exact model/revision;
- manuals/patents;
- setting register;
- result counter;
- revolution counter;
- carriage position;
- add/subtract mode;
- which current abstractions are safe and which are misleading.

The target is an operation-path explanation, not another cosmetic Curta simulator.

## R5.2 Difference Engine

The finite-difference software model already teaches the mathematics. Future historical work should add:

- exact Babbage design/reconstruction source anchors;
- column/update sequencing claims at the precision supported;
- printing / output ambitions where relevant;
- a concise essay explaining why finite differences let table generation reduce to repeated addition.

## R5.3 Analytical Engine

The current information-flow exhibit should receive a provenance pass:

- Babbage primary material;
- Menabrea/Lovelace where relevant;
- John Walker/Fourmilab interpretation and emulator lineage;
- exact status of Store / Mill / card-flow claims;
- explicit warning against simple modern CPU identity claims.

Do not invent a new instruction set.

---

# Track R6 — Continuous mechanical computing

**Status: minimal integrator exists; historical/source layer is thin.**

Start from Smithsonian's mechanical integrator / differential analyzer material and distinguish:

- planimeter;
- mechanical integrator;
- differential analyzer;
- specialized analog machinery.

Research questions:

- what physical quantity represents the variable?
- how is integration performed?
- how are shafts/couplings composed?
- where does error accumulate?
- what is measured/read/recorded?

Only introduce physics/Canvas/3D if a source-backed mechanism cannot be explained with simpler 2D state/geometry.

---

# Track X — Hand-crank backpropagation

**Status: numerical Stage A/B and phase machinery exist; this remains counterfactual/pedagogical.**

Keep this track explicitly separate from historical mechanical-calculator reconstruction.

Goals:

- expose forward quantities;
- expose error / adjoint signals;
- expose gradients;
- expose learning-rate scaling;
- expose parameter updates;
- preserve stable and overshoot presets;
- compare with verified physical/mechanical learning research without originality inflation.

Future work should improve the **mechanical explanation** only when every displayed movement corresponds to tested state and the real-vs-counterfactual comparison remains clear.

---

# Track P — Public exhibit and publishing

**Status: browser shell exists; Pages setting was externally blocked at the last verification checkpoint.**

Requirements:

- key exhibits usable without cloning;
- hash/static routing remains robust;
- keyboard controls for important interactions;
- motion never the only carrier of meaning;
- evidence/source boundary visible in every historical exhibit;
- tests/build gate deployment;
- update `docs/VERIFICATION.md` after meaningful code changes or publishing changes.

Once Pages is enabled/configured, record the live URL and perform a real deployment smoke test.

---

# Cross-cutting comparison topics

These should become docs/exhibits only when sourced:

## Representation

Where does a number live?

- dial position;
- wheel state;
- protruding pins;
- stepped engagement;
- register wheels;
- key travel;
- control plate;
- shaft angle.

## Human-machine division of arithmetic labor

Who supplies:

- repetition;
- place-value shift;
- correction;
- operation mode;
- stopping condition;
- multiplication-table knowledge?

## Reliability / validity

What prevents:

- partial operations;
- invalid crank direction;
- carry corruption;
- wrong carriage state;
- unzeroed registers;
- operator overrun?

## Output

What counts as a result?

- display window;
- result register;
- revolution counter;
- paper tape;
- printed table;
- plotted continuous output.

---

# Deferred / optional branches

Interesting but not core until a precise explanatory increment is identified:

- Antikythera mechanism;
- astronomical clocks/geared prediction;
- slide rules;
- harmonic analyzers;
- tide-predicting machines;
- fire-control analog computation;
- mechanical logic / control;
- Z1 and electromechanical boundary cases;
- automata / sequence-control mechanisms.

“Old and full of gears” is not a sufficient inclusion criterion.

---

# Next release gate

A strong next release should contain, at minimum:

1. a historically grounded carry comparison;
2. multiplication comparison including direct multiplication;
3. a key-driven computation slice;
4. one new arithmetic-protocol note (subtraction/division);
5. reconciled evidence labels;
6. current verification/build record;
7. a working public Pages deployment if repository settings permit.

The repository's quality bar is:

> **For every visible motion, be able to say what state changed, what source justifies the historical claim, what was simplified, and what the operator had to do.**