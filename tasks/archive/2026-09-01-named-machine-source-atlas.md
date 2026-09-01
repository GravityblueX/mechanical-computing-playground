# Archived Agent Task — Named-machine source-anchor atlas

Status: completed
Assigned commit: `ad3c2a28c653e57013ce4d3deaa4b16133c347d8`
Completed commit: `c985fb6eb6ecbf3e80461d1a541a56f97730b3db`
Observed elapsed time: about 37 minutes (`08:13:06Z` → `08:50:30Z` on 2026-09-01)

## Delivered

The local coding/research agent completed the assigned Difference Engine No. 2 + Bush Differential Analyzer evidence-hardening slice and pushed it directly to remote `main`.

The checkpoint:

- directly anchored Babbage Papers records including the archive identity, `BAB/A/171`, printing/stereotype tracings, and notation records;
- separated Babbage-lifetime design records from the 1991/2002 Science Museum Difference Engine No. 2 reconstruction;
- directly inspected the Smithsonian Differential Analyzer object group plus input, adder/differential, integrator, tracer, and frontlash component roles;
- retained Bush 1931 as bibliographic-only after the bounded full-facsimile attempt rather than inventing page/figure claims;
- added `src/exhibits/source-atlas/` typed `supports[]` / `notEstablished[]` source anchors;
- added a bilingual `#/source-atlas` public surface and cross-links from relevant Difference Engine / continuous-computing material;
- reconciled `docs/RESEARCH_GAPS.md` so already-completed mechanism work is no longer presented as wholly missing;
- updated STATUS/TODO/teaching/verification documentation without turning `IMPLEMENTATION_PLAN.md` back into a live ledger.

## Size / throughput

Compared with the assignment commit, the implementation checkpoint changed 12 files with roughly 370 additions and 282 deletions. The test ledger moved from 208 tests across 18 files to 217 tests across 19 files.

The agent recorded passing:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

It also recorded bilingual local browser smoke for `#/source-atlas`, `#/finite-difference`, `#/continuous`, `#/mechanical-error-control`, and `#/about`.

After push, GitHub check runs for commit `c985fb6...` completed successfully:

- CI `verify` — success;
- Pages `build` — success;
- Pages `deploy` — success.

No open pull request remained.

## Review conclusion

Accepted. The result stays within the evidence contract: archive/catalog identity and catalogued subject are not converted into unsupported tooth counts, timing, force/load, manufacturing, or historical wiring. The modern Difference Engine reconstruction remains R/E2 rather than being merged with Babbage-lifetime H evidence; Bush component roles remain separate rather than being treated as proof of the repository's P/M `A+B → integrator → tracer` wiring.

The task finished well inside the one-hour target, consistent with several preceding 30–42 minute slices. The next task may therefore increase scope while keeping one coherent evidence question.