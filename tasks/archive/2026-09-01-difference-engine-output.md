# Archived agent task — Difference Engine provenance and output contract

Status: completed
Completed commit: `774059118dc0835314643a2b610ab159d13ea66c`
CI: GitHub Actions run `33456003716` — success

## Assignment outcome

The completed slice:

- created `research/difference-engine-source-map.md` distinguishing Difference Engine No. 1 design/surviving fragment, Difference Engine No. 2 design and 1991/2002 reconstruction, Babbage Papers output-drawing records, and actually built Scheutz printing difference engines;
- hardened the generic `difference-column` P/M state/event/replay boundary with semantic validation and fail-closed replay;
- added `src/exhibits/difference-output-flow/` so a calculated table value, persistent check-copy role, and master/stereotype-output role are separately inspectable without claiming historical printer timing or geometry;
- integrated the output-contract lesson into `#/finite-difference`;
- reconciled README, STATUS, TODO, teaching path, research notes, and verification.

Verification recorded by the completed slice:

```text
npm run typecheck        pass
npm test -- --run        pass, 128 tests across 12 files
npm run build            pass
git diff --check         pass
bounded #/finite-difference browser smoke pass
```

Administrator review found no open PRs. The push CI for the final commit completed successfully.

## Throughput note

The assignment was issued around `00:14Z` and the substantive implementation landed at `00:44Z`. The one-commit implementation diff touched 11 files and added roughly 428 lines while deleting roughly 45 lines, including 20 new tests over the prior 108-test baseline. This continues the pattern that nominal 90–120 minute slices are being completed in about half an hour.

Accordingly, the next task is intentionally broader and more research-heavy while remaining one coherent topic.
