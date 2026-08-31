# TODO

`STATUS.md` is the current-state authority. This file is intentionally short and should contain only the next bounded tasks.

## Next up

- [ ] Migrate new/edited research notes to the two-axis policy in `docs/EVIDENCE_POLICY.md`; do not extend the old A–D scale into new domains.
- [x] Add a direct-multiplication functional model based on the Steiger / Millionaire source map in `research/multiplication-mechanisms.md`.
- [x] Extend the multiplication comparison so it contrasts **operator-supplied repetition** with **mechanically encoded multiplication-table selection**.
- [x] Add a minimal key-driven computation model after `research/key-driven-computation.md`, without attempting a full Comptometer emulator.
- [x] Write `research/subtraction-and-division.md`: complements, reverse crank/mode changes, repeated subtraction, carriage/revolution-counter workflow, and machine-specific uncertainty.
- [x] Write `research/simulator-matrix.md` for Difference Engine, Analytical Engine, Curta, stepped-drum/pinwheel calculators, and strong online reconstructions.
- [x] Expand `research/curta-source-map.md` from a pointer list into model/revision + manual/patent/page-level provenance.
- [x] Expand `research/analytical-engine-information-flow.md` with historical publication/drawing anchors, explicit Walker emulator provenance, and a tested P/M Store/Mill trace.
- [x] Strengthen `research/differential-analyzer.md`, harden the continuous integrator/flow replay model, and add the evidence-aware workbench.
- [x] Add a tested generic setting–crank interlock lesson and harden Curta provenance.
- [x] Re-run typecheck/tests/build for the control/interlock code change and update `docs/VERIFICATION.md`.
- [x] Add `docs/REPRESENTATION_AND_PROTOCOL.md` across the six currently supported machine/lesson families.

## Repository maintenance

- [ ] Keep README / ROADMAP / STATUS synchronized when a mechanism becomes genuinely implemented or a historical claim becomes source-backed.
- [x] Verify GitHub Project Pages deployment and record the live URL; continue checking each newer deployment before claiming it live.

## Guardrails

- Core state remains the source of truth; animation consumes phases/events.
- Do not start 3D/physics work before a mechanism has a tested discrete or explicitly continuous model.
- Do not rewrite a mature whole-machine emulator without a mechanism-level explanatory increment.
- Do not treat a patent as proof that a feature was manufactured exactly as drawn; distinguish intended design, surviving artifact, reconstruction, and teaching model.
- Do not call a mathematical fact “historical evidence grade A.” Use `docs/EVIDENCE_POLICY.md`.
- Add a machine only when it introduces a new mechanism, representation, operator protocol, or evidence question.