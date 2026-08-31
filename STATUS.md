# Current Status

Last reconciled on 2026-09-01 after PR #1 (`ccc39d8e0b8a5c8cb83fa9bcf4d82672e30aa0f6`).

This file is the **current-state authority** for the repository. `ROADMAP.md` describes where the project should go; `IMPLEMENTATION_PLAN.md` is still useful as a dependency/design specification, but many of its checkboxes predate later implementation and must not be treated as the live task ledger.

## What already exists

### Build / verification foundation

- TypeScript + Vite + Vitest browser project.
- Strict type-check / test / production build scripts.
- GitHub Actions CI and a Pages deployment workflow.
- Deterministic state/event/replay primitives under `src/core/`.
- Golden carry fixtures under `fixtures/carry/`.
- The last recorded local verification (`docs/VERIFICATION.md`, 2026-08-29 UTC+8) reports typecheck, 32 tests, build, and `git diff --check` passing.

Changes since that verification checkpoint have been license/documentation/research-only. This status file does **not** substitute for running a fresh build after the next code change.

### Mechanism models already present

- decimal wheel;
- carry chain;
- carriage shift;
- difference-column / finite-difference stepping;
- revolution counter;
- stepped-drum conceptual model;
- pinwheel conceptual model;
- continuous integrator;
- shared mechanism core and trace/replay support.

These are not all historical geometric reconstructions. Several intentionally model functional behavior only.

### Exhibits / public UI already present

The current browser shell contains non-empty routes or views for:

- visible carry;
- finite differences;
- multiplication comparison;
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
- direct multiplication is now researched, but there is no direct-multiplication functional state model or exhibit path yet;
- key-driven computation is now researched, but there is no key-driven mechanism model yet;
- `research/curta-source-map.md` remains placeholder-level and needs manual/patent/model-specific provenance;
- `research/analytical-engine-information-flow.md` needs primary-source anchors and exact emulator provenance;
- `research/differential-analyzer.md` needs a stronger source chain;
- the simulator comparison matrix described in earlier planning still has not been created;
- subtraction, complement arithmetic, division, zeroing, correction, interlocks, and operator-error prevention remain underdeveloped;
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

1. **Implement direct multiplication as a functional model**, using the Steiger/Millionaire research to compare machine-encoded multiplication-table selection with operator-supplied repeated cranking.
2. **Implement a minimal key-driven accumulator model**, so `keypress → accumulate` becomes a first-class operation protocol without attempting a full Comptometer emulator.
3. **Write subtraction / division / control mechanisms**: complement arithmetic, crank direction/mode, carriage shifting, revolution counting, zeroing, correction, and interlocks.
4. **Create `research/simulator-matrix.md`** so prior-art inspection becomes explicit rather than scattered links.
5. **Upgrade named-machine source maps** for Curta, Analytical Engine, Difference Engine, and differential analyzer with manual/patent/drawing/museum/reconstruction locations at the precision claimed.
6. **Add cross-machine comparison layers** for representation, operator protocol, output/audit trail, and eventually reliability/torque/tolerance when evidence supports it.
7. **Only then deepen source-specific geometry/animation.** Do not reward visual detail unsupported by source detail.

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