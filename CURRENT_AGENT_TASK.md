# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-scheutz-patent-operation.md`.

The previous assignment landed as `846c912a6140a672e09ed6ecbcb51ac2af7dbafa` about 34 minutes after assignment, changed 7 files (about `+79/-6`), retained 292 tests across 21 files, and passed exact-head CI `33539917100` plus Deploy Pages `33539914118`. Because the agent again completed a real source/atlas slice comfortably under one hour, this assignment is slightly broader: try to close both the **1931 construction-paper** and **1941 mathematical-theory** access gaps for the Differential Analyzer, then reconcile only the evidence relationships actually supported.

> **Question for this slice:** what can be established directly from Bush's 1931 construction paper and Shannon's 1941 mathematical-theory paper, and how should those sources be separated from the already-inspected Bush–Caldwell application paper, surviving Smithsonian components, later analyzer generations, and the repository's P/M continuous-flow model?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0.2, Priority 6, Priority 8 and `Files to deepen next`
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-01-de2-differential-analyzer-publication-precision.md`
8. `research/differential-analyzer.md`
9. `research/mechanical-error-control.md` or the current error-control note only where it touches Bush frontlash/torque responsibilities
10. `src/exhibits/source-atlas/` and `tests/source-atlas.test.ts`
11. `src/exhibits/continuous-flow/`, `src/mechanisms/continuous-integrator/`, and their tests only to preserve current P/M boundaries

Run current-main typecheck/tests before editing and record the actual baseline. Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as the task source.

# Part A — retry and directly inspect Shannon 1941 full text

The current note records Shannon 1941 as bibliographic-only because the publisher PDF previously returned an access challenge. Retry from the canonical publication route instead of trusting that old access result:

Claude E. Shannon, “Mathematical Theory of the Differential Analyzer,” *Journal of Mathematics and Physics* 20 (April 1941), printed pp. **337–354**.

DOI:

<https://doi.org/10.1002/sapm1941201337>

Publisher PDF route currently discoverable from Wiley:

<https://onlinelibrary.wiley.com/doi/pdf/10.1002/sapm1941201337>

The existence of a URL is not enough. **Actually inspect the full text/page images or rendered text.** If it is still blocked in the local agent environment, preserve the access failure and do not create page claims from snippets/search results.

## A1. If full text is directly inspectable

Record exact printed-page anchors for only the claims directly useful to this repository. Focus on questions such as:

- how Shannon mathematically characterizes the class/capabilities of differential-analyzer systems;
- what kinds of machine elements/functional relations the paper treats abstractly;
- what assumptions or restrictions the theory states;
- whether the theory distinguishes mathematical interconnection/representation from one particular physical geometry;
- what the paper does **not** provide as construction evidence.

Do not force modern software vocabulary onto Shannon. Do not use this paper as evidence for the exact geometry of Smithsonian parts or the browser's discrete inspection phases.

Evidence boundary:

- directly inspected Shannon text = **H/E1 for what Shannon published in 1941**;
- mathematical statements proved/derived in the paper may also be discussed as **M**, but keep publication evidence and mathematical truth conceptually separate;
- interpretation connecting Shannon's theory to modern reconstruction/browser models is **R/P**, not automatically H/E1.

Use minimal quotation; paraphrase with exact pages.

## A2. If full text remains inaccessible

Do not spend the full hour defeating publisher access. Record the exact access result in `research/differential-analyzer.md`, keep Shannon bibliographic-only, and continue Parts B–F. Do not backfill page claims from later citations.

# Part B — try to directly inspect Bush 1931 construction paper

The largest remaining Differential Analyzer source gap is still the primary construction paper:

Vannevar Bush, “The Differential Analyzer. A New Machine for Solving Differential Equations,” *Journal of the Franklin Institute* 212 no. 4 (October 1931), printed pp. **447–488**.

DOI:

<https://doi.org/10.1016/S0016-0032(31)90616-9>

Known bibliographic institutional anchor:

Smithsonian Libraries catalogs the MIT offprint as *Publications of the Massachusetts Institute of Technology* no. 865, October 1931, pp. 447–488.

The task is to find a **lawfully accessible full facsimile or institutional full-text scan** and actually inspect it. Search independently; do not treat commercial rare-book descriptions, later historical summaries, or isolated quotations as substitutes for the paper.

## B1. If a full facsimile is directly inspectable

Extract exact page/figure anchors only for responsibilities relevant to existing repository claims. Candidate questions—not pre-approved answers—include:

- what Bush says about the integrator and its role;
- what he says about torque/amplification and why it is needed;
- how units are connected/configured for a problem;
- what input/output or curve-following/tracing roles are described;
- what limitations/error/backlash/accuracy issues are explicitly discussed;
- what generation/configuration the paper actually describes.

Do **not** infer missing dimensions, complete shaft routing, material/tolerance values, safe operating rate, or modern reliability probabilities unless the paper directly provides them.

Keep exact page and figure identifiers. If a figure is used, state what the caption/text establishes rather than reverse-engineering hidden geometry from the image.

Evidence boundary:

- Bush 1931 full paper = **H/E1 for Bush's contemporary published construction/operation account**;
- it is not automatically direct measurement of every surviving Smithsonian component;
- it does not apply unchanged to the later Rockefeller/new-type analyzer;
- if Bush gives estimates/qualitative performance claims, distinguish author report from independently measured benchmark evidence.

## B2. If the full paper cannot be directly inspected

Preserve the bibliographic-only boundary and document which canonical/institutional routes were attempted. Do not freeze any page/figure claim from secondary quotation.

Do not let failure on B stop the whole slice if Shannon or another required reconciliation can still progress.

# Part C — reconcile the source generations and roles

Update `research/differential-analyzer.md` only for evidence actually obtained in Parts A/B.

The note should make these layers visibly distinct:

```text
ca. 1930 surviving Smithsonian component records = H/E1 object/catalog roles
Bush 1931 construction paper = H/E1 only if directly inspected; otherwise bibliographic-only
Bush & Caldwell 1931 Thomas-Fermi application = H/E1 application/checking paper already directly inspected
Shannon 1941 mathematical theory = H/E1 at inspected page precision if full text is now readable; otherwise bibliographic-only
later Rockefeller / Bush–Caldwell 1945 machine = separate generation
modern engineering/history interpretation = R at cited precision
repository continuous integrator/flow = P/M
```

Required boundary statements:

- an application schematic is not a construction drawing;
- a mathematical theory paper is not a physical geometry source;
- surviving component catalogs do not prove the browser's exact interconnection;
- later analyzer generations do not silently fill gaps in the ca. 1930 machine;
- frontlash compensation and torque amplification remain separate responsibilities unless a directly inspected source explicitly relates them;
- repository discrete phases/sample interval remain P/M inspection choices, not historical timing.

If Bush 1931 becomes directly inspectable, replace only the old “bibliographic-only” statements that are now genuinely obsolete. If Shannon remains blocked, leave its boundary honest.

# Part D — typed source-atlas reconciliation

Use the existing `src/exhibits/source-atlas/` data model; do not create a new evidence structure.

For the Differential Analyzer track, make visitors able to distinguish, at minimum:

1. surviving Smithsonian component/object layer;
2. Bush 1931 construction-publication layer;
3. Bush–Caldwell 1931 application/checking layer;
4. Shannon 1941 mathematical-theory layer;
5. later-generation boundary;
6. repository P/M continuous-flow behavior.

Only create page/figure metadata for sources actually inspected. If Bush or Shannon remains blocked, encode that limitation rather than pretending inspection happened.

Do not create one card per access mirror. Preserve canonical source identity separately from access host where the existing schema supports it.

## Required tests

Update `tests/source-atlas.test.ts` or the nearest existing evidence tests to lock in relationships, not punctuation. At least cover:

- construction-publication role is distinct from the already-inspected application-paper role;
- mathematical-theory role is distinct from physical component/construction roles;
- later analyzer generation is not used to fill original-machine geometry;
- `supports` / `notEstablished` prohibit exact shaft routing, geometry, timing, torque/error numbers, or browser-phase identity unless directly supported;
- repository P/M flow remains separate from H/R source anchors;
- if full-text access remains blocked for either source, no false `fullFacsimileInspected: true` or fake page/figure anchors are introduced.

# Part E — bounded continuous-flow/error-control cross-check

Inspect the existing public wording for:

```text
#/continuous
#/mechanical-error-control
#/source-atlas
#/about
```

Ask only:

> Does newly inspected Bush 1931 or Shannon 1941 evidence require a small correction to the existing boundary between integration mathematics, component roles, frontlash, torque amplification, and the P/M browser flow?

If yes, make the smallest source-backed correction and add a focused test if semantics change. If no, leave runtime mechanism code alone.

Do not turn this into a physical Differential Analyzer emulator, torque model, stochastic error simulator, or new 3D route.

# Part F — reconciliation and verification

After real source work:

- update `STATUS.md` only for source precision actually gained;
- add one concise completed line to `TODO.md`;
- narrow `docs/RESEARCH_GAPS.md` only where a stated gap genuinely closes;
- update `docs/VERIFICATION.md` with actual baseline/final test counts and checks;
- do not re-date unrelated browser checks or copy stale counts.

If atlas/UI data changes, perform bilingual browser smoke at least for:

```text
#/source-atlas
#/continuous
#/mechanical-error-control
#/about
```

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

All must pass.

The finished slice should answer, from directly inspectable evidence or explicit access boundaries:

> What does Bush 1931 directly establish about the construction/operation responsibilities of the original Differential Analyzer, and what remains uninspected or unmeasured?

> What does Shannon 1941 directly establish at the mathematical/system level, and why is that not a geometry source?

> How do Bush construction, Bush–Caldwell application, Shannon theory, surviving components, later generations, and repository P/M flow remain separate in the atlas?

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect exact-head push CI and Deploy Pages when they complete and record only completed outcomes;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: deepen differential analyzer primary sources
```

# Evidence boundaries

- directly inspected Bush 1931 full paper: **H/E1 at page/figure precision actually inspected**;
- Bush 1931 bibliographic record only, if full text remains unavailable: H bibliographic identity only; no page/figure mechanism claims;
- Bush–Caldwell 1931 application facsimile: existing **H/E1 application/checking evidence**, not construction geometry;
- directly inspected Shannon 1941 full text: **H/E1 for the published text**, with mathematical claims separately identifiable as M;
- Shannon bibliographic metadata only, if access remains blocked: no equation/page/figure claims;
- Smithsonian component records: **H/E1 object/catalog precision**;
- later Rockefeller/1945 analyzer: separate generation;
- repository continuous flow/integrator: **P/M**.

# Stop conditions

Stop a source subpart and preserve the boundary instead of guessing if:

- only snippets, commercial descriptions, or later quotations are accessible;
- a PDF URL exists but the actual article pages cannot be inspected;
- page/figure identity cannot be established;
- a source image invites reverse engineering not supported by caption/text;
- exact torque, backlash, error, tolerance, speed, or geometry claims would require data not present in the inspected source;
- source-atlas changes would require broad routing/layout refactors;
- work starts expanding into the Rockefeller analyzer, electronic analog computing generally, or a physics simulation.

If Parts A–D complete substantially before one hour, use remaining time to tighten exact page/figure anchors and boundary-focused tests, or inspect one additional **contemporary, directly readable** source cited by Bush/Shannon that clarifies an existing responsibility. Do not start a new machine family.
