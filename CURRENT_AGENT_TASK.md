# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-analytical-replay-curta-type-ii.md`.

The previous mixed code/research slice was assigned at `d076a061445b6dce498cc92c5a5e890e6b6693ad` and landed as `4ac9dd8c480227e6b4ade51ce5eea24dc51f3935` about 29 minutes 31 seconds later. It changed 9 files (about `+251/-19`), passed 320 tests across 21 files plus build/typecheck/diff check, and exact-head push CI `33550914830` plus Deploy Pages `33550914846` both completed successfully. The administrator accepted the slice.

This assignment is intentionally broader than a single source lookup because the agent has repeatedly finished substantive bounded work in roughly half an hour. Keep it coherent: **stay on Curta Type II document/revision provenance for the whole slice.** Do not open another machine family merely to fill time.

> **Question for this slice:** can the currently scattered Type II service evidence be turned into a systematic, directly inspected service-leaf/revision map that tells us what document versions and replacement markers actually exist—without converting collector filenames, PDF order, or drawing dates into an invented production chronology?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2 and `Files to deepen next`
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-analytical-replay-curta-type-ii.md`
8. `research/curta-source-map.md`
9. `research/control-and-zeroing-source-map.md`
10. `src/exhibits/source-atlas/index.ts`
11. `tests/source-atlas.test.ts`
12. the existing Curta index/access pages already cited in the research note

Run the current-main baseline typecheck/tests before editing and record the actual count. Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as a task source.

# Part A — systematic Type II service-document census

The current source map already directly inspected selected pages of the 43-page Type II service scan plus the first Type II BOM/drawing sheets. The remaining gap is whether the **service document itself** exposes enough leaf/revision identity to bound replacement chronology or one frozen issue.

Perform a bounded but systematic inspection of the Type II service-document variants actually exposed through the existing Curta indexes/mirrors.

Start from:

- `https://www.mycurta.com/cu.htm`
- `https://vcalc.org/cu.htm`
- the currently cited 43-page Type II English-green scan
- any separate Type II German-green / German / English service scan that the index really links to

Do not trust the visible link label alone. Resolve the actual target, inspect the document, and distinguish mirror/index metadata from document-internal identity.

## A1. Create a service-leaf index

Create:

```text
research/curta-type-ii-service-leaf-index.md
```

This should be a source/provenance instrument, not a prose history essay.

For each directly inspected Type II service scan, record at least:

- access URL and mirror/index layer;
- PDF page count;
- language;
- document-internal cover/title identity;
- whether Type II is printed internally or only asserted by the host/index;
- any printed issue/date/revision statement visible on cover/front matter;
- replacement-leaf/latest-modification notice wording at summary level;
- every clearly readable printed leaf code encountered (for example `N I-a`, `O-1-2`, `S 3`), with PDF page number;
- any directly visible leaf-level date, revision/change code, replacement notation, supersession notation, or red-change marker that can be read reliably;
- whether a page visibly reuses/labels Model I material or whether that relation is only stated in front matter;
- unreadable/ambiguous marks as `unreadable` rather than guessed text.

You do **not** need to transcribe service procedures in full. The target is document identity/revision structure.

A compact table is preferred, e.g.:

```text
scan | PDF page | printed leaf | printed Type | date/revision marker | replacement/change marker | directly established | unreadable/open
```

If a scan is image-only, visual inspection is authoritative. OCR may be used only as a navigation aid and must not turn uncertain characters into claims.

## A2. Compare service variants only on exact printed evidence

After indexing the scans, add a short comparison answering:

1. Which leaf codes occur in more than one scan?
2. Are apparently corresponding leaves textually/visually the same, visibly revised, or not comparable at the available resolution?
3. Does any document itself establish one frozen Type II service issue date?
4. Can any replacement-leaf sequence be ordered by **printed leaf/date/revision evidence**, rather than PDF ordering or collector filenames?
5. Does the evidence support only a set of mixed/replacement leaves with latest modifications, with no complete chronology?

Important: absence from one mirror PDF is not proof that a leaf never existed. PDF page order is not production chronology. A modern scan assembly date is not a Contina issue date.

## A3. Keep BOM/drawing dates separate

The prior slice directly established:

- Type II BOM first-table date `3.9.52`;
- Type II drawing `2'001.-*2` drawn `19.9.51`;
- a visible `1.4.53` change-table entry.

Use these only as **separate sheet-level context**. Do not use them to order service-manual leaves unless a directly printed cross-reference actually connects the documents.

A same-looking part number or title does not by itself prove service issue chronology, production adoption, interchangeability, or unchanged geometry.

# Part B — bounded control/procedure cross-reference from the indexed leaves

If the service-leaf census is complete, use the remaining time to make one Curta-internal cross-reference that improves the existing control provenance without reverse engineering geometry.

From directly inspected Type II service leaves, identify exact leaf/page anchors for the already named responsibility clusters where readable:

- zero/home-position preconditions;
- crank removal/home relation;
- carriage removal/locking responsibility;
- reversing-lever assembly identity;
- clearing-plate identity/positioning responsibility;
- zero-positioner identity;
- RZ/UZ carry-lever naming if explicitly printed.

Update `research/control-and-zeroing-source-map.md` only to add exact **document/leaf provenance** for responsibilities already supported. Do not derive a new event sequence, linkage path, force path, timing diagram, or operator procedure from assembly names.

If the service documents do not provide clearer anchors than those already recorded, do not pad this section—state that the leaf census improves document chronology only.

# Part C — source map / atlas integration only where evidence improves

## C1. Curta source map

Update `research/curta-source-map.md` to summarize the new service-leaf census and replace the generic “complete chronology not reconstructed” statement with the most precise conclusion actually supported.

Acceptable outcomes include:

- **partial chronology bounded** by explicit printed leaf/revision dates; or
- **no frozen issue / no complete chronology established**, now supported by a systematic census rather than a few sampled pages.

Both are useful results. Do not force a chronology.

## C2. Source atlas

Update the existing Curta source-atlas anchor(s) only if the census yields a new directly inspectable document identity, leaf/date range, or support/not-established boundary that is useful to public readers.

Do not create a parallel evidence system.

If updated:

- preserve `H`/`R` claim type and E1–E4 semantics from `docs/EVIDENCE_POLICY.md`;
- make access-host versus manufacturer-document identity explicit;
- keep `supports` and `notEstablished` balanced;
- add focused assertions in `tests/source-atlas.test.ts`.

Do not add Curta geometry to `#/curta` in this slice.

# Part D — reconciliation and verification

After the research/integration work:

- update `STATUS.md` with only document/revision precision actually gained;
- add one concise completed line to `TODO.md`;
- narrow `docs/RESEARCH_GAPS.md` only if the Type II service-issue/replacement-leaf gap genuinely changes;
- update `docs/VERIFICATION.md` with baseline/final checks and actual test counts;
- preserve all prior Analytical Engine, Bush/Shannon, Scheutz, direct-multiplier and control records.

If source-atlas data changes, perform bilingual browser smoke for:

```text
#/source-atlas
#/curta
#/about
```

If only markdown research changes, do not falsely claim a browser smoke.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

If the parallel Vitest run hits the previously observed transient Node multi-worker OOM, repeat with a bounded worker count and record both facts; do not silently delete the failed run from verification history.

Also run focused source-atlas tests if that area is touched.

All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head push CI and Deploy Pages when they complete and record only completed outcomes available before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: map Curta Type II service leaf revisions
```

# Evidence boundaries

- directly inspected manufacturer-origin page/leaf text = **H/E1 at the exact page/leaf precision inspected**;
- collector/specialist index labels and filenames = access provenance, not manufacturer metadata;
- comparison of clearly matching printed leaves across scans may be H/R when interpretation is needed;
- production chronology synthesized from service/BOM/drawing dates is not H/E1 unless a primary document explicitly states that chronology;
- a patent is not proof of production revision;
- a drawing title, part number or exploded view does not establish hidden linkage behavior, timing, force, tolerance, wear, interchangeability, or production-wide identity;
- repository control traces remain P/M unless a separate future task explicitly models a sourced historical procedure.

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- a service PDF exists but its pages cannot actually be rendered/inspected;
- leaf codes or dates are too blurry to read reliably;
- two scans appear related but have no exact printed identity allowing a defensible comparison;
- chronology is available only from collector prose/filenames rather than document-internal evidence;
- resolving a drawing requires reverse engineering geometry beyond captions/title blocks;
- source-atlas integration would require broad route/layout refactors;
- the work starts expanding into a serial-number census, full Curta emulator, repair guide, production-history essay, or 3D/physics reconstruction.

If Parts A–C finish substantially before one hour, spend the remaining time increasing leaf-index completeness, cross-scan comparison precision, and source-atlas/tests where justified. **Do not start Difference Engine, Differential Analyzer, Comptometer, Millionaire, or another family in this slice.**
