# Archived Agent Task — Analytical replay provenance + Curta Type II source precision

Issued and completed: 2026-09-02
Completion commit: `4ac9dd8c480227e6b4ade51ce5eea24dc51f3935` (`fix: integrate analytical replay provenance and deepen Curta sources`)
Assignment commit: `d076a061445b6dce498cc92c5a5e890e6b6693ad`
Observed wall-clock from assignment commit to completion commit: about 29 minutes 31 seconds.

## Administrator review

Accepted.

The completion changed 9 files, approximately `+251/-19`, and did both requested subparts without regressing the just-merged direct-multiplication replay contract.

### Analytical Engine replay

The current `src/exhibits/analytical-engine-flow/` now derives the canonical trace from the exact `{a,b,c,d}` fixture and validates initial state, ordered event array and final state against that fixture before full replay or partial stepping. The reviewed adversarial coverage includes alternate-fixture substitution, fixture-only tampering, unknown enumerable string/Symbol fields, non-finite/enumerable-undefined extensions, sparse/extended/reordered arrays and final-state tampering. Object property insertion order remains non-semantic.

This is a P/M trace-provenance hardening, not a new historical Analytical Engine instruction-set claim.

### Curta Type II sources

The source pass directly inspected manufacturer-origin Type II BOM/drawing material exposed through the existing specialist mirror and recorded only document-internal facts:

- BOM first underlying table identifies `CONTINA A.G. MAUREN` / `CURTA II` and carries sheet date `3.9.52`;
- drawing-set first sheet identifies Type II, drawing `2'001.-*2`, drawn date `19.9.51`, and a visible `1.4.53` change-table entry;
- modern mirror/wrapper dates remain access metadata rather than manufacturer issue dates;
- these sheet dates do not establish production launch, a frozen service issue, complete replacement-leaf chronology, hidden geometry, capacity, or interchangeability.

### Verification

Local completion record reports:

- `npm run typecheck` — pass;
- `npm test -- --run` — 320 tests across 21 files pass (a later parallel repeat hit transient Node OOM; single-worker repeat passed the same suite);
- `npm run build` — pass;
- `git diff --check` — pass;
- focused Analytical Engine + direct-multiplier + source-atlas suites — 69 tests pass;
- bilingual browser smoke for `#/source-atlas`, `#/curta`, and `#/about` — pass as recorded in `docs/VERIFICATION.md`.

Exact-head push automation also completed successfully after the commit:

- CI run `33550914830` — success;
- Deploy Pages run `33550914846` — success.

## Throughput adjustment

This was a substantive mixed code/research slice completed in about half an hour. The next assignment may therefore be broader than a single-document lookup, but should remain one coherent source-hardening question rather than opening a new machine family.

## Remaining boundary carried forward

The highest-value Curta gap exposed by this slice is now document/revision chronology rather than arithmetic behavior: the repository still lacks a systematic inventory of Type II service-leaf identities/replacement markers and cannot yet state one frozen Type II service issue or complete replacement-leaf chronology. Production revision/linkage mapping remains open.
