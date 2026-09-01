# Archived task — Curta and Analytical Engine source hardening

Issued: 2026-09-01
Completed: 2026-09-01
Assignment commit: `c50009f58b69445db7b92466f805b06118c4fef1`
Completion commit: `3c7406ddce578881cdf8c225ee479ed7675254d4`

## Result

Completed successfully in about 37 minutes from assignment to pushed implementation, continuing the recent pattern of broad one-question slices finishing well under one hour.

The completion commit changed 11 files with 259 additions and 203 deletions. It:

- directly inspected and recorded Curta patent/operator/service-document anchors while preserving patent, operator-guide, service-document and Type I/II production boundaries;
- directly anchored the 1843 Menabrea/Lovelace Analytical Engine publication at printed pp. 677, 679 and 704;
- kept the H. P. Babbage `(ab+c)d` material explicitly transcription-only after a bounded facsimile attempt;
- extended the typed source atlas from two to four tracks with Curta and Analytical Engine anchors;
- expanded bilingual atlas presentation and cross-links from the named-machine lessons;
- updated STATUS, TODO, RESEARCH_GAPS, TEACHING_PATH and VERIFICATION without promoting repository P/M event order into historical timing.

## Verification

Recorded local baseline/final state:

- baseline: 217 tests across 19 files;
- final: 221 tests across 19 files;
- `npm run typecheck` — pass;
- `npm test -- --run` — pass;
- `npm run build` — pass;
- `git diff --check` — pass;
- bilingual browser smoke recorded for source-atlas, Curta, Analytical Engine, about, and finite-difference routes.

Remote checks for completion commit `3c7406d` also completed successfully:

- CI run `33494651002` — success;
- Deploy Pages run `33494650973` — success.

No open pull request remained at review time.

## Review judgment

Accepted. The source/evidence boundaries are materially stronger and no source-specific production geometry was invented. Since this and several preceding substantial slices completed in roughly 30–42 minutes, the next assignment may increase breadth moderately while preserving one coherent evidence question.
