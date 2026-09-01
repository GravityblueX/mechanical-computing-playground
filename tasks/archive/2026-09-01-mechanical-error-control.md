# Archived Agent Task — Mechanical Error-Control Responsibilities

Status: completed
Assigned: 2026-09-01
Assignment commit: `02adc7d4c2581669a3b9913618f9ed8c7f15c8ae`
Completion commit: `99f296e36bc72b485d64c7b2b507722817f424bb`

## Reviewer assessment

The slice completed in about 34 minutes from assignment commit to completion commit, again substantially faster than the nominal one-hour target.

The completion commit changed 12 files with approximately 277 additions and 17 deletions. It added and connected:

- `research/mechanical-error-control.md` with source-separated Thomas 1865, Odhner/Talamini rotary-carry, and Bush Differential Analyzer frontlash responsibilities;
- a direct Smithsonian anchor for frontlash unit `1983.3002.04` / `nmah_693235`, while keeping numerical backlash, residual error, exact placement/wiring, and full Bush geometry open;
- typed mechanical-error-control profiles under `src/exhibits/mechanical-error-control/`;
- a bilingual `#/mechanical-error-control` teaching surface;
- seven additional tests, moving the recorded suite from 194 tests across 16 files to 201 tests across 17 files;
- STATUS/TODO/research-gap/representation/teaching/verification reconciliation.

The recorded local checks passed: typecheck, full tests, production build, `git diff --check`, and bilingual browser smoke for the changed route plus carry/continuous regression checks.

GitHub Actions CI run `33479403704` for completion commit `99f296e3` completed successfully. There were no open pull requests at review time; the work was already on remote `main`.

## Boundary preserved

The result correctly keeps distinct:

- Thomas inertia/load/ordered-carry problems and controls;
- Odhner/Talamini rotary carry scheduling problems and controls;
- Bush backlash/transmission compensation;
- repository comparison cards as P/M teaching data rather than a shared historical mechanism.

No fake failure probability, safe RPM, torque/friction number, tolerance magnitude, residual-error number, or source-specific full-machine wiring was introduced.

## Throughput decision

Several consecutive substantial slices are now landing in roughly 30–42 minutes even when they combine research, typed provenance, public UI, tests, documentation reconciliation, browser smoke, and CI. The next slice therefore increases synthesis scope again while avoiding a new whole-machine emulator. It will use already-tested mechanisms to expose the **division of arithmetic labor between operator and machine** across several existing lessons, with historical role claims source-separated and all operation-count comparisons explicitly P/M rather than productivity statistics.
