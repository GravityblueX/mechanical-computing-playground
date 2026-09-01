# Archived Agent Task — Scheutz built-engine evidence

Issued: 2026-09-02
Completed commit: `a894f8f1e24afb91837dafed30ea2bc1e546add4` (`research: anchor Scheutz built-engine evidence`)
Assignment commit: `7e04fd66a9f1b0d2f996010457e2e42a496c8604`

## Outcome

The slice completed successfully and remained within the evidence boundary.

It directly anchored:

- Smithsonian/NMAH surviving 1853 Scheutz engine `MA.323659` / `nmah_997042` at H/E1 object-record precision;
- Smithsonian/NMAH ca. 1857 drawing set `1988.0798.01` / `nmah_1005138` at H/E1 drawing-object/catalog precision;
- Merzbach 1977 Smithsonian study at H/E2 synthesis precision;
- Merzbach Appendix I as an identified reproduced-primary layer for British Patent A.D. 1854 No. 2216;
- the unresolved Smithsonian catalog wording `No. 2214` versus the reproduced patent identity `No. 2216` without silently repairing either source.

The source atlas gained separated Scheutz built-object, drawing-set, and study/patent-provenance anchors. Tests lock the separation from Babbage designs, the Science Museum DE2 reconstruction, and repository P/M Difference Engine/output flows.

## Throughput / verification

The completion landed about 35 minutes after assignment and changed 7 files, approximately `+106/-13` lines. Test count increased from 291 to 292 across 21 files.

Recorded local verification:

- `npm run typecheck` — pass
- `npm test -- --run` — pass, 292 tests across 21 files
- `npm run build` — pass
- `git diff --check` — pass
- focused source-atlas test — pass
- bilingual browser smoke — pass for the affected evidence/output routes

Post-push exact-head GitHub Actions were also checked by the hourly reviewer:

- CI run `33533826721` — completed / success
- Deploy Pages run `33533826754` — completed / success

No open pull request remained.

## Remaining boundary exposed by this slice

The next useful Scheutz work is not geometry. The immediate evidence questions are:

1. reconcile the patent-number conflict using independent contemporary/primary patent evidence while retaining the Smithsonian catalog wording as a documented discrepancy;
2. directly inspect contemporary operational/committee reports before making claims about actual operation, limits, printing, speed, or reliability;
3. keep patent intent, surviving built object, later synthesis, Babbage lineage, and repository P/M behavior separate.

This archive is a completion record, not a live task. See `CURRENT_AGENT_TASK.md` for the current assignment.
