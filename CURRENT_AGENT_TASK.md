# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-control-provenance.md`.

The subtraction/control assignment landed as `36c7775f6d2b933bfaa2f273e13b8b3a87587688` about 33 minutes after its task-file assignment. It changed 11 files, added the family-separated control source map, typed provenance profiles, browser comparison, and five new tests; GitHub `verify`, Pages build, and Pages deploy checks all completed successfully. The two preceding substantial slices also finished in roughly 30–33 minutes. This task is therefore intentionally about twice the old bounded size, but it remains one coherent question:

> What changes when a calculating machine's output stops being only a transient/result register and becomes a persistent record that can list inputs, distinguish subtotal from total, preserve an audit trail, or even prepare a master for reproduction?

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 7
6. `docs/REPRESENTATION_AND_PROTOCOL.md`
7. `research/difference-engine-source-map.md`
8. `src/exhibits/difference-output-flow/index.ts` and its tests
9. current key-driven / accumulator code and teaching text where a register-only comparison is useful
10. `src/main.ts`, route/navigation conventions, `docs/TEACHING_PATH.md`, and `docs/VERIFICATION.md`

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as the task source.

Before editing, run the current full test suite once and record the actual baseline.

# Objective

Complete four connected parts:

1. write a **source-backed output/audit-trail study** separating non-printing result registers, printing/listing adding machines, and Difference Engine persistent-output ambitions;
2. implement a deterministic generic **printing-ledger P/M model** where printed lines persist independently of accumulator state and where subtotal versus total have observably different state semantics;
3. add typed source/evidence profiles and a bilingual public comparison, preferably a compact `#/output-contracts` route, that shows how output contracts differ without pretending the generic ledger is a Burroughs reconstruction;
4. add tests/replay/verification and reconcile the current status ledger.

The explanatory increment is not printer animation. It is to make **persistence, accumulator clearing/retention, and auditability explicit as computation/output state**.

Do not build type-bar geometry, paper-feed mechanics, ribbon transport, a full Burroughs emulator, or Difference Engine printer geometry in this slice.

---

# Part A — create `research/output-and-audit-trail.md`

Use the current two-axis evidence policy. Organize the note around distinct output contracts rather than a chronology of famous brands.

Suggested structure:

```text
Question
Claim types
Why output is part of the computation contract
Case 1: register-only/non-printing result
Case 2: printing/listing adding machine
Case 3: subtotal vs total state semantics
Case 4: Difference Engine check copy / stereotype-master ambition
Cross-machine comparison
Repository P/M boundary
Open questions
Implementation consequences
Date checked
```

## A1. Non-printing result-register comparator

Use a precise institutional object record rather than writing generically about all adding machines.

Strong starting source:

- Smithsonian/NMAH, Burroughs Calculator `nmah_690197`:
  <https://americanhistory.si.edu/collections/object/nmah_690197>

At the museum-record precision, this is a full-keyboard key-driven **non-printing** adding machine with result wheels/windows. Use it only to establish a register-only output contrast for that identified object/family context.

You may also reference the already sourced Comptometer material in `research/key-driven-computation.md` when useful, but do not collapse Comptometer and Burroughs Calculator revisions into one machine.

Key conceptual boundary:

```text
result register changes
!=
a persistent external record is automatically created
```

Do not claim that register-only machines had no possible bookkeeping workflow; the narrow claim is only about the machine's documented output hardware/contract.

## A2. Printing/listing adding-machine objects

Use identified Smithsonian objects and preserve model/date distinctions.

Required starting records:

- Smithsonian/NMAH, Burroughs Class 3 Adding Machine `nmah_690654`:
  <https://americanhistory.si.edu/collections/object/nmah_690654>
- Smithsonian/NMAH, Burroughs Style 9 Adding Machine `nmah_690660`:
  <https://americanhistory.si.edu/collections/object/nmah_690660>

For the Class 3 record, inspect and record only what the object description actually supports, including the documented presence of a printing mechanism/paper tape and the identified non-add, total, subtotal, and repeat controls. The record also describes the tape as visible to the operator on that example.

For Style 9, record the specific output arrangement actually described: a wide carriage/printing mechanism, use of paper tape or sheets, and the fact that its printing is not visible to the operator in that object's documented arrangement.

Do not infer one universal Burroughs paper path or control geometry from these objects.

## A3. Primary patent anchor for listing / total / subtotal semantics

Required primary source:

- William E. Swalm, US 885,202, *Adding and Listing Machine* (1908):
  <https://patents.google.com/patent/US885202A/en>

Inspect the patent text directly. It explicitly situates the invention in machines that list/print individual items while accumulating them and print totals, and it discusses the distinction between totals and subtotals.

At the source-supported level, capture the key state distinction:

- taking a **total** returns/leaves the accumulating wheels at the initial/zero position in the described class of machine;
- taking a **subtotal** leaves the accumulated amount in the wheels so later items continue from it;
- printed/listed items and printed totals therefore have an output-state relationship that differs from merely displaying the live accumulator.

This is H/E1 for the intended patented design/context, not proof that every Burroughs production revision behaved identically.

Additional primary source if it materially helps and is actually inspected:

- Jesse G. Vincent, US 983,009, *Adding-Machine* (1911):
  <https://patents.google.com/patent/US983009A/en>

It explicitly describes the class of machines adapted to print/list and add individual items and print a total at the operator's will. Add it only for a precise claim; do not create a patent catalog.

### Optional later control-semantics anchor

If useful for a clean `non-add` comparison, inspect:

- US 2,583,810, *Accumulator State Control* (1952):
  <https://patents.google.com/patent/US2583810A/en>

This later patent explicitly distinguishes a non-add operation that prints a keyed amount without entering it in the accumulator, a total that prints and clears the accumulator, and a subtotal that prints while retaining the accumulator. If used, label its later date/design context explicitly and do not project those exact controls backward onto early Class 3/Style 9 machines.

## A4. Difference Engine persistent-output contrast

Reuse and cite the existing repository source work rather than reopening broad Babbage research:

- `research/difference-engine-source-map.md`
- `src/exhibits/difference-output-flow/index.ts`

The current repository already separates:

```text
calculated table value
→ check/persistent copy role
→ master/stereotype output role
```

The new note should explain why this is a different output/audit problem from office adding-machine paper tape:

- office listing machine: persistent transaction/item record and totals in operational bookkeeping context;
- Difference Engine / Scheutz line: table values and printing/stereotyping intended to reduce transcription/re-copying in mathematical table production.

Keep the historical source boundaries already established. Do not add printer geometry or imply identical technology/workflow.

## A5. Required comparison conclusion

End the note with a source-labelled table whose rows are at least:

| Output contract | Identified source/example | What persists | What happens to working accumulator/state | What human verification/re-copying problem changes | What remains unmodeled |
|---|---|---|---|---|---|
| register-only | identified non-printing Burroughs Calculator / sourced key-driven comparator | machine register only | live state remains in machine until changed/cleared | no automatic paper listing from the documented object | office procedure, copying practice, exact clearing sequence |
| printing/listing | identified Burroughs printing object(s) + primary patent | item/total lines on paper | source-dependent | creates a persistent list/footing | exact print mechanism/paper path |
| subtotal | US885202A context | subtotal line | accumulator retained | inspect intermediate footing without ending accumulation | production revision geometry |
| total | US885202A context | total line | accumulator cleared in the described class | closes a series and leaves a printed footing | production revision geometry |
| Difference Engine persistent output | existing Babbage/Scheutz source map | check/master or printed table role | separate table-generation state | reduces transcription/re-copying in table production | printer/stereotype geometry/timing |

Do not overclaim “audit trail” as a period term unless a source uses it. It is acceptable to use **audit-trail** as a modern analytical label if the note clearly says so.

---

# Part B — implement a generic deterministic printing-ledger P/M model

Create a mechanism or exhibit-core module under the established tree, for example:

```text
src/mechanisms/printing-ledger/
```

or another location that matches current architecture after inspecting existing code.

This is a **P/M teaching model**, not a Burroughs simulator.

## B1. State must separate working arithmetic from persistent output

A reasonable state shape should make these concepts explicit:

- accumulator value;
- printed lines / persistent record;
- operation/event index;
- count of added items / cycles as useful;
- batch/open state only if needed to make total/reset semantics explicit.

Printed lines should be structured objects, not only a concatenated display string. Suggested line kinds:

```text
ITEM
SUBTOTAL
TOTAL
NON_ADD   // only if Part A's inspected source boundary justifies including it
```

Use safe integers / finite validation consistent with repository conventions. Do not add subtraction in this slice unless it is truly necessary; a positive-item ledger is sufficient to expose the output contract.

## B2. Required operations/events

Choose names that fit the repository, but the behavior should include:

### Add and record an item

```text
ADD_ITEM amount=12
accumulator 0 -> 12
persistent record appends ITEM 12
```

### Print subtotal

```text
PRINT_SUBTOTAL
persistent record appends SUBTOTAL currentAccumulator
accumulator remains unchanged
```

### Print total and close/clear the arithmetic series

```text
PRINT_TOTAL
persistent record appends TOTAL currentAccumulator
accumulator becomes 0
```

If `NON_ADD` is included from inspected primary-source semantics:

```text
PRINT_NON_ADD amount=...
persistent record appends line
accumulator unchanged
```

No animation timing in core logic.

## B3. Replay and tamper rejection

Follow the repository's recent hardened reducer pattern.

Required:

- deterministic same-state + same-action behavior;
- ordered sequence/event identity;
- replay reconstructs final state;
- reducer rejects wrong sequence, mismatched accumulator-before/after, altered printed value/kind, or invalid total/subtotal prerequisites where applicable;
- printed record cannot be silently recomputed only from final accumulator, because persistence is precisely what this model teaches.

## B4. Required tests

Add focused Vitest coverage for at least:

1. `12`, then `8` produces accumulator `20` and two persistent ITEM lines;
2. subtotal at `20` appends `SUBTOTAL 20` and leaves accumulator at `20`;
3. after that, add `5`, then total appends `TOTAL 25` and clears accumulator to `0`;
4. the full printed record survives the total/clear and remains inspectable after accumulator is zero;
5. a new item after total starts accumulating from zero while the old printed record remains persistent unless the model explicitly opens a new record object;
6. if non-add is modeled, it creates a persistent line without changing accumulator;
7. replay equals final state;
8. tampered event sequence/value/accumulator transition fails closed;
9. invalid unsafe/non-integer amount or invalid action is rejected explicitly.

Do not test a historical key sequence unless you actually modeled/source it; these are P/M output-contract tests.

---

# Part C — typed output-contract provenance + public comparison

Create a typed dataset under `src/exhibits/`, for example:

```text
src/exhibits/output-contracts/
```

Use a shape comparable to the existing control-provenance dataset so historical claims remain structured and testable.

A profile should expose at least:

- stable id;
- family / identified object or patent;
- date/model context;
- claim type (`H`, `R`, `H/R` as appropriate);
- E1–E4 strength;
- source label + URL;
- output medium/contract;
- documented behaviors;
- `notEstablished` / open boundary.

Minimum profiles:

1. non-printing Burroughs Calculator `nmah_690197`;
2. Burroughs Class 3 `nmah_690654`;
3. Burroughs Style 9 `nmah_690660`;
4. US885202A total/subtotal/listing semantics;
5. existing Difference Engine/Scheutz persistent-output source profile drawn from repository research rather than a new unsupported summary.

If a patent profile and a museum object are different evidence types, keep them as different profiles; do not merge them into “the Burroughs machine.”

## C1. Provenance integrity tests

At minimum test:

- profile IDs unique;
- every H/R profile has non-empty source label/URL and current two-axis labels;
- every profile has a non-empty `notEstablished` boundary;
- required source profiles exist;
- no profile labels the generic printing-ledger event sequence as historical Burroughs behavior;
- Difference Engine profile points to the already established source boundary rather than claiming the P/M check-copy event sequence is historical timing.

## C2. Public UI

Prefer a focused new hash route:

```text
#/output-contracts
```

because this is now a cross-machine concept substantial enough to stand on its own. If current routing makes a new route disproportionately invasive, a clearly discoverable section on an existing comparison/about route is acceptable, but do not hide the work.

The page should have two visibly separate layers:

### Interactive P/M ledger

Let the visitor step a small preset such as:

```text
+12
+8
SUBTOTAL
+5
TOTAL
```

The visible lesson must make this obvious:

```text
working accumulator: 0 -> 12 -> 20 -> 20 -> 25 -> 0
persistent paper record: keeps 12, 8, subtotal 20, 5, total 25
```

Required controls:

- step next event/action;
- reset;
- state/record visible without relying on animation;
- keyboard-accessible buttons consistent with current site conventions where practical.

### Historical/source comparison

Below/beside the P/M model, render typed source cards/table for:

```text
register-only
printing/listing
subtotal/total semantics
Difference Engine persistent-output role
```

Required presentation:

- bilingual English/Chinese;
- source/model/date visible;
- claim type + evidence strength visible;
- `documented` and `not established` both visible;
- explicit sentence that the interactive ledger is **not a Burroughs reconstruction** and does not model type bars, carriage, ribbon, or paper-feed geometry;
- explicit sentence that “audit trail” is a modern comparison label unless a cited source uses that wording;
- no meaning conveyed only by color;
- no decorative gear/printer animation unrelated to state.

Add navigation/home/teaching-path discoverability without large site redesign.

---

# Part D — reconcile cross-machine docs and verification

After Parts A–C are real:

- update `STATUS.md` to record the printing-ledger P/M model and source-backed output-contract comparison;
- check the `TODO.md` output/audit-trail item only if the broader comparison genuinely landed;
- extend `docs/REPRESENTATION_AND_PROTOCOL.md` with the new output-contract distinction where it materially improves the existing table rather than duplicating the new note;
- update `docs/TEACHING_PATH.md` so output contracts appear after finite differences or controls where the conceptual sequence makes sense;
- update README only enough to expose the new route/research note;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and commands run;
- leave `docs/RESEARCH_GAPS.md` as a research queue rather than rewriting it into a status ledger.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a bounded local browser smoke of the new/updated output page:

- preset steps in the correct order;
- subtotal visibly preserves accumulator;
- total visibly clears accumulator;
- persistent printed lines remain after total clears working state;
- reset restores initial lesson state;
- historical source cards render source/model/date + evidence labels + open boundaries;
- English and Chinese are readable;
- no obvious desktop horizontal overflow;
- existing finite-difference output lesson still renders after shared navigation/style changes.

Check GitHub push CI and Pages deployment if they complete promptly. Record live deployment only if actually observed.

One coherent implementation commit is preferred after this administrator task-file commit. Push required work, then stop.

Suggested final subject:

```text
feat: add persistent output contract comparison
```

---

# Optional early-finish work

Only if the entire main slice, tests/build, browser smoke, documentation reconciliation, commit, and push are complete with substantial time remaining:

1. inspect US2583810A and add the `NON_ADD` P/M action only if its source distinction is accurately documented and doing so stays small;
2. add one additional identified printing adding-machine object only when it exposes a genuinely different output contract (for example operator-visible versus non-visible tape), not just another model name;
3. verify the completed commit's Pages deployment and record it if live.

Do **not** start reliability/torque/tolerance modeling, source-specific printer geometry, cash-register/accounting-machine business logic, or a new machine family in this slice.

# Evidence boundaries

- Generic printing-ledger state/event model: **P/M**.
- Smithsonian identified-object descriptions: **H**, normally E2 institutional/catalog evidence unless the object itself is being directly measured.
- US885202A / other inspected patents: **H/E1** for the disclosed intended design, not proof of exact production implementation across all revisions.
- Existing Difference Engine source map retains its existing H/R boundaries; do not upgrade P/M event order to historical timing.
- “Audit trail” is an analytical comparison label unless a source explicitly uses the term.
- Do not generalize one Burroughs object's paper visibility, controls, carriage, or zeroing behavior to all Burroughs machines.

# Stop conditions

Stop and record a blocker rather than guessing if:

- a required source cannot be inspected and the claimed total/subtotal/output behavior depends on it;
- the current Difference Engine source map conflicts with the new comparison and exact source resolution is needed;
- implementing persistent output requires mutating existing arithmetic core semantics rather than adding a clean independent model;
- the route would require a broad router/site rewrite unrelated to output contracts;
- a conflicting output-contract implementation already landed on remote `main`.

Narrow the source claim or UI scope instead of filling missing historical detail with inference.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect current code/tests before adding parallel abstractions;
- run baseline tests first;
- keep historical profiles distinct by object/patent/model context;
- keep P/M reducer/event logic deterministic and replayable;
- run all acceptance commands;
- inspect final diff for unrelated changes;
- update status/verification only after implementation/tests are real;
- commit and push one coherent checkpoint;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.
