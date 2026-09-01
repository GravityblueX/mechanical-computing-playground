# Archived Agent Task — Scheutz British-patent 2214/2216 identity audit

Issued: 2026-09-02
Completed: 2026-09-02
Assignment commit: `0ecd9f9f6671f687c525cba0d9146e29eea99922`
Completion commit: `e19485647ee0dd02dee52d98b050e3adbe44379f` (`research: reconcile Scheutz patent identity evidence`)

## Objective

Resolve, at document-identity precision, the conflict between the Smithsonian ca.1857 Scheutz drawing-set catalog wording citing British Patent A.D. 1854 No. 2214 and independent period/reproduced specification evidence identifying the Scheutz calculating-and-printing patent as No. 2216, without silently correcting the museum catalog or inventing an editorial history.

## Completion accepted

The completed slice directly established:

- *The Mechanics' Magazine* printed pp. 167 and 426 identify No. 2214 as Lionel John Wetherell and Augustus Johann Hoffstaedt's pump patent, dated 16 October 1854;
- the same period sequence identifies George/Edward Scheutz's calculating-and-printing patent as No. 2216, dated 17 October 1854;
- the already inspected *Journal of the Society of Arts* p. 393 independently agrees on Scheutz No. 2216;
- Merzbach Appendix I printed pp. 43–55 reproduces the Scheutz specification under No. 2216 and supplies bounded filing/final-signature anchors;
- Smithsonian `1988.0798.01` / `nmah_1005138` still displays No. 2214, and its one drawing canvas visibly carries Fig. 1–14;
- no inspected source explains how the Smithsonian catalog acquired or retained 2214, so the repository preserves the conflict rather than calling it a typo;
- the related explanatory letter remains unexposed.

The source audit was integrated into `research/difference-engine-source-map.md`, the typed source atlas, focused tests, `STATUS.md`, `TODO.md`, `docs/RESEARCH_GAPS.md`, and `docs/VERIFICATION.md`.

Diff from assignment head to completion head: 7 files, approximately `+62/-12`.

## Verification

Recorded by the completion commit:

- baseline/final `npm run typecheck` — pass;
- full suite — 320 tests across 21 files passed;
- `npm run build` — pass;
- `git diff --check` — pass;
- focused source-atlas tests — 17 passed.

Exact-head remote CI run `33567892991` completed successfully. The completion correctly did not claim a browser smoke because the browser path was disconnected/non-capturing.

## Administrator assessment

Accepted. Assignment-to-completion wall time was about 36 minutes (22:10:08Z → 22:46:07Z), and the diff remained tightly scoped. The next local-agent slice may therefore be moderately larger than this one, provided it stays within one coherent mechanism/evidence question.

After this completion, administrator review also merged external PR #13 as `8b26b9f645d40e2ef55695b52c158405997262fd`, hardening decimal-register trace/action provenance. The next agent must baseline from current remote `main`, not from this archived completion head.

## Preserved boundary

The result does **not** establish:

- why the Smithsonian catalog says 2214;
- part-by-part equivalence between the patent drawings, the 1853 built machine, and the ca.1857 instruction sheet;
- source-specific geometry, timing, force, performance, or manufacturing history;
- the content of the unexposed related letter.
