# Archived Agent Task — Scheutz patent identity and operation evidence

Issued: 2026-09-02
Completed commit: `846c912a6140a672e09ed6ecbcb51ac2af7dbafa` (`research: reconcile Scheutz patent and operation evidence`)
Assignment commit: `11f31db20388be410eda8c59ed2eaf8bae6ca09b`

## Outcome

The slice completed successfully and stayed within the evidence boundary.

It directly established:

- *Journal of the Society of Arts*, vol. III no. 126, 20 April 1855, printed p. 393 as independent H/E1 contemporary-publication evidence identifying George and Edward Scheutz patent No. **2216**;
- Merzbach Appendix I's reproduced Patent Office specification as a separate reproduced-primary access layer also identifying No. 2216;
- Smithsonian drawing-set catalog `1988.0798.01` as still saying No. **2214**, preserved as a documented source discrepancy rather than silently corrected or called a typo;
- the original-period 1855 Royal Society committee report at printed pp. 499–509 as H/E1 evidence for what the committee examined/reported about table-making, difference orders/digit capacity, operation, lead/stereotype output, mathematical limits, and backward-print-order limitation;
- explicit separation of patent intent, surviving built object, ca. 1857 drawing set, contemporary examination, later Merzbach synthesis, Babbage lineage, DE2 reconstruction, and repository P/M behavior.

The typed source atlas and tests were reconciled around those layers. Existing finite-difference and output-contract claims required no source-driven semantic change.

## Throughput / verification

The completion landed about 34 minutes after assignment and changed 7 files, approximately `+79/-6` lines. The suite remained at 292 tests across 21 files.

Recorded local verification:

- `npm run typecheck` — pass
- `npm test -- --run` — pass, 292 tests across 21 files
- `npm run build` — pass
- `git diff --check` — pass
- focused source-atlas tests — pass
- bilingual browser smoke — pass for source-atlas / finite-difference / output-contracts / about

Post-push exact-head GitHub Actions were checked by the hourly reviewer:

- CI run `33539917100` — completed / success
- Deploy Pages run `33539914118` — completed / success

No open pull request remained.

## Remaining boundary exposed by this slice

The immediate Difference Engine/Scheutz value has shifted away from patent-number reconciliation. Remaining work is source-specific drawing/as-built revision mapping, printer timing, modern measured performance, the unexposed letter, manufacturing evidence, and physical envelopes; none should be invented from the newly inspected committee/patent texts.

This archive is a completion record, not a live task. See `CURRENT_AGENT_TASK.md` for the current assignment.
