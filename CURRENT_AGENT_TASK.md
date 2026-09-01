# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-curta-analytical-source-hardening.md`.

The Curta + Analytical Engine source-hardening slice landed as `3c7406ddce578881cdf8c225ee479ed7675254d4` about 37 minutes after assignment. It changed 11 files (259 additions / 203 deletions), moved the suite from 217 to 221 tests across 19 files, passed local typecheck/tests/build/diff and bilingual browser smoke, and both remote CI run `33494651002` and Pages run `33494650973` completed successfully. No open PR remains.

Several consecutive substantial slices have completed in roughly 30–42 minutes. Keep the scope moderately broad, but preserve one coherent question:

> **Can the two older source-atlas tracks—Difference Engine No. 2 and Bush's Differential Analyzer—move from catalog/bibliographic anchors toward directly inspected page/figure-level technical-document anchors, while keeping original historical evidence, later engineering reconstruction, and repository teaching models rigorously separate?**

This is a source-precision + evidence-adapter slice. It is not permission to draw source-specific gears, linkages, shaft routing, printer timing, or physics.

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read, in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.1, 0.2, 6 and 8
6. `docs/STRUCTURE_EVIDENCE.md`
7. `research/difference-engine-source-map.md`
8. `research/differential-analyzer.md`
9. `src/exhibits/source-atlas/index.ts`
10. `tests/source-atlas.test.ts`
11. current `#/source-atlas`, `#/finite-difference`, `#/continuous`, and evidence-card/navigation code
12. `docs/TEACHING_PATH.md` and `docs/VERIFICATION.md`

Before editing, run the full suite once and record the actual baseline. The current ledger says **221 tests across 19 files**; actual repository state wins.

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Objective

Complete five connected parts:

1. deepen the Difference Engine No. 2 source map using directly inspected institutional technical-description pages plus exact Babbage archive drawing/notation identities;
2. make a bounded direct-facsimile attempt for Bush 1931 and, whether or not it succeeds, directly inspect at least one strong contemporary/near-contemporary publication that adds source precision without pretending to be the 1931 construction paper;
3. extend the existing typed source atlas for the Difference Engine and Bush tracks with the strongest legitimate access/page/figure metadata achieved;
4. improve the bilingual atlas/lesson cross-links only enough to make the new H/R/document-access boundaries visible;
5. add tests and reconcile STATUS/TODO/RESEARCH_GAPS/VERIFICATION.

Do **not** add a new machine family, physics simulation, failure probability, source-specific animation, or whole-machine emulator.

---

# Part A — Difference Engine No. 2: primary drawings versus institutional technical reconstruction

## A1. Directly inspect the Science Museum technical description

Start with the Science Museum institutional PDF:

- *Charles Babbage's Difference Engine No. 2: Technical Description*:
  <https://www.sciencemuseum.org.uk/sites/default/files/2023-09/DE2_Technical_Description.pdf>

Directly inspect the PDF itself. Record only metadata the document supports, such as:

- exact displayed title;
- author/editor/curatorial attribution if stated;
- publication/revision/date if stated;
- page count;
- exact pages/figures/appendix entries actually inspected;
- whether the statement is describing Babbage's surviving design material, the Science Museum's interpretation, the reconstructed machine, or a manufacturing decision made by the reconstruction team.

Treat this document as **R/E2 institutional reconstruction/technical interpretation** unless a particular passage is explicitly quoting or reproducing an identified primary record. Do not silently promote the modern technical description to H/E1 merely because it is detailed.

Use it to strengthen only claims that matter to current lessons, for example:

- how the reconstruction interprets the addition/carry/calculating arrangement;
- how the machine cycle/control/state sequence is described at reconstruction level;
- how printing/check-copy/stereotype roles are described;
- which manufacturing details Babbage's surviving material did not fully specify and therefore required reconstruction decisions;
- appendix mapping between archive drawing identifiers and the reconstruction account.

Do not copy PDF figures into the repository.

## A2. Re-check exact Babbage archive identities

Directly inspect the relevant Science Museum Group records and page/image metadata where available. Useful starting records include:

- `BAB/B/001`, *Elevation of Difference Engine No. 2*:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110117998/elevation-of-difference-engine-no-2>
- `BAB/B/002`, plan/tracing of Difference Engine No. 2;
- `BAB/B/003`, addition carriage / axis-driving tracing related to `BAB/A/171`;
- existing `BAB/A/171`, `BAB/B/013`, `BAB/B/014`, `BAB/A/178/*` records already mapped in the repository.

Keep two separate levels visible:

```text
identified Babbage drawing / notation record -> H/E1 for identity, date, catalogued subject, and directly legible content actually inspected
Science Museum Technical Description -> R/E2 interpretation/reconstruction account
repository finite-difference/output event order -> P/M
```

A drawing title or thumbnail is not enough to assert tooth counts, linkage paths, exact timing, material, tolerance, or build sequence. If a full-resolution image is legible and you directly inspect a specific feature, record the exact drawing identifier and what was actually visible; otherwise stop at catalog-subject precision.

## A3. Minimum Difference Engine result

By the end of the slice, try to add at least:

1. one typed atlas anchor for the institutional technical description with exact inspected page/figure anchors;
2. one additional or strengthened direct Babbage drawing/notation anchor tied to a current lesson responsibility;
3. an explicit testable boundary showing that R/E2 technical reconstruction claims cannot automatically become H/E1 Babbage-lifetime geometry;
4. a clarified source chain for calculation/control versus persistent printing/stereotype output.

Do not change the finite-difference arithmetic model merely to resemble the reconstruction description.

---

# Part B — Bush Differential Analyzer: direct publication precision without generation collapse

## B1. Bounded attempt for Bush 1931

Re-check the bibliographic anchor:

Vannevar Bush, “The Differential Analyzer. A New Machine for Solving Differential Equations,” *Journal of the Franklin Institute*, 212 (1931), pp. 447–488, DOI:
<https://doi.org/10.1016/S0016-0032(31)90616-9>

Make a bounded attempt to find and directly inspect a stable lawful full facsimile or institutional scan.

If successful:

- record exact publication metadata;
- record only page/figure anchors actually inspected;
- separate textual statements, diagrams, and photographs;
- do not generalize the 1931 machine to later improved MIT/Rockefeller or postwar analyzers.

If no stable full scan is accessible, **keep `bush-1931-paper` bibliographic-only** and record the exact access boundary. Do not manufacture page/figure claims from secondary summaries or bookseller descriptions.

## B2. Directly inspect a separate strong publication

Whether or not B1 succeeds, directly inspect at least one of these as a **separate source layer**, not a substitute masquerading as Bush 1931:

### Preferred: Shannon 1941

Claude E. Shannon, “Mathematical Theory of the Differential Analyzer,” 1941:

- publisher PDF:
  <https://onlinelibrary.wiley.com/doi/pdf/10.1002/sapm1941201337>
- DOI:
  <https://doi.org/10.1002/sapm1941201337>

If the PDF is directly inspectable, record exact pages/equations/figures actually used. Treat it as a near-contemporary **H/R** mathematical/system analysis, not as H evidence for every ca. 1930 mechanical construction detail.

### Optional application anchor: Bush & Caldwell 1931

V. Bush and S. H. Caldwell, “Thomas-Fermi Equation Solution by the Differential Analyzer,” *Physical Review* 38 (1931):

<https://doi.org/10.1103/PhysRev.38.1898>

Use this only if directly inspectable and only for what it establishes about an actual calculation/application/checking context. It is **not** a construction manual for the analyzer.

Do not spend the whole slice hunting inaccessible scans. A clear recorded access boundary is valid progress.

## B3. Preserve Smithsonian component boundaries

Keep the already inspected Smithsonian/NMAH records intact:

- input table carriage;
- adder/differential gear;
- original integrator unit;
- tracer/output carriage;
- frontlash unit.

These are H/E1 for catalogued objects and museum-described roles, but they still do not prove the repository's exact chain:

```text
input -> adder -> integrator -> tracer
```

as one permanently wired historical configuration.

Do not infer exact shaft routing, torque amplification, placement, scale factors, response timing, backlash magnitude, residual error, or efficiency unless a directly inspected source supplies that exact information.

## B4. Minimum Differential Analyzer result

Try to add at least:

1. one directly inspected publication/facsimile anchor beyond the current Smithsonian object records;
2. exact page/figure metadata only where direct inspection supports it;
3. a typed boundary distinguishing contemporary mathematical/publication evidence from surviving component evidence and the repository's P/M flow;
4. an explicit generation boundary preventing original MIT, improved MIT/Rockefeller, and postwar GE/UCLA material from collapsing into one machine.

---

# Part C — typed source-atlas precision

Extend the existing `src/exhibits/source-atlas/` model rather than creating another provenance system.

## C1. Use existing fields first

The atlas already supports:

```text
claimType
 evidenceStrength
 accessKind
 fullFacsimileInspected
 pageFigureAnchors
 documentRole
 accessHost
 supports[]
 notEstablished[]
 researchNoteAnchor
```

Prefer these fields. Add a new type/access kind only if a real source cannot be represented honestly without it.

Likely useful distinctions already available include:

- `direct archive record`;
- `direct catalog`;
- `institutional reconstruction`;
- `bibliographic-only`;
- `direct primary facsimile`;
- `reconstruction documentation`.

Do not create a scalar source-quality, fidelity, confidence, reliability, or authenticity score.

## C2. Expected new/strengthened anchors

Difference Engine track should gain or strengthen anchors for:

- the Science Museum technical-description PDF as **R/E2** with inspected page/figure metadata;
- one or more exact Babbage drawing/notation records only at H/E1 precision actually inspected.

Bush Differential Analyzer track should gain or strengthen anchors for:

- Bush 1931 only to the access level actually achieved;
- Shannon 1941 if directly inspected, as H/R with exact page anchors and explicit “not construction geometry” boundary;
- Bush & Caldwell 1931 only if directly inspected and useful as a separate application/use anchor.

Do not remove or weaken the existing Curta/Analytical Engine anchors unless a real defect is found.

---

# Part D — tests and public integration

## D1. Focused tests

Add tests proving at least:

1. source-anchor ids remain unique across all four atlas tracks;
2. the Science Museum DE2 technical description is R/E2 and cannot be surfaced as a Babbage-lifetime built artifact;
3. an R/E2 reconstruction page/figure anchor cannot silently establish original manufacturing tolerances/materials unless the source explicitly states them and the note identifies the location;
4. direct Babbage archive records remain H/E1 at the actual inspected record/drawing precision and cannot inherit every reconstruction interpretation;
5. if Bush 1931 remains bibliographic-only, it has no invented `pageFigureAnchors` or `fullFacsimileInspected=true`;
6. any directly inspected Shannon anchor remains H/R and cannot be used as proof of exact ca. 1930 shaft/linkage geometry;
7. Smithsonian components cannot prove the repository's exact A+B → integrator → tracer wiring or discrete event timing;
8. different analyzer generations remain explicit in source metadata/boundaries;
9. no atlas object exposes scalar fidelity/reliability/source-quality/confidence fields.

Do not weaken existing atlas tests.

## D2. Public source-atlas surface

Keep the existing four-track `#/source-atlas` route. Do not add a fifth route.

For the Difference Engine and Bush groups, make newly obtained precision visible in text:

- document/source identity;
- H/R + E strength;
- document role/access kind;
- access host where meaningful;
- exact inspected page/figure anchor where legitimate;
- what the source supports;
- what it does not establish.

Add or refine a short bilingual explanation that a detailed modern technical reconstruction may be **more mechanically explicit** than a surviving primary catalog record while still being **R rather than H**. Detail does not automatically upgrade historical status.

Keep `#/finite-difference` and `#/continuous` cross-links into the relevant atlas groups. Do not redesign the lessons.

No meaning may depend only on color. Do not embed source PDFs, journal scans, archive images, or copyrighted figures.

---

# Part E — reconciliation and verification

After Parts A–D are real:

- update `STATUS.md` to reflect the two strengthened source tracks and remaining open evidence;
- add one concise completed line to `TODO.md` rather than expanding it into another roadmap;
- update `docs/RESEARCH_GAPS.md` Priority 0.2 / 6 / 8 wording from current gap to the strongest new state actually achieved;
- update `docs/TEACHING_PATH.md` only if navigation meaningfully changes;
- update README only if source-atlas discoverability genuinely changes;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and exact commands/browser routes checked.

Do not rewrite `IMPLEMENTATION_PLAN.md` as a live status ledger.

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

If public UI changes, perform local browser smoke in **English and Chinese** for:

```text
#/source-atlas
#/finite-difference
#/continuous
#/about
```

Also quick-regress one named-machine route such as `#/analytical-engine` or `#/curta` to ensure the four-track atlas did not regress.

Record exactly what was checked. Do not claim remote CI or Pages success before they finish.

After push:

- confirm remote `main` contains the completion commit;
- inspect remote CI/Pages runs if they finish during the work;
- if Pages deployment succeeds, verify the public source-atlas route before calling the new precision live;
- stop after the coherent commit/push and wait for the next task revision.

# Evidence boundaries

- Science Museum DE2 technical description: **R/E2 institutional reconstruction/technical interpretation**, not automatic H/E1 Babbage evidence.
- Identified Babbage drawing/notation records: **H/E1** for identity/date/catalogued subject and directly inspected legible content only.
- A modern reconstruction can be detailed without proving that Babbage specified every material/tolerance/manufacturing choice.
- Bush 1931 is H/E1 for what the paper says only when the paper itself is directly inspected; bibliographic metadata alone does not create page/figure evidence.
- Shannon 1941 may be H/R primary publication evidence for mathematical/system analysis, but not a source for every ca. 1930 physical linkage.
- Bush & Caldwell 1931, if used, is an application/use source, not a construction description.
- Smithsonian surviving components are H/E1 at object/role precision and must not be assembled into unsupported full-machine wiring.
- Repository finite-difference, output-flow, continuous-integrator and continuous-flow event orders remain P/M unless a historical source separately establishes the same order at that precision.
- Do not copy source images/scans into the repository; link and paraphrase.

# Stop conditions

Stop and leave a clear blocker note rather than guessing if:

- the DE2 PDF cannot be directly inspected or its metadata/page numbering is ambiguous enough to make page claims unsafe;
- a Babbage image is too small/unclear to support feature-level interpretation;
- Bush 1931 remains inaccessible and the only available detail comes from booksellers/secondary summaries;
- Shannon or another publication is accessible only as metadata and not as the actual document;
- completing the task would require inventing exact shaft routing, gear ratios, tooth counts, force/torque, tolerance, timing, materials, wear, error magnitude, or manufacturing geometry;
- the public atlas changes would require a broad routing/UI rewrite rather than a small evidence-card extension.

If the strongest Bush facsimile remains inaccessible, **do not treat that as failure**. Record the access boundary, strengthen the Difference Engine side and the directly inspectable publication layer, and finish the coherent slice.

If all required parts finish substantially before the target duration, spend remaining time on source-anchor tests, bilingual wording, document-access boundary consistency, and browser regressions. Do not start a new machine or a reliability simulator.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect existing source/research/test adapters before creating new structures;
- one coherent implementation/research checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after the evidence and tests are real;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: deepen DE2 and differential analyzer source anchors
```
