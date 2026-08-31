# Current Status

Last reconciled on 2026-09-01 after the operator-driven division and simulator-matrix slice.

This file is the **current-state authority** for the repository. `ROADMAP.md` describes where the project should go; `IMPLEMENTATION_PLAN.md` is still useful as a dependency/design specification, but many of its checkboxes predate later implementation and must not be treated as the live task ledger.

## What already exists

### Build / verification foundation

- TypeScript + Vite + Vitest browser project.
- Strict type-check / test / production build scripts.
- GitHub Actions CI and a Pages deployment workflow.
- Deterministic state/event/replay primitives under `src/core/`.
- Golden carry fixtures under `fixtures/carry/`.
- The latest local verification (`docs/VERIFICATION.md`, 2026-09-01 UTC+8) reports typecheck, 65 tests across 9 files, production build, diff check, and a desktop division-route browser smoke check passing.

Remote CI for the current pull-request head still needs to complete; this status file does **not** substitute for checking that result.

### Mechanism models already present

- decimal wheel;
- carry chain;
- carriage shift;
- difference-column / finite-difference stepping;
- revolution counter;
- stepped-drum conceptual model;
- pinwheel conceptual model;
- direct-multiplication functional model with an inspectable encoded-multiple table, digit selection, operation cycles, carriage shifts, and replayable events;
- generic key-driven accumulator with place-value contribution, serialized carry, key-stroke cycles, and replayable events;
- generic operator-driven division with repeated subtraction, per-place quotient counts, overshoot, mandatory correction, carriage shift, and hardened replay;
- continuous integrator;
- shared mechanism core and trace/replay support.

These are not all historical geometric reconstructions. Several intentionally model functional behavior only.

### Exhibits / public UI already present

The current browser shell contains non-empty routes or views for:

- visible carry;
- finite differences;
- interactive multiplication comparison with event/cycle stepping for direct multiplication;
- interactive operator-division procedure for `8478 ÷ 314` with visible overshoot/correction;
- Curta;
- Analytical Engine information flow;
- continuous mechanical integration;
- hand-crank backpropagation;
- about / evidence explanation.

Some of these are substantially more complete as pedagogical software than as historical research exhibits.

### Backpropagation track already present

- Stage A linear model;
- Stage B 2→2→1 chain-rule model;
- analytic gradient tests;
- learning-rate stability / overshoot behavior;
- explicit phase machine;
- mechanical mapping layer;
- reverse-phase event exposure.

This remains a **counterfactual pedagogical machine**, not a historical reconstruction.

## Research/evidence work completed in the 2026-09-01 reconciliation

- `docs/EVIDENCE_POLICY.md` now separates claim type (`M/H/R/P`) from historical evidence strength (`E1–E4`).
- `docs/RESEARCH_GAPS.md` provides a prioritized mechanism/research queue.
- `research/carry-is-the-hard-part.md` now uses Pascaline sautoir and Comptometer/key-driven carry as concrete comparison cases.
- `research/multiplication-mechanisms.md` now covers repeated addition, stepped drum, pinwheel, and Otto Steiger / Millionaire direct multiplication.
- `research/key-driven-computation.md` opens the Comptometer-style `keypress → accumulate` track.
- `research/finite-difference-design.md` now separates mathematical facts from Babbage-specific historical claims.
- `docs/PRIOR_ART.md`, `docs/STRUCTURE_EVIDENCE.md`, README, ROADMAP, TODO, and AGENTS have been reconciled with the current implementation and evidence policy.

## Where the repository is currently weak

The main weakness is no longer “there is no code.” It is that **historical/mechanism provenance is still thinner than the implementation**.

The most important remaining gaps are:

- the current Pascaline / Comptometer carry note still needs more primary-source and model/revision-level anchors before source-specific geometry is drawn;
- direct multiplication now has a tested pedagogical functional state/event model and a fourth comparison path, but no source-specific Millionaire geometry is claimed;
- key-driven computation now has a tested generic P/M mechanism model, but simultaneous multi-column operation, correction, interlocks, and source-specific Comptometer geometry remain intentionally unmodeled;
- `research/curta-source-map.md` remains placeholder-level and needs manual/patent/model-specific provenance;
- `research/analytical-engine-information-flow.md` needs primary-source anchors and exact emulator provenance;
- `research/differential-analyzer.md` needs a stronger source chain;
- `research/simulator-matrix.md` now records a bounded prior-art/reuse matrix, but several third-party license, stepping, and maintenance fields remain explicitly unverified;
- operator-driven division and generic correction now exist, while source-specific subtraction geometry, complement procedures, zeroing, interlocks, and operator-error prevention remain underdeveloped;
- cross-machine representation (“where does the number live?”), output/audit trail, and human-machine arithmetic-labor comparisons are mostly future work.

See `docs/RESEARCH_GAPS.md` for the full queue.

## Evidence-policy state

The older A–D labels mixed together:

- direct artifact evidence;
- historical interpretation;
- mathematical facts;
- pedagogical abstractions.

Those are not one scale. New and edited research should follow `docs/EVIDENCE_POLICY.md`:

```text
M = mathematical / computational
H = historical record
R = reconstruction / engineering interpretation
P = pedagogical / counterfactual
```

Historical/reconstruction claims then receive `E1–E4` evidence strength separately. Existing A–D badges may remain temporarily in UI code for compatibility, but should not guide new research writing.

## Current highest-priority work

1. **Deepen subtraction/control provenance**: complement arithmetic, source-specific mode/counter behavior, zeroing, correction, and interlocks without generalizing across families.
2. **Upgrade named-machine source maps** for Curta, Analytical Engine, Difference Engine, and differential analyzer with manual/patent/drawing/museum/reconstruction locations at the precision claimed.
3. **Add cross-machine comparison layers** for representation, operator protocol, output/audit trail, and eventually reliability/torque/tolerance when evidence supports it.
4. **Only then deepen source-specific geometry/animation.** Do not reward visual detail unsupported by source detail.

## External publishing state

`docs/VERIFICATION.md` records that the Pages workflow built far enough to reach GitHub's Pages configuration boundary, but Pages was not enabled/configured for the repository at that checkpoint. Treat publishing as an external repository-setting task unless a later run proves that it has been enabled.

## Definition of the next good release

A useful next release is not “more routes.” It should connect three research findings to tested mechanism models:

- historically grounded carry comparison;
- multiplication comparison including direct multiplication;
- key-driven / human-operation comparison.

Each should connect:

```text
source evidence
→ claimed mechanism relationship
→ deterministic state model
→ visible operation trace
→ explicit simplification boundary
```

That is the point where the playground becomes more than a collection of clever simulations.
