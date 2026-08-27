# TODO

## Next up

- [x] Define the M0 decimal wheel / carry-chain state model (`docs/MODEL.md`).
- [x] Implement deterministic `+1` crank logic with serializable phases and carry events.
- [x] Add local executable tests for ordinary increment, chained carry, carry-out, invalid state, and replay.
- [ ] Add a small TypeScript build/type-check setup without introducing a runtime dependency.
- [ ] Build `demos/visible-carry/` as a state-driven browser exhibit.
- [ ] Add carriage-shift state and tests before starting multiplication mechanisms.
- [ ] Add a source-backed finite-difference mechanism note and testable column model.
- [ ] Keep historical claims and pedagogical abstractions explicitly separated.

## Guardrails

- Core state remains the source of truth; animation must consume phases/events.
- Do not start a 3D physics implementation before a mechanism has a tested discrete model.
- Do not rewrite a mature existing machine emulator without a clear mechanism-level increment.
