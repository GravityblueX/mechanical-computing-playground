# Current Status

Last reconciled on 2026-09-01 after the human-machine arithmetic-work synthesis slice.

This file is the **current-state authority** for the repository. `ROADMAP.md` describes where the project should go; `IMPLEMENTATION_PLAN.md` is still useful as a dependency/design specification, but many of its checkboxes predate later implementation and must not be treated as the live task ledger.

## What already exists

### Build / verification foundation

- TypeScript + Vite + Vitest browser project.
- Strict type-check / test / production build scripts.
- GitHub Actions CI and a Pages deployment workflow.
- Deterministic state/event/replay primitives under `src/core/`.
- Golden carry fixtures under `fixtures/carry/`.
- The latest local verification (`docs/VERIFICATION.md`, 2026-09-01 UTC+8) reports typecheck, 208 tests across 18 files, production build, diff check, and bilingual browser smoke passing.

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
- direction-neutral ordinal rotary-carry scheduler with boundary/conditioning/strictly increasing transfer-slot/carry-out events and fail-closed replay;
- direct-multiplication functional model with an inspectable encoded-multiple table, digit selection, operation cycles, carriage shifts, and replayable events;
- generic key-driven accumulator with place-value contribution, serialized carry, key-stroke cycles, validated state, and fail-closed action-derived replay that rejects carry/event/final-state tampering;
- generic operator-driven division with repeated subtraction, per-place quotient counts, overshoot, mandatory correction, carriage shift, and hardened replay;
- generic setting–crank interlock with explicit lock/phase transitions, invalid-action rejection, and hardened replay;
- typed control-provenance profiles preserving source/model, H/R claim type, E1–E4 strength, documented roles, and explicit not-established boundaries;
- typed carry-provenance profiles separating Pascal/Felt, Odhner/Talamini, and Thomas 1820 patent/object, 1865, 1880 proposal, and R/E3 revision-history contexts;
- typed mechanical-error-control profiles separating Thomas inertia/load, Odhner/Talamini carry scheduling, and Bush frontlash/backlash-transmission responsibilities without pseudo-quantitative reliability fields;
- typed P/M operator-work profiles derived from existing multiplication, key-driven, division, and printing-ledger traces, with categorical counts and no scalar efficiency/productivity score;
- generic deterministic printing ledger separating working accumulator state from structured persistent ITEM/SUBTOTAL/TOTAL lines, including subtotal retention, total clearing, replay, and tamper rejection;
- typed output-contract profiles separating identified register-only/printing objects, primary total/subtotal patent semantics, and Difference Engine persistent-output roles;
- generic continuous integrator with independent/input/integrated quantities, P/M inspection interval, ordered observation/advance events, safe numeric validation, and hardened replay;
- continuous-flow teaching chain with explicit adder relation and tracer-output boundary;
- shared mechanism core and trace/replay support.

These are not all historical geometric reconstructions. Several intentionally model functional behavior only.

### Exhibits / public UI already present

The current browser shell contains non-empty routes or views for:

- visible carry with the existing interactive P/M chain, Pascaline/Felt profiles, one ordinal P/M schedule, and source-separated rotary versus Thomas stepped-drum carry/reliability sections;
- interactive finite differences plus a separately stepped calculation→persistent-output responsibility flow;
- interactive multiplication comparison with event/cycle stepping for direct multiplication;
- interactive operator-division procedure for `8478 ÷ 314` with visible overshoot/correction;
- interactive setting–crank interlock lesson with a visible blocked setting attempt and typed source-comparison cards for Thomas, Odhner, Felt/Tarrant, and Pascaline controls;
- interactive output-contract lesson exposing `+12, +8, SUBTOTAL, +5, TOTAL`, persistent record versus accumulator state, and source-separated register/listing/Difference Engine comparisons;
- Curta;
- interactive Analytical Engine P/M information flow for `(ab+c)d`, with Store/Mill/card roles, intermediate `p/q`, output, stepping, and hardened replay;
- interactive continuous mechanical integration workbench with A/B inputs, explicit sum, coordinate/integral phases, tracer output, stepping, reset, and a link to the documented frontlash responsibility;
- bilingual mechanical-error-control comparison preserving distinct Thomas, Odhner/Talamini, and Bush source/problem/control boundaries;
- bilingual arithmetic-work comparison showing what operators choose/repeat/shift/correct/request versus what mechanisms represent/execute/retain across four existing scenarios;
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

- carry maps now add Thomas 1820 patent/object separation, 1865 rapid overrun/sequential phasing/simultaneous-load false-result evidence, and the 1880 proposal versus R/E3 adoption boundary; exact Thomas and rotary production mapping, factory instructions/direct measurement, force/contact-load/material/lubrication/tolerance/wear/safe-rate/failure envelopes, and source-specific geometry remain open;
- direct multiplication now has a tested pedagogical functional state/event model and a fourth comparison path, but no source-specific Millionaire geometry is claimed;
- key-driven computation now has a tested generic P/M mechanism model, but simultaneous multi-column operation, correction, interlocks, and source-specific Comptometer geometry remain intentionally unmodeled;
- `research/curta-source-map.md` now maps US 2,525,352 figures/architecture and specialist-hosted operator material, while exact manual edition/page/facsimile and production Type I/II revision mapping remain open;
- `research/analytical-engine-information-flow.md` now maps Menabrea/Lovelace, Charles and H. P. Babbage publications, catalogued Babbage Papers drawings, Walker reconstruction choices, and the repository's P/M boundary; exact facsimile/page mapping and source-specific geometry remain open;
- `research/differential-analyzer.md` now adds directly inspected Smithsonian frontlash unit `1983.3002.04` / `nmah_693235` and separates integration mathematics, shaft transmission, backlash compensation, torque amplification, and output tracing; Bush 1931 full facsimile/page/figure inspection, exact placement/wiring, numerical backlash/residual error, and physical geometry remain open;
- `research/difference-engine-source-map.md` now separates Difference Engine No. 1 design/fragment, No. 2 design and 1991/2002 reconstruction, BAB/A/173–176 drawing records, and built Scheutz printing engines; drawing-level geometry/timing and inaccessible Smithsonian detail remain open;
- `research/simulator-matrix.md` now records a bounded prior-art/reuse matrix, but several third-party license, stepping, and maintenance fields remain explicitly unverified;
- `research/control-and-zeroing-source-map.md` now separates identified Thomas mode/counter/zeroing roles, Odhner US1510100 crank-home locking, Felt US960528 cancel/carry-strain recovery, Turck US1154897 immediate key actuation, and the Pascaline H/R complement boundary; source-specific geometry, uninspected Thomas instructions, partial-stroke correction, and production-revision mapping remain open;
- `research/output-and-audit-trail.md` and `#/output-contracts` now compare register-only output, identified printing/listing objects, US885202A subtotal/total semantics, and Difference Engine persistent-output roles; direct museum-page access, printer geometry, period office procedure, commercial context, and source-specific production mapping remain open;
- `research/human-machine-arithmetic-labor.md`, typed adapters, and `#/arithmetic-labor` now synthesize operator versus machine responsibility from existing tested traces; historical productivity/time/effort and source-specific workflows remain explicitly open;
- `docs/REPRESENTATION_AND_PROTOCOL.md` compares representation, operator protocol, and persistent-output/error-control responsibilities; reliability/torque/tolerance and source-specific geometry remain future work.

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

1. **Deepen carry/control sources only where exact evidence is available**: carry production mapping/force/tolerance data, Thomas instruction pages, partial-stroke correction, and source-specific geometry remain open after the completed family-separated provenance maps.
2. **Deepen Difference Engine and Differential Analyzer facsimile/page/figure anchors** before any source-specific geometry; the generation/source maps now exist.
3. **Deepen remaining cross-machine comparison layers** after the completed output-contract slice: commercial context and eventually reliability/torque/tolerance only when evidence supports them.
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
