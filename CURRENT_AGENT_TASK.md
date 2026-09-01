# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-stepped-drum-carry-evolution.md`.

The Thomas stepped-drum carry slice landed as `9245861d1817c3494e6553ed8a91fa0334ea1963` about 30 minutes after assignment. It changed 13 files (about 214 additions / 21 deletions), raised the recorded suite from 190 to 194 tests across 16 files, passed typecheck/tests/build/diff plus bilingual visible-carry smoke, and GitHub Actions CI run `33474770551` passed on the pushed commit. No open PR remained. Several substantial slices have now repeatedly landed in roughly 30–42 minutes, so this task is deliberately broader while remaining one coherent question:

> **How do different mechanical-computing architectures keep a mathematically valid operation from becoming a physically wrong result, and how can the playground expose those documented error-control responsibilities without inventing numerical reliability models?**

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read, in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 8 reliability/torque/tolerance/wear
6. `research/stepped-drum-carry-source-map.md`
7. `research/rotary-carry-scheduling-source-map.md`
8. `research/differential-analyzer.md`
9. `research/control-and-zeroing-source-map.md`
10. `docs/REPRESENTATION_AND_PROTOCOL.md`
11. existing typed provenance modules/tests under `src/exhibits/`
12. current `#/visible-carry`, `#/continuous`, `#/about`, navigation, and evidence-card UI in `src/main.ts`
13. `docs/TEACHING_PATH.md` and `docs/VERIFICATION.md`

Before editing, run the full test suite once and record the actual baseline. The current ledger says 194 tests across 16 files, but actual local/remote state wins.

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Objective

Complete four connected parts:

1. create a source-separated cross-machine **mechanical error-control** research note, centered on three already evidenced failure/control families: Thomas 1865 stepped-drum carry, Odhner-family rotary carry, and Bush Differential Analyzer backlash/frontlash;
2. deepen the Differential Analyzer source boundary with directly identified Smithsonian frontlash objects and their documented role, without pretending this supplies a full Bush 1931 geometry map;
3. add typed provenance/comparison data and a compact public teaching surface showing that `carry sequencing`, `inertia/load`, and `backlash compensation` are distinct physical correctness problems rather than one generic "mechanical error";
4. add tests and reconcile STATUS/TODO/research gaps/teaching/verification.

Do **not** implement random failures, probability, RPM limits, torque/friction simulation, tolerance microns, wear curves, or source-specific animated linkages in this slice.

---

# Part A — research: mechanical error-control matrix

Create:

```text
research/mechanical-error-control.md
```

Use the two-axis evidence policy. The note must keep each machine/source context separate.

## A1. Thomas 1865 — inertia/load/carry-position problems

Reuse and cite the exact source boundary already established in:

```text
research/stepped-drum-carry-source-map.md
```

At minimum preserve these distinct H/E1 patent-described problems/responses:

- rapid motion could let a dial travel one or two teeth too far by acquired motion; moderation/Malta-cross relation is described as the response;
- simultaneous loading of older vertical carry levers could redirect resistance into plate lift and weaken engagement, producing false results;
- successive stepped-cylinder phasing makes carries fall one after another;
- double-spring/full-position conditioning is described so the carry relation does not remain halfway.

Do not convert any of this into measured field failure rates, safe crank speeds, force values, or universal Thomas production behavior.

## A2. Odhner-family rotary carry — scheduling under rapid rotation

Reuse and cite:

```text
research/rotary-carry-scheduling-source-map.md
```

Keep at least these source contexts separate:

- Odhner US514725A baseline transfer relation;
- Valentin Odhner US1377269A rapid-rotation transfer-arm displacement/miscalculation problem and its patented response;
- Talamini/Marchant US1867603A displaced carry opportunities / phase-overlap improvement.

Do not merge these with Thomas stepped-cylinder phasing. Similar dependency problem != same geometry.

## A3. Bush Differential Analyzer — backlash/frontlash as a different error-control problem

Use direct Smithsonian/NMAH object records. Inspect the pages directly before writing claims.

Required starting anchors:

- Differential Analyzer Parts and Documentation group:
  <https://americanhistory.si.edu/collections/object-groups/mechanical-integrators/differential-analyzers>
- Frontlash Unit from the Bush Differential Analyzer, catalog `1983.3002.04`, record `nmah_693235`:
  <https://americanhistory.si.edu/collections/object/nmah_693235>
- Smithsonian mirror if useful:
  <https://www.si.edu/object/frontlash-unit-bush-differential-analyzer%3Anmah_693235>
- related frontlash units / incomplete units for artifact-family context only:
  - `1983.3002.09` / `nmah_693240`
  - `1983.3002.10` / `nmah_693241`
  - `1983.3002.11` / `nmah_693242`
- Adder or Differential Gear, `1983.3002.02` / `nmah_693233`:
  <https://www.si.edu/object/nmah_693233>
- existing integrator/input/output object anchors already listed in `research/differential-analyzer.md`.

The key bounded institutional statement from `1983.3002.04` is that the **frontlash unit compensated for backlash in a drive between the output shaft of the unit and the input shaft of an adjacent unit**. Record that at object-catalog precision.

Important boundaries:

- use the museum's term `frontlash unit` and its stated compensation role;
- do not claim the museum record proves a numerical backlash magnitude, residual error, tolerance, efficiency, response time, or complete analyzer wiring;
- do not infer that a specific surviving frontlash unit sat between the specific surviving adder/integrator/tracer objects unless a source establishes that connection;
- do not silently equate frontlash compensation with a torque amplifier. They are different responsibilities. Only add torque-amplifier claims if an authoritative/primary source is actually inspected and cited separately.

## A4. Bush 1931 facsimile/page search — bounded, non-blocking

Existing note has the bibliographic anchor:

Vannevar Bush, “The Differential Analyzer. A New Machine for Solving Differential Equations,” *Journal of the Franklin Institute* 212(4), October 1931, 447–488.

Spend a bounded amount of time looking for a legally accessible stable facsimile/full text through institutional/library/archive routes. If you obtain and actually inspect it, add precise page/figure anchors only for claims you can verify.

If you cannot obtain a stable full text, **do not block the slice and do not manufacture page/figure claims**. Record the access boundary and proceed with the Smithsonian object evidence.

## A5. Required comparison table

End `research/mechanical-error-control.md` with a compact table approximately like:

| Source/context | Documented physical correctness problem | Documented response/control | Evidence role | Not established |
|---|---|---|---|---|
| Thomas 1865 | inertia overrun; simultaneous carry load; dependent carry order | moderation/full-position carry relation/successive phasing | H/E1 patent | measured speed/load/failure envelope; universal production geometry |
| Odhner 1921 | rapid-rotation transfer-arm displacement/miscalculation | patent-specific transfer control | H/E1 patent | production failure rate/safe RPM/universal Odhner geometry |
| Talamini/Marchant 1932 | carry-created crossings need later rotary opportunities | displaced/overlapped carry opportunities | H/E1 patent | Thomas geometry; universal production implementation |
| Bush ca.1930 frontlash unit | backlash in a drive between adjacent unit shafts | frontlash compensation unit | H/E1 surviving/catalogued object | numerical backlash, residual error, exact full-machine placement/wiring |
| repository comparison | make error-control responsibility inspectable | typed source-separated cards/table only | P | reliability probability or physics simulation |

The conclusion should make the conceptual distinction explicit:

```text
mathematically correct relation
!=
physically guaranteed transmission
```

but must not imply all mechanical computers share one failure mechanism.

---

# Part B — deepen `research/differential-analyzer.md`

Update the existing note rather than creating a competing Differential Analyzer source map.

Required changes:

- add the identified frontlash unit(s) with catalog/record IDs and the museum-described backlash-compensation role;
- distinguish **integration mathematics**, **shaft transmission**, **backlash compensation**, and **output tracing** as separate responsibilities;
- correct any stale blanket statement that Smithsonian pages are inaccessible if they are now directly inspectable in your environment; if only some routes fail, record the exact route limitation instead;
- preserve the current P/M serialized browser phases as inspection order only;
- keep torque amplification, physical error magnitude, slip/drift, exact shaft routing, scale factors, and timing open unless actually sourced.

Do not modify the numerical continuous-integrator mechanism merely because physical backlash exists. The current integrator is an ideal P/M mathematical/functional model; this slice is about evidence and responsibility boundaries, not injecting fake error.

---

# Part C — typed provenance + public comparison

## C1. Typed data

Create an appropriately named typed source/comparison module under `src/exhibits/`, for example:

```text
src/exhibits/mechanical-error-control/
```

Reuse existing evidence/provenance interfaces where practical instead of inventing a parallel evidence system.

Include at least separate profiles for:

1. Thomas 1865 rapid-motion / carry-load / sequential-phasing context;
2. Valentin Odhner US1377269A rapid-rotation transfer context;
3. Talamini/Marchant US1867603A scheduling context if needed to keep rotary improvement separate;
4. Bush Differential Analyzer frontlash unit `1983.3002.04` / `nmah_693235`.

Each profile must expose in text/state form:

- stable unique id;
- machine/source/date context;
- claim type and evidence strength;
- exact source URL;
- **error/failure class** (for example `inertia/load`, `carry scheduling`, `backlash/transmission` — names are yours but keep distinctions);
- documented problem;
- documented control responsibility;
- explicit `notEstablished` boundary.

Do not add pseudo-quantitative reliability fields.

## C2. Tests

Add focused tests proving at least:

- IDs are unique;
- all H/R profiles have source, evidence strength, documented problem/control, and non-empty `notEstablished`;
- the Bush profile contains the exact Smithsonian catalog/record context and identifies **backlash compensation** rather than torque amplification;
- Thomas and Odhner/Talamini profiles retain their own source URLs and are not relabeled as one mechanism family;
- at least three distinct error/failure classes remain visible in the comparison;
- no profile claims measured probability, safe RPM, tolerance magnitude, or residual error;
- any P comparison layer is not mislabeled H/E1.

## C3. Public teaching surface

Add a compact bilingual public comparison that a visitor can discover without reading research Markdown.

Preferred option if routing/nav changes are small:

```text
#/mechanical-error-control
```

If a new route creates disproportionate churn, integrate a clearly discoverable section into `#/about` or `#/continuous` and cross-link from the carry lesson. Do not spend the slice redesigning navigation.

The public view should let the visitor answer:

```text
Thomas: what could go physically wrong with carry/load/order?
Odhner/Talamini: what could go wrong under rotary carry timing/scheduling?
Bush: what does backlash between mechanical transmission stages require?
Why does none of this justify a random “gear failure probability” animation?
```

Prefer source cards + a simple responsibility matrix over decorative machinery.

No motion is required. No meaning may depend only on color.

---

# Part D — documentation and verification

After Parts A–C are real:

- update `STATUS.md` with the new mechanical-error-control provenance/comparison and the Bush frontlash boundary;
- update `TODO.md` only if the short queue benefits from a completed line / next evidence target;
- update Priority 8 and related Differential Analyzer items in `docs/RESEARCH_GAPS.md` so already-completed evidence is not still listed as missing;
- add a concise error-control/responsibility row or section to `docs/REPRESENTATION_AND_PROTOCOL.md` without flattening distinct machine families;
- update `docs/TEACHING_PATH.md` so the public comparison is discoverable;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and commands run;
- README only if needed for route/discoverability;
- do not broaden this into a general history of reliability engineering.

If substantial time remains after all acceptance criteria pass, use it to improve source-location precision, test coverage, accessibility, bilingual text-state visibility, or to inspect a legitimate Bush 1931 facsimile. Do **not** start a stochastic reliability model or a new machine family.

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

If public UI changes, perform local browser smoke in English and Chinese for the new/changed surface plus a quick regression check of `#/visible-carry` and `#/continuous`. Record exactly what was checked.

After push:

- confirm remote `main` contains your commit;
- if CI completes during the run, record its result; otherwise do not claim it passed yet;
- if Pages deployment completes during the run, you may record the live route; otherwise do not claim the new route is already deployed;
- stop after the coherent commit/push. Do not self-assign the next task.

# Stop conditions

Stop and leave a clear blocker note rather than guessing if:

- a source is inaccessible and the claim would require uninspected detail;
- the Smithsonian frontlash record cannot be verified and no equivalent institutional source is available;
- implementation would require inventing full-machine shaft placement/wiring;
- a proposed UI would imply that Thomas, Odhner, and Bush used one shared physical error-control mechanism;
- meaningful progress would require numerical friction/torque/backlash parameters that are not sourced;
- a conflicting implementation lands on remote `main`.

The lack of a Bush 1931 full facsimile is **not** by itself a blocker; preserve that as an open evidence boundary and proceed with directly inspected object records.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect current modules/tests before creating parallel abstractions;
- one coherent implementation/research checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after checks pass;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: map mechanical error-control responsibilities
```
