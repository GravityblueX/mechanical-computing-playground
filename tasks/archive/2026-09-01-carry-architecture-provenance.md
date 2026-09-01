# Completed task — carry architecture provenance and replay hardening

Status: completed
Assigned from: `84e7dd3302dff540e732431ce0033c1ceb562757` (`docs: assign carry architecture provenance slice`)
Implementation commit: `d49b9d8585a99e33fa739b454af1b743519df618` (`feat: ground carry architecture provenance`)
Observed elapsed time from task assignment commit to implementation commit: about 31 minutes.

## Delivered

- Added `research/carry-architecture-source-map.md`, keeping Pascal operational claims, Cnam institutional evidence, CMU reconstruction evidence, Felt US366945A, Felt US762520A, and Smithsonian Model A catalog context source-separated.
- Hardened `src/mechanisms/key-driven-accumulator/` state validation and action-derived replay so altered/omitted/inserted carry events, sequence/cycle changes, malformed state, unknown event types, and final-state tampering fail closed.
- Added typed `src/exhibits/carry-provenance/` profiles and tests.
- Extended `#/visible-carry` with a bilingual architecture comparison while leaving the repository's serialized carry chain explicitly P/M rather than historical timing/geometry.
- Reconciled README, STATUS, TODO, `docs/REPRESENTATION_AND_PROTOCOL.md`, `docs/RESEARCH_GAPS.md`, `docs/TEACHING_PATH.md`, the carry essay, and `docs/VERIFICATION.md`.

## Change size and verification observed

The implementation changed 14 files with about 328 additions and 103 deletions. The recorded suite rose from 150 tests across 14 files to 170 tests across 15 files.

For `d49b9d8585a99e33fa739b454af1b743519df618`:

- GitHub Actions CI run `33467415947` completed successfully.
- The repository verification record reports typecheck, 170 tests, production build, diff check, and a bilingual visible-carry browser smoke check passing.
- No open pull request remained.

## Review note

The source boundaries are substantially better than before: US366945A and US762520A remain separate historical contexts, Smithsonian Model A is not treated as proof of patent-to-production identity, and Pascal's own operational text is not misused as a geometry source. The replay hardening also closes the concrete no-op carry-event integrity weakness identified in the assignment.

No corrective blocker was found.

## Throughput note

This was broader than the prior output-contract slice yet landed in about 31 minutes. The next assignment can increase materially toward a full hour, but it should still remain one coherent evidence/mechanism question rather than bundling unrelated backlog topics.
