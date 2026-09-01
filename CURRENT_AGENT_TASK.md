# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-arithmetic-work-synthesis.md`.

The arithmetic-work slice landed as `42ede1d50b4a9b8a1bdd144d93aa14ee3fb1324f` about 32 minutes after assignment. It changed 11 files (438 additions / 7 deletions), raised the recorded suite from 201 tests across 17 files to 208 tests across 18 files, passed typecheck/tests/build/diff and bilingual browser smoke, and GitHub check runs for CI verify plus Pages build/deploy all completed successfully. No open PR remained.

Several consecutive broad research + typed-data + UI + test slices have now landed in roughly 30–42 minutes. Increase scope again, but keep one coherent question:

> **Exactly which directly inspected source record supports each historical role currently shown for Difference Engine No. 2 and the Bush Differential Analyzer, and what does that source still not establish?**

This is evidence/source hardening. It is **not** permission to infer source-specific geometry from archive images.

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read, in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially current Priority 0.2, Priority 6, Priority 8, and the stale completed sections that still read as future work
6. `docs/STRUCTURE_EVIDENCE.md`
7. `docs/REPRESENTATION_AND_PROTOCOL.md`
8. `research/difference-engine-source-map.md`
9. `research/differential-analyzer.md`
10. existing Difference Engine / finite-difference / difference-output-flow code and tests
11. existing continuous-integrator / continuous-flow / mechanical-error-control code and tests
12. current evidence/provenance profile modules and public evidence cards; reuse their conventions rather than creating incompatible metadata
13. `docs/TEACHING_PATH.md` and `docs/VERIFICATION.md`

Before editing, run the full test suite once and record the actual baseline. The current ledger says **208 tests across 18 files**; actual repository state wins.

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Objective

Complete five connected parts:

1. deepen the Difference Engine No. 2 source map with directly inspected Babbage Papers archive anchors around calculation drive and persistent-output apparatus;
2. deepen the Bush Differential Analyzer source map with directly inspected Smithsonian component/group anchors and a precise full-facsimile access boundary for Bush 1931;
3. create one typed **named-machine source-anchor atlas** that existing/future UI can inspect without turning a URL list into unsupported geometry;
4. add a compact bilingual public source-atlas surface and tests enforcing `supports` versus `not established` boundaries;
5. reconcile the stale research queue and verification/status docs so already completed direct-multiplication/key-driven/division/etc. work is not still described as wholly missing.

Do **not** add a new machine family or 3D/source-specific linkage drawing.

---

# Part A — Difference Engine No. 2: archive anchors, not geometry reconstruction

Strengthen `research/difference-engine-source-map.md` by directly inspecting authoritative Science Museum Group / institutional records.

Start from these open institutional/archive records and follow only links you can actually inspect:

- The Babbage Papers archive index:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000003/the-babbage-papers>
- `BAB/A/171`, *Addition carriage and mode of driving the axes of Difference Engine No. 2*:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000314/addition-carriage-and-mode-of-driving-the-axes-of-difference-engine-no-2>
- tracing `BAB/B/013` of `BAB/A/172`, *End view of inking printing paper and stereotyping apparatus*:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000343>
- tracing `BAB/B/014` of `BAB/A/173`, *Plan of inking, printing and stereotype apparatus*:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000344>
- existing source-map anchors for `BAB/A/174–176` and the institutional Difference Engine No. 2 reconstruction/object records already in the repository.

The archive index also lists `BAB/A/178` and subrecords for general motion notation, including calculating axes, printing apparatus, and stereotype frames. If direct records are discoverable and inspectable, add their exact identifiers/URLs. If not, record only what the archive index itself establishes and leave direct-record inspection open.

## A1. Record exact source metadata

For each directly inspected record used, record only metadata/roles actually visible on the institutional page, such as:

- archive identifier (`BAB/A/...`, `BAB/B/...`);
- institutional document/object record id;
- title/subject;
- date where the record supplies it;
- extent/dimensions only where directly stated;
- access/open-access status and image license/rights wording at a concise level where visible;
- what historical role the title/catalog safely supports;
- what remains unestablished.

## A2. Required boundary

Archive title/image availability is **H/E1 for record identity and catalogued subject**, not automatic proof of:

- exact tooth counts;
- exact linkage paths not stated by the record;
- synchronization/timing;
- force/load/tolerance;
- manufacturing method;
- whether every drawn proposal was built in Babbage's lifetime;
- the repository browser event order.

You may inspect images to understand what record you are looking at, but **do not derive new geometry claims from visual interpretation alone in this slice**. Do not copy/archive the images into this repository.

A useful improvement is to connect the source chain conceptually:

```text
BAB/A/171 -> calculating/addition-carriage drive subject
BAB/A/172–176 -> printing/stereotype transfer/output subjects
modern DE2 reconstruction -> institutional R/E2 built interpretation
repository difference/output trace -> P/M inspection model
```

without pretending those are one source or one confidence level.

---

# Part B — Bush Differential Analyzer: component anchors and facsimile boundary

Strengthen `research/differential-analyzer.md` using directly inspected institutional records.

Required institutional starting points:

- Smithsonian/NMAH, *Differential Analyzer Parts and Documentation*:
  <https://americanhistory.si.edu/collections/object-groups/mechanical-integrators/differential-analyzers>
- Integrator Unit from Bush Differential Analyzer, `MA.314824` / `nmah_1215155` (already referenced in research);
- Input Table Carriage, `1983.3002.01` / `nmah_693232`;
- Adder / Differential Gear, `1983.3002.02` / `nmah_693233`;
- Output Table Carriage / Tracer, `1983.3002.03` / `nmah_693234`;
- Frontlash Unit, `1983.3002.04` / `nmah_693235`.

Directly inspect the object-group page and as many individual institutional records as the environment permits. Keep route-specific access failures explicit; do not generalize one 403/challenge to the whole Smithsonian collection.

## B1. Bush 1931 publication boundary

The repository currently has the correct bibliographic anchor:

Vannevar Bush, “The Differential Analyzer. A New Machine for Solving Differential Equations,” *Journal of the Franklin Institute* 212(4), October 1931, pp. 447–488, DOI `10.1016/S0016-0032(31)90616-9`.

Make one bounded attempt to locate a **stable, lawfully accessible full facsimile or institutional scan**. If a complete scan is directly inspectable, record exact page/figure anchors only for claims you actually inspect.

If no stable full facsimile is accessible, preserve the bibliographic-only boundary. Do **not** use bookseller snippets, Wikipedia, or a later summary to manufacture Bush page/figure claims. A failed facsimile attempt is not a blocker for the rest of this task.

## B2. Required separation

Keep these responsibilities distinct:

- input-table curve-following -> shaft input role;
- adder/differential gear -> combining shaft rotations role;
- integrator -> integration role;
- frontlash unit -> museum-stated backlash compensation in a drive between adjacent-unit shafts;
- output carriage/tracer -> result tracing role;
- repository `A+B -> integrator -> tracer` exact chain -> P/M teaching wiring.

Do not infer that the surviving catalogued pieces were permanently wired in the exact repository order. Do not add numerical backlash, residual error, torque, efficiency, safe RPM, tolerance, or scale-factor claims without directly inspected evidence.

---

# Part C — typed named-machine source-anchor atlas

Create a typed module using current exhibit/evidence conventions, preferably:

```text
src/exhibits/source-atlas/
```

This is an **evidence adapter**, not a new machine model.

## C1. Anchor shape

Use names that fit the existing codebase. Each anchor should expose concepts equivalent to:

```text
id
track / machine generation
source title
institution
source URL
archive/object/record identifier
claim type (H or R; P/M only for repository model anchors if included)
evidence strength where applicable
access kind (direct catalog, direct archive record, institutional reconstruction, bibliographic-only, etc.)
inspected date
supports[]
notEstablished[]
research note anchor
```

Do not invent a universal source-quality scalar beyond `docs/EVIDENCE_POLICY.md`.

## C2. Required coverage

Include enough directly inspected anchors that both tracks are non-trivial. At minimum cover:

### Difference Engine track

- Babbage Papers archive identity/index;
- `BAB/A/171` calculation/addition-carriage drive subject;
- at least two printing/stereotype records from `BAB/A/172–176` or their tracings;
- Difference Engine No. 2 modern institutional reconstruction/object boundary.

### Differential Analyzer track

- Smithsonian object-group/generation context;
- at least input, adder/differential, integrator, frontlash, and tracer roles where direct records are inspectable;
- Bush 1931 as either direct-facsimile anchor or explicitly bibliographic-only anchor depending on access actually achieved.

Existing source URLs in research may be reused only after re-checking the current page/record identity in this slice.

## C3. No pseudo-geometry fields

Do not add generic fields such as:

```text
gearCount
linkagePath
rpm
backlashMagnitude
tolerance
force
```

unless a specific source supplies a specific value and this task has actually inspected it. This slice does not require any such quantitative geometry.

---

# Part D — tests and public source-atlas surface

## D1. Tests

Add focused Vitest coverage proving at least:

1. source-anchor ids are unique;
2. every H/R anchor has a non-empty source URL, institution, record identifier or explicit bibliographic identifier, evidence role, `supports[]`, and `notEstablished[]`;
3. `BAB/A/171` is not presented as evidence for printer timing or full printer geometry;
4. printing/stereotype drawing anchors are not presented as proof that Babbage completed the printer in his lifetime;
5. the modern Difference Engine No. 2 reconstruction remains R/institutional reconstruction and is not silently merged with Babbage-lifetime artifact evidence;
6. the Bush frontlash anchor supports only the museum-described adjacent-shaft backlash-compensation responsibility and does not expose numerical backlash/residual-error fields;
7. the input/adder/integrator/tracer source roles remain separate rather than being converted into one claimed historical wiring chain;
8. Bush 1931 cannot expose page/figure-specific claims unless the typed access state says a full facsimile was directly inspected in this pass;
9. no source-atlas profile emits a generic reliability, efficiency, fidelity, or confidence score beyond the repository's claim/evidence policy.

Do not weaken existing tests.

## D2. Public teaching surface

Add a compact bilingual route, preferably:

```text
#/source-atlas
```

or an equally clear name if current routing conventions suggest one.

The visitor should be able to inspect two track groups:

```text
Difference Engine No. 2
Bush Differential Analyzer
```

For each source card show, in text form:

- source/institution/record id;
- H/R + E strength where applicable;
- what this source supports;
- what it does not establish;
- link to source;
- research-note link/context.

Include a short explanation that an archive image or patent drawing is not self-interpreting proof of every physical detail.

Cross-link from `#/finite-difference` / Difference Engine output material and `#/continuous` where easy, but do not redesign those routes.

No meaning may depend only on color. No archive images need to be embedded.

---

# Part E — reconcile the live research queue

`docs/RESEARCH_GAPS.md` still contains several old sections written as if direct multiplication, key-driven computation, subtraction/division, representation, output-contract work, and arithmetic-work comparison were wholly future work even though STATUS/TODO now show them implemented.

Reconcile the document rather than deleting useful historical questions:

- change completed headings/lead paragraphs to **current state + remaining gaps**;
- preserve still-open items such as model/revision mapping, manuals, partial-stroke correction, exact operator procedure, commercial context, reliability/tolerance evidence, and source-specific geometry;
- make the “files to write next” list match files that actually still need work;
- keep `STATUS.md` authoritative and avoid another giant stale checklist.

After Parts A–D are real:

- update `STATUS.md` with the named-source atlas/source-map hardening;
- update `TODO.md` with one completed bounded line and a short honest next queue;
- update `docs/TEACHING_PATH.md` so `#/source-atlas` is discoverable;
- update README/navigation only as needed;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and commands run;
- do not rewrite `IMPLEMENTATION_PLAN.md` as a live ledger.

---

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

If public UI changes, perform local browser smoke in English and Chinese for the new source-atlas route plus quick regressions of:

```text
#/finite-difference
#/continuous
#/mechanical-error-control
#/about
```

Record exactly what was checked.

After push:

- confirm remote `main` contains the commit;
- inspect GitHub check runs if they finish during the work; do not claim CI/Pages success before they complete;
- if Pages deploy succeeds, verify the new route is reachable before calling it live;
- stop after the coherent commit/push. Do not self-assign the next task.

# Evidence boundaries

- Science Museum Group / Smithsonian archive/object record identity and catalogued subject can be H/E1 at the precision actually inspected.
- An institutional reconstruction is R/E2 unless a narrower policy distinction is already established in repository docs.
- A catalog title describing a mechanism subject does not automatically establish its exact geometry, timing, dimensions, force path, or production use.
- Babbage design drawings are not proof that the complete Difference Engine No. 2 or printer was built in his lifetime.
- Surviving Bush Differential Analyzer components do not prove the repository's exact browser wiring/order.
- Bibliographic metadata is not a full-paper facsimile.
- Do not quote or cite page/figure details you did not directly inspect.
- Do not copy museum/archive images into the repository in this slice.

# Stop conditions

Stop and leave a clear blocker note rather than guessing if:

- the only way to make a source claim stronger is to infer mechanism geometry from an image without textual/archival support;
- a source requires inaccessible material and there is no directly inspectable institutional substitute;
- typed source anchors would require redesigning multiple mechanism cores rather than adapting evidence metadata;
- the public source atlas would force incompatible evidence semantics with `docs/EVIDENCE_POLICY.md`;
- a conflicting source-atlas implementation lands on remote `main`.

Individual inaccessible records are **not** a blocker. Mark their access state/open question and continue with directly inspected anchors.

If Parts A–E finish substantially before the target duration, spend remaining time on **source precision and reconciliation**, for example discovering a direct `BAB/A/178` record, verifying exact Science Museum record metadata, inspecting additional directly linked Smithsonian component records, or improving accessibility/tests. Do not start a new machine family or source-specific gear animation.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect existing evidence/profile modules before creating parallel abstractions;
- one coherent research/evidence/UI checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after checks pass;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: add named-machine source anchor atlas
```
