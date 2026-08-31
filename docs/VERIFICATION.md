# Verification record

## 2026-09-01 — encoded table and key-driven accumulator

The direct-multiplier now stores an inspectable immutable table for digits `0..9`, and digit selection reads that represented control state. The generic P/M key-driven accumulator exposes key-stroke begin/end, place-value contribution, digit advances, serialized carries, human-operation count, determinism, and replay. The About view compares `SET_VALUE → CRANK` with `KEY_STROKE → ACCUMULATE` without claiming source-specific Comptometer geometry or timing.

- `npm run typecheck` — pass
- `npm test -- --run` — pass, 51 tests
- `npm run build` — pass
- `git diff --check` — pass

## 2026-09-01 — direct multiplication functional model (rebased integration)

After integration with the encoded-table and key-driven-accumulator work, the direct-multiplication slice provides deterministic digit-selection, operation-cycle, carriage-shift, accumulator, and replay events; a fourth path in the `314 × 27` comparison; full table/derived-value/order validation for replay; and an event/cycle-steppable bilingual workbench.

- `npm run typecheck` — pass
- `npm test` — pass, 54 tests across 8 files
- `npm run build` — pass
- `git diff --check` — pass

Browser smoke checks against the local Vite server and headless Chrome 151:

- desktop `1280 × 900` and mobile `390 × 844` layouts have no horizontal document overflow;
- single-event stepping exposes selector `7` and selected multiple `2198` without changing the accumulator;
- completing cycle one reaches accumulator `2198` at event `2 / 5`;
- completing cycle two reaches accumulator `8478` at event `5 / 5` and disables further step/cycle controls;
- English/Chinese switching preserves replay state; reset restores event `0 / 5` and accumulator `0`;
- no page/runtime JavaScript errors were observed (the existing absent favicon request is ignored).

The implementation is explicitly a claim-type P functional model informed by Steiger/Millionaire research. It does not claim source-specific cams, gears, control-plate geometry, timing, or dimensions.

## 2026-09-01 — documentation/research reconciliation

PR #1 (`docs: reconcile status and deepen mechanism research map`) changed documentation/research only; no TypeScript/runtime/test files were modified.

GitHub Actions CI run `33423493938` completed successfully for PR head `4289caeee1c2b67903afa853946c95faca8e57df`:

- `npm ci` — pass
- `npm run typecheck` — pass
- `npm test` — pass
- `npm run build` — pass

The PR was squash-merged as `ccc39d8e0b8a5c8cb83fa9bcf4d82672e30aa0f6`.

Follow-up `STATUS.md` reconciliation is documentation-only. No new browser behavior was introduced in this pass, so browser interaction smoke results below remain the last recorded manual browser check rather than being falsely re-dated.

## 2026-08-29 — local / browser checkpoint (UTC+8)

### Local

- `npm run typecheck` — pass
- `npm test -- --run` — pass, 32 tests
- `npm run build` — pass
- `git diff --check` — pass
- repository was clean after each published checkpoint

### Browser smoke checks

- `/` overview renders navigation cards.
- `#/visible-carry`: stepping from event 1 to 9 produces `0100`; reset returns `0099`.
- `#/finite-difference`: square/cubic presets and crank controls render state and update order.
- `#/multiplication`, `#/curta`, `#/analytical-engine`, `#/continuous`, `#/hand-crank-backprop`, and `#/about` render non-empty explanatory pages.
- Space key advances visible carry when that route is active.

### Remote publishing

CI for commit `30b3f16` completed successfully. Pages build jobs completed far enough to reach GitHub's Pages configuration step, but GitHub's `configure-pages` action failed because Pages was not enabled/configured for this repository at that checkpoint.

This was an external repository setting/API boundary, not a source build failure. The workflow remains explicit and should be re-tested once Pages is enabled/configured.

## Current limitations

- The site uses hash routes so static Project Pages hosting does not require server-side rewrites.
- Curta, Difference Engine, continuous integration, and hand-crank backprop views contain pedagogical/operational abstractions where appropriate; they do not claim 1:1 historical geometry.
- The 2026-09-01 reconciliation improves research/evidence boundaries but does not constitute a new manual browser smoke pass.
- Pages live deployment still requires confirmation after repository settings are enabled/configured.
- After the next runtime/code change, run typecheck/tests/build again and perform browser smoke checks for affected routes.
