# Archived Agent Task — Controlled-Key integrity

Issued and completed: 2026-09-01
Completion commit: `d35f4209950b5652b3b3bc3f5535020afaaff434`
Assignment commit: `ef48b1b3822e55d79f5dd08e092f627986a7c26c`

## Objective

Ground the Controlled-Key incomplete-stroke problem/control responsibility at directly inspected source precision, then add a generic P/M key-stroke-integrity/interlock model that reuses the existing key-driven accumulator.

## Completed result

- directly inspected Turck 1921 viewer pp. 179–182 / printed pp. 159–162 for incomplete-stroke signaling, other-order blocking and correction-before-continuation;
- kept Smithsonian `nmah_905178` at catalog/one-image-manifest precision and Science Museum `1921-16` at identified Model F object precision;
- kept John Wolff trigger/release details secondary rather than promoting them to primary geometry;
- added a generic `key-stroke-integrity` P/M controller around the existing accumulator;
- incomplete release leaves arithmetic unchanged;
- explicit detection locks unrelated input;
- completing the errant stroke commits the selected value exactly once through existing key-driven semantics;
- release preserves the corrected result and returns the controller to ordinary input;
- added deterministic/action-derived replay hardening and tamper rejection;
- integrated a bilingual stepped control lesson without source-specific linkage artwork;
- reconciled STATUS/TODO/research gaps/verification.

## Throughput / verification

The coherent completion landed about 37 minutes after the assignment commit. GitHub reports 349 changed lines (`+326/-23`) in the completion commit. The local verification recorded 264 tests across 20 files, with typecheck, production build, diff check, focused regressions and bilingual browser smoke passing. CI run `33510045135` on the completion commit finished successfully.

## Remaining historical boundary

Still not established: exact primary release-button procedure, controlled-key patent/figure mapping, trigger/registration geometry and timing, production-revision mapping, or universal Model E/F/J behavior. Those must not be inferred from the generic P/M event sequence.
