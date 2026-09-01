# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-replay-curta-type2.md`.

The previous assignment landed as `c85dd761bda908d528a4f35229bde09c2afb4bfb` about 43 minutes after assignment, changed 159 lines (`+143/-16`) across 11 files, raised the suite from 277 tests / 21 files to 291 tests / 21 files, and passed exact-head push CI `33522772721` plus Deploy Pages `33522772810`. Recent slices continue to finish under one hour, so this assignment is one substantive source pass plus a bounded source-atlas reconciliation. Do not broaden it into an Analytical Engine reconstruction.

> **Question for this slice:** can the repository replace its H. P. Babbage 1888 specialist-transcription boundary with directly inspected 1889 printed-page evidence, while preserving the distinction among nineteenth-century publication, later reconstruction, archive drawing metadata, and the repository's P/M `(ab+c)d` teaching trace?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2 and the `Files to deepen next` list
6. `docs/VERIFICATION.md`
7. `research/analytical-engine-information-flow.md`
8. `src/exhibits/analytical-engine-flow/` and its tests, only to preserve current P/M boundaries
9. `src/exhibits/source-atlas/` and `tests/source-atlas.test.ts`
10. the existing Science Museum Analytical Engine drawing anchors already cited in the research note

Run the current-main typecheck/tests before editing and record the actual baseline. Do not use old implementation-plan checkboxes as the task source.

# Part A — directly inspect the 1889 printed compilation

The current research note uses the Fourmilab transcription of H. P. Babbage's paper read at Bath on 12 September 1888 and intentionally keeps it at specialist-transcription precision because a stable printed scan had not been directly inspected.

Resolve that specific gap if lawful direct access is available.

## A1. Preferred source identity

Target publication:

Henry P. Babbage (ed.), *Babbage's Calculating Engines: Being a Collection of Papers Relating to Them; Their History, and Construction*, London: E. and F. N. Spon, 1889.

Useful institutional/bibliographic starting points:

- Cambridge Core / Cambridge Library Collection book contents: <https://www.cambridge.org/core/books/babbages-calculating-engines/contents/F22A776B9D213F4BF3ECBE6DA4D05CB4>
- DOI/book identity: <https://doi.org/10.1017/CBO9780511694721>
- Cambridge contents identifies chapter 32 as **“Proceedings of the British Association, 1888”**;
- Open Library 1889 edition metadata: <https://openlibrary.org/works/OL13198513W/Babbage%27s_Calculating_Engines>
- Huntington 1889 rare-book record: <https://www.huntington.org/collections/lib-751620>
- Library of Congress records explicitly identify the later Tomash reproduction as a reprint of the 1889 edition: <https://www.loc.gov/item/2006691797/>

Use an institutional/public-domain/full-view copy if one can be directly inspected. Cambridge's 2010 reproduction is acceptable as an access surrogate for the 1889 printed pages **only if the displayed/reproduced pages preserve the original printed pagination/content**. Record the access layer separately from the historical publication identity.

Do not use an arbitrary rehosted PDF as the only provenance layer. A non-institutional mirror may be used as a temporary locator only when the same page/content is cross-checked against an institutional bibliographic/reproduction source.

## A2. Inspect the H. P. Babbage 1888 paper as printed in the 1889 volume

Locate chapter 32 / the paper read at Bath in 1888 and record the exact **1889 printed page numbers** actually inspected.

At minimum verify, where the printed pages directly support them:

- publication/section identity and the Bath/read-date statement;
- Number Cards, Directive Cards and Operation Cards as distinct card roles;
- the `(ab+c)d` example and the Store-column assignments for `a,b,c,d`, intermediates `p/q`, and final result;
- the sequence/role of Directive versus Operation cards;
- the stated counts of Operation and Directive cards for the example, if present;
- separate sets/rollers or equivalent organization, if the printed page actually states it;
- the final printing / stereotype-moulding output statement, if present.

For every claim added to the repository, distinguish:

```text
1888 event/read date
1889 printed compilation page
modern access reproduction/mirror
```

Do not silently call the 1889 printed page the original 1888 proceedings pagination unless the source itself establishes that identity.

## A3. Compare against the existing Fourmilab transcription

Keep <https://www.fourmilab.ch/babbage/hpb.html> as a specialist transcription/research access layer.

Compare the exact inspected printed passage with the current repository summary. Record only meaningful differences:

- wording or numbering differences;
- omitted headings/notes;
- punctuation/typographic differences only when they affect interpretation;
- whether the current `items 10–20` references correspond cleanly to printed numbered paragraphs/items.

If the transcription matches materially, say so; do not manufacture discrepancies.

If no direct printed page can be inspected confidently in a bounded attempt, **do not upgrade E3 to E1**. Instead document the attempted access path and retain the current boundary, then proceed to Part B2 below using only metadata-safe work.

# Part B — one bounded drawing/catalog cross-check

The repository already has three Science Museum record anchors:

- `BAB/A/125` — plan of consecutive mill counting apparatus for General Plan 28;
- `BAB/D/028` — Mill Sheet 28, superseded by Sheet 25;
- `BAB/P/167` — plan of bolts for store.

The 1889 volume also contains chapters/catalogues for Analytical Engine notations and drawings. If the directly accessible reproduction exposes those catalogue pages, perform **one bounded cross-check**:

- inspect the relevant catalogue/list page(s);
- determine whether at least one of the modern Science Museum records can be connected to an 1889 printed catalogue description without guessing modern reference-code equivalence;
- record exact printed page/catalogue wording when a defensible match exists;
- otherwise record that modern archive identifiers and the 1889 catalogue could not be safely cross-walked in this pass.

This part is about **catalogue identity and design evolution**, not reading gear geometry from thumbnails. Do not infer Store–Mill connections, card-reader timing, bolt function beyond the record/catalogue wording, or a frozen final machine.

# Part C — repository/source-atlas reconciliation

Only after Parts A/B establish real new precision:

## C1. Research note

Update `research/analytical-engine-information-flow.md` so the layers remain explicit:

```text
Menabrea/Lovelace 1843 printed pages = H/E1 at inspected page precision
H. P. Babbage paper as printed in 1889 = H/E1 only at directly inspected printed-page precision
Fourmilab transcription = specialist transcription/access comparison, not primary page authority
Science Museum drawing records = H/E1 record identity/metadata
Walker/Fourmilab emulator = R/E2 reconstruction choices
repository `(ab+c)d` trace = P/M
```

If direct 1889 inspection fails, retain the H/E3 transcription boundary and make the failed-access boundary more precise instead of pretending completion.

## C2. Source-atlas data

Search the existing typed source-atlas structures rather than creating a parallel system.

If direct 1889 printed-page evidence is obtained:

- add or upgrade a separate Analytical Engine source anchor for the 1889 printed H. P. Babbage paper;
- include exact printed-page metadata and modern access provenance;
- preserve `supports` versus `notEstablished` fields;
- do not delete the reconstruction/transcription distinction merely because the historical paper is now directly inspected.

If no direct printed page is obtained, do not add a fake E1 card. A metadata-only/bibliographic anchor is acceptable only if it adds real clarity and remains below page-claim precision.

## C3. Tests/UI

Update `tests/source-atlas.test.ts` or the existing relevant tests to lock in any new source boundary.

If source-atlas data changes, the existing `#/source-atlas` UI may be updated minimally through its current data path. Do not create a new route or redesign cards.

Do **not** change the Analytical Engine arithmetic/event model in this slice unless direct source inspection reveals an existing historical label that is factually unsafe. The current event sequencing remains P/M and must not be back-filled as nineteenth-century timing.

# Part D — reconciliation and verification

After the source work is real:

- update `STATUS.md` only for source precision actually obtained;
- add one concise completed line to `TODO.md`;
- narrow `docs/RESEARCH_GAPS.md` Priority 0.2 / file list only if the 1889 gap genuinely shrank;
- update `docs/VERIFICATION.md` with current baseline/final test counts and actual checks;
- do not re-date unrelated browser smoke or copy old test counts.

If source-atlas data/rendering changes, perform bilingual smoke at least for:

```text
#/source-atlas
#/analytical-engine
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

The final slice should answer from directly inspectable evidence:

> Which exact 1889 printed pages support the Number/Directive/Operation-card roles and `(ab+c)d` example currently summarized from the Fourmilab transcription?

> What does that historical page establish, and what still belongs only to Walker's reconstruction or this repository's P/M trace?

> Can any modern Science Museum drawing record be safely cross-walked to the 1889 printed drawing catalogue without inventing an identifier or geometry mapping?

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect exact-head push CI / Pages only if completed and record only completed outcomes;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: anchor Analytical Engine 1889 printed evidence
```

# Evidence boundaries

- 1889 Spon printed compilation: **H/E1 only for directly inspected printed pages/content**.
- The paper's 1888 reading/event date is a historical claim that must be supported by the printed paper or another direct source; do not conflate event date with print date.
- Cambridge 2010 / Tomash 1982 reproductions: access/reproduction layers; they do not change the nineteenth-century claim type but must be named as the inspected surrogate when applicable.
- Fourmilab H. P. Babbage page: specialist transcription, useful for comparison but not a substitute for printed-page inspection.
- Science Museum drawing records: **H/E1 at catalog record/visible-document precision only**; archive images are not self-interpreting geometry proof.
- Walker emulator: **R/E2** reconstruction/executable interpretation.
- repository Analytical Engine flow: **P/M**; no historical card-hole encoding, reader timing, exact Mill/Store linkage, or frozen final design is claimed.

# Stop conditions

Stop and leave a precise access/evidence boundary rather than guessing if:

- the 1889 page cannot be directly viewed or its printed pagination cannot be verified;
- the available copy is only an unverified mirror with no trustworthy reproduction/bibliographic cross-check;
- matching a Science Museum modern record to the 1889 catalogue would require assuming reference-code equivalence;
- source inspection starts expanding into full drawing interpretation, card-reader geometry, mechanical notation reconstruction, or a complete Analytical Engine emulator;
- updating source-atlas UI would require unrelated routing/layout refactors.

If the 1889 page work completes substantially before one hour, use remaining time for exact page/catalogue metadata, transcription comparison, source-atlas tests and accessibility/source-card precision. **Do not start Bush/Shannon, Curta chronology, a new machine family, or source-specific Analytical Engine geometry in this slice.**