# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-controlled-key-recovery.md`.

Administrator review accepted completion commit `2a358451bd6dfc9b10b59b9e643a0e4303c76dc8` (`research: ground Controlled-Key recovery protocol`). Exact-head CI run `33577028049` and Deploy Pages run `33577028032` both passed. Assignment-to-completion was about 35 minutes with an eight-file / 158-line bounded diff, so this slice is intentionally somewhat larger while remaining one coherent source/protocol question.

**Fetch/pull current remote `main` before doing anything.** The administrator archive commit is `ca5a983e1ba765a86548ad9521869a01fe495826`.

> **Question for this slice:** what does the directly inspectable 1868 Thomas arithmometer instruction pamphlet, together with identified 1867/ca.1873 surviving machines, actually establish about register roles, mode selection, zeroing, carriage/revolution-counter use, and multiplication/division operator procedure—and which parts of the repository's generic division/control traces must remain P/M rather than being silently back-filled as one universal Thomas procedure?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priorities 3 and 4
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-controlled-key-recovery.md`
8. `research/subtraction-and-division.md`
9. `research/control-and-zeroing-source-map.md`
10. `research/carry-is-the-hard-part.md` only for existing Thomas revision boundaries
11. `src/mechanisms/operator-division/index.ts`
12. `src/mechanisms/dual-register-lifecycle/index.ts`
13. `src/exhibits/control-provenance/index.ts`
14. any existing division/control provenance adapters and related tests
15. the `#/division` and `#/controls` rendering paths in `src/main.ts`

Run the current-main baseline before editing and record the actual test count. Do not weaken replay/tamper validation or change generic arithmetic semantics merely to fit a historical source.

# Part A — recover and census the 1868 instruction object

Start from the Smithsonian/NMAH instruction pamphlet:

- *Instructions pour se Servir de l'Arithmomètre*, Thomas, 1868, `MA.318961.02` / `nmah_904757`:
  <https://americanhistory.si.edu/collections/object/nmah_904757>

The catalog exposes IIIF/Mirador links. Resolve the actual IIIF manifest/canvases rather than treating the landing-page thumbnail as the whole pamphlet.

Record:

- object/catalog identity;
- manifest URL or stable media identifiers if exposed;
- number of canvases/images actually available;
- canvas/page labels and readable printed page numbers;
- whether pages are single leaves, spreads, fronts/backs, or only one exposed image;
- exact image/page locations used for each claim.

If the public IIIF object still exposes only one readable spread, **say so and stop that branch**. Do not reconstruct missing pages from modern summaries. If a complete institutional/public-domain scan of the same 1868 issue is discoverable from a reliable repository, inspect it and record edition identity before using it.

The catalog description itself establishes only that the pamphlet gives operating instructions for the Thomas arithmometer and is related to `MA.335215`; do not promote that metadata into page-level procedure evidence.

# Part B — identify the machines and keep revisions separate

Directly inspect the related and comparison object records:

- ca. 1873 Thomas arithmometer `MA.335215` / `nmah_690686`:
  <https://americanhistory.si.edu/collections/object/nmah_690686>
- 1867 Thomas arithmometer `nmah_690683`:
  <https://www.si.edu/object/thomas-arithmometer%3Anmah_690683>
- early surviving Thomas example `nmah_690692`:
  <https://americanhistory.si.edu/collections/object/nmah_690692>

Use additional Smithsonian object records only if they resolve one exact capacity/control/revision question. Do not turn this into a full Thomas serial-number census.

Build a compact identity/control table that keeps machines distinct. At minimum record, where directly described:

- date / object ID / serial mark if cataloged;
- setting-lever count;
- result-register capacity;
- revolution-register presence/capacity;
- addition/multiplication versus subtraction/division selector;
- operating crank versus earlier ribbon actuation;
- result/revolution zeroing controls;
- carriage movement/positions;
- documented direction of the revolution register under add/multiply versus subtract/divide;
- any direct relationship between `MA.335215` and the 1868 instruction booklet.

A ca.1873 object paired with an 1868 instruction book does not prove every 1868 procedure applies unchanged to every 1867 or earlier machine. Preserve object/revision boundaries.

# Part C — operator-protocol extraction, source-first

From directly readable 1868 instruction pages, extract only procedures actually present. The target questions are:

## C1. Addition / multiplication

Determine whether the primary instructions directly establish:

- how the setting levers are used;
- which mode/selector position is required;
- what one operating turn/stroke contributes;
- whether multiplication is described as repeated turns;
- how/when carriage shifting changes decimal place;
- how the revolution register is used/read during multiplication;
- any zeroing/setup steps before an operation.

## C2. Subtraction / division

Determine whether the primary instructions directly establish:

- how dividend/result state is initialized;
- which selector/mode is used;
- carriage starting position and shift order;
- repeated subtraction procedure;
- how quotient/revolution counts are read;
- what happens on overshoot/negative indication;
- whether an add-back/correction turn is explicitly instructed;
- exact result/revolution register directions if stated;
- termination and remainder reading.

The current generic repository trace uses explicit `OVERSHOOT_PENDING → DETECTED → ADD_BACK` causality. Do **not** call that a Thomas historical event sequence unless the inspected primary instructions support the corresponding operator responsibilities. It may remain P/M even if the broad repeated-subtraction procedure is historical.

## C3. Zeroing / register lifecycle

Keep distinct:

- setting/input state;
- result register;
- revolution/quotient register;
- independent zeroing/clearing actions;
- carriage position;
- arithmetic mode.

The repository's generic dual-register lifecycle is P/M. Historical evidence can support that separate controls/roles existed on a named object without proving the repository's event order, latch semantics, or hidden linkage.

# Part D — source crosswalk and model boundary

Update `research/subtraction-and-division.md` and `research/control-and-zeroing-source-map.md` with a compact crosswalk such as:

```text
claim / operator step | source/object/revision | direct support | claim/evidence | repository consequence | not established
```

At minimum separate:

1. **H/E1 1868 instruction pamphlet pages** — only directly readable procedure text;
2. **H/E1 1867 surviving object** — cataloged controls/registers/directions at object precision;
3. **H/E1 ca.1873 `MA.335215` object** — controls/capacity and the associated 1868 instruction-book relationship;
4. **H/E1 early Thomas object** — earlier ribbon-actuated / no-revolution-register differences where directly described;
5. **R/E2 or E3 secondary reconstruction/orientation** — only when needed to identify a source or unresolved revision issue;
6. **P/M repository operator-division and dual-register traces** — deterministic teaching decompositions.

Answer explicitly:

- Which multiplication/division steps are directly documented in 1868, and which are only later/general descriptions?
- Is add-back correction after division overshoot directly instructed in the inspected issue? At what page?
- Is revolution-counter direction a directly cataloged object fact, a manual instruction, or both?
- Which zeroing controls are independent on the identified objects?
- Which claims differ between the early ribbon-operated machine and later crank/revolution-register machines?
- Does any source justify mapping the generic repository phase names to Thomas terminology? Default answer should be no unless directly established.

# Part E — bounded typed/public integration

Only after Parts A–D establish a sharper boundary, add a compact source-aware profile or adapter. Prefer extending an existing provenance module rather than introducing another parallel evidence framework.

A good integration should expose something equivalent to:

- Thomas 1868 instruction source identity/page anchors;
- 1867 object identity/control facts;
- ca.1873 `MA.335215` object/control facts;
- `supports` and `notEstablished` arrays;
- explicit link to the generic P/M division/register lessons without geometric identity claims.

If the 1868 pages directly support a useful operator sequence, add a **small bilingual historical-evidence panel** to the existing `#/division` and/or `#/controls` lesson. Keep two visible layers:

```text
Thomas source-backed operator/control evidence
vs
repository generic P/M deterministic trace
```

Do not create a full Thomas route, 3D mechanism, stepped-drum linkage animation, or source-specific timing model.

Add focused tests asserting:

- source/object IDs and exact page labels used;
- H/E1 versus R/E2/E3/P-M boundaries;
- `supports` / `notEstablished` statements;
- that the generic division trace remains P/M and is not renamed as Thomas historical timing;
- any object-revision distinctions you expose publicly.

**Default expectation:** no change to `operator-division`, carry, or dual-register core transition semantics. If the source audit shows a genuine semantic error in the generic model, document the conflict and stop before redesigning the core.

# Part F — reconciliation and verification

After source/provenance work:

- update `STATUS.md` only for evidence actually improved;
- add one concise completed line to `TODO.md`;
- narrow Priority 3 / Priority 4 and the relevant file-deepening item in `docs/RESEARCH_GAPS.md` only for gaps actually closed;
- update `docs/VERIFICATION.md` with baseline/final test counts and commands actually run;
- do not alter Controlled-Key, Millionaire, Curta Type II service chronology, Scheutz patent-number reconciliation, Analytical Engine, Differential Analyzer, output, continuous, or backprop tracks in this slice.

If public division/control evidence changes, attempt bilingual browser smoke for:

```text
#/division
#/controls
#/about
```

If browser tooling is unavailable, state that explicitly; build/tests are not browser smoke.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Run focused tests for every touched provenance/lesson module. All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head CI and Deploy Pages outcomes that complete before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: ground Thomas 1868 operator protocol
```

# Evidence boundaries

- directly read 1868 Thomas instruction pages = **H/E1 only at the exact issue/page/procedure inspected**;
- Smithsonian catalog/object records = **H/E1 at object identity and directly described control/register precision**;
- a catalog relationship between an object and instruction book does not prove unchanged procedure across all Thomas revisions;
- modern institutional/scholarly reconstruction = **R/E2** where directly inspected and appropriately scoped;
- generic web summaries / specialist orientation = **E3 navigation/secondary evidence** unless they expose the original source being cited;
- repository `operator-division` and `dual-register-lifecycle` events = **P/M** unless an individual responsibility is separately source-backed;
- no exact gear/linkage geometry, carry phasing, torque, safe speed, wear, operator throughput, production-wide revision mapping, or event timing without direct evidence.

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- the 1868 IIIF manifest exposes only a single readable spread or page;
- another scan cannot be matched to the same edition/issue with sufficient identity;
- a modern summary describes an operation not visible in the primary pamphlet;
- the 1867 and ca.1873 object controls differ in a way that makes a universal Thomas procedure unsafe;
- division add-back/correction is not explicitly documented in the inspected primary source;
- integrating source evidence would require pretending the generic P/M event order is historical physical timing;
- work starts expanding into full stepped-drum geometry, complete serial-number chronology, measured performance/reliability, square-root procedures, or another machine family.

If Parts A–E finish substantially before one hour, spend remaining time resolving IIIF canvas/page identity, checking one directly related Thomas object/manual revision, and strengthening evidence-boundary tests. **Do not start another machine family.**
