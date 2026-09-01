# Archived Agent Task — Curta Type II service-leaf/revision census

Issued: 2026-09-02
Completed: 2026-09-02
Completion commit: `4441ac3399c0ee54485b7ddfa897080feee9339d` (`research: map Curta Type II service leaf revisions`)

## Objective

Systematically inspect the Type II Curta service-document variants exposed through the existing specialist indexes/mirrors, build a directly inspected leaf/revision map, and determine whether a defensible service-issue/replacement chronology can be established without treating collector filenames, PDF order, scan assembly marks, BOM dates, or drawing dates as production chronology.

## Completion accepted

The completed slice:

- added `research/curta-type-ii-service-leaf-index.md`;
- resolved three actual Type II service targets and separated mirror/index labels from document-internal identity;
- indexed the English-green 43-page service assembly and the separate German 55-page 1967 issue at page/leaf precision, while bounding the less-completely inspected German-green variant;
- established one explicit **autumn 1967** German Model II service issue;
- established that the green assemblies are undated replacement/latest-modification leaf sets and do not expose a complete chronology;
- preserved unreadable marks as unreadable rather than guessing;
- added exact Curta Type II control/service leaf anchors to `research/control-and-zeroing-source-map.md`;
- tightened `research/curta-source-map.md`, `STATUS.md`, `TODO.md`, `docs/RESEARCH_GAPS.md`, and the source-atlas boundary;
- updated focused source-atlas assertions.

Diff from assignment head `ace1e804e33b8143c899f73f96765aecbfec0059` to completion head: 9 files, approximately `+163/-16`, with one new 99-line research index.

## Verification

Recorded by the completion commit:

- baseline typecheck passed;
- baseline/final full suite: 320 tests across 21 files passed;
- `npm run typecheck` — pass;
- `npm run build` — pass;
- `git diff --check` — pass;
- focused source-atlas tests — 17 passed.

Exact-head remote workflows also completed successfully:

- CI `33564149496` — success;
- Deploy Pages `33564149453` — success.

The attempted browser smoke was not successful because the available browser path was disconnected/non-capturing, and the completion correctly did **not** claim a successful browser smoke.

## Administrator assessment

Accepted. The slice was source-heavy and coherent, but it was broad enough that the assignment-to-completion wall time was longer than the preceding half-hour slices. The next task should therefore be slightly narrower and focus on one precise unresolved provenance problem rather than another multi-document census.

## Preserved boundary

The result does **not** establish:

- complete chronology for the two undated green replacement-leaf assemblies;
- production adoption or serial-number chronology;
- interchangeability across revisions;
- hidden geometry, linkage timing, force, tolerance, wear, or speed;
- equivalence between historical Curta service procedures and repository P/M state machines.
