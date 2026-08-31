# Archived Agent Task — control/interlock lesson + Curta provenance

Issued: 2026-09-01
Completed commit: `db3b1aafdfdfa66db6998a14073f809af1f8433d`
Assignment commit: `6706c9b9b5ae1c1ff18812d68196d0752aaec81e`
Completion time after assignment: about 34 minutes.

## Outcome

The local coding/research agent completed the required source-heavy slice and did not drift into source-specific geometry:

- added `research/control-and-interlocks.md` with Odhner patent and Curta operator-control provenance boundaries;
- added a deterministic generic P/M `setting-crank-interlock` state/action/event/replay mechanism;
- made setting availability, crank home/active state, lock transitions, invalid active-phase actions, cycle count and human operation count inspectable;
- added hardened replay/tamper checks and focused tests;
- added the interactive `#/controls` lesson, including a visibly rejected setting change while the crank cycle is active;
- expanded `research/curta-source-map.md` from placeholder prose into patent/operator-source provenance;
- reconciled the small `src/machines/curta/` documents with the M/H/R/P + E1–E4 evidence policy;
- updated README, STATUS, TODO, teaching path and verification.

The implementation checkpoint changed 16 files with roughly 544 additions and 28 deletions. The agent recorded 78 tests across 10 files, typecheck/build/diff-check success, and a bounded desktop `#/controls` browser smoke check.

## Reviewer check

The implementation preserves the intended boundary: the generic interlock is a P/M state-machine lesson, while Odhner/Curta claims remain source-bounded. No Odhner roller/notch/cam geometry or Curta internal linkage is copied into the generic state model. Invalid transitions are rejected rather than silently coerced.

No open pull request remains for this work.

A subsequent GitHub Actions `Deploy Pages` run for `db3b1aa` completed successfully (`33443320058`). This is a meaningful change from the older repository note that Pages configuration was blocked. The live Project Pages URL still needs a direct retrieval/smoke check before STATUS/PUBLISHING should claim public availability.

## Scheduling implication

This source-heavy 60–90 minute slice still completed in about 34 minutes. The next slice can remain large, but should now move to the highest-value named-machine provenance gap: Analytical Engine primary-source/card-flow reconciliation plus a tested evidence-aware information-flow trace. The next task should also close the now-stale Pages deployment status if the live site can be verified.