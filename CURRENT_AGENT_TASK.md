# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-mechanical-error-control.md`.

The mechanical-error-control slice landed as `99f296e36bc72b485d64c7b2b507722817f424bb` about 34 minutes after assignment. It changed 12 files (about 277 additions / 17 deletions), raised the recorded suite from 194 tests across 16 files to 201 tests across 17 files, passed typecheck/tests/build/diff and bilingual browser smoke, and GitHub Actions CI run `33479403704` passed. No open PR remained. Several consecutive broad slices have now landed in roughly 30–42 minutes, so this task increases synthesis scope again while keeping one coherent question:

> **Which parts of arithmetic remain operator work, and which parts move into machine state/control, across the mechanisms the playground already implements?**

This is a mechanism/operator-protocol question, **not** a productivity ranking and not a social-history survey.

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read, in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 3, Priority 5, Priority 7, and Priority 9
6. `docs/REPRESENTATION_AND_PROTOCOL.md`
7. `research/multiplication-mechanisms.md`
8. `research/key-driven-computation.md`
9. `research/subtraction-and-division.md`
10. `research/control-and-zeroing-source-map.md`
11. `research/output-and-audit-trail.md`
12. existing multiplication comparison, direct-multiplier, key-driven accumulator, operator-division, interlock, and printing-ledger code/tests
13. current public routes for multiplication, division, controls, output contracts, about/navigation
14. `docs/TEACHING_PATH.md` and `docs/VERIFICATION.md`

Before editing, run the full test suite once and record the actual baseline. The current ledger says 201 tests across 17 files, but actual repository state wins.

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Objective

Complete five connected parts:

1. write a source-separated research/synthesis note on **human-machine division of arithmetic work**;
2. create typed P/M operation-responsibility profiles derived from existing tested mechanisms/traces rather than hand-written marketing counts;
3. add a compact bilingual public comparison where a visitor can inspect what the operator chooses/repeats/corrects versus what the machine represents/executes/persists;
4. test the profiles against existing mechanism outputs and preserve evidence boundaries;
5. reconcile STATUS/TODO/research gaps/representation/teaching/verification.

Do **not** create a new whole-machine emulator. Reuse the mechanisms that already exist.

---

# Part A — research: arithmetic work and operator protocol

Create:

```text
research/human-machine-arithmetic-labor.md
```

Use the repository's two-axis evidence policy. In this note, the word **labor** means the concrete arithmetic responsibilities performed by a human operator versus delegated to a mechanism/control/output system. It does not mean employment conditions, labor-market effects, gender history, wages, or productivity unless a source directly supports a narrow statement.

## A1. Required contexts

Cover at least these already-supported contexts, while keeping H/R and P/M claims separate:

### 1. Repeated-crank multiplication — stepped drum / pinwheel teaching paths

Use existing research and models to distinguish:

- setting the multiplicand;
- operator-supplied repeated crank count for each multiplier digit;
- carriage/place shift;
- result/revolution-register roles where source-backed;
- what the repository's `314 × 27` P/M comparison counts and what it does **not** establish historically.

Do not call the repository's `9` repetitions a measured historical time/cost for every stepped-drum or pinwheel machine.

### 2. Direct multiplication — Millionaire-informed path

Preserve the central distinction already established:

- multiplier-digit selection chooses a represented multiple;
- multiplication-table work is present in the machine/control model rather than supplied solely by repeated operator cranking;
- carriage/place handling still remains part of the operation path.

Use Steiger/Millionaire evidence only at the functional precision already supported. No control-plate/cam geometry claims beyond sources.

### 3. Key-driven accumulation — Comptometer-informed path

Preserve the supported operation-protocol distinction:

```text
press key -> arithmetic state changes
```

rather than:

```text
set value -> separate crank
```

Keep the generic key-driven accumulator P/M. Historical statements about actual Felt/Tarrant/Turck mechanisms must remain tied to their existing patent/object contexts.

### 4. Operator-controlled division

Use the existing generic P/M division trace to expose responsibilities such as:

- choose/maintain carriage place;
- repeat subtraction;
- detect overshoot in the teaching algorithm;
- perform correction;
- advance to the next place;
- read quotient/revolution state.

Historical procedure claims require an identified manual/patent/source. If no exact operator manual page is already available, state that the repository's `8478 ÷ 314` loop is P/M and do not back-fill a fake historical procedure.

### 5. Persistent output / printing

Use `research/output-and-audit-trail.md` to distinguish:

- calculating a value;
- retaining a live accumulator/register;
- producing a persistent listing/subtotal/total record;
- Difference Engine persistent-output ambitions where already source-backed.

Do not claim quantified labor savings, error-rate reduction, office throughput, or bookkeeping productivity unless a directly inspected source supplies the claim.

## A2. Bounded commercial/use context

Directly inspect the Smithsonian calculating-machine overview already identified in `docs/RESEARCH_GAPS.md`:

<https://www.si.edu/spotlight/calculating-machines>

Use it only for a concise institutional context on who used calculating machines / the kinds of work they supported, at the precision the page actually states.

If the page is inaccessible, retain the existing source pointer and explicitly mark the claim unverified in this pass. Do not replace it with unsourced generalizations.

Do not turn this section into a general history of office labor.

## A3. Required responsibility matrix

End the note with a compact matrix that distinguishes at least:

```text
input/selection
operator repetition
place-value management
stop/decision responsibility
correction/recovery
machine-encoded arithmetic/control
result persistence/output
```

For each row/context, include:

- source/lesson context;
- claim type / evidence role;
- operator responsibility;
- machine responsibility;
- explicit `not established` boundary.

The conclusion must make this point without ranking machines:

> Mechanization does not simply replace “manual calculation” with “automatic calculation”; it moves particular arithmetic responsibilities between operator procedure, represented machine state, control mechanisms, and output systems.

---

# Part B — typed operation-responsibility profiles derived from existing models

Create an appropriately named typed module under `src/exhibits/`, for example:

```text
src/exhibits/operator-work/
```

Prefer adapters/inspection helpers around existing mechanisms over duplicating arithmetic logic.

## B1. Required scenarios

Expose at least four P/M scenario profiles, each tied to the actual tested model/trace that already exists:

1. **`314 × 27` multiplication comparison**
   - repeated-addition baseline;
   - stepped-drum conceptual path;
   - pinwheel conceptual path;
   - direct-multiplication path.

   Reuse `compare314x27()` or its underlying typed results. Do not recalculate counts independently in UI code.

2. **key-driven place-value entry**
   - use an existing deterministic case such as tens `3` + units `4` -> `34`;
   - derive the number of key-stroke cycles and carry/place-value responsibilities from the tested model.

3. **operator division**
   - use the existing `8478 ÷ 314` P/M trace;
   - derive repeated subtraction / overshoot / correction / place-shift responsibilities from actual events rather than prose-only counters.

4. **persistent output contract**
   - reuse the existing `+12, +8, SUBTOTAL, +5, TOTAL` teaching ledger;
   - distinguish arithmetic entry actions from subtotal/total/output-record actions and accumulator clearing/retention semantics.

If one scenario API is awkward, add a small typed inspection helper near that mechanism. Do not redesign core state unless a real correctness issue is found.

## B2. Profile shape

Choose names that fit the repository, but each scenario/profile must expose in text/state form concepts equivalent to:

```text
scenario id
claim type
source/research anchor
operator actions / responsibilities
machine/control responsibilities
persistent-output responsibility if applicable
observed P/M event counts grouped by action class
notEstablished[]
```

Do **not** collapse everything into one scalar “efficiency score.” Different operations are not commensurate simply because event counts exist.

Do **not** label P/M operation counts as historical productivity, speed, effort, skill, fatigue, or economic cost.

A useful breakdown is categorical, for example:

```text
selection
repetition/cycle
shift/place management
correction
output request
```

but adapt to existing event vocabulary rather than forcing one abstraction onto every machine.

---

# Part C — tests

Add focused Vitest coverage proving at least:

1. scenario/profile IDs are unique;
2. every P/M profile has a source/research anchor and non-empty `notEstablished` boundary;
3. multiplication operator/cycle counts are derived from the existing comparison result, including direct multiplication's existing two operation cycles for multiplier `27`;
4. key-driven `34` responsibility data comes from exactly two key-stroke cycles and contains no separate crank action;
5. division responsibility data exposes at least one overshoot/correction relation from the existing trace rather than hiding division behind a final quotient;
6. printing-ledger responsibility data distinguishes subtotal/total/output-record actions from ordinary item entry and preserves the existing subtotal-retain / total-clear semantics;
7. no profile exposes or claims a generic productivity/efficiency score, historical seconds-per-operation, wage/cost figure, failure probability, or universal machine-family throughput;
8. if any H/R context is represented in typed data, it carries evidence strength/source and is not silently merged with the P/M scenario counts.

Do not weaken existing mechanism tests to make the synthesis layer pass.

---

# Part D — public teaching surface

Add a compact bilingual public surface, preferably:

```text
#/arithmetic-labor
```

If that route name conflicts with current naming, choose a concise equivalent such as `#/operator-work` and keep navigation/README/teaching-path wording consistent.

The visitor should be able to answer, without opening Markdown:

```text
Who repeats the multiplier digit: operator or machine/control representation?
Does a keypress merely set input, or is it already the arithmetic cycle?
Who decides when division has overshot and needs correction in the P/M lesson?
What changes when output becomes a persistent record instead of only a live register?
```

Required presentation:

- source/lesson context;
- operator responsibilities;
- machine/control responsibilities;
- P/M observed action/event counts where meaningful;
- explicit not-established/evidence boundary;
- links to the existing detailed routes/research context where practical.

Prefer responsibility cards/matrix/event summaries. No decorative machinery is required.

No meaning may depend only on color.

Do not show a leaderboard, fastest-machine ranking, “automation percentage,” efficiency score, or fake time saved.

---

# Part E — documentation and verification

After Parts A–D are real:

- update `STATUS.md` with the new cross-machine arithmetic-work synthesis;
- update `TODO.md` with one completed bounded line and remove/clarify any stale short-queue wording if useful;
- update Priority 9 and any directly affected sections in `docs/RESEARCH_GAPS.md` so completed work is not still framed as entirely missing;
- add a concise responsibility/labor interpretation paragraph or cross-link to `docs/REPRESENTATION_AND_PROTOCOL.md` rather than duplicating its whole table;
- update `docs/TEACHING_PATH.md` so the new route is discoverable;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and commands run;
- update README/navigation only as needed for discoverability;
- do not rewrite `IMPLEMENTATION_PLAN.md` as a live ledger.

If substantial time remains after all acceptance criteria pass, spend it on source precision, typed derivation from actual events, accessibility, bilingual text-state clarity, browser regression coverage, or one additional institutional/manual anchor that clarifies operator procedure. Do **not** start a new machine family or a general labor-history essay.

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

If public UI changes, perform local browser smoke in English and Chinese for the new route plus quick regression checks of:

```text
#/multiplication
#/division
#/controls
#/output-contracts
```

Record exactly what was checked.

After push:

- confirm remote `main` contains the commit;
- if CI completes during the run, record its result; otherwise do not claim it passed;
- if Pages deployment completes during the run, record the live route only after the deployment actually succeeds;
- stop after the coherent commit/push. Do not self-assign the next task.

# Evidence boundaries

- Counts produced by repository mechanism/event traces are **P/M observations about this software model**.
- Historical machine/operator claims remain H/R and must retain source/model/revision precision already established in the research notes.
- A patent can establish a described control/operation relation; it does not establish universal production practice or measured operator workflow.
- Do not infer speed, productivity, ease of use, training time, fatigue, labor savings, employment effects, or error-rate reduction from event counts.
- Do not infer social categories of operators beyond directly inspected sources.
- Do not turn “fewer modeled operation cycles” into “historically faster” without appropriate evidence.

# Stop conditions

Stop and leave a clear blocker note rather than guessing if:

- producing the synthesis requires changing multiple core mechanism semantics rather than inspecting existing traces;
- historical workflow claims require a manual/source you cannot actually inspect;
- the public comparison cannot avoid presenting unlike operation counts as a fake efficiency ranking;
- a conflicting operator-work implementation lands on remote `main`;
- meaningful progress would require unsourced productivity/time/cost data.

An inaccessible Smithsonian overview is **not** by itself a blocker; keep that institutional context open and complete the P/M responsibility synthesis from existing tested models and already-verified research.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect existing typed modules/tests before creating parallel abstractions;
- reuse current traces and mechanism outputs;
- one coherent research/implementation checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after checks pass;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: compare operator and machine arithmetic work
```
