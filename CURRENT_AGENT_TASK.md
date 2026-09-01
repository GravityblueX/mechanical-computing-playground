# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: roughly 90–120 minutes by old estimates; recent agent throughput suggests this should occupy about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-continuous-mechanics.md`.

The previous continuous-mechanics assignment landed as `2e39ab12b162b2e06bf147a2fb6e94409c4d7736` and passed push CI run `33452190710`. It delivered 108 passing tests across 12 files plus the continuous browser smoke check. There were no open PRs at administrator review time.

Recent substantial source+implementation slices have repeatedly completed in about 32–34 minutes despite nominal 75–90 minute estimates. This assignment is intentionally broader, but remains one coherent question:

> A Difference Engine is not only a machine that produces the next number. What changes when the output contract is designed to carry a computed table value into a persistent printed or stereotyping workflow without a human re-copy step?

Fetch/pull remote `main` before starting. Remote state always wins over the SHA above.

## Read before work

Read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2 and Priority 7
6. `docs/PRIOR_ART.md`
7. `research/difference-engine-addition.md`
8. `research/finite-difference-design.md`
9. `src/mechanisms/difference-column/index.ts`
10. `tests/difference-column.test.ts` and any finite-difference coverage in other tests
11. the current `#/finite-difference` renderer/state in `src/main.ts`
12. replay/tamper-validation patterns already used by direct multiplier, operator division, setting–crank interlock, Analytical Engine flow, and continuous integration
13. `docs/VERIFICATION.md`

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as a task source.

Before editing, run the full current test suite once and record the actual baseline.

# Objective

Complete four connected pieces:

1. build a proper **Difference Engine provenance/source map** that distinguishes Babbage design, surviving fragment, modern reconstruction, and actually built Scheutz difference engines;
2. harden the existing generic `difference-column` P/M replay model to the repository's current deterministic/tamper-resistant standard;
3. add a small tested **tabular-output teaching flow** that separates “a value has been computed” from “a persistent output artifact has been produced,” without pretending to reconstruct Babbage's printer geometry;
4. upgrade `#/finite-difference` so the visitor can see the calculation/output boundary and the historical evidence boundary in the same lesson.

Do not build a full Difference Engine emulator, printer animation, type-setting mechanism, stereotype press, or source-specific gear geometry.

---

# Part A — create `research/difference-engine-source-map.md`

The current `research/difference-engine-addition.md` is only a short mathematical note. Keep it if it remains useful, but create a dedicated source/provenance map for named-machine claims.

Use the two-axis policy in `docs/EVIDENCE_POLICY.md` and structure the note approximately as:

```text
Question
Claim types
Machine/design generations
Sources
What each source directly establishes
What later reconstruction establishes
What this repository models
Output/printing boundary
Open/unverified details
Implementation consequences
Date checked
```

## A1. Difference Engine No. 1 boundary

Strong institutional anchor:

- Science Museum Group, `Difference Engine No. 1`, object `co62243`:
  <https://collection.sciencemuseumgroup.org.uk/objects/co62243/difference-engine-no-1-difference-engine>

Record only what the source supports at the precision inspected:

- the surviving 1832 portion was assembled by Joseph Clement;
- it is only a portion of the planned engine, not the completed whole machine;
- the Difference Engine project aimed to calculate numerical series by finite differences and automatically print results.

Do not use the surviving fragment as proof that every planned printing/output mechanism was physically completed in 1832.

## A2. Difference Engine No. 2 design versus modern reconstruction

Use both an institutional object record and a reconstruction/history source:

- Science Museum Group, `Babbage's Difference Engine No 2, 2002`, object `co62748` (or the canonical current equivalent):
  <https://collection.sciencemuseumgroup.org.uk/objects/co62748>
- Computer History Museum, `The Engines`:
  <https://www.computerhistory.org/babbage/engines>
- Computer History Museum, `A Modern Sequel`:
  <https://www.computerhistory.org/babbage/modernsequel/>

Keep these layers separate:

```text
1847–1849 Babbage design
1991 completion of modern calculating section
2002 completion/addition of modern printing/stereotyping apparatus
modern manufacturing drawings/decisions needed to build from historical plans
```

The Science Museum/CHM reconstruction is **R with strong institutional evidence**, not a machine Babbage completed in his lifetime.

Important output relationship supported by the CHM material:

- Difference Engine No. 2 and the Analytical Engine printer design support hardcopy/check-copy output and stereotyping at the design/reconstruction level;
- the printer/output apparatus can format tabular output;
- this matters because the output chain was intended to reduce transcription/typesetting error, not merely display a result.

Do not copy marketing superlatives or infer exact printer timing from overview prose.

## A3. Babbage Papers drawing-level anchors

Use the Science Museum Group archive records for the output apparatus. At minimum inspect and record the identifiers/relationships around:

- `BAB/A/173` — plan of inking, printing and stereotype apparatus;
- `BAB/A/174` — rack/pinions connecting table figure wheels with printing/stereotype sectors;
- `BAB/A/175` — cams associated with stereotype/paper-roller actions;
- `BAB/A/176` — calculating part with means of conveying numbers to stereotype sectors;
- the catalog page/record grouping these drawings, including the tracing record exposed as `BAB/B/014` where applicable:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000344>

These archive records are **H/E1 for the existence, date/catalog identity, and described subject of the drawings**. Unless you actually inspect a legible facsimile in enough detail, do not claim tooth counts, motion sequence, dimensions, or exact linkage paths from the titles alone.

Record exact identifiers so later geometry work knows where to return.

## A4. Actually built printing difference engines: Scheutz boundary

This comparison is required because it prevents the note from becoming “Babbage design = nineteenth-century deployed machine.”

Use:

- Smithsonian/National Museum of American History, Scheutz Difference Engine, `MA.323659` / record `nmah_997042`:
  <https://americanhistory.si.edu/collections/object/nmah_997042>
- Smithsonian difference-engine group:
  <https://americanhistory.si.edu/it/collections/object-groups/calculating-machines/difference-engines>
- Computer History Museum, Georg & Edvard Scheutz:
  <https://www.computerhistory.org/babbage/georgedvardscheutz/>
- Science Museum Group, Scheutz Difference Engine, third model, 1859, object `1914-122/1` / `co62255`:
  <https://collection.sciencemuseumgroup.org.uk/objects/co62255>

At the precision these sources support, distinguish:

- Scheutz working prototype (1843) and later metal machines;
- the 1853 machine now at Smithsonian;
- the 1859 machine associated with the English Life Table workflow;
- historically built/used printing calculators versus Babbage's uncompleted lifetime projects and later reconstruction.

Do not imply that Scheutz printer architecture is Babbage's printer architecture.

## A5. Required project conclusion

The note must finish with a narrow implementation boundary:

```text
M: finite differences can generate polynomial tables by repeated addition.
H/R: Babbage designs and later reconstruction make automatic tabular printing/stereotyping part of the Difference Engine output story at the source-supported level.
H: Scheutz engines provide an actually built nineteenth-century printing-difference-engine comparison.
P/M: this repository serializes calculation-ready → persistent-output roles only for inspection; it does not claim historical printer phase timing or geometry.
```

Also list what remains open before source-specific geometry:

- exact drawing/facsimile interpretation;
- printer synchronization and transfer timing;
- specific formatting controls at drawing/mechanism level;
- stereotyping material/process implementation details;
- tolerances, force, backlash, and manufacturing choices.

---

# Part B — harden `src/mechanisms/difference-column/`

The current model is mathematically useful but its replay reducer is older and weaker than newer modules. Bring it to the current repository standard without changing the pedagogical finite-difference semantics unnecessarily.

## B1. State/input validation

Preserve support for the existing 2..5 leading-value model unless tests/documentation justify a change.

Require/validate at least:

- finite numeric columns;
- finite results after each addition;
- valid row/output consistency where serialized state crosses a public reducer/replay boundary;
- safe or explicitly bounded behavior when arithmetic would become non-finite;
- invalid serialized state must not be silently normalized.

Do not introduce arbitrary historical digit widths and call them Babbage limits.

## B2. Event/replay validation

The current `reduceDifferenceEvent()` largely trusts serialized event fields. Harden it so replay verifies the semantic relation instead of trusting attacker/tamper-provided `after` values.

At minimum:

- sequence order must be contiguous and correct;
- source/target orders must be valid and match the model's permitted update order;
- `sourceOrder === targetOrder + 1` for the current P/M algorithm;
- `addend` must equal the current source column value;
- `before` must equal the current target value;
- `after` must equal the recomputed `before + addend` (within exact semantics appropriate to the numeric model; do not introduce tolerance unless genuinely needed);
- unknown serialized event discriminators fail closed at runtime;
- omitted/duplicated/reordered events fail replay;
- a crank claiming an altered final row/output fails validation rather than being accepted because replay ignores the claimed `after` state.

If a trace/action wrapper is the cleanest way to express this, use it; do not create gratuitous framework churn.

Keep existing public helpers working where practical.

## B3. Required tests

Add focused tests proving at least:

1. square preset still generates the established sequence;
2. cubic preset still generates the established sequence;
3. replay reproduces a normal crank exactly;
4. changed `sequence` is rejected;
5. changed `sourceOrder` or `targetOrder` is rejected;
6. changed `addend` is rejected;
7. changed `before` is rejected;
8. changed `after` is rejected;
9. omitted or reordered event is rejected;
10. forged claimed final state/output is rejected if the trace carries one;
11. unknown event type fails closed at runtime;
12. non-finite initial or resulting state is rejected.

---

# Part C — add a generic tabular-output teaching flow

Create an appropriately named small module, preferably under `src/exhibits/` if it composes existing mechanisms rather than representing a reusable historical mechanism. For example:

```text
src/exhibits/difference-output-flow/
```

The purpose is to make this distinction inspectable:

```text
finite-difference arithmetic produces a table value
→ value becomes ready for output
→ persistent check-copy / print role
→ optional stereotyping-role representation
```

This is a **P/M explanatory flow mapped to source-backed historical output roles**, not historical printer timing.

## C1. Minimum state/events

Use a deterministic trace with explicit state such as:

- generated/table value;
- row/index;
- calculation-ready flag;
- check-copy value or persistent-print state;
- stereotype/output-master state only as a functional role;
- event index/sequence;
- evidence/model metadata only if useful for inspection.

A reasonable event vocabulary could be equivalent to:

```text
TABLE_VALUE_READY
CHECK_COPY_RECORDED
STEREOTYPE_OUTPUT_ROLE_RECORDED
```

Choose better names if appropriate.

Do not invent a historical claim that those are three stop-motion machine phases. The UI/research text must explicitly say the serialized order is for browser inspection of output responsibilities.

## C2. Arithmetic ownership

The output flow must **consume** a value produced by the tested difference-column state/transition; it must not recompute the polynomial or maintain a second secret arithmetic implementation.

Use a small known fixture such as a square-number row.

## C3. Replay/tamper requirements

Follow newer module standards:

- deterministic trace;
- replay reproduces final state;
- sequence tampering fails;
- row/value tampering fails;
- output state cannot exist before its prerequisite event;
- unknown serialized event type fails closed;
- output artifacts are derived/validated rather than blindly trusted from serialized fields.

## C4. Tests

Add focused tests proving at least:

- the output flow receives the actual generated value from the finite-difference model;
- check-copy/persistent output is absent before its event;
- stereotype/master role is absent before its event;
- normal replay matches final state;
- event order/value tampering fails;
- unknown event type fails closed.

Do not model typography, paper motion, ink transfer, plaster chemistry, or physical stereotype-sector geometry.

---

# Part D — upgrade `#/finite-difference`

Keep the current arithmetic teaching path. Add a compact second layer that answers:

> Once the next table value exists, how does “output” differ from merely seeing the number in an internal state table?

## D1. Required presentation

Without a large redesign, expose:

- current finite-difference columns and generated value as before;
- a small `calculation → persistent output` flow using the tested module from Part C;
- step/reset controls for the output-flow events, or reuse the existing step control if it stays understandable;
- text state showing whether the value is merely computed, recorded as a check-copy/persistent print role, and mapped to the stereotyping/master-output role;
- an ordered text event log;
- bilingual text;
- keyboard access consistent with current interactive routes if inexpensive;
- no meaning available only through color/motion.

## D2. Evidence labels must be explicit

The route must visibly distinguish:

- **M** finite-difference mathematics;
- **H/E1** Babbage Papers drawing/catalog facts where exact archive records are cited;
- **R/institutional reconstruction** the Science Museum/CHM built Difference Engine No. 2 and its completed printer;
- **H** actually built Scheutz printing-difference-engine comparison;
- **P/M** this repository's serialized `value ready → output roles` flow;
- **open** historical printer timing/geometry not modeled.

Do not label the browser output trace as a simulation of BAB/A/173–176.

## D3. Teaching point

The page should make this idea clear in state and prose:

> The historical problem was not only obtaining a correct numerical value. Re-copying and typesetting could reintroduce error after calculation, so persistent/automatic output changes the trust boundary of the whole table-making workflow.

Use the CHM/Science Museum evidence at the precision actually inspected. Do not turn this into a general claim that every historical difference engine eliminated all human error.

---

# Documentation reconciliation

After implementation/tests are real:

- update `STATUS.md` to describe the Difference Engine provenance/output-contract slice accurately;
- update `TODO.md` with a checked item for the Difference Engine source map/output lesson only if it is genuinely complete;
- update `docs/VERIFICATION.md` with the actual baseline and final test count/files, commands run, and bounded `#/finite-difference` smoke results;
- update `research/difference-engine-addition.md` only enough to migrate its obsolete A/D wording to the two-axis evidence policy and point to the new source map;
- add a useful link from README/teaching path if the new output layer materially changes the route;
- keep `ROADMAP.md` edits minimal;
- do not rewrite `docs/RESEARCH_GAPS.md` as a status ledger.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a bounded local browser smoke of `#/finite-difference`:

- square preset still works;
- arithmetic step remains understandable;
- new output flow can be stepped/reset;
- persistent-output states appear only after their events;
- evidence labels remain readable in English and Chinese;
- no obvious desktop horizontal overflow.

Check the final push CI if it completes promptly; do not wait indefinitely. Record remote deployment only if actually observed.

One coherent commit is fine. Push all required work, then stop.

Suggested final subject:

```text
feat: ground Difference Engine output flow
```

---

# Optional early-finish work

Only if Parts A–D, full verification, browser smoke, documentation reconciliation, commit and push are genuinely complete with substantial time remaining, spend at most one small checkpoint scoping the next provenance task:

```text
research/output-and-audit-trail.md
```

Limit optional scope to a source-aware outline comparing:

- non-printing result registers;
- Babbage/Scheutz table output;
- later printing adding/calculating machines;
- total/subtotal/audit semantics as future research questions.

Do not implement a generic office-printing machine, red/black printing, or bookkeeping workflow without sources.

If optional work would weaken the required Difference Engine slice, skip it.

# Evidence and stop conditions

Stop and record a precise blocker rather than guessing if:

- the Science Museum archive records are inaccessible enough that drawing identifiers/subjects cannot be verified;
- source text conflicts about which Difference Engine design/output feature is being described and the conflict cannot be resolved conservatively;
- implementing the output flow would require inventing printer geometry/timing;
- hardening `difference-column` requires changing the mathematical update semantics in a way that breaks established tests/teaching without a clear reason;
- a conflicting Difference Engine implementation lands on remote `main`;
- shared replay semantics would require a repository-wide migration rather than this bounded slice.

Do not start new machines, 3D physics, or reliability/torque simulation in this slice.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect existing source/tests before creating parallel abstractions;
- one coherent checkpoint or a small research checkpoint + implementation checkpoint is acceptable;
- run all acceptance commands;
- inspect the final diff for unrelated changes;
- update status/verification only after tests actually pass;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.