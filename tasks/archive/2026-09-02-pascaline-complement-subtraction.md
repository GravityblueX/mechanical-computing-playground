# Archived Agent Task — Pascaline complement subtraction

Issued/completed: 2026-09-02
Completion commit: `ac65e47f1df84688c893099ac680b1956b2ef5b6` (`feat: add complement-register subtraction lesson`)
Assignment commit: `4b66bbbf92970d655b3710c4dfbe7da9a2130887`

## Original bounded objective

Audit Pascal's own *Avis* and Charles Belair's 1659 description for what they directly establish about one-direction input, dual addition/subtraction displays, retaining/borrowing, reversed digit order and carry; then create a source map and a small generic P/M complement-register lesson without calling the software trace a historical Pascaline subtraction algorithm.

## Administrator review

Accepted as substantively complete.

The completion landed about 45 minutes after assignment and changed 10 files / 362 lines (353 additions, 9 deletions). Baseline was 362 tests; final verification reports 375 tests across 22 files. The slice added:

- exact Pascal *Avis* locations at 1923 DjVu pp. 359–364;
- separate Belair 1659 locations at DjVu pp. 371, 373 and 376–377;
- `research/pascaline-subtraction-source-map.md` with H/E1 versus M versus P/M boundaries;
- a deterministic/replayable generic complement-register model;
- a bilingual visible-carry teaching panel;
- fail-closed action/event/final-state tamper tests.

Exact-head GitHub Actions also passed after push:

- CI run `33585386764` — success;
- Deploy Pages run `33585386792` — success.

No open PR remains.

## Follow-up found during review

The historical/evidence boundary is good, but the generic complement model materializes one `REGISTER_INCREMENTED` event per unit of the subtrahend while accepting widths up to 15 digits. That makes a mathematically valid large input capable of generating an impractically large trace and also risks making the public lesson sound as though `+345` means 345 historically meaningful mechanical cycles.

The next task therefore keeps the accepted research but hardens the P/M trace into a bounded, action-level representation with compact carry summaries before moving on to unrelated source work.
