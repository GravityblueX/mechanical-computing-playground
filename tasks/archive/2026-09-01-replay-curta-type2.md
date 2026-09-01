# Archived Agent Task — replay integrity and Curta Type II service precision

Issued and completed: 2026-09-01
Assignment commit: `4acdc73ba20bdf952643d60fb9cdfdb32ff89d17`
Completion commit: `c85dd761bda908d528a4f35229bde09c2afb4bfb`

## Objective

Reconcile two stale replay-hardening fixes onto current `main` without importing stale verification prose, then directly inspect a bounded set of Curta Model II service-manual pages for control responsibility and model-specific source precision.

## Completed result

- decimal-register replay now fails closed on unknown runtime event discriminators while preserving the six declared event kinds and existing marker no-op semantics;
- continuous-integrator replay is action-derived and binds actions, cycle ids, ordered events, validated endpoints and final state, including genuine zero-action traces and explicit-null rejection;
- the Type II service scan was directly inspected at PDF pp. 1–2, p. 6 / leaf `N I-a`, p. 10 / leaf `O-1-2`, and p. 34 / leaf `S 3`;
- the research/source-atlas layer now records the Type II replacement-leaf warning, reused-Type-I-picture warning, zero-position, carriage, reversing, clearing and zero-positioner responsibilities without inferring hidden linkage or production-wide identity;
- STATUS/TODO/research gaps/verification and source-atlas tests were reconciled.

## Throughput / verification

The coherent completion landed about 43 minutes after assignment. GitHub reports 159 changed lines (`+143/-16`) across 11 files. The suite increased from 277 tests / 21 files to 291 tests / 21 files. Typecheck, full tests, production build, diff check, focused replay/source-atlas regressions and bilingual browser smoke passed.

Push CI run `33522772721` completed successfully for the exact completion commit. Deploy Pages run `33522772810` also completed successfully for that same commit.

## Remaining boundary

Still not established: Curta Type II capacity/date/replacement-leaf chronology, full Type I/II production revision mapping, exact hidden linkage/timing, or source-specific carry/clearing geometry. The software replay corrections are correctness/provenance work and do not upgrade any historical mechanical claim.