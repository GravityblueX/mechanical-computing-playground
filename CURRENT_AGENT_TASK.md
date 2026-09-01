# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-scheutz-built-engine.md`.

The previous assignment landed as `a894f8f1e24afb91837dafed30ea2bc1e546add4` about 35 minutes after assignment, changed 7 files (about `+106/-13`), raised the suite to 292 tests across 21 files, and passed exact-head push CI `33533826721` plus Deploy Pages `33533826754`. Because the agent again completed a substantial evidence slice well under one hour, this assignment is deliberately a little larger: resolve one source conflict with independent contemporary evidence, add one contemporary-operation source layer, and reconcile the typed atlas/tests without expanding into source-specific geometry.

> **Question for this slice:** can the repository independently establish the Scheutz British patent identity and directly anchor a contemporary operational/committee account, while keeping patent intent, observed/built-machine behavior, later synthesis, Babbage lineage, and repository P/M behavior separate?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2, Priority 7, and `Files to deepen next`
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-scheutz-built-engine.md`
8. `research/difference-engine-source-map.md`
9. `research/output-and-audit-trail.md` only to preserve existing output claims
10. `src/exhibits/source-atlas/` and `tests/source-atlas.test.ts`

Run current-main typecheck/tests before editing and record the actual baseline. Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as the task source.

# Part A — reconcile the 2214 / 2216 patent-number conflict with independent evidence

The completed slice correctly preserved a real source discrepancy:

- Smithsonian drawing-set catalog `1988.0798.01` says British Patent A.D. 1854, **No. 2214**;
- Merzbach 1977 Appendix I reproduces/transcribes British Patent A.D. 1854, **No. 2216**.

Do not silently change the Smithsonian wording. Instead, independently inspect contemporary or primary patent evidence and determine what can be stated safely.

## A1. Contemporary patent-list check

Directly inspect a period issue of the *Journal of the Society of Arts* / patent list that includes the patents sealed in April 1855. A discoverable scan currently appears at Wikimedia/Internet Archive-derived access and should be re-found independently by the agent rather than trusted from this task text.

Target evidence to verify:

- the issue identity/date;
- the actual list entry for George Scheutz and Edward Scheutz;
- the patent number attached to their calculating/printing-machine entry;
- wording sufficient to distinguish the Scheutz entry from adjacent patent numbers.

If the period list directly shows **2216**, record that as **H/E1 contemporary publication evidence for the patent identity**. Record exact scanned/printed page or image position. Do not infer patent geometry from the list.

## A2. Patent-specification identity

Re-open the directly inspectable GovInfo/Smithsonian Merzbach PDF:

<https://www.govinfo.gov/content/pkg/GOVPUB-SI-PURL-gpo20587/pdf/GOVPUB-SI-PURL-gpo20587.pdf>

Reconfirm Appendix I printed pp. 43–55 and the reproduced header/identity for British Patent A.D. 1854 **No. 2216**.

If a more direct lawful scan/catalog of the Patent Office specification can be inspected within the time box, record it as an additional access layer. Otherwise do not spend the hour hunting indefinitely: the period patent list plus the identified reproduced specification are enough to state a bounded reconciliation.

### Required reconciliation wording

If the independent contemporary evidence supports 2216, the repository may say approximately:

```text
Independent contemporary patent-list evidence and the reproduced Patent Office specification identify the Scheutz patent as No. 2216. The Smithsonian drawing-set catalog currently says No. 2214; that catalog wording is retained as a documented discrepancy and not silently rewritten.
```

Do **not** call the Smithsonian value a typo as a historical fact unless an institutional correction or stronger catalog-history source explicitly establishes that.

# Part B — directly inspect a contemporary operation / examination account

The next missing layer is actual nineteenth-century examination/operation evidence, not more later summaries.

## B1. Royal Society committee report

Find and directly inspect the contemporary report:

*Report of a Committee appointed by the Council to examine the Calculating Machine of M. Scheutz*, *Proceedings of the Royal Society of London*, vol. 7, report beginning around printed p. 499 (bibliographies give pp. 499–509; verify the actual range from the source).

Prefer an original-period scan when lawfully accessible. If the only complete readable text is the 1889 H. P. Babbage compilation reprinting the report, record the provenance explicitly:

```text
1855 Royal Society committee report
→ reproduced in 1889 Babbage compilation at exact printed pages
→ modern access host
```

A modern Cambridge page or bookseller summary is not itself evidence for details that were not directly visible in the report text.

Extract only source-backed responsibilities/claims useful to this repository, for example if directly stated:

- what problem/table-making role the committee says the machine addresses;
- orders/digits/capacity only at the exact values printed in the report;
- how the report describes difference calculation or operation at functional level;
- what it says about calculation plus printing/type-setting, if directly stated;
- any limitations or conditions the committee explicitly identifies.

Record exact printed pages. Quote minimally; paraphrase conservatively.

Evidence boundary:

- the committee report is **H/E1 for what the committee reported/observed in 1855**;
- it is not direct measurement of every surviving Smithsonian mechanism and not proof of every later production machine;
- a committee statement about speed, utility, accuracy, or printing is a reported contemporary claim unless the report provides an explicit measurement protocol.

## B2. Optional Gravatt anchor if the main report finishes early

Only after B1 is complete, try to directly inspect William Gravatt's 1854 Royal Society letter (bibliographies identify *Proceedings*, vol. 7, p. 166) or another clearly contemporary operational text reproduced in a stable institutional/primary scan.

Use it only if the actual text is visible. Do not rely on later paraphrases merely to add another citation.

This is optional; do not let it displace Parts A, B1, and C.

# Part C — separate patent intent from built/observed operation in the source map

Update `research/difference-engine-source-map.md` only after Parts A/B establish real new precision.

The Scheutz section should now visibly distinguish at least these layers:

```text
1853 surviving Smithsonian engine = H/E1 object/catalog record
ca. 1857 Smithsonian instruction drawing set = H/E1 drawing-object/catalog record
1854/1855 British patent identity/specification = H/E1 primary/contemporary patent layer at inspected precision
1855 Royal Society committee examination = H/E1 contemporary observation/report layer
Merzbach 1977 = H/E2 institutional historical synthesis, plus clearly identified reproduced-primary access where applicable
Babbage DE1/DE2 = separate design lineage
Science Museum DE2 1991/2002 = R/E2 reconstruction
repository finite-difference/output behavior = P/M
```

Required boundary statements:

- patent specification describes intended/patented design; it is not automatically the exact as-built geometry of Smithsonian `MA.323659`;
- the Smithsonian ca. 1857 14-figure sheet is similar to but not identical with the patent figures according to its catalog;
- the Royal Society report establishes what that committee reported/examined, not universal lifetime performance;
- the repository P/M difference/output model does not inherit Scheutz geometry;
- the No. 2214 catalog value remains visible as a source discrepancy even if independent evidence supports No. 2216.

Do not add source-specific gear/linkage animation, tooth counts, printer timing, force, tolerance, reliability probabilities, or performance benchmarks in this slice.

# Part D — typed source-atlas reconciliation

Use the existing `src/exhibits/source-atlas/` data model. Do not create a parallel evidence system.

Upgrade the Difference Engine/Scheutz track so visitors can distinguish:

1. surviving built object;
2. instruction drawing set;
3. patent identity/specification layer;
4. contemporary Royal Society examination/operation layer;
5. later Merzbach synthesis/reproduction layer;
6. Babbage/DE2 reconstruction and repository P/M layers already present.

Prefer concise anchors over one card per mirror URL. Reuse metadata fields and `supports` / `notEstablished` boundaries.

The atlas must not visually imply that the patent and the Smithsonian drawing sheet are identical, or that the committee report proves exact internal geometry.

## Required tests

Update `tests/source-atlas.test.ts` or the existing relevant tests to lock in at least:

- contemporary independent evidence identifies the Scheutz patent as 2216 while the Smithsonian 2214 wording remains recorded as a discrepancy;
- patent layer and built-object layer are separate entries/roles;
- committee-report layer is distinct from Merzbach synthesis;
- `supports` / `notEstablished` prohibit source-specific geometry/timing/performance inflation;
- Babbage DE2 reconstruction and repository P/M behavior remain separate from Scheutz evidence.

Do not write a test whose only purpose is to freeze prose punctuation. Test evidence relationships and boundaries.

# Part E — bounded output-contract cross-check

Inspect `research/output-and-audit-trail.md` and the existing `#/output-contracts` / finite-difference wording for one question only:

> Does the directly inspected 1855 committee report require correcting or sharpening an existing claim about calculation plus printing/persistent output?

If yes, make the smallest source-backed correction. Distinguish a committee statement from measured performance. If no correction is needed, leave those files alone.

Do not expand into period office procedure, printer geometry, or commercial productivity history.

# Part F — reconciliation and verification

After the source work is real:

- update `STATUS.md` only for the patent/committee precision actually obtained;
- add one concise completed line to `TODO.md`;
- narrow `docs/RESEARCH_GAPS.md` only where this slice genuinely closes an open item;
- update `docs/VERIFICATION.md` with actual baseline/final counts and checks;
- do not re-date unrelated smoke checks or copy stale test counts.

If source-atlas data changes, perform bilingual browser smoke at least for:

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

> What independent contemporary evidence identifies the Scheutz British patent number, and how should the Smithsonian catalog's conflicting 2214 value be presented?

> What does the 1855 Royal Society committee report directly say about the machine's operation, table-making role, printing, and limitations—and what does it not establish?

> How are patent intent, surviving built object, contemporary examination, later historical synthesis, Babbage lineage, reconstruction, and repository P/M behavior kept separate in the atlas?

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect exact-head push CI and Deploy Pages when they complete and record only completed outcomes;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: reconcile Scheutz patent and operation evidence
```

# Evidence boundaries

- period patent list / official specification when directly inspected: **H/E1 at document precision**;
- Smithsonian `MA.323659`: **H/E1 at surviving-object/catalog precision**;
- Smithsonian `1988.0798.01`: **H/E1 at drawing-object/catalog precision**, including its current `No. 2214` wording;
- 1855 Royal Society committee report: **H/E1 for the report's contemporary statements/observations**;
- 1889 reprint of that report, if used as access layer: preserve original-report date and reprint provenance separately;
- Merzbach 1977 narrative: **H/E2 synthesis**; identified reproduced primary items remain separate provenance layers;
- Babbage designs: separate historical lineage;
- Science Museum DE2: **R/E2** reconstruction;
- repository Difference Engine/output traces: **P/M**.

# Stop conditions

Stop and leave a precise boundary instead of guessing if:

- the period patent list cannot be directly inspected and only modern snippets remain;
- the Royal Society report cannot be directly read in an original or clearly identified historical reprint;
- a source gives a number/claim but its issue/page identity cannot be established;
- resolving 2214/2216 would require asserting an undocumented Smithsonian catalog error;
- source images invite unsourced reverse engineering of the machine;
- atlas changes would require routing/layout refactors;
- work starts expanding into a Scheutz emulator, printer simulation, full patent geometry reconstruction, or general nineteenth-century table-making history.

If Parts A–D complete substantially before one hour, use remaining time to tighten exact page/issue anchors, add one directly inspected Gravatt contemporary source, and improve boundary-focused tests. **Do not start another machine family in this slice.**
