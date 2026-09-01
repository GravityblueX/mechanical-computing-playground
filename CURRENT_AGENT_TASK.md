# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-analytical-engine-1889-boundary.md`.

The previous assignment landed as `67c83087777d277c342ee8f1ada5780aafb34818` about 37 minutes after assignment, changed 78 lines (`+60/-18`) across 7 files, retained 291 tests across 21 files, and passed exact-head push CI `33528641107` plus Deploy Pages `33528641115`. The agent correctly stopped at an access boundary instead of fabricating 1889 page claims. Because recent slices continue to finish well under one hour, this assignment is deliberately a little larger: one directly inspectable institutional object/drawing pass, one bounded Smithsonian publication/patent-provenance pass, and typed source-atlas reconciliation. Do not broaden it into a Scheutz emulator.

> **Question for this slice:** can the repository replace its previously inaccessible Smithsonian Scheutz boundary with directly inspected evidence for the actually built 1853 printing difference engine and its ca. 1857 operational drawing set, while keeping object provenance, operating instructions, patent specification, later historical synthesis, Babbage designs, and the repository's P/M Difference Engine/output lessons separate?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2, Priority 7, and `Files to deepen next`
6. `docs/VERIFICATION.md`
7. `research/difference-engine-source-map.md`
8. `research/output-and-audit-trail.md` only to preserve the existing persistent-output boundary
9. `src/exhibits/source-atlas/` and `tests/source-atlas.test.ts`
10. the existing Difference Engine / persistent-output exhibit code and tests only as needed to avoid historical over-claiming

Run current-main typecheck/tests before editing and record the actual baseline. Do not use old implementation-plan checkboxes as the task source.

# Part A — directly inspect the Smithsonian Scheutz object and drawing records

The previous Difference Engine source pass recorded the Smithsonian Scheutz object as inaccessible in that environment. Public Smithsonian/NMAH records are now directly discoverable and should be re-checked by the agent rather than relying on this assignment text.

## A1. 1853 built machine

Inspect both institutional access routes when available:

- National Museum of American History, *Scheutz Difference Engine*, record `nmah_997042`, ID `MA.323659`:
  <https://americanhistory.si.edu/collections/object/nmah_997042>
- Smithsonian Institution mirror:
  <https://www.si.edu/object/scheutz-difference-engine%3Anmah_997042>

Record only what the directly rendered institutional record supports, including where available:

- object identity, maker, date made, place, materials and dimensions;
- the record's description of the machine as a printing calculator;
- Paris exhibition / Dudley Observatory / U.S. government-contract context exactly as the record states it;
- related-object pointer to the operational drawing sheet.

Do not silently resolve spelling/location/date differences across catalog prose and later sources. If one record says Albany and another says Schenectady, or sale/shipping dates differ, record the source wording and reconcile only with stronger evidence.

Claim boundary:

- surviving/catalogued 1853 machine and Smithsonian object metadata: **H/E1 at object-record precision**;
- institutional descriptive prose about use/significance: H at institutional catalog precision, not proof of every mechanical detail or performance claim.

Do not infer internal gearing, printer timing, tooth counts, operating speed, reliability, error rates, or government-contract workflow from object photographs.

## A2. ca. 1857 operational drawing set

Inspect:

- National Museum of American History, *Sheet of Drawings of the Scheutz Difference Engine*, record `nmah_1005138`, ID `1988.0798.01`:
  <https://americanhistory.si.edu/collections/object/nmah_1005138>
- Smithsonian Institution mirror:
  <https://www.si.edu/object/sheet-drawings-scheutz-difference-engine%3Anmah_1005138>

The task is to verify the record itself, not to reverse-engineer the machine from images.

Record at exact catalog precision:

- object/drawing-set identity and ca. 1857 date;
- number of figures if directly stated;
- the catalog statement about the drawings being supplied with the engine and their operating-instruction role;
- the catalog's statement that the figures are similar to but not identical with the final specifications for British Patent A.D. 1854, No. 2214, including any numbering caveat;
- the existence of the related letter only at the level the catalog establishes.

**Do not claim to have inspected the letter's content unless the letter itself is separately and directly accessible.** Do not turn a catalog statement that a letter explained number-system conversion into a verbatim or complete operating procedure.

Images may be inspected for record identity/figure labels if lawful, but do not copy them into the repository and do not infer geometry beyond what the catalog or an independently inspected specification supports.

## A3. Difference-engine group context

Directly inspect the NMAH difference-engine group if available:

<https://americanhistory.si.edu/collections/object-groups/calculating-machines/difference-engines>

Use it only for institutional grouping/context and for separating Babbage proposals/fragments, Scheutz built machines, and later replicas. Do not let a group-page summary overwrite more precise object records.

# Part B — Smithsonian publication / patent-provenance cross-check

A U.S. Government / Smithsonian-hosted scan appears to exist for Uta C. Merzbach's institutional study *Georg Scheutz and the First Printing Calculator* (Smithsonian Studies in History and Technology, no. 36, 1977):

<https://www.govinfo.gov/content/pkg/GOVPUB-SI-PURL-gpo20587/pdf/GOVPUB-SI-PURL-gpo20587.pdf>

First verify the PDF's own title page/publication identity before using it.

## B1. Bounded inspection goals

Within a bounded search of the institutional PDF, locate exact printed PDF/page anchors for as many of these as the source directly supports:

- construction/completion of the 1853 machine;
- 1854 patent petition/provisional specification and later full/sealed patent chronology;
- British Patent A.D. 1854, No. 2214 identity;
- Paris 1855 demonstration/exhibition;
- Dudley Observatory acquisition/shipment/use chronology;
- the operational drawings / letter provenance;
- actual table-making or printing use, if documented precisely;
- any reproduced primary letter/patent appendix that can be distinguished from Merzbach's narrative.

Do not quote long passages. Record exact pages/appendix identifiers and paraphrase conservatively.

## B2. Evidence-layer rules

Merzbach 1977 is an institutional historical study, normally **H/E2** as a later synthesis.

If the PDF reproduces a clearly identified patent specification, letter, table specimen, or other primary document and the agent directly inspects that reproduced primary material, record the two layers separately:

```text
historical primary item / date / identity
→ reproduced or transcribed in Merzbach 1977 at exact page/appendix
→ modern govinfo access layer
```

Do not automatically upgrade Merzbach's prose to E1. A reproduced transcription can support a primary claim only to the precision of the identified reproduced source and its provenance.

If the patent itself cannot be directly inspected outside the study, keep geometry/mechanism claims at Merzbach/reproduction precision. The Smithsonian drawing-sheet catalog says its 14 figures are similar to but not identical with the final patent specifications; preserve that distinction instead of treating the 1857 sheet as the patent drawings.

# Part C — source-map and source-atlas reconciliation

Only after Parts A/B establish real new precision:

## C1. `research/difference-engine-source-map.md`

Replace the old "Smithsonian returned 403" boundary with directly inspected evidence.

Create a clearly separated Scheutz subsection that distinguishes:

```text
1853 surviving/catalogued Scheutz engine = H/E1 object record
ca. 1857 operational drawing set = H/E1 drawing-object/catalog record
British Patent A.D. 1854 No. 2214 = primary patent identity only at the precision directly inspected
Merzbach 1977 = H/E2 institutional historical study / access to reproduced primary material where identified
Babbage DE1/DE2 designs = separate historical line
Science Museum DE2 1991/2002 build = R/E2 reconstruction
repository finite-difference/output trace = P/M
```

Explicitly state what remains **not established**:

- exact internal geometry from object photos;
- equivalence between the 1857 14-figure sheet and patent figures;
- content of the related letter unless directly inspected;
- printer synchronization/timing;
- measured reliability/error/throughput;
- a claim that Scheutz architecture is Babbage's printer architecture.

## C2. Typed source atlas

Use the existing `src/exhibits/source-atlas/` data model. Do not create a parallel source system.

Add or upgrade bounded Scheutz anchors under the Difference Engine track so a visitor can inspect at least:

- the 1853 built machine object anchor;
- the ca. 1857 drawing/instruction-set anchor;
- if genuinely useful and directly anchored, one separate Merzbach/patent-provenance entry or metadata field.

Preserve `supports` / `notEstablished`, claim type, evidence strength, access host, record identifier, inspected date, and generation/source role.

Do not overcrowd the atlas with one card per URL if two mirrors represent the same institutional record. Prefer one canonical record plus an alternate access note if the current type supports it.

## C3. Tests and UI

Update `tests/source-atlas.test.ts` (or the existing relevant tests) to lock in the separation among:

- Scheutz surviving machine;
- Scheutz operational drawing set;
- Babbage design/reconstruction anchors;
- repository P/M Difference Engine/output behavior.

At minimum test that the new Scheutz anchors do **not** claim source-specific geometry, patent-figure identity, or Babbage-printer equivalence.

The `#/source-atlas` UI may change only through the existing typed data/rendering path. No new route or card redesign.

Do **not** modify finite-difference arithmetic, output-ledger state machines, or printer simulation in this slice. The source work is the product here.

# Part D — bounded output-contract cross-check

After the source map is corrected, inspect `research/output-and-audit-trail.md` and `#/output-contracts` only for one narrow question:

> Does the newly direct Smithsonian evidence require correcting an existing sentence about Scheutz as an actually built printing difference engine or persistent-output example?

If yes, make the smallest source-backed correction. If no, leave the output lesson unchanged. Do not expand into office-procedure history or printer geometry here.

# Part E — reconciliation and verification

After the source work is real:

- update `STATUS.md` only for the Smithsonian/Scheutz precision actually obtained;
- add one concise completed line to `TODO.md`;
- narrow `docs/RESEARCH_GAPS.md` Difference Engine/output gaps only where this slice genuinely closes them;
- update `docs/VERIFICATION.md` with the actual baseline/final test counts and checks;
- do not re-date unrelated browser smoke or copy old test counts.

If source-atlas data/rendering changes, perform bilingual browser smoke at least for:

```text
#/source-atlas
#/finite-difference
#/output-contracts
#/about
```

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

All must pass.

The finished slice should answer from directly inspectable evidence:

> What exactly survives at Smithsonian as the 1853 Scheutz engine, and what does its object record establish?

> What exactly is the ca. 1857 14-figure drawing set, what operating/instruction provenance does its catalog establish, and what does it **not** establish about the 1854 patent or internal geometry?

> Which chronology or primary-document identities can be tightened from the govinfo/Smithsonian Merzbach scan without confusing later historical synthesis with primary evidence?

> How is this actually built nineteenth-century printing difference engine kept separate from Babbage's designs, the Science Museum DE2 reconstruction, and this repository's P/M output trace?

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect exact-head push CI and Deploy Pages when they complete and record only completed outcomes;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: anchor Scheutz built-engine evidence
```

# Evidence boundaries

- Smithsonian `MA.323659` / `nmah_997042`: **H/E1 at surviving-object/catalog-record precision**.
- Smithsonian `1988.0798.01` / `nmah_1005138`: **H/E1 at drawing-object/catalog-record precision**.
- Smithsonian/NMAH descriptive prose: institutional historical description; do not convert prose into unobserved geometry or measured performance.
- Merzbach 1977 Smithsonian study: **H/E2 historical synthesis** unless a clearly identified reproduced primary document is separately described at its own provenance/precision.
- British Patent A.D. 1854 No. 2214: H/primary identity only to the precision directly inspected; do not claim patent figures/mechanisms if only a later description was seen.
- Babbage DE1/DE2 drawings/design: separate historical lineage; no geometry is borrowed from Scheutz.
- Science Museum 1991/2002 DE2: **R/E2** reconstruction.
- repository Difference Engine/output traces: **P/M**.

# Stop conditions

Stop and leave a precise boundary rather than guessing if:

- Smithsonian object pages become inaccessible and only search snippets remain;
- the govinfo PDF identity cannot be verified from its own pages;
- the patent specification cannot be directly inspected and a geometry claim would depend only on a secondary summary;
- the related 1857 letter is mentioned but not directly accessible;
- comparing drawing images starts turning into unsourced reverse engineering;
- source-atlas changes would require routing/layout refactors;
- the work starts expanding into a full Scheutz emulator, printer simulation, or general nineteenth-century table-making history.

If Parts A–C complete substantially before one hour, use remaining time for exact Merzbach page/appendix anchors, bilingual source-card precision, and focused atlas tests. **Do not start a new machine family or source-specific Scheutz geometry in this slice.**
