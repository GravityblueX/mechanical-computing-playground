# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-controlled-key-integrity.md`.

The previous assignment landed as `d35f4209950b5652b3b3bc3f5535020afaaff434` about 37 minutes after assignment, changed 349 lines (`+326/-23`), raised the suite from 251 tests / 19 files to 264 tests / 20 files, and passed CI run `33510045135`. No PR is open. Several recent slices have finished well under an hour, so this assignment intentionally combines one primary-source precision pass with one small tested control-state increment. Do not broaden beyond this pair.

> **Question for this slice: what does it mean operationally that a stepped-drum calculator can preserve/clear its result register and revolution register independently, and what historical sources actually establish that behavior for identified Thomas arithmometers?**

The historical target is the Thomas arithmometer around the 1865–1870 production period. The software target is a generic P/M register-lifecycle/zeroing lesson. Do not turn museum descriptions, later specialist reconstructions, or a teaching state machine into one universal Thomas linkage.

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priorities 0.1, 3, 4 and 5
6. `research/control-and-zeroing-source-map.md`
7. `research/subtraction-and-division.md`
8. `src/mechanisms/revolution-counter/index.ts`
9. existing setting/crank interlock, operator-division, output-ledger mechanisms and tests
10. `src/exhibits/control-provenance/` and the `#/controls` UI in `src/main.ts`
11. `docs/VERIFICATION.md`

Run current-main typecheck/tests before editing and record the actual baseline. Do not infer state from stale `IMPLEMENTATION_PLAN.md` checkboxes.

# Part A — Thomas instruction / register-control source pass

The repository currently has identified Smithsonian objects supporting mode selection, revolution-register direction and separate zeroing controls, but `research/control-and-zeroing-source-map.md` still says the 1868 Thomas instruction pamphlet pages were not inspected. Resolve that boundary as far as direct access permits.

## A1. Smithsonian 1868 instruction pamphlet

Directly inspect the institutional record for:

**_Instructions pour se Servir de l'Arithmomètre_**, 1868, Smithsonian/NMAH `nmah_904757`, related to Thomas arithmometer `MA.335215`.

Entry points:

- <https://americanhistory.si.edu/collections/object/nmah_904757>
- <https://www.si.edu/object/instructions-pour-se-servir-de-larithmometre%3Anmah_904757>

The catalog identifies it as a 1868 operating-instruction pamphlet and exposes an IIIF/Mirador entry. Follow the IIIF manifest/attachments only if they actually expose readable pages.

Record exactly:

- catalog identity, date, maker/provenance;
- number of readable canvases/pages actually exposed;
- printed/page or viewer positions inspected if readable;
- wording/instructions relevant to mode selection, result register, revolution counter, clearing/zeroing, carriage movement, multiplication/division, or initial/final state;
- whether separate result/revolution clearing is actually described in the pamphlet or only in identified object records;
- what is not readable or not established.

If the manifest exposes only a cover/object image, say so and stop at catalog precision. Do not manufacture page-level claims from the existence of the pamphlet.

## A2. Identified Thomas objects

Directly inspect and keep separate at least these Smithsonian objects:

- `nmah_690683` — 1867 Thomas arithmometer;
- `nmah_690686` / `MA.335215` — ca. 1873 object explicitly associated with the separately stored 1868 instruction book.

Useful entry points:

- <https://americanhistory.si.edu/collections/object/nmah_690683>
- <https://americanhistory.si.edu/collections/object/nmah_690686>

Record only what the catalog/object evidence actually supports, especially:

- add/multiply versus subtract/divide mode selector;
- revolution-register direction where stated;
- independent zeroing controls/knobs where stated;
- carriage/register capacities for the identified object only;
- object date/serial/provenance boundaries.

Do not merge these two objects into one canonical revision.

## A3. 1865 instruction-booklet institutional reconstruction boundary

Directly inspect the Museum of the History of Science, Oxford page:

<https://www.mhs.ox.ac.uk/staff/saj/arithmometer/>

The institutional account explicitly says its Figure 1 engraving is from an **1865 instruction booklet** and describes two independent carriage-dial zeroing mechanisms operated by knobs at opposite ends of the carriage.

Use this as an **institutional reconstruction/synthesis boundary (H/R or R, normally E2)**, not as if you had directly inspected the 1865 primary booklet unless the page exposes the original scan at sufficient resolution and bibliographic precision.

Record exactly what the institutional page attributes to the 1865 booklet, and keep it separate from the 1868 Smithsonian pamphlet and identified objects.

## A4. Specialist production/revision orientation remains secondary

You may consult `arithmometre.org` for orientation only, especially its bibliography/model chronology and 1865 patent/revision material:

- <https://arithmometre.org/Bibliotheque/PageBibliothequeA.html>
- <https://arithmometre.org/Anatomie/NumerosSerieEnglish.html>

Useful orientation includes the bibliographic existence of 1865/1868 instruction editions and model/revision distinctions. Treat these as specialist secondary evidence unless independently anchored to a directly inspected primary/institutional source. Do not upgrade serial-number chronology or clearing-mechanism revision claims to H/E1 merely because they are detailed.

### Part A deliverable

Deepen `research/control-and-zeroing-source-map.md` with a compact Thomas section that explicitly separates:

```text
1868 pamphlet pages actually inspected (or catalog-only boundary)
identified 1867 and ca.1873 Smithsonian objects
Oxford institutional account / 1865 booklet attribution
specialist revision orientation
what remains unestablished
```

If the source pass yields useful procedure detail, add only the directly supported parts to `research/subtraction-and-division.md`; do not rewrite its generic P/M division loop as Thomas procedure.

The boundary to preserve is:

> Separate zeroing controls and operation modes on identified Thomas-family objects do not by themselves establish one linkage, timing, procedure, or revision history for every arithmometer.

# Part B — generic dual-register lifecycle / zeroing control

After Part A has established the control responsibility at defensible precision, add one small generic P/M mechanism that makes **independent register lifecycle** visible. This is not a Thomas emulator.

Prefer a module under `src/mechanisms/` such as `register-lifecycle/` or another repository-consistent name. Reuse the existing `revolution-counter` type/semantics where natural; do not duplicate operator-division or output-ledger arithmetic.

## B1. Minimum state

Model only the control state needed to explain separate registers:

- a result-register value (safe integer within an explicit supported domain);
- a revolution/cycle register or wrapped existing `RevolutionState`;
- an operation mode with a neutral generic vocabulary such as `ADD_MULTIPLY` / `SUBTRACT_DIVIDE` if useful to the lesson;
- zeroing/clearing action count and human-operation count if they add inspectable value;
- deterministic ordered events and replay.

Do not model knob geometry, rack teeth, shaft timing, spring force, register-wheel layout, or source-specific capacities unless a source is cited for an identified object and the software still remains clearly P/M.

## B2. Required behavior

Expose independent actions equivalent in explanatory power to:

```text
SET_MODE ...
CLEAR_REVOLUTION_REGISTER
CLEAR_RESULT_REGISTER
```

A combined convenience helper is allowed only if it is clearly a repository P/M composition of two independent actions, not a claimed historical single control.

Important semantic requirements:

- clearing the revolution register must leave the result register unchanged;
- clearing the result register must leave the revolution register unchanged;
- mode changes must not silently mutate either register;
- clearing an already-zero register must have an explicit deterministic policy (recorded no-op event or explicit rejection; choose one and test it);
- replay must be fail-closed and action-derived or otherwise consistent with the repository's hardened replay style;
- no source-specific action timing or interlock should be invented.

Use a simple teaching fixture such as:

```text
result = 8478
revolution/cycle register = 27
clear revolution -> result still 8478
clear result -> result 0, revolution remains at its current state
```

This fixture is P/M state hygiene, not a claim that one specific historical multiplication left `27` in a Thomas counter.

## B3. Required tests

Add focused Vitest coverage for at least:

1. valid creation with non-zero result and revolution register state;
2. independent revolution-register clear preserves result;
3. independent result-register clear preserves revolution state;
4. mode selection changes only mode/control state;
5. deterministic identical state + action gives identical event/result;
6. replay reproduces final state from a mixed mode/clear sequence;
7. replay rejects forged `before`, forged target register, wrong sequence/order, impossible counter state, and forged final state;
8. invalid/unsafe numeric state is rejected explicitly;
9. existing revolution-counter hardening remains green;
10. existing operator-division, setting-crank and key-stroke-integrity tests remain green.

Do not add a stochastic reliability model, zeroing linkage animation, or register-capacity physics.

# Part C — small control/protocol integration

Integrate the new P/M register-lifecycle lesson into the existing `#/controls` area or the smallest existing comparison surface. Do not create route churn unless the current architecture makes it genuinely simpler.

The visitor should be able to inspect one deterministic scenario showing that:

```text
result register
revolution/cycle register
operation mode
```

are separate computational/control responsibilities, and that clearing one register does not mean “reset the whole machine.”

Show:

- before/after values;
- which register was cleared;
- current mode;
- ordered events;
- source/evidence cards that keep identified Thomas object facts separate from the generic P/M trace.

Bilingual text is required if the surrounding route is bilingual. No meaning should depend only on color.

Do not draw a Thomas zeroing knob/linkage beyond a clearly schematic label unless directly supported at the precision shown.

# Part D — reconciliation and verification

After Parts A–C are real:

- update `STATUS.md` only for what now genuinely exists;
- add one concise completed line to `TODO.md`;
- update `docs/RESEARCH_GAPS.md` Priorities 0.1/3/4 only if the source gap genuinely changed;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and checks;
- update typed control-provenance adapters only if directly inspected evidence adds a precise Thomas source/model/control responsibility;
- archive no extra planning files beyond the normal completed-task record generated by the next reviewer.

If the public controls UI changes, perform bilingual browser smoke at least for:

```text
#/controls
#/division
#/about
```

Quick-regress the existing controlled-key integrity scenario and check desktop plus one narrow viewport for horizontal overflow/runtime errors.

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

All must pass.

Also verify:

- current 264-test baseline is not silently reduced;
- key-stroke exactly-once correction still passes;
- operator-division quotient-nine/exact-zero regressions remain green;
- revolution-counter replay hardening remains green;
- any Thomas manual/object claim cites the exact source precision actually inspected;
- Oxford 1865-booklet attribution stays institutional E2 unless the primary booklet itself is directly inspected;
- specialist revision claims remain secondary unless independently anchored.

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect CI only if it has completed and record only completed outcomes;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: model independent register zeroing controls
```

# Evidence boundaries

- New register-lifecycle/zeroing event sequence: **M/P generic teaching/control model**.
- Smithsonian identified objects: **H/E1 at catalog/object precision**; do not generalize capacities/control layout across revisions.
- Smithsonian 1868 pamphlet: **H/E1 only for pages actually inspected**; catalog identity alone does not establish procedure.
- Oxford institutional account: **H/R or R, E2** for the attributed 1865 instruction-booklet interpretation unless the underlying primary scan is directly inspected.
- `arithmometre.org`: specialist **E3 orientation** unless independently anchored.
- Do not infer physical linkage, timing, knob force, register gearing, production adoption, or one universal zeroing mechanism from the generic P/M model.

# Stop conditions

Stop and leave a clear boundary note rather than guessing if:

- Smithsonian IIIF exposes no readable pamphlet pages; record catalog-only precision and continue with identified-object + Oxford evidence rather than inventing the manual contents;
- implementing register lifecycle would require weakening existing revolution-counter replay guarantees;
- the existing control UI architecture would require a large unrelated refactor;
- source access turns into a broad French patent/manual hunt that threatens to consume the whole slice;
- exact historical mode/zeroing procedure cannot be separated cleanly from the generic P/M control model.

If Parts A–C finish substantially before one hour, use remaining time for replay/property tests, exact source metadata, accessibility, and source-card precision. **Do not start Thomas carry-force physics, Burkhardt bell modeling, square-root procedure, simultaneous Comptometer Duplex timing, or a new machine family in this slice.**
