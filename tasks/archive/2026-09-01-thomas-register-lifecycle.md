# Archived Agent Task — Thomas register controls and dual-register lifecycle

Issued and completed: 2026-09-01
Assignment commit: `a813a51c7b56545f2e1ace2fefd4e8de98802504`
Completion commit: `540ba69f4bbbba01a417cb709b96732d71fc2e5a`

## Objective

Resolve the strongest directly accessible Thomas arithmometer register-control evidence around the 1865–1873 period, then add one generic P/M mechanism showing that result-register state, revolution/cycle-register state, and operation mode have independent lifecycle responsibilities.

## Completed result

- directly inspected the single exposed Smithsonian IIIF canvas for the 1868 Thomas pamphlet `nmah_904757` and kept its one-spread access boundary explicit;
- recorded the directly readable `C` result-window, `D` multiplier/quotient-window, `O` reset-`D`, and `P` reset-`C` responsibilities without inventing hidden linkage/timing;
- kept the 1867 `MA.327900` and ca.1873 `MA.335215` Smithsonian objects separate instead of merging their capacities/knob descriptions into a canonical revision;
- kept Oxford's 1865-booklet interpretation at institutional R/E2 precision;
- added a generic `register-lifecycle` P/M model using independent result/revolution clears, explicit mode selection, deterministic already-zero behavior, preserved-register evidence fields, and action-derived fail-closed replay;
- integrated a bilingual stepped lifecycle lesson into `#/controls` while preserving source/model boundaries;
- reconciled STATUS/TODO/research gaps/verification.

## Throughput / verification

The coherent completion landed about 43 minutes after assignment. GitHub reports 313 changed lines (`+292/-21`) across 8 files. The suite increased from 264 tests / 20 files to 277 tests / 21 files. Typecheck, full tests, production build, diff check, focused control regressions, and bilingual browser smoke passed. Push CI run `33516613852` completed successfully for the exact completion commit.

## Remaining boundary

Still not established: additional Thomas multiplication/division procedure pages, exact zeroing linkage/timing, production-revision mapping, or a universal Thomas control geometry. The generic lifecycle events remain P/M and must not be back-filled as historical timing.
