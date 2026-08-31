# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: roughly 75–105 minutes
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-control-interlock-curta.md`.

The previous source-heavy slice still completed in about 34 minutes (roughly 544 additions / 28 deletions across 16 files, plus research, UI, tests and verification). This task is therefore intentionally substantial. Do not compensate by weakening provenance checks, copying an emulator, or inventing Analytical Engine details.

## Read before work

Fetch/pull remote `main`, then read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2 and the Analytical Engine source-map gap
6. `docs/PRIOR_ART.md`
7. `research/analytical-engine-information-flow.md`
8. `research/simulator-matrix.md`
9. `src/exhibits/analytical-engine-flow/index.ts`
10. the current `#/analytical-engine` rendering in `src/main.ts`
11. existing deterministic transition/replay patterns and tests
12. `docs/PUBLISHING.md` and `docs/VERIFICATION.md`

Do not use stale unchecked boxes in `IMPLEMENTATION_PLAN.md` as the live task source.

# Objective

Replace the current one-paragraph Analytical Engine note and five-line generic flow with an **evidence-aware, deterministic information-flow lesson** that can answer:

> Which claims come from nineteenth-century descriptions/drawings, which choices belong to later emulator reconstruction, and which event ordering is only this repository's teaching model?

At the same time, reconcile the repository's publishing status: a GitHub Actions `Deploy Pages` run for `db3b1aafdfdfa66db6998a14073f809af1f8433d` completed successfully (`33443320058`), so the older statement that Pages is still blocked by configuration is stale. Verify the actual public site before claiming a live URL.

This slice has four required parts and one optional early-finish part:

1. harden Analytical Engine provenance using historical publications and Science Museum Babbage Papers records;
2. replace the generic `sampleFlow` with a deterministic P/M teaching trace whose state/events expose Store, Mill, card roles and output without pretending to be a complete emulator;
3. make `#/analytical-engine` step through that trace with explicit provenance/simplification text and focused tests;
4. verify/reconcile Project Pages deployment state;
5. if all required work is genuinely complete early, add a bounded representation/operator-protocol comparison document rather than starting another machine implementation.

---

# Part A — replace `research/analytical-engine-information-flow.md`

The current file is a one-paragraph C/D-era placeholder. Replace it with a real source/provenance map under `docs/EVIDENCE_POLICY.md`.

## A1. Contemporary / historical sources

Use these as starting points. Do not merely list URLs; record what each source actually establishes and its limitations.

### Menabrea + Lovelace, 1842/1843 publication

Specialist-hosted transcription:

<https://www.fourmilab.ch/babbage/sketch.html>

Use it for concepts actually present in the text/notes, such as:

- Operation and Variable cards as distinct roles;
- Store/Variable columns and the separation of operations from subjects of operation;
- backing/repetition of card groups;
- the fact that the published diagrams/tables represent calculation sequences and substitutions.

Provenance rule: this page is a later transcription of a contemporary publication. Treat the nineteenth-century publication as H; the web transcription is an access path, not a facsimile/page citation. If exact typography/page numbering matters, leave it open rather than inventing it.

Do not copy Fourmilab's modern promotional claims (for example “first hacker”) into repository historical prose.

### Charles Babbage, 1864, `Passages from the Life of a Philosopher`, Chapter VIII

Specialist-hosted transcription:

<https://www.fourmilab.ch/babbage/lpae.html>

Use only claims supported there, including Babbage's own retrospective discussion of the Analytical Engine, Jacquard control, changing designs and intended capacities where relevant.

Again, record that the web page is a transcription/access route. Do not claim an exact page number unless you actually verify an edition/facsimile.

### H. P. Babbage, British Association paper, 1888

<https://www.fourmilab.ch/babbage/hpb.html>

This is particularly useful for a concrete information-flow example. It explicitly distinguishes Number Cards, Directive Cards and Operation Cards and walks `(ab + c)d` through Store → Mill → Store → output.

Use it carefully:

- H.P. Babbage is a historical published source reporting/explaining Charles Babbage's design after Charles's death;
- it is direct evidence for what H.P. Babbage reported, not automatically an original Charles Babbage drawing/specification;
- its card terminology/order must not be silently merged with John Walker's later emulator syntax.

Record paragraph/item anchors where practical (for example the sections around items 18–20 and the Store/Mill discussion) rather than vague “Babbage says” citations.

## A2. Science Museum Group — Babbage Papers drawings

Use collection records as E1 evidence that particular drawings/design sheets exist. Useful anchors include:

- `BAB/A/125`, *Plan of consecutive mill counting apparatus for General Plan 28*, 1843-12:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000267/plan-of-consecutive-mill-counting-apparatus-for-general-plan-28-plan-note>
- `BAB/D/028`, *Mill. Sheet 28. Superseded by Sheet 25*, dated 1858-06-12:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000376>
- `BAB/P/167`, *Plan of bolts for store*, second-phase drawings, 1858–1859:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000439>

The important historical lesson is **design evolution**. A drawing identifier/date establishes that a particular design record existed; it does not prove a complete Engine was built or that every phase used one frozen architecture.

Do not reproduce museum images into the repository merely because the collection page exposes them. Link/cite unless reuse is actually needed and licensing is checked separately.

## A3. Emulator/reconstruction provenance

Inspect John Walker/Fourmilab as a reconstruction/emulator lineage, not as a nineteenth-century primary source:

- authenticity discussion: <https://www.fourmilab.ch/babbage/authentic.html>
- programming card conventions: <https://www.fourmilab.ch/babbage/cards.html>
- web emulator behavior/stepping: <https://www.fourmilab.ch/babbage/emulator.html>

Record at least these distinctions:

```text
historical publication/drawing
vs
later interpretation/reconstruction
vs
emulator-specific card syntax/execution convention
vs
this repository's P/M teaching trace
```

The current repository must **not** copy Walker's instruction/card syntax or source code unless license/reuse terms are independently established. Link/inspect it to avoid inventing an instruction set.

## A4. Resolve the current ambiguity explicitly

The existing route says, roughly:

```text
operation card selected
→ control dispatch
→ one operand enters Mill
→ result returns to Store
→ output
```

That is too smooth and conflates several layers.

The new research note must explicitly discuss that nineteenth-century descriptions and Walker's emulator do not necessarily expose the same card categories/order at the same abstraction level. Do not declare one emulator sequence to be “the exact historical execution order” unless the source chain justifies it.

End the note with the exact **software abstraction decision** used in Part B.

---

# Part B — deterministic Analytical Engine information-flow trace

Refactor `src/exhibits/analytical-engine-flow/index.ts` from a static five-item label list into a small deterministic state/action/event/replay model or an equivalently testable immutable trace builder.

This is a P/M explanatory model **informed by historical card roles**, not a new Analytical Engine emulator.

## Default teaching calculation

Use the historically documented formula shape `(ab + c)d` from H. P. Babbage's 1888 explanation, with small concrete values so state is inspectable, for example:

```text
a = 2
b = 3
c = 4
d = 5

p = a*b = 6
q = p+c = 10
result = q*d = 50
```

The numeric values are this repository's P/M teaching fixture. Do not imply H. P. Babbage used those values.

## Minimum inspectable state

Represent at least:

- Store columns/locations used by the teaching fixture;
- the currently selected/active arithmetic operation or operation role;
- Mill ingress/operand state sufficient to show two operands becoming available;
- Mill result/egress state;
- current card **role** (`NUMBER`, `DIRECTIVE/TRANSFER`, `OPERATION`, or an explicitly simplified repository vocabulary);
- output/printed-result state;
- event/card index and deterministic sequence identity.

Do not pretend that modern JavaScript map/object layout is historical Store geometry.

## Event/trace requirements

The trace must make visible, in ordered state/events:

1. given values become associated with Store locations;
2. operands are transferred from Store toward the Mill;
3. an arithmetic operation is selected/performed;
4. intermediate result `p=6` is stored;
5. `p` and `c` flow back into the next operation;
6. intermediate result `q=10` is stored;
7. `q` and `d` flow into the final multiplication;
8. result `50` is stored and then sent to an output role.

You may group micro-events if the grouping is explicit and deterministic. Do not invent cams, axes, card hole patterns, timing, or an exact historical instruction encoding.

A teaching event may carry `sourceRole` / `claimType` metadata if that improves inspection, but keep the core reasonably small.

## Replay/invariants

Use existing repository replay discipline:

- same initial state + ordered events produces the same final state;
- derived arithmetic and Store/Mill transitions are validated rather than trusted from arbitrary serialized event fields;
- invalid Store locations, missing operands, impossible operation order, sequence tampering, or final-state tampering are rejected where applicable;
- use safe integers / explicit validation for fixture values.

Do not over-engineer a general-purpose card interpreter.

---

# Part C — `#/analytical-engine` teaching integration

Upgrade the existing route without a broad site redesign.

Minimum visitor affordances:

- reset;
- step one event/card-role transition;
- optionally step one higher-level operation if this is easy with existing patterns;
- show Store values as named/numbered teaching locations;
- show Mill inputs/current operation/result;
- show current card role and ordered event log;
- show output state;
- bilingual text remains functional;
- keyboard access for the main step control if consistent with current exhibit patterns;
- no meaning only in motion/color.

The route must visibly state:

- `(ab+c)d` is based on a documented historical explanatory formula shape, while `2,3,4,5` is a P/M fixture;
- Store/Mill/card roles have historical sources;
- this exact serialized event model is P/M;
- Walker/Fourmilab is a later emulator/reconstruction and its syntax/order is not silently adopted as primary evidence;
- modern words such as CPU/memory may be analogies, not identities.

If the old five-step `sampleFlow` is removed, update imports/usages cleanly rather than keeping two contradictory flow models.

## Required tests

Add focused Vitest coverage for at least:

1. default trace reaches `50` through `p=6` and `q=10` rather than a single hidden expression evaluation;
2. Store locations contain the expected intermediate values at the correct stages;
3. Mill must receive the required operands before an operation can complete;
4. final output is not populated before the final Store/Mill/result step;
5. same input fixture produces identical state/events;
6. replay reproduces final state;
7. replay/transition rejects sequence tampering;
8. replay rejects altered transfer/result values or impossible operation ordering;
9. invalid fixture/store references are rejected explicitly;
10. source/claim metadata, if part of state/events, cannot be used to smuggle arbitrary arithmetic state.

Do not introduce a new browser-testing framework solely for this task.

---

# Part D — Project Pages reconciliation

Repository history previously said Pages was blocked by repository configuration. That is no longer sufficient: GitHub Actions `Deploy Pages` run `33443320058` for `db3b1aa` completed successfully.

During this slice:

1. inspect the current Pages workflow and repository base path;
2. determine the expected live Project Pages URL from actual repository/deployment information, not guesswork if GitHub exposes it;
3. attempt a direct browser/HTTP smoke check of the deployed page;
4. if reachable, smoke at least `/mechanical-computing-playground/` plus hash routes `#/controls` and `#/analytical-engine` after the new build lands;
5. if reachable and correct, update `docs/PUBLISHING.md`, `STATUS.md`, README if appropriate, and `docs/VERIFICATION.md` with the live URL and checks actually performed;
6. if the deployment workflow is green but the public URL cannot be verified from the available environment, record exactly that narrower state. Do not revert to saying “Pages is not configured,” and do not invent a successful live smoke check.

Do not change publishing architecture merely because verification is inconvenient.

---

# Part E — optional early-finish work

Only if Parts A–D, tests, build, deployed-site check, documentation reconciliation, commit and push are genuinely complete with substantial time remaining, create a bounded `docs/REPRESENTATION_AND_PROTOCOL.md`.

Use only already-supported repository families and sources. Compare no more than these axes:

```text
where input is represented
where working numeric state lives
what human action triggers computation
where operation/control state lives
what must remain invariant/locked
where output becomes persistent/visible
claim type + source boundary
```

Good candidate rows are Pascaline, stepped-drum/pinwheel generic family, key-driven/Comptometer-informed model, direct-multiplication/Millionaire-informed model, Curta, Analytical Engine, and the existing continuous-integrator teaching line.

A row may contain explicit `open/unverified` cells. Do not smooth over missing provenance.

Do **not** start Differential Analyzer implementation/source-map hardening in the same slice if this optional document is completed.

---

# Documentation reconciliation

After implementation/research/tests are real:

- archive/supersede the old one-paragraph analytical-engine claims through the new research note;
- update `STATUS.md` to reflect the hardened Analytical Engine source map/trace and current Pages state;
- update `TODO.md` only for genuinely completed Analytical Engine work;
- update `research/simulator-matrix.md` if the Walker stepping/internal-state facts are now directly verified;
- update `docs/VERIFICATION.md` with commands/results actually run and test count;
- update README / `docs/TEACHING_PATH.md` only if the route's interaction materially changed;
- keep ROADMAP changes minimal.

## Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a bounded browser smoke check of `#/analytical-engine` locally. If the public Pages site is verifiable, also smoke the deployed route after the new commit is deployed; clearly distinguish local from deployed checks.

One coherent checkpoint is fine. A research commit followed by implementation/docs is also fine if all required work is pushed before stopping.

After push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: ground Analytical Engine information flow
```

# Evidence / stop conditions

Stop and leave a precise blocker rather than guessing if:

- sources disagree about card categories/order at the precision needed for a UI statement; preserve the disagreement and keep the P/M trace abstract;
- a Science Museum drawing record establishes existence but not the mechanical relationship you want to claim;
- exact Fourmilab code/card syntax would be needed to proceed; do not copy it without verified reuse terms;
- implementing the lesson starts turning into a complete Analytical Engine emulator;
- source-specific Mill/Store geometry is required for the visualization;
- a concurrent implementation of the same Analytical Engine track lands on remote `main`;
- shared replay changes would require a broad incompatible migration.

The intended result is not “more Babbage lore.” It is a tested exhibit where a visitor can distinguish **historical card/Store/Mill roles, later emulator interpretation, and this repository's own teaching event model** while watching a real intermediate-value flow emerge step by step.