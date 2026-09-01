# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-curta-type-ii-service-leaf-census.md`.

The previous Curta census landed as `4441ac3399c0ee54485b7ddfa897080feee9339d`, changing 9 files (about `+163/-16`) and passing 320 tests across 21 files, typecheck, build, diff check, focused source-atlas tests, exact-head CI `33564149496`, and Deploy Pages `33564149453`. Its assignment-to-completion wall time was longer than the preceding half-hour slices, although the exact local-agent start time is not known. This task is therefore deliberately **narrower**: resolve one precise Difference Engine provenance conflict and integrate only evidence that actually improves the repository.

> **Question for this slice:** why does the Smithsonian ca.1857 Scheutz drawing-set record say British Patent A.D. 1854 No. **2214**, while independent contemporary/reproduced specification evidence says No. **2216**—and how far can that discrepancy be resolved from directly inspected sources without silently correcting the museum catalog or inventing a provenance story?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2 and `Files to deepen next`
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-curta-type-ii-service-leaf-census.md`
8. `research/difference-engine-source-map.md`, especially the Scheutz sections
9. `src/exhibits/source-atlas/index.ts`
10. `tests/source-atlas.test.ts`

Run the current-main baseline typecheck/tests before editing and record the actual count. Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as a task source.

# Part A — reconcile the 2214 / 2216 patent-number conflict

The repository currently preserves all of these facts separately:

- Smithsonian drawing-set record `nmah_1005138` says the ca.1857 14-figure drawings are similar to, but not identical with, final specifications for British Patent A.D. 1854 No. **2214**;
- a directly inspected 1855 *Journal of the Society of Arts* patent list identifies Georg and Edvard Scheutz's calculating/printing invention as No. **2216**;
- Merzbach 1977 Appendix I reproduces the British specification as **A.D. 1854, No. 2216**.

Do not choose one number merely because it is repeated more often. Build a compact source audit.

## A1. Directly inspect the specification identity

Start from the Smithsonian-hosted Merzbach monograph/facsimile already used by the repository:

- Uta C. Merzbach, *Georg Scheutz and the First Printing Calculator* (Smithsonian, 1977)
- repository landing page: <https://repository.si.edu/items/d3bd18bb-9a77-4ca1-82c9-54db5f6e6d42>
- public PDF may also be exposed through Smithsonian/GovInfo mirrors.

Inspect the Appendix I header and enough surrounding pages to record:

- printed patent number;
- provisional/final specification labels;
- filing/sealing/publication dates if explicitly printed;
- inventor names/title wording;
- figure-sheet headers where readable;
- exact printed pages used.

Treat Merzbach's 1977 reproduction as **R/E2 for the reproduction/editorial layer**, while any clearly reproduced nineteenth-century specification header/text can support H claims only at the precision directly visible. Do not call a modern reprint itself an 1854 artifact.

## A2. Independently confirm the contemporary patent-number entry

Re-open the already cited period patent-list source and verify the actual printed entry rather than relying on the repository summary:

- *Journal of the Society of Arts*, vol. III, no. 126, 20 April 1855, printed p. 393;
- existing public-domain scan cited in `research/difference-engine-source-map.md`.

Record the immediate neighboring entries sufficiently to establish that `2216` belongs to Georg and Edvard Scheutz and is not a line-number or column-reading artifact.

If another period official/patent index can be accessed directly within the time budget, use it as an additional independent identity check. Prefer a nineteenth-century patent index/specification over later summaries.

## A3. Identify what No. 2214 actually refers to, if directly possible

Search authoritative/period patent indexes or specification collections for British Patent A.D. 1854 No. **2214**.

The ideal result is one of:

1. direct evidence that No. 2214 belongs to a different inventor/invention;
2. direct evidence that 2214 and 2216 are two distinct stages/documents connected to Scheutz;
3. no accessible source sufficient to identify 2214 reliably.

Any of these is acceptable.

Important:

- do **not** infer “Smithsonian typo” merely because 2216 is well supported;
- do **not** invent a provisional/final-number renumbering story unless a source explicitly establishes it;
- do **not** treat search-engine snippets as evidence;
- if a later index says 2214 without primary support, record it as secondary only.

If 2214 can be identified directly as an unrelated patent, the repository may state that the Smithsonian catalog wording conflicts with the independently identified patent record, but should still avoid speculating about how the catalog error arose.

# Part B — audit the Smithsonian drawing-set comparison wording

Re-open the directly cited Smithsonian/NMAH drawing-set record:

- `1988.0798.01` / `nmah_1005138`
- <https://americanhistory.si.edu/collections/object/nmah_1005138>

Confirm the exact catalog wording around:

- 14 drawings / Fig. 1–14;
- ca.1857 use-instruction context;
- the related letter explaining number-system conversion;
- “similar to, but not identical with” the patent final specifications;
- the catalog's printed/displayed patent number.

If the IIIF drawing image is usable, inspect only enough to record visible figure count/labels and document identity. **Do not reverse-engineer geometry or assert figure-to-figure equivalence from visual similarity.**

Then search the Merzbach monograph for the drawing set / Dudley delivery / 14-figure instructions and see whether Merzbach himself prints `2214`, `2216`, or another wording in the relevant narrative/caption. This is important because it may locate the discrepancy at the catalog-versus-source layer without guessing causation.

Create a compact table inside `research/difference-engine-source-map.md` such as:

```text
source | date/layer | printed number | what it directly establishes | conflict/boundary
```

Do not create a separate research file unless the evidence is genuinely large enough to justify one.

# Part C — bounded related-letter access check

The Smithsonian drawing record says the ca.1857 operational drawings were accompanied by a letter explaining conversion between number systems. The repository currently records that the letter itself is unexposed.

Spend a **bounded** amount of time checking whether the related letter is now discoverable through:

- linked/related Smithsonian records;
- IIIF manifest metadata;
- Merzbach's bibliography/illustrations/appendices;
- a clearly identified archival catalog record.

If a directly inspectable letter/facsimile appears, record only its actual identity and the exact conversion/procedure text visible. If it remains unavailable, preserve that as an explicit negative access result and stop this subpart. Do not burn the whole slice hunting a missing object.

# Part D — source-atlas integration only if precision materially improves

Update the Scheutz/Difference Engine source-atlas anchor only if this audit yields a useful public-facing correction/boundary, for example:

- `2216` independently confirmed by reproduced specification plus contemporary patent list;
- `2214` retained explicitly as Smithsonian catalog wording rather than silently normalized;
- No. 2214 independently identified as unrelated, if primary evidence proves that;
- related letter still not inspected.

If updated:

- keep claim type/evidence semantics from `docs/EVIDENCE_POLICY.md`;
- distinguish museum catalog H/E1 metadata from reproduced specification R/E2 access layers;
- use `supports` for patent identity/document relationships only;
- use `notEstablished` for as-built equivalence, geometry, timing, performance, catalog-error cause, and letter content when uninspected;
- add focused assertions in `tests/source-atlas.test.ts`.

Do not modify the finite-difference mechanism, printing ledger, or public mechanism geometry in this slice.

# Part E — reconciliation and verification

After the source audit:

- update `STATUS.md` only if the 2214/2216 boundary is genuinely sharper;
- add one concise completed line to `TODO.md`;
- narrow the relevant line in `docs/RESEARCH_GAPS.md` only if the discrepancy is actually resolved or better bounded;
- update `docs/VERIFICATION.md` with baseline/final checks, actual test count, and any browser/deployment verification actually performed;
- preserve all existing Curta, Analytical Engine, Differential Analyzer, carry/control, direct-multiplier, and replay work.

If source-atlas data changes, perform a bilingual browser smoke for:

```text
#/source-atlas
#/finite-difference
#/about
```

If browser tooling is unavailable, state that explicitly; do not claim a smoke from build/tests alone.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Also run focused source-atlas tests if that area is touched. All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head push CI and Deploy Pages when they complete and record only completed outcomes available before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: reconcile Scheutz patent identity evidence
```

# Evidence boundaries

- nineteenth-century patent list/specification text directly inspected = **H/E1 at the exact printed-text precision inspected**;
- Merzbach's modern reproduction/editorial framing = **R/E2**, even when it reproduces H/E1-era text;
- Smithsonian object/drawing catalog identity = **H/E1 at catalog/object precision**, not proof that every cataloged comparison or patent number is error-free;
- “similar but not identical” does not establish a part-by-part correspondence;
- a patent specification does not establish the exact as-built 1853 machine or ca.1857 instruction-drawing geometry;
- a catalog conflict is not permission to invent a correction history;
- search snippets, filenames, OCR guesses, and modern mirror labels are navigation aids only unless verified against the underlying document.

# Stop conditions

Stop a subpart and preserve the unresolved boundary rather than guessing if:

- No. 2214 cannot be directly identified from a reliable patent/index source;
- the original specification/facsimile cannot be rendered clearly enough to read its header;
- the ca.1857 drawing image is too low-resolution for reliable figure labels;
- the related letter is only mentioned but not exposed;
- resolving the conflict would require asserting why Smithsonian has `2214` without documentary evidence;
- the work starts expanding into full Scheutz geometry, printer timing, performance benchmarking, contract/workflow history, or a general British-patent history.

If Parts A–D finish substantially before one hour, spend remaining time tightening exact page/figure/record citations and source-atlas tests. **Do not start Thomas, Comptometer, Curta, Differential Analyzer, Millionaire, or another family in this slice.**
