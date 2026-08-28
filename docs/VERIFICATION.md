# Verification record

Checked 2026-08-29 (UTC+8).

## Local

- `npm run typecheck` — pass
- `npm test -- --run` — pass, 32 tests
- `npm run build` — pass
- `git diff --check` — pass
- repository is clean after each published checkpoint

## Browser smoke checks

- `/` overview renders navigation cards.
- `#/visible-carry`: stepping from event 1 to 9 produces `0100`; reset returns `0099`.
- `#/finite-difference`: square/cubic presets and crank controls render state and update order.
- `#/multiplication`, `#/curta`, `#/analytical-engine`, `#/continuous`, `#/hand-crank-backprop`, and `#/about` render non-empty explanatory pages.
- Space key advances visible carry when that route is active.

## Remote

CI for commit `30b3f16` completed successfully. Pages build jobs complete successfully, but GitHub's `configure-pages` action currently fails before artifact/deploy because Pages is not enabled/configured for this repository. This is an external repository setting/API boundary, not a source build failure. The workflow remains explicit and deployable once Pages is enabled.

## Limitations

The site uses hash routes so static Project Pages hosting does not require server-side rewrites. Curta, Difference Engine, continuous integration, and hand-crank backprop views are labeled pedagogical/operational abstractions where appropriate. No 3D physics or historical geometric fidelity is claimed.
