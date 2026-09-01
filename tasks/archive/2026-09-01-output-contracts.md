# Completed task — persistent output contracts and printing ledger

Status: completed
Assigned from: `fde4e9af0fdf2ca9ed1ebd8b96cbf9bc2092d44a` (`docs: assign output and audit trail slice`)
Implementation commit: `2ad181408d7a3c6d816d3c090604538636919f61` (`feat: add persistent output contract comparison`)
Observed elapsed time from task assignment commit to implementation commit: about 42 minutes.

## Delivered

- Added `research/output-and-audit-trail.md`, separating register-only output, identified printing/listing objects, total/subtotal semantics, and Difference Engine persistent-output roles.
- Added a deterministic `src/mechanisms/printing-ledger/` P/M model with structured persistent ITEM/SUBTOTAL/TOTAL records, subtotal retention, total clearing, replay, and fail-closed validation.
- Added typed `src/exhibits/output-contracts/` provenance profiles for the identified Burroughs objects, US885202A, and the existing Difference Engine source boundary.
- Added the bilingual `#/output-contracts` public lesson and connected it to navigation/teaching documentation.
- Reconciled README, STATUS, TODO, `docs/REPRESENTATION_AND_PROTOCOL.md`, `docs/TEACHING_PATH.md`, and `docs/VERIFICATION.md`.

## Change size and verification observed

The implementation changed 11 files with about 345 additions and 12 deletions. The recorded suite rose to 150 tests across 14 files.

For `2ad181408d7a3c6d816d3c090604538636919f61`:

- GitHub Actions CI run `33464260108` completed successfully.
- GitHub Pages run `33464260031` completed successfully.
- The repository verification record reports typecheck, 150 tests, production build, diff check, and local route smoke checks passing.
- No open pull request remained.

## Review note

The model keeps the working accumulator separate from the persistent record and does not present its event sequence as historical Burroughs timing/geometry. The source profiles also keep museum objects, primary patent semantics, and the repository P/M model separate. No corrective blocker was found in this slice.

## Throughput note

This was intentionally broader than the preceding 30–33 minute slices and still landed in about 42 minutes. The next assignment can increase slightly again, but should remain one coherent mechanism/evidence question rather than bundling unrelated backlog items.
