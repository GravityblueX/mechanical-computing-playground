# Current Status

Last reconciled against `main` at commit `71a143920c4600395a3542b2e3a14df88d1b40c9` on 2026-09-01.

This file is the **current-state authority** for the repository. `ROADMAP.md` describes where the project should go; `IMPLEMENTATION_PLAN.md` is still useful as a dependency/design specification, but many of its checkboxes predate later implementation and must not be treated as the live task ledger.

## What already exists

### Build / verification foundation

- TypeScript + Vite + Vitest browser project.
- Strict type-check / test / production build scripts.
- GitHub Actions CI and a Pages deployment workflow.
- Deterministic state/event/replay primitives under `src/core/`.
- Golden carry fixtures under `fixtures/carry/`.
- The last recorded local verification (`docs/VERIFICATION.md`, 2026-08-29 UTC+8) reports typecheck, 32 tests, build, and `git diff --check` passing.

The commits after that verification checkpoint are license/documentation-only. This status file does **not** substitute for running a fresh build when code changes again.

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

## Where the repository is currently weak

The main weakness is no longer “there is no code.” It is that **historical and mechanism research is much thinner than the implementation**.

Several files under `research/` are still short design notes rather than source maps. In particular:

- `research/carry-is-the-hard-part.md` needs concrete historical carry architectures;
- `research/multiplication-mechanisms.md` needs primary/museum evidence and currently misses direct multiplication;
- `research/curta-source-map.md` is only a placeholder-level source map;
- `research/analytical-engine-information-flow.md` needs primary-source anchors and exact emulator provenance;
- `research/differential-analyzer.md` needs a stronger source chain;
- a simulator comparison matrix described in older plans has not been created;
- the repository lacks a focused treatment of key-driven adding machines such as the Comptometer;
- subtraction, complement arithmetic, division, zeroing, correction, interlocks, and operator-error prevention are underdeveloped.

See `docs/RESEARCH_GAPS.md` for the prioritized research queue.

## Evidence-policy problem being corrected

The original A–D labels mixed together several different things:

- direct artifact evidence;
- historical interpretation;
- mathematical facts;
- pedagogical abstractions.

Those are not one scale. `docs/EVIDENCE_POLICY.md` now separates **claim type** from **historical evidence strength**. Existing A–D badges may remain in the UI for compatibility, but new research notes should follow the two-axis policy and avoid calling a mathematical theorem “grade A” merely because it is well established.

## Current highest-priority work

1. **Reconcile documentation with implementation.** Stop using stale plan checkboxes as the current task source.
2. **Strengthen carry research.** Use the Pascaline sautoir and later key-driven carry designs as concrete cases instead of treating carry only as an abstract event chain.
3. **Expand multiplication architecture.** Compare repeated-addition stepped-drum and pinwheel machines with true direct-multiplication machines such as Otto Steiger's Millionaire.
4. **Add key-driven computation.** The Comptometer changes the human-machine protocol: pressing a key both selects and enters a digit, rather than separating number setting from a later crank.
5. **Write subtraction / division / control mechanisms.** Complement arithmetic, crank direction, carriage shifting, zeroing, correction, and interlocks are computation, not UI trivia.
6. **Upgrade named-machine source maps.** Curta, Analytical Engine, Difference Engine, and differential analyzer claims should cite manuals, patents, drawings, museum records, or scholarly reconstructions at the precision claimed.
7. **Only then deepen geometry/animation.** Do not reward visual detail unsupported by source detail.

## External publishing state

`docs/VERIFICATION.md` records that the Pages workflow built far enough to reach GitHub's Pages configuration boundary, but Pages was not enabled/configured for the repository at that checkpoint. Treat publishing as an external repository-setting task unless a later run proves that it has been enabled.

## Definition of the next good release

A useful next release is not “more routes.” It should make three existing strengths academically trustworthy:

- one historically grounded carry comparison;
- one historically grounded multiplication comparison including direct multiplication;
- one key-driven / human-operation comparison.

Each should connect:

```text
source evidence
→ claimed mechanism relationship
→ deterministic state model
→ visible operation trace
→ explicit simplification boundary
```

That is the point where the playground becomes more than a collection of clever simulations.