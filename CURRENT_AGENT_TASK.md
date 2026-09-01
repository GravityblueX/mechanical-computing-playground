# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-named-machine-source-atlas.md`.

The named-machine source-atlas slice landed as `c985fb6eb6ecbf3e80461d1a541a56f97730b3db` about 37 minutes after assignment. It changed 12 files, moved the suite from 208 tests across 18 files to 217 tests across 19 files, passed local typecheck/tests/build/diff plus bilingual browser smoke, and its GitHub `verify`, Pages `build`, and Pages `deploy` checks all completed successfully. No open PR remains.

Several consecutive broad slices have completed in roughly 30–42 minutes. Increase scope again, but keep one coherent question:

> **Can the Curta and Analytical Engine lessons be tied to directly inspected primary-document/facsimile anchors at the precision shown in the UI, without turning patents, manuals, scans, or later emulators into unsupported production geometry?**

This is a source-hardening + evidence-adapter slice. It is not permission to create source-specific internal animations.

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read, in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2, 3, 4, and 5
6. `docs/STRUCTURE_EVIDENCE.md`
7. `research/curta-source-map.md`
8. `research/analytical-engine-information-flow.md`
9. `research/simulator-matrix.md`
10. `src/exhibits/source-atlas/index.ts` and `tests/source-atlas.test.ts`
11. current `#/curta`, `#/analytical-engine`, `#/source-atlas`, evidence-card and navigation code
12. `docs/TEACHING_PATH.md` and `docs/VERIFICATION.md`

Before editing, run the full test suite once and record the actual baseline. The current ledger says **217 tests across 19 files**; actual repository state wins.

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Objective

Complete five connected parts:

1. harden the Curta source map with directly inspected patent/facsimile/manual anchors and an explicit Type I / Type II production-mapping boundary;
2. harden the Analytical Engine source map with directly inspected 1843 facsimile/page anchors and, where accessible, a directly inspected H. P. Babbage / later historical publication facsimile anchor;
3. extend the existing typed named-machine source atlas with **Curta** and **Analytical Engine** tracks while preserving H/R/P separation;
4. expand the existing bilingual `#/source-atlas` surface and cross-link it from the two named-machine lessons;
5. add tests and reconcile STATUS/TODO/RESEARCH_GAPS/VERIFICATION so the new precision is discoverable without claiming geometry that was not inspected.

Do **not** add a new machine family, full Curta emulator, Analytical Engine instruction set, or 3D/source-specific linkage drawing.

---

# Part A — Curta: patent, manual/facsimile, and production-boundary map

Strengthen `research/curta-source-map.md` by directly inspecting the strongest accessible primary-document material rather than relying only on transcriptions.

## A1. Required starting sources

Re-check and directly inspect:

- Curt Herzstark, US 2,525,352:
  - text/drawings: <https://patents.google.com/patent/US2525352A/en>
  - patent PDF linked from that record;
- Curta specialist manual index/transcriptions already recorded in the repository:
  - <https://curta.org/wiki/CurtaManuals>
  - <https://curta.org/wiki/DivisionAlgorithm>
- specialist-hosted original service-manual/factory-document index, if still directly reachable:
  - <https://www.mycurta.com/cu.htm>
  - mirror: <https://vcalc.org/cu.htm>

The latter pages currently advertise original Type I / Type II service-manual scans and factory drawings/BOM material. Follow only files/links you can actually inspect. A specialist mirror can be an access path to a primary document, but it is not an institution and must not be described as one.

## A2. Exact-document metadata

For each primary Curta scan actually used, record as much of the following as the document itself supports:

- exact displayed title;
- Type I or Type II, if the document itself says so;
- language;
- edition/revision/date if stated;
- page count and page number(s) actually inspected;
- publisher/manufacturer/service provenance if printed on the document;
- mirror/access URL and host;
- whether it is an operator manual, service manual, patent, drawing set, BOM, or later transcription;
- what exact operator/architectural role that document supports;
- what it does **not** establish.

Do not promote a filename, host description, or collector note into manufacturer provenance unless the scan itself supports it.

## A3. Required Curta boundary

Keep at least these layers separate:

```text
US 2,525,352 patent embodiment -> H/E1 for patented design
primary operator/service manual facsimile -> H/E1 for what that identified document says
specialist transcription/index -> access/reference layer; strength depends on what was actually inspected
Type I / Type II production machine -> requires explicit model/revision mapping
repository #/curta cylinder + generic interlock/division modules -> P or P/M
```

The patent is **not** proof that every production Type I/II machine exactly matches every drawing/claim. A service manual is not automatically an operator manual. An operator instruction about handle zero-stop does not establish the complete internal locking linkage.

## A4. Minimum Curta source result

Try to obtain at least:

1. one patent figure/page anchor for the compact result/revolution-counting architecture already discussed;
2. one directly inspected primary manual/service-manual page anchor for a control/operation role such as handle home/zero stop, carriage movement, clearing, setting/result/counter role, or plus/minus mode;
3. one explicit Type I / Type II capacity or revision anchor **only if the inspected document itself supports it**.

If a primary manual PDF cannot be directly inspected in the environment, preserve the exact access failure and keep the stronger manual/page claim open. That is not a blocker for the Analytical Engine half or for adding only the Curta anchors that are genuinely inspectable.

Do not copy manual scans, patent images, factory drawings, or BOM images into the repository.

---

# Part B — Analytical Engine: 1843 facsimile/page map and publication layers

Strengthen `research/analytical-engine-information-flow.md` by replacing at least part of the current transcription-only precision with directly inspected page/facsimile anchors.

## B1. 1843 Menabrea/Lovelace facsimile

Start from the public-domain 1843 publication paths and directly inspect page images/facsimile pages rather than relying only on Fourmilab prose transcription:

- Project Gutenberg edition #75107, whose credits state that page images were made available by the Internet Archive:
  <https://www.gutenberg.org/ebooks/75107>
- page-image/text presentation:
  <https://www.gutenberg.org/files/75107/75107-h/75107-h.htm>
- scanned-page navigation for *Scientific Memoirs*, vol. III (1843), if directly accessible:
  <https://en.wikisource.org/wiki/Scientific_Memoirs/3/Sketch_of_the_Analytical_Engine_invented_by_Charles_Babbage%2C_Esq.>

Record the original printed-page range and exact printed page(s) you actually inspect for claims such as:

- Store versus Mill distinction;
- Operation/Variable card roles;
- repeated/backed card groups;
- intermediate-variable/calculation examples;
- output/printing statements;
- Lovelace notes where relevant to the current lesson.

Do not quote page numbers merely because a modern HTML transcription has headings. The page number must be tied to a directly inspected facsimile/page image or a source that explicitly preserves the original printed pagination.

## B2. H. P. Babbage / collected historical account

The current note uses a Fourmilab transcription of H. P. Babbage's 1888 British Association report for the concrete `(ab+c)d` Number/Directive/Operation-card flow.

Make a bounded attempt to inspect a stable public-domain scan/facsimile of the 1889 collection:

Henry P. Babbage, *Babbage's Calculating Engines: Being a Collection of Papers Relating to Them; Their History and Construction* (E. & F. N. Spon, 1889).

Useful discovery/catalog paths include Open Library / Internet Archive records for the 1889 volume. Cambridge's modern reprint metadata may confirm chapter/page ranges, but a paywalled modern reprint preview is not a substitute for directly inspecting the historical page.

If a full scan is accessible, record exact page anchors for the 1888 report and `(ab+c)d` flow only where directly inspected. If not, keep the existing transcription boundary explicit and do not manufacture page numbers.

## B3. Existing drawing records and Walker reconstruction

Re-check the existing Science Museum records already cited for Store/Mill design evolution (`BAB/A/125`, `BAB/D/028`, `BAB/P/167`) and the Walker/Fourmilab authenticity/card/emulator documentation only as needed to keep layers separate.

Required separation:

```text
1843 Menabrea/Lovelace facsimile -> H/E1 published text at inspected pages
Charles/H. P. Babbage publications -> H/E1 for what those publications say when directly inspected
Science Museum drawing catalog records -> H/E1 for record identity/catalogued subject
Walker/Fourmilab executable choices -> R, not nineteenth-century H
repository (ab+c)d event trace -> P/M
```

Do not turn Walker's merged textual card stream into a historical punched-card encoding claim. Do not infer Mill/Store linkage geometry or card-reader synchronization from catalog titles.

---

# Part C — extend the typed source atlas to four tracks

Extend `src/exhibits/source-atlas/` rather than creating a parallel provenance system.

## C1. Track coverage

Add typed source anchors for at least:

### Curta

- US 2,525,352 patent;
- at least one directly inspected primary manual/service-document facsimile if available;
- a specialist-transcription/reference anchor only if needed to make an explicit access/provenance boundary, and give it the correct claim/evidence/access semantics rather than silently treating it as E1 institutional evidence.

### Analytical Engine

- 1843 Menabrea/Lovelace facsimile with exact inspected printed-page anchor(s);
- at least one Babbage publication or H. P. Babbage historical-publication anchor at the strongest access state actually achieved;
- at least one Science Museum Store/Mill design-record anchor;
- Walker/Fourmilab as an R reconstruction/emulator anchor, clearly not H.

Keep the existing Difference Engine No. 2 and Bush Differential Analyzer anchors intact unless a real bug is found.

## C2. Typed access semantics

The current atlas access kinds are intentionally small. Extend them only if required by real documents, for example a clearly named concept such as:

```text
direct primary facsimile
specialist-hosted primary facsimile
specialist transcription
```

Do not create a generic quality score or collapse access provenance into evidence strength.

If E3 becomes necessary for a transcription/reference layer, extend the type consistently with `docs/EVIDENCE_POLICY.md`; do not misuse E1/E2 merely to avoid a type change.

Each anchor still needs:

```text
supports[]
notEstablished[]
researchNoteAnchor
```

and enough identity metadata to let a reviewer reopen the source.

## C3. No pseudo-geometry

Do not add tooth count, linkage path, gear ratio, timing, torque, tolerance, reliability, or production-revision fields unless a directly inspected source provides a specific value and the research note identifies the exact location.

This task does not require any such quantitative geometry.

---

# Part D — tests and public atlas integration

## D1. Focused tests

Add tests that prove at least:

1. source-anchor ids remain unique across all four tracks;
2. every new H/R anchor has source URL, source identity, access kind, supports, not-established boundaries, and research-note anchor;
3. the Curta patent anchor cannot claim identity with every production Type I/II machine;
4. a service-manual/facsimile anchor cannot silently become an operator-manual claim unless the inspected document actually is one;
5. Curta handle/carriage/control instructions do not imply exact hidden linkage geometry;
6. the 1843 Analytical Engine anchor exposes exact printed-page claims only when facsimile/page inspection is recorded;
7. Walker/Fourmilab remains R and cannot be surfaced as nineteenth-century punched-card syntax or exact historical reader order;
8. Science Museum Store/Mill drawing records cannot prove a complete built Analytical Engine;
9. the repository `(ab+c)d` flow remains P/M and is not promoted to historical event timing;
10. no atlas track emits a scalar fidelity/reliability/quality score.

Do not weaken existing source-atlas tests.

## D2. Public source-atlas surface

Expand the existing `#/source-atlas` route to four clearly separated track groups:

```text
Difference Engine No. 2
Bush Differential Analyzer
Curta
Analytical Engine
```

For each card keep visible text for:

- source / institution or host / identifier;
- H/R + evidence strength where applicable;
- access kind;
- exact inspected page/figure anchor where legitimate;
- what the source supports;
- what it does not establish;
- source link and research-note context.

Add a short bilingual explanation distinguishing:

```text
primary document identity
access host/mirror
historical evidence strength
later reconstruction
repository teaching model
```

so a specialist mirror is not mistaken for the original publisher/manufacturer/institution.

Cross-link `#/curta` and `#/analytical-engine` to their source-atlas groups. Do not redesign those lessons.

No meaning may depend only on color. Do not embed copyrighted/manual facsimile images.

---

# Part E — reconciliation and verification

After Parts A–D are real:

- update `STATUS.md` to reflect Curta + Analytical Engine source-atlas hardening;
- add one concise completed line to `TODO.md` and keep the remaining queue short;
- update the relevant Priority 0.2 / named-machine wording in `docs/RESEARCH_GAPS.md` from “missing” to “current state + remaining gaps”;
- update `docs/TEACHING_PATH.md` only if the four-track atlas changes the recommended navigation;
- update README only if needed for discoverability;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and commands run.

Do not rewrite `IMPLEMENTATION_PLAN.md` as a live ledger.

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
#/curta
#/analytical-engine
#/about
```

Also quick-regress one existing atlas-linked route such as `#/finite-difference` or `#/continuous`.

Record exactly what was checked; do not claim CI or Pages success before remote checks finish.

After push:

- confirm remote `main` contains the commit;
- inspect GitHub check runs if they complete during the work;
- if Pages deploy succeeds, verify the atlas route is reachable before calling the new Curta/Analytical groups live;
- stop after the coherent commit/push. Do not self-assign another task.

# Evidence boundaries

- A patent is H/E1 for the patented design, not automatic evidence for every production unit.
- A directly inspected primary manual/service-manual facsimile is primary evidence for what that identified document says; the mirror host and document provenance must remain visible.
- A specialist transcription is not automatically a facsimile and must not silently receive facsimile/page precision.
- Type I and Type II must not be treated as internally identical without explicit evidence.
- The 1843 Menabrea/Lovelace publication is H/E1 at directly inspected printed pages; a modern transcription alone does not create page-level evidence.
- Walker/Fourmilab is an R executable interpretation and documentation source, not nineteenth-century H evidence.
- Babbage design sheets and publications do not prove a complete Analytical Engine was built.
- Repository UI/event ordering remains P/M unless a separately identified historical source establishes the same order at that precision.
- Do not copy primary scans/images into the repository; link and paraphrase only within normal citation/quotation limits.

# Stop conditions

Stop and leave a clear blocker note rather than guessing if:

- the only way to strengthen a Curta claim is to infer hidden geometry from a service drawing without textual/identified support;
- a manual scan cannot be identified well enough to distinguish Type I/II, operator/service role, or edition;
- the only available Analytical Engine page number comes from a transcription rather than an inspected facsimile/page image;
- extending the source atlas would require changing mechanism-core semantics;
- a conflicting Curta/Analytical source-atlas implementation lands on remote `main`.

Individual inaccessible manual/facsimile paths are **not** a blocker. Preserve the weaker boundary and complete the other directly supported anchors.

If Parts A–E finish substantially before the target duration, use remaining time only for source precision: stronger exact edition/page mapping, direct 1889 scan inspection, Type I/II document identity, accessibility/tests, or cleaning stale named-machine wording. Do not start another machine family, physics model, or source-specific animation.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect existing source-atlas/evidence modules before extending types;
- one coherent research/evidence/UI checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after checks pass;
- commit and push;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: harden Curta and Analytical Engine source anchors
```