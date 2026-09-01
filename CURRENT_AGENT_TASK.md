# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: roughly 2 hours by old estimates; recent throughput suggests this should occupy about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-difference-engine-output.md`.

The Difference Engine assignment landed as `774059118dc0835314643a2b610ab159d13ea66c`; push CI run `33456003716` passed. It raised the suite from 108 to 128 tests across 12 files, hardened replay, added a source map and output-contract model, upgraded the browser lesson, and still completed in roughly 30 minutes. This task is therefore deliberately broader, but it remains one coherent question:

> Mechanical arithmetic depends on controls that do not themselves “contain the answer”: mode selectors, zeroing/canceling mechanisms, crank-home locks, correction paths, and the distinction between a key that merely sets state and a key that immediately performs arithmetic. Which of those relationships are actually documented for specific machine families, and which should remain generic P/M teaching abstractions?

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 3 and Priority 4
6. `research/subtraction-and-division.md`
7. `research/key-driven-computation.md`
8. `research/carry-is-the-hard-part.md`
9. `research/curta-source-map.md`
10. `src/mechanisms/setting-crank-interlock/index.ts`
11. `src/mechanisms/operator-division/index.ts`
12. the current `#/controls`, `#/operator-division`, and key-driven teaching text in `src/main.ts`
13. relevant tests for interlock/division/key-driven mechanisms
14. `docs/REPRESENTATION_AND_PROTOCOL.md`
15. `docs/VERIFICATION.md`

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as a task source.

Before editing, run the full current test suite once and record the actual baseline.

# Objective

Complete four connected pieces:

1. create a **source-specific control/zeroing/correction provenance map** that keeps Thomas arithmometer, Odhner-family crank locking, Felt/Tarrant key-driven/canceling machinery, and Pascaline complement subtraction separate rather than inventing a universal calculator control mechanism;
2. tighten `research/subtraction-and-division.md` so source-specific mode/counter/zeroing claims are anchored to precise objects/patents and generic P/M procedure claims remain visibly generic;
3. add a small typed **control-provenance teaching dataset/module** and use it to upgrade `#/controls` (and only minimally `#/operator-division` if useful) so visitors can compare the tested generic interlock with documented historical control roles without mistaking the P/M event sequence for any patent drawing;
4. add focused tests/verification so historical claim metadata cannot silently lose its source/evidence boundary.

Do **not** build historical gear geometry, a full Thomas/Odhner/Comptometer emulator, a new generic zeroing mechanism, or a partial-stroke correction simulation in this slice.

---

# Part A — create `research/control-and-zeroing-source-map.md`

Use the two-axis evidence policy. Organize the note approximately as:

```text
Question
Claim types
Why controls are computational state
Source-specific cases
What each source directly establishes
What must not be generalized
Repository P/M boundary
Open questions before mechanism-specific modeling
Implementation consequences
Date checked
```

The key rule is **one family/model/source at a time**. A mode lever on a Thomas machine is not proof of an Odhner control path; an Odhner crank lock is not a Comptometer correction mechanism.

## A1. Thomas arithmometer: mode, revolution counter, and zeroing

Start with these institutional sources:

- Smithsonian/NMAH, Thomas Arithmometer `nmah_690683`:
  <https://americanhistory.si.edu/collections/object/nmah_690683>
- Smithsonian/NMAH stepped-drum group:
  <https://americanhistory.si.edu/it/collections/object-groups/calculating-machines/stepped-drum-calculating-machines>
- Smithsonian/NMAH, *Instructions pour se Servir de l'Arithmomètre*, 1868, `nmah_904757`:
  <https://www.americanhistory.si.edu/collections/object/nmah_904757>

At the precision currently visible in the museum records, record separately:

- a lever selects addition/multiplication versus subtraction/division on identified Thomas examples;
- the 1867 object record describes the revolution register turning in opposite directions for the two mode groups;
- identified later Thomas examples have dedicated controls/knobs for zeroing revolution and result registers;
- the Smithsonian catalog proves the existence/date/provenance of the 1868 operating-instruction pamphlet, but **the catalog metadata alone does not prove the contents of uninspected pages**.

If the IIIF/Mirador material for the 1868 pamphlet can be inspected legibly, record exact page/image anchors for operator procedure. If not, explicitly mark the pamphlet contents as not yet inspected rather than inventing instructions.

Do not merge several Thomas dates/models into one imaginary canonical geometry. Record model/date/object IDs next to each claim.

## A2. Odhner: crank-home locking as a documented control relation

Primary patent anchor:

- Valentin Jakob Odhner, US 1,510,100, *Calculating Machine* (1924):
  <https://patents.google.com/patent/US1510100A/en>

Inspect the patent text and figures enough to record the narrow relationship it actually claims:

- the operating crank/calculating discs are associated with a locking device;
- the crank has a defined zero/home position;
- the guide/notch/locking relation is arranged so the lock state differs during crank rotation versus zero position;
- the patent also describes a relation between the crank lock and locking/liberating cam/disc-setting parts.

Record figure numbers only where actually inspected. Patent disclosure is **H/E1 for the documented intended design**, not proof that every Odhner-family production machine used exactly the illustrated embodiment.

The repository's `setting-crank-interlock` remains **P/M**. It may be historically motivated by this class of control problem, but its `SETTING_LOCKED → CRANK_RELEASED → ...` event order must not be relabeled as an Odhner simulation.

## A3. Felt/Tarrant: immediate key actuation, canceling, and carry-strain recovery are distinct claims

Use primary patents rather than broad “the Comptometer did X” prose.

Required anchors:

- Dorr E. Felt, US 960,528, *Calculating-Machine* (1910):
  <https://patents.google.com/patent/US960528A/en>
- Joseph A. Turck, US 1,154,897, *Calculating-Machine* (1915), assigned to Felt & Tarrant:
  <https://patents.google.com/patent/US1154897A/en>

For US 960,528, record only source-supported claims such as:

- the patent is directed to a canceling mechanism in the Duplex Comptometer context;
- it explicitly discusses releasing carry mechanism strain/jamming associated with improper manipulation/held keys or numeral wheels;
- canceling/zeroing is therefore not merely “set the displayed number to zero” in that documented design context.

Do **not** infer a generic partial-stroke correction mechanism unless another inspected source establishes it.

For US 1,154,897, record the explicit architectural distinction:

- the register operates in immediate response to manipulation of the value key, without an intervening power/control key or lever;
- the patent is about prime-actuating/key-driven mechanism and high-speed key operation.

This source can strengthen the repository's `keypress → accumulate` historical motivation, but it does not prove that every Comptometer revision had the same actuator/carry/canceling geometry.

If a better Felt patent among the earlier patents cited by Turck is inspected during the task, add it only when it contributes a precise control/carry claim. Do not expand into a patent catalog for its own sake.

## A4. Pascaline: complement subtraction boundary

Keep this deliberately narrower because current repository evidence is museum/reconstruction-level rather than a newly inspected seventeenth-century primary text.

Use the existing anchors already in the repository:

- ACONIT/Inria Pascaline exhibit;
- CMU Pascaline reconstruction.

Record the high-level contrast only:

- the documented/reconstructed carry architecture is directional;
- subtraction is explained through complementary representation/operator procedure rather than simply reversing a generic carry chain.

Label museum synthesis as **H** and reconstruction behavior as **R**. Do not add source-specific subtraction geometry or digit conventions unless primary/facsimile evidence is actually inspected.

## A5. Required comparison conclusion

The source map must end with a compact comparison like:

| Case | Documented control responsibility | What the repository may teach | What remains unmodeled |
|---|---|---|---|
| Thomas identified object(s) | arithmetic mode, counter direction, identified zeroing controls | mode/counter/initial-state responsibilities | exact internal linkage/timing across revisions |
| Odhner US1510100A | crank-home/disc locking relation | why legal actions depend on mechanism phase | production-family generalization and exact geometry |
| Felt US960528 | canceling plus carry-strain/jam recovery in specified Duplex context | zeroing/canceling can restore valid control state | generic correction/partial-stroke model |
| Turck US1154897 | key manipulation directly actuates register | keypress can itself be a compute cycle | universal Comptometer actuator geometry |
| Pascaline museum/reconstruction | complement-oriented subtraction boundary | representation can replace reverse mechanical motion | source-specific subtraction train |

Use precise source IDs and claim/evidence labels.

---

# Part B — deepen `research/subtraction-and-division.md`

Do not rewrite the note from scratch. Reconcile it with Part A.

Required improvements:

- replace broad Thomas/arithmometer statements with explicit object/date anchors where possible;
- separate **mode selection**, **revolution-register direction/counting**, **zeroing**, **overshoot indication**, and **operator correction** instead of treating them as one control bundle;
- keep Curta procedure claims tied to the current Curta manual/source boundary;
- keep Pascaline complement claims at H/R precision;
- link to `research/control-and-zeroing-source-map.md` for the detailed control provenance;
- explicitly state which parts of `src/mechanisms/operator-division/` are P/M operator-procedure abstractions rather than Thomas/Burkhardt/Curta behavior.

Do not claim that the generic overshoot/correction trace reproduces a particular historical bell, crank direction, counter sign convention, or add-back linkage.

---

# Part C — add a typed control-provenance teaching layer

Create a small module under `src/exhibits/`, for example:

```text
src/exhibits/control-provenance/
```

This is **not a mechanical simulator**. It is structured evidence data that keeps source-specific claims out of an undifferentiated prose blob.

A reasonable shape is:

```ts
interface ControlEvidenceProfile {
  id: string;
  family: string;
  dateOrModel: string;
  claimType: 'H' | 'R' | 'H/R';
  evidenceStrength: 'E1' | 'E2' | 'E3' | 'E4';
  sourceLabel: string;
  sourceUrl: string;
  documentedRoles: readonly string[];
  notEstablished: readonly string[];
}
```

Use a shape that fits existing conventions; do not force these exact names.

Minimum profiles:

1. identified Thomas arithmometer object with mode/counter/zeroing claims at the precision actually supported;
2. Odhner US1510100A crank-home locking relation;
3. Felt US960528 canceling/carry-strain context;
4. Turck US1154897 immediate key-driven actuation;
5. Pascaline museum/reconstruction complement boundary may be included as a paired H/R entry if it remains clear that it is not primary-patent evidence.

## C1. Data integrity tests

Add focused tests for the evidence dataset. At minimum:

- IDs are unique;
- every historical/reconstruction profile has a non-empty source URL and source label;
- evidence/claim labels use the repository's current two-axis vocabulary rather than legacy A–D grades;
- every profile explicitly states at least one `notEstablished`/open boundary;
- required source profiles are present;
- no profile silently labels the repository P/M interlock event sequence as historical evidence.

These tests are not “proof history is true”; they are guardrails that prevent future UI edits from dropping provenance/boundary metadata.

---

# Part D — upgrade `#/controls`

Preserve the current tested interactive `setting-crank-interlock` P/M lesson. Do not rewrite its mechanism unless a real bug is found.

Add a compact source-comparison layer driven from Part C.

The page should let a visitor see two clearly separated things:

```text
TOP: repository P/M interlock trace
     setting free → crank cycle → setting locked → return home

BELOW: documented historical control responsibilities
       Thomas mode/counter/zeroing
       Odhner crank-home locking relation
       Felt canceling/carry-strain recovery
       Turck immediate key-driven actuation
```

Required presentation:

- bilingual labels;
- source/model/date visible for each historical profile;
- claim type/evidence strength visible;
- `documentedRoles` and `notEstablished` both visible;
- explicit sentence that the P/M event sequence above is **not** reconstructed from any one of these machines;
- no source-specific gear diagram or animation;
- no meaning available only through color.

If the current page becomes too dense, use `<details>` sections/cards instead of creating a new route.

## D1. Optional minimal division text reconciliation

Only if it is a small clean change, update `#/operator-division` source-boundary prose so it points visitors to the new control source map and distinguishes:

- generic repeated-subtraction/overshoot/correction P/M trace;
- documented Thomas mode/counter roles;
- Curta operator procedure evidence;
- unmodeled source-specific correction geometry.

Do not redesign the division route in this task.

---

# Verification and documentation reconciliation

After Parts A–D are real:

- update `STATUS.md` to say source-specific control provenance exists, while zeroing/correction geometry remains open;
- update `TODO.md` by checking the subtraction/control provenance item only if the source map and browser comparison are genuinely complete;
- update `docs/REPRESENTATION_AND_PROTOCOL.md` only where the new source distinctions materially correct/strengthen its control column;
- update `docs/VERIFICATION.md` with the actual baseline/final test count and commands run;
- add a short link from README/teaching path only if it improves discoverability;
- keep `docs/RESEARCH_GAPS.md` as a research queue, not a status ledger.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a bounded local browser smoke of `#/controls`:

- existing setting/crank interaction still works;
- an attempted setting change during active crank remains visibly blocked;
- reset works;
- historical source profiles render from the typed dataset;
- source IDs / claim type / evidence level / open boundary are readable in English and Chinese;
- the P/M-vs-history separation is obvious without opening source code;
- no obvious desktop horizontal overflow.

Check final push CI if it completes promptly. Record deployment only if actually observed.

One coherent implementation commit is preferred after the administrator task-file commit. Push required work, then stop.

Suggested final subject:

```text
feat: ground subtraction and control provenance
```

---

# Optional early-finish work

Only if Parts A–D, tests/build, browser smoke, documentation reconciliation, commit and push are genuinely complete with substantial time remaining:

1. inspect the Smithsonian IIIF/Mirador representation of the 1868 Thomas instruction pamphlet and add exact page/image anchors **only if legible and actually inspected**;
2. add one additional precisely scoped Felt/Odhner patent figure anchor that materially clarifies a control relation already in the note;
3. check the latest Pages deployment for the completed commit and record it if successful.

Do **not** start broader output/audit-trail research, reliability/torque modeling, source-specific geometry, or a new machine family in this slice.

# Stop conditions

Stop and record a blocker rather than guessing if:

- a source page is inaccessible and the needed claim depends on inspecting it;
- several Thomas/Comptometer revisions conflict and the exact model cannot be resolved;
- implementing the historical comparison would require inventing linkage timing/geometry;
- the current `#/controls` P/M mechanism would need semantic changes merely to imitate a patent;
- a conflicting control-provenance implementation has already landed on remote `main`.

Narrow the claim instead of filling gaps with generic calculator knowledge.

# Git discipline

- remote `main` is authoritative;
- pull/fetch before work;
- inspect current code/research before creating parallel abstractions;
- keep source-specific claims attached to exact source/model IDs;
- run the full acceptance commands;
- inspect diff for unrelated cleanup;
- update status/verification only after verification passes;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.
