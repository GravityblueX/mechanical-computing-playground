# Research gaps / 还值得写什么

Checked 2026-09-01.

The repository already has enough software scaffolding to demonstrate several ideas. The next useful work is **not** to keep adding famous machine names. It is to fill missing mechanism families, operator protocols, and source chains that change how computation is understood.

This document is a research queue, not a promise that every topic becomes a full emulator.

## Priority 0 — Fix the evidence layer before adding visual detail

### 0.1 Carry should become a historical comparison, not only an abstract event chain

Current state:

- deterministic `0099 + 1` carry events exist;
- `research/carry-architecture-source-map.md` now separates Pascal's operational text, Cnam's sautoir description, a CMU reconstruction, Felt US366945A, Felt US762520A, and the Smithsonian Model A catalog context;
- the visible-carry lesson compares those responsibilities without treating its P/M arrows/events as historical geometry;
- key-driven carry replay now rejects altered, omitted, inserted, unknown, or final-state-mismatched trace data;
- `research/rotary-carry-scheduling-source-map.md` separates Odhner US514725A baseline transfer, US1377269A's explicit rapid-rotation miscalculation risk, and Talamini/Marchant US1867603A staggered/phase-overlap improvement;
- a tested direction-neutral P/M scheduler exposes strictly ordered transfer slots and fails closed on trace tampering;
- `research/stepped-drum-carry-source-map.md` now separates Thomas 1820 patent/object boundaries, 1865 overrun/sequential-phasing/simultaneous-load evidence, the 1880 simplification proposal, and non-E1 production interpretation.

What remains:

1. primary/facsimile Pascaline drawing anchors beyond the operational `Avis`;
2. exact production-revision mapping between US762520A and surviving Model A mechanisms;
3. exact Thomas 1850/1851/1865 production mapping, factory instructions, direct mechanism measurements, and stronger 1880 adoption census;
4. production-revision mapping for the rotary patents;
5. source-specific force/contact-load, material, lubrication, tolerance, wear, safe-rate, and measured failure-envelope data before reliability modeling.

Good starting sources:

- ACONIT / Inria virtual museum, Pascaline: <https://aconit.inria.fr/omeka/exhibits/show/histoire-machines/prehistoire/pascaline.html>
- CMU Pascaline reconstruction materials: <https://www.cs.cmu.edu/~dst/Pascaline/>
- Smithsonian Comptometer object group: <https://www.si.edu/spotlight/adding-machines/full-keyboard-hill-to-felt-tarrant>
- Smithsonian Model A Comptometer record: <https://americanhistory.si.edu/collections/object/nmah_690484>

Completed bounded deliverable:

- explanatory essay linked to a source-separated carry map;
- typed provenance and a public carry-architecture comparison;
- no source-specific linkage drawing.

### 0.2 Named-machine pages need page/figure-level source anchors

The Curta, Analytical Engine, and Differential Analyzer tracks currently have explanatory value but thin provenance.

For each named machine, the next research pass should record:

- exact edition / model / revision;
- primary manual, patent, drawing, or artifact record;
- what part of the software model corresponds to that source;
- what is not known;
- whether a modern reconstruction is being followed.

A source list with five URLs is not enough if the UI shows a specific internal sequence.

---

## Priority 1 — Multiplication architecture is missing its most important contrast

The current comparison focuses on repeated addition, stepped drums, and pinwheels. But stepped-drum and pinwheel machines often share the same **operator-level repeated-addition algorithm**: set a multiplicand, crank according to a multiplier digit, shift the carriage, repeat.

That means the repository currently compares two actuator architectures without yet showing the stronger algorithmic break: **direct multiplication**.

### Add: Millionaire / direct-multiplication track

Why it matters:

- the user sets a multiplier digit;
- one operating cycle can select the appropriate multiple instead of requiring that many repeated cranks;
- the mechanism therefore embodies part of the multiplication table.

Strong starting sources:

- Smithsonian direct multiplication group: <https://www.si.edu/spotlight/calculating-machines/direct-multiplication-calculating-machines>
- Smithsonian Millionaire object: <https://www.si.edu/object/nmah_694168>
- Otto Steiger, US 538,710 (1895): <https://patents.google.com/patent/US538710A/en>
- Otto Steiger, US 558,913 (1896): <https://patents.google.com/patent/US558913A/en>

The 1896 patent is especially useful because it explicitly describes a control mechanism as a mechanical representative of the multiplication table.

Recommended exhibit comparison:

```text
314 × 27

A. repeated addition baseline
B. stepped drum + carriage
C. pinwheel + carriage
D. direct multiplication / Millionaire-style control
```

Report not only result and crank count, but also:

- what was pre-encoded in geometry;
- what the operator had to repeat;
- what state the machine had to store;
- what changed when the carriage shifted;
- where the multiplication table “lived.”

---

## Priority 2 — Input architecture / human-machine protocol

### Add: Comptometer and key-driven computation

The repository is currently crank-centric. That hides an important design change: in a Comptometer, depressing a key does not merely set a future value. The keystroke itself enters that amount into the mechanism.

Smithsonian overview:

<https://www.si.edu/spotlight/adding-machines/full-keyboard-hill-to-felt-tarrant>

Useful object records include:

- early wooden-box Comptometer: <https://americanhistory.si.edu/collections/object/nmah_690456>
- Model A / duplex behavior: <https://americanhistory.si.edu/collections/object/nmah_690484>

Questions worth modeling:

- `set → crank` versus `press → accumulate`;
- one digit column versus multiple simultaneous key columns;
- how key travel can encode digit magnitude;
- correction after a partial keystroke;
- carry under fast multi-column entry;
- subtraction aids such as complementary digits and carry-control levers.

This should become `research/key-driven-computation.md` before any keyboard animation is added.

---

## Priority 3 — Arithmetic beyond addition and multiplication

The current repository says relatively little about how mechanical machines implement the operations users actually had to perform.

### 3.1 Subtraction and complement arithmetic

Write a cross-machine note on at least:

- Pascaline complement-based subtraction;
- complementary key legends on adding machines;
- machines where crank direction changes between addition/multiplication and subtraction/division.

Questions:

- Is subtraction a reverse motion, a complement representation, a separate mode, or some combination?
- Does the carry mechanism remain reversible?
- What does the operator have to remember?

### 3.2 Division as operator-controlled iteration

For stepped-drum/pinwheel machines, division is a particularly good example of human + mechanism cooperation.

Model:

- repeated subtraction;
- carriage position;
- revolution counter;
- overshoot and correction;
- sign / crank direction where supported.

Do not hide the operator's decision loop behind a single `divide(a,b)` function.

### 3.3 Square root and derived procedures

Curta documentation and historical calculator manuals often include procedures for square roots and other derived computations. These are useful only if the project treats them as **operator algorithms implemented on a limited machine**, not as extra built-in arithmetic instructions.

---

## Priority 4 — Control, correction, and machine safety are part of computation

Mechanical calculators contain mechanisms that do not directly represent a number but are essential to reliable operation.

Research topics:

- zeroing / clearing registers;
- carriage locks;
- crank locks and zero-position interlocks;
- correction keys;
- partial-keystroke detection;
- preventing operation during an invalid setting transition;
- overflow indication;
- carry inhibition where required by subtraction conventions.

Primary-source starting point for an Odhner-family locking problem:

- Valentin Jakob Odhner, US 1,510,100 (1924), crank/calculating-disc locking: <https://patents.google.com/patent/US1510100A/en>

These are a natural fit for the repository's explicit state-machine architecture because an interlock is literally a transition rule: **this action is not permitted in this state**.

---

## Priority 5 — Representation should become a cross-machine topic

The project already asks “where does the number exist?” but has not yet turned that into a systematic comparison.

Write a note/table covering:

| Machine family | Input representation | Working representation | Result representation | Operation control |
|---|---|---|---|---|
| Pascaline | dial motion | wheel positions | display drums/windows | stylus/manual |
| Thomas-style arithmometer | setting levers | stepped-drum engagement + registers | result register | crank + carriage |
| Odhner-style pinwheel | setting levers | number of protruding pins + registers | result register | crank + carriage |
| Comptometer | key travel / column key | accumulator/register | numeral wheels | keystroke |
| Millionaire | setting levers + multiplier selector | multiplication-table control + registers | result register | selector + crank |
| Differential Analyzer | shaft rotation | continuous angular quantity | plotted/read continuous output | coupled shafts |

Every row must be source-backed at the precision stated; the table above is a research scaffold, not final historical proof.

This comparison would make the repository's “information flow” theme much more coherent.

---

## Priority 6 — Continuous mechanical computing needs more than one integrator

The existing continuous integrator is enough as a software seed, but the research line should distinguish several families:

- planimeters: integrate area by tracing a boundary;
- mechanical integrators: integrate a plotted curve;
- differential analyzers: couple integrators to solve differential equations;
- specialized analog machines: fire-control, tide prediction, harmonic analysis, etc. only if they add a clear mechanism lesson.

Starting source:

- Smithsonian, Mechanical Integrators and Differential Analyzers: <https://www.si.edu/spotlight/mechanical-integrators>

Do not make “analog computer” one undifferentiated category. The key research question is how a continuous physical quantity is represented, coupled, integrated, and read out.

---

## Priority 7 — Output and audit trail

The repository focuses heavily on internal state. Historical business machines also changed computation by changing the **output contract**.

Worth writing:

- non-printing result register vs printed paper tape;
- total / subtotal semantics;
- red/black printing and audit conventions;
- tabulation / carriage movement in adding machines;
- Difference Engine printing/stereotyping ambitions as a different response to transcription error.

This is where computation connects to office practice, bookkeeping, and trust.

A useful exhibit would show that “output” is not always a number on a display: it may be a persistent record designed to reduce re-copying and verification labor.

---

## Priority 8 — Reliability, torque, tolerance, and wear

This is a high-value but source-sensitive future line. US1377269A provides one explicit H/E1 rapid-rotation/transfer-arm miscalculation risk and a wear-reduction design claim; US1867603A provides H/E1 spacing/capacity/speed reasoning plus a bounded ~22% experiment. Thomas 1865 adds H/E1 dial overrun, simultaneous-load/plate-lift false-result, moderation and full-position conditioning claims. The repository models only ordinal dependency—not reliability probability.

Questions:

- why long carry chains create force/timing problems;
- where springs, latches, detents, or stored energy decouple loads;
- backlash and lost motion;
- manufacturing tolerances;
- lubrication and wear;
- maximum safe operating speed;
- why later designs add locks/correction mechanisms.

Do not implement random “gear failure” animations without evidence. A reliability model should be tied to a documented mechanism or clearly labeled engineering experiment.

---

## Priority 9 — Commercial and labor context, without turning into a generic social history

A short context layer is useful because mechanical calculators were working tools, not only inventions.

Smithsonian's calculating-machine overview notes use by scientists, engineers, statisticians, actuaries, government officials, payroll clerks, and business students, and the eventual displacement of mechanical calculators by inexpensive electronic calculators in the 1970s:

<https://www.si.edu/spotlight/calculating-machines>

Research questions relevant to this repository:

- what operator skill was required by different machine families?
- which operations were mechanized and which remained procedural knowledge?
- how did keyboard design change throughput and training?
- when did printing change verification work?

Keep the focus on **human-machine division of arithmetic labor**.

---

## Priority 10 — Things that are interesting but should not displace the core

Possible later branches:

- Antikythera mechanism;
- astronomical clocks and geared prediction;
- slide rules;
- harmonic analyzers;
- tide-predicting machines;
- mechanical logic and pre-electronic control;
- Z1 / electromechanical boundary cases;
- mechanical toys or automata that encode sequences.

These should be added only when the repository can state the specific computational mechanism it wants to expose. “It has gears and is old” is not enough.

## Files that should be written or expanded next

Recommended order:

1. `research/carry-is-the-hard-part.md` — expand with Pascaline + Comptometer cases;
2. `research/multiplication-mechanisms.md` — add direct multiplication / Millionaire and primary sources;
3. `research/key-driven-computation.md` — new;
4. `research/subtraction-and-division.md` — new;
5. `research/simulator-matrix.md` — complete the old backlog item;
6. `research/curta-source-map.md` — turn placeholder into page/figure-level source map;
7. `research/analytical-engine-information-flow.md` — primary-source and emulator provenance pass;
8. `research/differential-analyzer.md` — strengthen continuous-mechanics evidence;
9. `docs/REPRESENTATION_COMPARISON.md` — cross-machine “where does the number live?” table;
10. `docs/OPERATOR_PROTOCOLS.md` — cross-machine human action / interlock / correction comparison.

The governing rule is simple:

> Add a machine only when it teaches a mechanism or operator protocol that the existing machines do not already teach.