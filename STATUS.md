# Current Status

Last reconciled on 2026-09-01 after the Difference Engine provenance, hardened replay, and tabular-output slice.

This file is the **current-state authority** for the repository. `ROADMAP.md` describes where the project should go; `IMPLEMENTATION_PLAN.md` is still useful as a dependency/design specification, but many of its checkboxes predate later implementation and must not be treated as the live task ledger.

## What already exists

### Build / verification foundation

- TypeScript + Vite + Vitest browser project.
- Strict type-check / test / production build scripts.
- GitHub Actions CI and a Pages deployment workflow.
- Deterministic state/event/replay primitives under `src/core/`.
- Golden carry fixtures under `fixtures/carry/`.
- The latest local verification (`docs/VERIFICATION.md`, 2026-09-01 UTC+8) reports typecheck, 128 tests across 12 files, production build, diff check, and a local finite-difference/output-route smoke check passing.

Remote CI run `33437862103` passed for the previous operator-division checkpoint `7bebcea2d187f0ed2411de4098c846963df8b32a`. This status still does **not** substitute for CI on later commits.

### Mechanism models already present

- decimal wheel;
- carry chain;
- carriage shift;
- hardened difference-column / finite-difference stepping with state validation, derived arithmetic checks, fail-closed event replay, and row/output consistency;
- deterministic Difference Engine tabular-output teaching flow separating calculated values, persistent check-copy, and master/stereotype output roles;
- revolution counter;
- stepped-drum conceptual model;
- pinwheel conceptual model;
- direct-multiplication functional model with an inspectable encoded-multiple table, digit selection, operation cycles, carriage shifts, and replayable events;
- generic key-driven accumulator with place-value contribution, serialized carry, key-stroke cycles, and replayable events;
- generic operator-driven division with repeated subtraction, per-place quotient counts, overshoot, mandatory correction, carriage shift, and hardened replay;
- generic setting–crank interlock with explicit lock/phase transitions, invalid-action rejection, and hardened replay;
- generic continuous integrator with independent/input/integrated quantities, P/M inspection interval, ordered observation/advance events, safe numeric validation, and hardened replay;
- continuous-flow teaching chain with explicit adder relation and tracer-output boundary;
- shared mechanism core and trace/replay support.

These are not all historical geometric reconstructions. Several intentionally model functional behavior only.

### Exhibits / public UI already present

The current browser shell contains non-empty routes or views for:

- visible carry;
- interactive finite differences plus a separately stepped calculation→persistent-output responsibility flow;
- interactive multiplication comparison with event/cycle stepping for direct multiplication;
- interactive operator-division procedure for `8478 ÷ 314` with visible overshoot/correction;
- interactive setting–crank interlock lesson with a visible blocked setting attempt;
- Curta;
- interactive Analytical Engine P/M information flow for `(ab+c)d`, with Store/Mill/card roles, intermediate `p/q`, output, stepping, and hardened replay;
- interactive continuous mechanical integration workbench with A/B inputs, explicit sum, coordinate/integral phases, tracer output, stepping, reset, and evidence-layer text;
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
- `research/curta-source-map.md` now maps US 2,525,352 figures/architecture and specialist-hosted operator material, while exact manual edition/page/facsimile and production Type I/II revision mapping remain open;
- `research/analytical-engine-information-flow.md` now maps Menabrea/Lovelace, Charles and H. P. Babbage publications, catalogued Babbage Papers drawings, Walker reconstruction choices, and the repository's P/M boundary; exact facsimile/page mapping and source-specific geometry remain open;
- `research/differential-analyzer.md` now separates Bush 1931 publication metadata, Smithsonian surviving component roles, Shannon's interpretation path, later machine generations, and the repository P/M chain; full facsimile/page/figure inspection and physical geometry remain open;
- `research/difference-engine-source-map.md` now separates Difference Engine No. 1 design/fragment, No. 2 design and 1991/2002 reconstruction, BAB/A/173–176 drawing records, and built Scheutz printing engines; drawing-level geometry/timing and inaccessible Smithsonian detail remain open;
- `research/simulator-matrix.md` now records a bounded prior-art/reuse matrix, but several third-party license, stepping, and maintenance fields remain explicitly unverified;
- operator-driven division, generic correction, and a generic setting–crank interlock now exist, while source-specific subtraction geometry, complement procedures, zeroing, and machine-specific interlocks/operator-error prevention remain underdeveloped;
- `docs/REPRESENTATION_AND_PROTOCOL.md` now compares representation and operator protocol across six implemented lessons; output/audit-trail depth, commercial context, reliability/torque/tolerance, and source-specific geometry remain future work.

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

1. **Deepen subtraction/control provenance**: complement arithmetic, source-specific mode/counter behavior, zeroing, correction, and machine-specific interlocks without generalizing across families.
2. **Deepen Difference Engine and Differential Analyzer facsimile/page/figure anchors** before any source-specific geometry; the generation/source maps now exist.
3. **Deepen cross-machine comparison layers** beyond representation/protocol and the new Difference Engine output case: broader output/audit trail and eventually reliability/torque/tolerance when evidence supports it.
4. **Only then deepen source-specific geometry/animation.** Do not reward visual detail unsupported by source detail.

## External publishing state

GitHub Actions `Deploy Pages` run `33443320058` succeeded for `db3b1aa`, and <https://tmzncty.github.io/mechanical-computing-playground/> was directly reachable on 2026-09-01. Each newer commit still requires its own completed deployment before its routes are claimed live.

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
