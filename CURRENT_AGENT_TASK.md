# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: roughly 75–90 minutes
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-analytical-engine-flow.md`.

The last two substantial source+implementation slices each completed in roughly 32–34 minutes despite larger estimates. This assignment is intentionally broader, but it is still one coherent theme: **make the continuous-mechanical-computing line as evidence-aware and inspectable as the newer discrete-mechanism lessons**. Do not compensate for spare time by inventing geometry or starting unrelated machines.

Administrator preflight since the previous agent checkpoint:

- PR #3 was reviewed and merged: unknown direct-multiplication event discriminators now fail closed;
- PR #4 was reviewed and merged: unknown setting–crank action/event discriminators now fail closed;
- PR #5 was reviewed and merged: unknown operator-division action/event discriminators now fail closed;
- current main after those merges is at least `be1b5c80dca1d88553997236669859460a26a067` plus the task-archive/assignment documentation commits;
- main CI run `33449580167` passed for `be1b5c80dca1d88553997236669859460a26a067`;
- there were no open PRs after those merges.

Fetch/pull again before work; remote `main` always wins over the SHA above.

## Read before work

Read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2, Priority 5, and Priority 6
6. `docs/PRIOR_ART.md`
7. `research/differential-analyzer.md`
8. `src/mechanisms/continuous-integrator/index.ts`
9. current `#/continuous` rendering and any imports/usages in `src/main.ts`
10. existing replay/tamper-validation patterns in direct multiplier, operator division, setting–crank interlock, and Analytical Engine flow
11. relevant tests and `docs/VERIFICATION.md`
12. `docs/PUBLISHING.md` only if deployment verification is touched

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as a task source.

Before changing code, run the full current test suite once. The three merged hardening PRs added regression tests after the 91-test Analytical Engine checkpoint, so record the **actual** baseline rather than assuming the old count.

# Objective

Turn the current one-paragraph Differential Analyzer note and minimal Euler-like helper into a source-backed, deterministic **continuous-mechanics teaching line** that answers three separate questions without conflating them:

> What do surviving Bush Differential Analyzer components and contemporary publications actually establish?

> What mathematical relation does an integrator represent?

> What event ordering and sampling does this repository introduce only so a browser visitor can inspect a continuous process step by step?

The result should improve `research/differential-analyzer.md`, harden the generic continuous-integrator state/replay model, and upgrade `#/continuous` into a small evidence-aware workbench. It must **not** become a full Differential Analyzer emulator or a source-specific geometric reconstruction.

A final required comparison document should then connect this continuous representation/protocol to the discrete machine families already implemented.

---

# Part A — replace the Differential Analyzer placeholder with a real provenance map

`research/differential-analyzer.md` is currently only one paragraph. Replace it with a source/provenance note following `docs/EVIDENCE_POLICY.md`:

```text
Question
Claim types
Sources
What each source directly establishes
What is reconstructed/inferred
What this repository simplifies
Implementation consequence
Uncertainties
Date checked
```

## A1. Vannevar Bush, 1931

Primary publication to identify precisely:

- Vannevar Bush, “The Differential Analyzer. A New Machine for Solving Differential Equations,” *Journal of the Franklin Institute*, vol. 212, no. 4 (October 1931), pp. 447–488.

Use an accessible scan/facsimile or institutional bibliographic record if you can locate one. If the available environment only establishes publication metadata, figures, or secondary descriptions, say exactly that. Do not quote or assign figure/page claims you did not actually inspect.

The paper is **H/E1** for what Bush published about the 1931 machine. It is not proof that every later Differential Analyzer shared the same construction.

## A2. Smithsonian / National Museum of American History object records

Use the institutional object group and individual records as strong anchors for surviving components and their catalogued functions:

- Differential Analyzer Parts and Documentation:
  <https://americanhistory.si.edu/collections/object-groups/mechanical-integrators/differential-analyzers>
- Integrator Unit from Bush Differential Analyzer, `MA.314824`:
  <https://www.si.edu/object/integrator-unit-bush-differential-analyzer%3Anmah_1215155>
- Input Table Carriage, `1983.3002.01`:
  <https://www.si.edu/object/input-table-carriage-bush-differential-analyzer%3Anmah_693232>
- Adder / Differential Gear, `1983.3002.02`:
  <https://www.si.edu/object/nmah_693233>
- Output Table Carriage / Tracer, `1983.3002.03`:
  <https://www.si.edu/object/carriage-and-tracer-output-table-bush-differential-analyzer%3Anmah_693234>

Important catalogued relationships worth checking precisely rather than generalizing:

- the surviving integrator unit contains two of the six original integrators associated with the MIT analyzer;
- an input-table carriage converted a traced graph motion into shaft motion sent into the machine;
- the catalogued differential gear combined two shaft rotations so an output represented their sum;
- the output-table tracer converted result-shaft rotation into a drawn result.

Use these records as **H/E1 for the surviving/catalogued component and the museum-described role**. Do not infer that these four specific surviving objects were always wired in one fixed chain or that their catalog prose gives complete internal geometry.

Do not copy Smithsonian images merely because the records expose them. Link records unless image reuse is separately justified/licensed.

## A3. Near-contemporary mathematical/engineering interpretation

Useful anchor:

- Claude E. Shannon, “Mathematical Theory of the Differential Analyzer,” 1941, DOI `10.1002/sapm1941201337`.

Use Shannon for mathematical/system interpretation at the precision actually supported by the paper; it is not an original 1930 artifact record.

Also distinguish the later MIT machine generation from the original analyzer. Bush & Caldwell’s 1945 “A New Type of Differential Analyzer” belongs to a later machine and must not be silently used as the geometry of the ca. 1930 components.

## A4. Machine-generation boundary

The note must explicitly separate at least:

```text
original MIT analyzer / ca. 1930 surviving components
1931 Bush publication
later improved MIT/Rockefeller analyzer work
postwar GE/UCLA components in Smithsonian collections
modern historical reconstruction/interpretation
this repository's P/M continuous lesson
```

Do not flatten all of these into “the Differential Analyzer.”

## A5. Required project decision

End the note by stating exactly what the browser model will claim:

- shaft/continuous quantity, addition relation, integration relation, and plotted output are taught as **functional relationships**;
- any discrete event order / sample interval exists only so the browser can inspect and replay the relation and is **P/M**, not historical machine timing;
- no cams, disk/wheel geometry, torque amplifier geometry, shaft layout, backlash, scale factor, or physical dimensions are claimed unless separately sourced;
- the current lesson is a mechanism-level teaching model, not an emulator of Bush's complete analyzer.

---

# Part B — harden `continuous-integrator` into a deterministic inspectable model

The current module is essentially:

```text
state = { time, input, output, step }
output += input * step
```

That is useful mathematically but too thin for the repository's current state/event/replay standard and can accidentally look like “this is how the historical machine ticks.”

Refactor conservatively under `src/mechanisms/continuous-integrator/`.

## B1. Preserve the correct abstraction boundary

The model should express a generic relation equivalent to:

```text
independent quantity advances
input rate / shaft quantity is observed for the teaching interval
integrated output advances by the represented relation
```

The browser may discretize observation into steps, but the code/UI must label the sample/step as a **P/M inspection device**, not as a historical crank, gear tooth, clock tick, or claim about physical Differential Analyzer timing.

Keep existing public imports working through wrappers if that is cleaner, or migrate all current usages/tests coherently. Do not leave two contradictory integrator semantics.

## B2. Minimum state

Use finite, validated numeric state and explicit naming. Include at least:

- independent variable / teaching coordinate;
- current input rate or represented input quantity;
- integrated output quantity;
- sample/inspection interval;
- cycle/sample count;
- ordered sequence identity;
- claim/model metadata only if it genuinely aids inspection.

Do not call the independent variable “time” unless the fixture specifically models time; Differential Analyzers could represent more general independent variables.

## B3. Actions/events/replay

Use deterministic actions/events or an immutable trace builder consistent with current repository patterns. The visitor/test must be able to inspect a cycle equivalent to:

```text
INPUT_QUANTITY_OBSERVED
INDEPENDENT_QUANTITY_ADVANCED
INTEGRATED_QUANTITY_ADVANCED
```

Names may differ if a better vocabulary emerges.

Requirements:

- same state + action → identical ordered events/state;
- replay from initial state + events reproduces final state;
- sequence tampering fails;
- arithmetic tampering fails;
- unknown serialized action/event discriminators fail closed where runtime union boundaries exist;
- NaN/Infinity/non-positive interval and impossible state are rejected;
- do not trust arbitrary serialized `outputAfter`; recompute/validate the mathematical relation.

Use floating-point tolerances intentionally in tests where necessary rather than brittle accidental equality.

---

# Part C — upgrade `#/continuous` into an evidence-aware continuous-mechanics workbench

Do not build 3D/physics. Use the existing site style and current deterministic-inspector patterns.

## C1. Default functional teaching chain

Use a small P/M fixture inspired by roles directly documented in the Smithsonian records, for example:

```text
input shaft A quantity
input shaft B quantity
→ adder/differential relation c = a + b
→ generic integrator relation over an inspection interval
→ output quantity
→ output-tracer role
```

Use simple values whose arithmetic is obvious, e.g. `a=2`, `b=1`, summed rate `3`, interval `0.5`, integrated contribution `1.5`. You may choose equally clear values.

Critical boundary:

- Smithsonian documents these component **roles** on surviving Bush Analyzer components;
- the repository's exact connection of those roles into one tiny five-step example is **P/M** unless a source explicitly establishes that exact wiring;
- the serialized order is for inspection/replay, not a claim that the physical machine operated in stop-motion phases.

If the existing architecture makes a separate `continuous-flow` exhibit module cleaner than putting all logic in `main.ts`, do that. Core arithmetic/state must not live only in the DOM renderer.

## C2. Minimum visitor affordances

Provide:

- reset;
- step one event/inspection phase;
- optional complete-one-cycle control if cheap;
- current input A/B quantities;
- adder output / effective integrator input;
- independent coordinate and sample interval;
- integrator before/after quantity;
- current output/tracer state;
- ordered text event log;
- bilingual explanatory text;
- keyboard access for the main step control if consistent with the current routes;
- no meaning available only through color/motion.

The route must visibly distinguish:

```text
H/E1 museum-documented component role
M integration/addition relation
P/M tiny browser connection + serialized observation order
open/unmodeled physical geometry
```

Do not describe the current discrete helper as “a faithful Differential Analyzer simulation.”

## C3. Focused tests

Add tests sufficient to prove at least:

1. a constant input relation integrates to the expected result for the default fixture;
2. the adder relation used by the workbench is explicit rather than hidden in UI arithmetic;
3. integrated output is not available before the appropriate integration event;
4. output/tracer state is not populated before the output event;
5. repeated cycles advance the independent quantity and accumulated output deterministically;
6. replay reproduces final state;
7. sequence tampering is rejected;
8. altered input/sum/integration result fields are rejected;
9. unknown serialized event/action types fail closed if such a boundary exists;
10. invalid finite values / interval are rejected;
11. the model remains a P/M sample/inspection abstraction and does not introduce source-specific geometry metadata as if it were historical state.

Do not introduce a new browser-testing framework solely for this task.

---

# Part D — required bounded cross-machine comparison document

After Parts A–C are working, create:

```text
docs/REPRESENTATION_AND_PROTOCOL.md
```

This is deliberately required because the repository now has enough implemented families for the cross-machine idea to become useful, and the previous source-heavy tasks have been completing well under budget.

Keep it concise and source-aware. Compare **only** these already-supported rows:

1. Pascaline / dial-and-carry case;
2. generic stepped-drum or pinwheel set→crank family (one combined row is fine if distinctions are stated);
3. key-driven / Comptometer-informed P/M model;
4. direct-multiplication / Millionaire-informed P/M model;
5. Analytical Engine information-flow lesson;
6. continuous / Differential Analyzer-informed lesson.

Use these axes:

```text
input representation
working numeric/physical representation
human action that advances computation
operation/control representation
carry/correction/interlock or equivalent constraint
output contract
historical source boundary
repository P/M boundary
open/unverified detail
```

Rules:

- reuse the repository's existing source notes rather than starting six new research projects;
- every historical cell must be supportable by the cited research note/source at the precision stated;
- use `open / unverified` rather than smoothing over a gap;
- do not imply that “shaft rotation = memory,” “Mill = CPU,” or other modern analogies are identities;
- the point is to answer **where the number/control lives and what the human must do**, not to rank machines.

If a row cannot be supported without new source research, leave the exact cell open and say why.

---

# Documentation and verification reconciliation

After implementation/tests are real:

- update `STATUS.md` to reflect the strengthened Differential Analyzer provenance and continuous workbench;
- update `TODO.md` to mark `research/differential-analyzer.md` strengthened only if Part A is genuinely complete;
- add `docs/REPRESENTATION_AND_PROTOCOL.md` to README/teaching navigation only if the link is genuinely useful; avoid README churn for its own sake;
- update `docs/VERIFICATION.md` with:
  - the post-PR-merge baseline if observed;
  - all commands actually run;
  - final test count/files;
  - local `#/continuous` smoke results;
  - deployment state only if actually checked;
- keep `ROADMAP.md` changes minimal unless the new comparison materially closes/reframes a track;
- do not rewrite `docs/RESEARCH_GAPS.md` as a status ledger.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a bounded local browser smoke check of `#/continuous`:

- initial/reset state;
- event stepping;
- visible adder/integrator/output state;
- no obvious desktop horizontal overflow;
- bilingual text/state remains readable.

If the final commit's Pages deployment completes while you are still working and the public route is reachable, you may record a deployed smoke check. Otherwise do not wait indefinitely and do not claim the new route live merely because an older deployment is live.

One coherent commit is fine; a research checkpoint followed by implementation/docs is also fine. Push all required work, then stop.

Suggested final subject:

```text
feat: ground continuous mechanical integration
```

---

# Optional early-finish work

Only if Parts A–D, full tests/build, browser smoke, docs reconciliation, commit and push are genuinely complete with substantial time remaining, spend at most one small additional checkpoint **scoping** the next named-machine evidence task:

```text
research/difference-engine-source-map.md
```

Do not implement new Difference Engine geometry. A useful optional checkpoint would only identify primary/museum/reconstruction sources, exact questions to resolve, and how they map to the already-existing finite-difference teaching model.

If completing the optional work would delay or weaken the required continuous slice, skip it.

# Evidence and stop conditions

Stop and record a precise blocker rather than guessing if:

- you cannot distinguish the original MIT analyzer from later improved or GE/UCLA machines at the precision needed for a claim;
- a museum record establishes a component exists but not the connection/timing you want to draw;
- a full Bush paper/facsimile is unavailable and an exact page/figure claim would therefore be invented;
- modeling real disk-and-wheel geometry, torque amplification, backlash, frontlash, shaft layout, or scale factors becomes necessary;
- the continuous model starts becoming a numerical ODE solver hidden behind historical language;
- shared replay changes would require a broad incompatible migration;
- a concurrent implementation of the same continuous track lands on remote `main`.

The intended result is **not** “we simulated a Differential Analyzer.” It is a tested lesson where a visitor can see a continuous quantity relation, addition/integration/output flow, and the boundary between surviving historical component roles and this repository's own inspectable browser model.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work and again before final push if substantial time has passed;
- inspect current code/tests before creating parallel abstractions;
- preserve the three newly merged discriminator-hardening fixes;
- do not fold unrelated cleanup into this task;
- inspect the final diff;
- run all acceptance commands;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.
