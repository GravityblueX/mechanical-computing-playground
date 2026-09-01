# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-carry-architecture-provenance.md`.

The previous carry-provenance slice landed as `d49b9d8585a99e33fa739b454af1b743519df618` about 31 minutes after assignment. It changed 14 files (roughly 328 additions / 103 deletions), raised the recorded suite from 150 tests in 14 files to 170 tests in 15 files, and CI passed. The prior substantial slices also generally landed in roughly 30–42 minutes. This assignment is therefore deliberately broader, while remaining one coherent question:

> In an Odhner-type rotary accumulator, why must successive carries be scheduled rather than treated as simultaneous arithmetic side effects, what failure modes did later patents explicitly identify, and how can the playground expose that engineering constraint without pretending to know unsourced angles, forces, or production geometry?

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially remaining carry/reliability gaps
6. `research/carry-architecture-source-map.md`
7. `research/carry-is-the-hard-part.md`
8. `research/multiplication-mechanisms.md`
9. `src/exhibits/carry-provenance/index.ts` and its tests
10. current carry-chain / decimal-wheel core and visible-carry UI
11. `src/mechanisms/pinwheel/index.ts`, current multiplication comparison, and relevant tests
12. `docs/REPRESENTATION_AND_PROTOCOL.md`, `docs/TEACHING_PATH.md`, `docs/VERIFICATION.md`

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

Before editing, run the current full test suite once and record the actual baseline.

# Objective

Complete four connected parts:

1. build a primary-source map for **rotary / Odhner-family carry scheduling and documented reliability constraints**, distinguishing the 1894 Odhner mechanism, Valentin Odhner's 1921 transfer improvement, and Talamini/Marchant's 1932 carry-spacing improvement;
2. add a small deterministic **P/M ordinal carry-scheduling model** that demonstrates why a chain of rotary carries needs successively ordered transfer opportunities, without inventing degrees, milliseconds, forces, or exact historical geometry;
3. extend typed provenance and the public visible-carry lesson so visitors can compare stored-energy/key-overlap carry cases already present with the distinct rotary-actuator scheduling problem;
4. update tests/status/research gaps/verification, keeping patents as evidence of described/intended mechanisms rather than proof that every production machine used an identical embodiment.

Do **not** build an Odhner emulator, source-specific gear animation, random failure simulator, torque model, or production-speed benchmark in this slice.

---

# Part A — rotary carry / reliability source map

Create a focused note, preferably:

```text
research/rotary-carry-scheduling-source-map.md
```

Use the two-axis evidence policy and keep every patent context separate.

## A1. W. T. Odhner, US 514,725 (1894) — baseline mechanism

Primary source:

- Willgodt Theophil Odhner, US 514,725, *Calculating Apparatus* (1894):
  <https://patents.google.com/patent/US514725A>

Inspect the patent text and relevant figures directly. At minimum record, at source-supported precision:

- calculating wheels with selectable projecting pins;
- intermediate wheels transmitting to registering wheels;
- the patent's statement that the intermediate wheels help ensure exact registering-wheel movement and prevent movement too far during rapid rotation;
- the tens-transfer relationship in the text around Figs. 9–10: registering-wheel pin/cam movement places a transfer arm/shoulder into position, and a normally displaced carry pin/tooth is deflected so it advances the next higher registering wheel by one tooth;
- the return of the transfer arm to normal position after the carry relationship has acted;
- addition/subtraction use opposite crank directions in the described apparatus.

Treat these as **H/E1 patented mechanism claims**. Do not say this patent proves every later Original-Odhner production revision was geometrically identical.

## A2. Valentin Jakob Odhner, US 1,377,269 (1921) — explicit rapid-rotation failure mode

Primary source:

- Valentin Jakob Odhner, US 1,377,269, *Transfer Mechanism of Calculating-Machines* (1921):
  <https://patents.google.com/patent/US1377269A/en>

This is important because it states an engineering failure mode explicitly. Record only what the patent supports:

- it identifies the earlier US514725-type transfer arm as prior art/context;
- it says that especially when the calculating wheel is rotated rapidly, the ten-pins can throw the transfer arm back from its adjusted/operative position so the carry pins do not act and **miscalculation takes place**;
- the proposed arrangement relocates the fulcrum/contact relationship to reduce the turning moment tending to throw the arm out of position;
- the patent also describes a conical contact surface intended to increase contact area / reduce wear.

This gives the repository a real documented reliability constraint, but **not** a numerical safe RPM, spring force, probability-of-failure curve, or production field-failure rate. Those remain open.

Label the patented intended improvement **H/E1**. If you discuss reliability consequences beyond the text, label the inference separately **R**, not H.

## A3. Louis Talamini / Marchant, US 1,867,603 (1932) — successive carry scheduling, spiral spacing, capacity/speed tradeoff

Primary source:

- Louis Talamini, assigned to Marchant Calculating Machine Company, US 1,867,603, *Calculating Machine* (1932):
  <https://patents.google.com/patent/US1867603>

This source explicitly describes an Odhner-type carry scheduling problem and later optimization. Record at source-supported precision:

- the patent identifies Odhner US514725 as an example of rotary tens-carrying actuators;
- additive/subtractive carry teeth are normally inactive and become active when the next-lower numeral wheel crosses `9 ↔ 0` and conditions the carry control;
- successive carry teeth **cannot all operate simultaneously**: higher-order carry opportunities must be displaced/staggered sufficiently later so a carry-created boundary crossing can condition the next higher order;
- the patent describes the resulting carry teeth as forming addition/subtraction spirals around the actuator and explains how their spacing constrains machine capacity;
- it explains the two phases of positioning a carry member and driving the next gear, then proposes overlapping those phases to reduce required peripheral spacing;
- the specification states that in the described practical experiment the safe peripheral displacement was reduced by about **22 percent** without increased care in manufacture/assembly;
- it also connects spacing/centralization constraints to attainable operating speed.

Keep the precision honest:

```text
Talamini/Marchant 1932 description of an Odhner-type architecture
!=
proof that every Odhner machine had the exact same later Marchant geometry
```

The `~22%` statement is specific to the patent's described embodiment/experiment. Do not promote it to a universal Odhner performance number.

## A4. Institutional family context

Use an institutional source only for bounded family context, not to replace the patents:

- Smithsonian/NMAH, *Pinwheel Calculating Machines*:
  <https://www.si.edu/spotlight/calculating-machines/pinwheel-calculating-machines>

It is suitable for the broad statement that Odhner-style pinwheel machines set a number by exposing pins and transfer the selected digits through crank rotation. Keep detailed carry timing/mechanism claims anchored to the patents above.

## A5. Required source-map conclusion

End the note with a compact evolution table, for example:

| Source/context | Carry problem exposed | Scheduling / transfer relationship | Evidence | Not established |
|---|---|---|---|---|
| US514725A (1894) | perform decimal transfer accurately during rotary operation | register crossing conditions arm; carry pin/tooth advances next order | H/E1 | later production universality, force/speed limits |
| US1377269A (1921) | rapid rotation can knock transfer arm out and cause miscalculation | revised fulcrum/contact relationship reduces destabilizing moment; larger contact reduces wear | H/E1 | safe RPM, field failure rate, all production revisions |
| US1867603A (1932) | cascaded carries require successive timing; spacing limits capacity | staggered/spiral carry opportunities; phase-overlap improvement | H/E1 for described patent | universal Odhner geometry; universal 22% gain |
| repository ordinal schedule | explain dependency ordering only | deterministic P/M sequence slots | P/M | angles, time, torque, geometry, failure probability |

Also list open evidence explicitly: production-revision mapping, exact materials/tolerances, lubrication/wear data, force/spring data, safe rotation rate, and measured failure envelopes.

---

# Part B — deterministic ordinal rotary-carry schedule model

Add a small mechanism module under `src/mechanisms/`, using an explicit name such as:

```text
src/mechanisms/rotary-carry-schedule/
```

This is a **P/M explanatory model**, not an Odhner geometric reconstruction.

## B1. Modeling target

Represent only the dependency that a cascade of carries must receive **successively ordered transfer opportunities** within an abstract operation cycle.

Do not encode degrees or milliseconds. Use ordinal phase/slot indices such as:

```text
order 0 boundary crossed
→ order 1 carry opportunity slot 0
→ order 1 boundary crossed by that carry
→ order 2 carry opportunity slot 1
→ ...
```

The model should make it impossible to interpret all carries as one simultaneous arithmetic mutation.

Suggested inspectable state/data:

- register width or carry depth;
- direction: add / subtract if you can model it without adding unsupported mechanics;
- current source order;
- next higher target order;
- ordinal transfer slot / phase index;
- conditioned/ready relationship;
- ordered events;
- final schedule summary.

If direction adds noise, keep the first model direction-neutral and state explicitly that source patents describe additive/subtractive paths but this P/M slice models only ordering dependency.

## B2. Required events

Choose vocabulary consistent with the repo. The observable logic should be equivalent to:

```text
BOUNDARY_CROSSED sourceOrder=0
NEXT_ORDER_CONDITIONED targetOrder=1
TRANSFER_OPPORTUNITY slot=0 targetOrder=1
BOUNDARY_CROSSED sourceOrder=1 causedByCarry=true
NEXT_ORDER_CONDITIONED targetOrder=2
TRANSFER_OPPORTUNITY slot=1 targetOrder=2
...
```

Do not name an event `TOOTH_AT_37_DEGREES`, `SPRING_RELEASE_MS`, or similar unsupported physical detail.

## B3. Replay / validation

Follow the repository's newer fail-closed pattern:

- deterministic state/action -> expected event sequence;
- replay validates stored events against expected events;
- final state/schedule is verified;
- unknown runtime events fail;
- malformed widths/orders/slot identities fail rather than being coerced.

## B4. Tests

Add focused Vitest coverage for at least:

1. one carry requires one higher-order transfer opportunity;
2. a 3-stage chain produces strictly increasing ordinal slots and preserves dependency order;
3. no two dependent carry transfers share the same slot in the P/M schedule;
4. a full-width carry-out is represented explicitly rather than indexing beyond the register;
5. deterministic identical input gives identical schedule/events;
6. replay reproduces final schedule;
7. changed slot/order/sequence fails replay;
8. omitted/inserted event fails replay;
9. unknown runtime event fails;
10. malformed width/depth/state is rejected.

Do not write a test asserting an exact historical number of degrees, milliseconds, carry teeth, or safe RPM.

---

# Part C — typed provenance and public carry comparison

Extend the existing carry provenance dataset rather than creating a competing evidence framework.

Add source-separated profiles for at least:

1. Odhner US514725A baseline transfer mechanism;
2. Valentin Odhner US1377269A rapid-rotation/miscalculation improvement;
3. Talamini/Marchant US1867603A successive/staggered carry scheduling and phase-overlap improvement;
4. Smithsonian pinwheel family context only if useful as a separate H/E2 profile.

Each profile must keep:

- stable id;
- source/model/date context;
- H/R claim type and E1–E4 strength;
- source URL;
- documented relationship/failure constraint;
- operator/architecture implication;
- non-empty `notEstablished` boundary.

Do not merge all three patents into a generic “Odhner carry” profile.

## C1. Provenance tests

At minimum verify:

- IDs remain unique;
- all new H/R profiles have source + strength + `notEstablished`;
- 1894, 1921, and 1932 patent contexts remain separate;
- the 1921 profile is the one that records rapid-rotation miscalculation risk;
- the 1932 profile does not present the ~22% spacing result as a universal Odhner number;
- the 1932 Marchant patent is not mislabeled as an Odhner-authored patent.

## C2. Visible-carry integration

Keep the existing `#/visible-carry` interactive generic carry lesson unchanged as the P/M arithmetic base. Add a compact bilingual subsection/group for **rotary carry scheduling / reliability**.

It should answer visibly:

```text
Why can't a rotary carry chain just happen “all at once”?
What can go wrong if the transfer element is not reliably conditioned at speed?
Why did later designers care about spacing/phase overlap?
```

Show the new ordinal P/M schedule for a short 2–3 transfer chain, but label it clearly:

- ordinal dependency only;
- not historical angular spacing;
- not timing in milliseconds;
- not a failure-probability simulator.

Beside it, show the three source contexts with source/model/date, claim/evidence strength, documented point, and `not established` text.

No source-specific gear, arm, cam, spring, or spiral drawing is required. A textual/ordinal timeline is preferable.

---

# Part D — docs and verification

After Parts A–C are real:

- update `STATUS.md` to record the source-backed rotary carry/reliability map and ordinal P/M scheduler;
- update `TODO.md` only if this completed slice genuinely belongs in the short queue;
- update the carry row in `docs/REPRESENTATION_AND_PROTOCOL.md` if the new rotary scheduling evidence materially improves it;
- update `docs/TEACHING_PATH.md` so visitors can discover the rotary scheduling comparison;
- update `research/carry-is-the-hard-part.md` with a concise pointer to the new source map and the documented rapid-rotation/staggering problem;
- update only the relevant carry/reliability portions of `docs/RESEARCH_GAPS.md`;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and commands run;
- README only if needed for discoverability.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a local browser smoke check for `#/visible-carry` in English and Chinese if the established tooling makes that practical. Record exactly what was checked; do not claim a browser run you did not perform.

# Acceptance

The finished slice must let a visitor/test answer all of these without unsourced geometry:

1. How does US514725A describe a carry reaching the next registering order?
2. What exact rapid-operation failure does US1377269A say could cause miscalculation?
3. Why does US1867603A say successive carries must be staggered rather than simultaneous?
4. What did the 1932 patent claim to improve by overlapping operation phases, and what does its ~22% experimental statement **not** prove universally?
5. Can the repository show a carry dependency schedule without pretending ordinal slots are historical angles/times?
6. Does tampering that schedule fail closed?

# Evidence boundaries

- decimal carry relation: **M**;
- repository ordinal schedule/event order: **P/M**;
- US514725A, US1377269A, US1867603A: **H/E1** for the mechanisms/failure constraints described in those patents;
- Smithsonian pinwheel family page: **H/E2** for broad identified family context;
- a patent proves the described/intended embodiment, not universal production implementation;
- the 1932 ~22% result belongs to the patent's described practical experiment, not all pinwheel calculators;
- do not infer safe RPM, spring constants, torque, tolerances, wear life, lubrication intervals, field failure frequency, or precise angular timing without additional sources;
- do not label Talamini/Marchant's later improvement as Odhner's own 1894 design.

# Stop conditions

Stop and record a precise blocker rather than guessing if:

- one of the three primary patent texts cannot actually be inspected and the requested claim depends on it;
- implementing an ordinal scheduler would require rewriting unrelated shared carry APIs;
- the current visible-carry page cannot accept another source group without a broad UI redesign; in that case keep the source map + typed profiles + tested scheduler and add only a minimal discoverability link;
- a source-specific geometry claim becomes necessary to proceed;
- a conflicting rotary-carry implementation has already landed on remote `main`.

If all required work finishes substantially before the target duration, use remaining time only on this same question: strengthen tamper tests, add more exact figure/claim anchors from the three patents, improve bilingual/accessibility text-state visibility, or inspect a production/manual source that can genuinely narrow one `notEstablished` field. **Do not start a torque/random-failure simulator or another machine family.**

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect existing modules/tests before creating parallel abstractions;
- one coherent implementation checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after tests pass;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: model rotary carry scheduling constraints
```
