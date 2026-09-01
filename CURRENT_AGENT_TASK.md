# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-thomas-register-lifecycle.md`.

The previous assignment landed as `540ba69f4bbbba01a417cb709b96732d71fc2e5a` about 43 minutes after assignment, changed 313 lines (`+292/-21`) across 8 files, raised the suite from 264 tests / 20 files to 277 tests / 21 files, and passed push CI run `33516613852`. Recent bounded slices continue to finish materially under one hour, so this assignment combines **two small replay-integrity corrections** with **one bounded named-machine source pass**. Do not broaden beyond these three pieces.

> **Question for this slice:** can the repository make two older serialized traces fail closed without losing current semantics, while upgrading Curta Type II source precision from index/identity level to directly inspected service-manual page/figure evidence?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priorities 0.2 and 6
6. `docs/VERIFICATION.md`
7. `src/mechanism-core.ts` + `tests/mechanism-core.test.ts`
8. `src/mechanisms/continuous-integrator/index.ts` + `tests/continuous-integrator.test.ts`
9. `research/curta-source-map.md`
10. typed source-atlas/source-anchor adapters and the `#/source-atlas` / `#/curta` UI only if the source pass yields a precise new anchor
11. open PR #8 and PR #9 as **review inputs**, not as branches to merge blindly

Run current-main typecheck/tests before editing and record the actual baseline. Do not infer state from old plan checkboxes or from the old PR verification counts.

# Part A — reconcile the two stale replay-hardening PRs onto current main

Two external PRs contain narrow correctness fixes that are still absent from current `main`, but both PR branches now report non-mergeable against the advanced documentation/code base. Preserve their **code/test intent**, not their stale `docs/VERIFICATION.md` patches.

## A1. Decimal-register unknown-event rejection — PR #8

Review:

- PR: <https://github.com/tmzncty/mechanical-computing-playground/pull/8>
- exact reviewed head: `6724e40154151d94bd83c4af2fa457f032927d85`
- exact-head CI previously passed as run `33505287956`

Current `reduceDecimalRegisterEvent()` still treats only `WHEEL_STEP` specially and silently lets every other runtime discriminator pass as a no-op. Correct that boundary on **current main**.

Required behavior:

- keep the six declared decimal-register event kinds accepted with current semantics;
- `WHEEL_STEP` continues to derive the digit mutation;
- legitimate crank/carry marker events remain state no-ops at this reducer layer;
- any runtime event discriminator outside the declared set must throw/fail closed;
- do not widen this slice into marker-order validation, marker-metadata derivation, or a full trace-schema rewrite.

Required focused regressions:

1. inserting one unknown event into an otherwise valid trace is rejected;
2. substituting unknown events for all non-`WHEEL_STEP` markers is rejected;
3. the canonical `0099 + 1 -> 0100` trace still replays unchanged.

Use an exhaustive switch or an equally clear fail-closed discriminator boundary. Do not make TypeScript exhaustiveness the only runtime defense, because serialized JSON is untrusted at runtime.

## A2. Continuous-integrator action-bound replay — PR #9

Review:

- PR: <https://github.com/tmzncty/mechanical-computing-playground/pull/9>
- exact reviewed head: `72a0ca0ea0e7dcd2c3b36f3f5da6a624171f2caf`
- exact-head CI previously passed as run `33506511205`

Current `replayIntegrator()` replays only recorded events. The trace also records actions, so deleting/replacing those actions or splitting action/event cycle identities can currently leave a trace that verifies from events alone.

Harden replay on current main so it is **action-derived** in the same spirit as newer mechanisms.

Required behavior:

- require runtime `actions` and `events` arrays;
- validate both initial and final integrator states even for zero-action traces;
- require an action cycle id to be a non-empty string at runtime;
- preserve the semantic distinction between omitted `inputQuantity` and an explicitly invalid/non-number value; `null` must not silently mean “use current input”;
- starting from the recorded initial state, re-run every recorded action through the existing transition function;
- require the action-derived ordered events to match the serialized event stream exactly;
- require the action-derived final state to match the serialized final state;
- preserve valid zero-action traces;
- keep the numerical integration rule and UI unchanged.

Required tamper regressions should cover at least:

- missing one action;
- deleting all actions while events remain;
- adding an extra action;
- deleting all events while actions remain;
- changing an action input;
- explicit `null`/invalid action input;
- changing action cycle id;
- changing event cycle id;
- unknown action;
- forged final state;
- identical invalid initial/final endpoints in an empty trace;
- valid genuine zero-action trace.

Do not copy PR #8/#9 historical verification sections verbatim: their baselines (`251/253/263` tests) are stale. Record only the current-main baseline and the final result you actually run now.

## A3. PR handling boundary

Do **not** merge the stale fork branches just to preserve their old verification prose. Land patch-equivalent current-main code/tests in this coherent completion commit. Leave PR closure/supersession to the next repository reviewer unless your normal authenticated workflow can close them cleanly after proving current-main patch equivalence; never rewrite the contributor branches.

# Part B — bounded Curta Type II service-manual source pass

`research/curta-source-map.md` directly inspected the Type I 1967 service-manual cover but still leaves Type II service content at index identity. Upgrade only the Type II control/source precision that can be directly inspected within this slice.

## B1. Access layer

Start from the specialist index:

<https://www.mycurta.com/cu.htm>

It identifies original Curta service manuals and credits Museum Mura as the source layer. The current index exposes a 43-page Type II English-green scan at:

<https://www.mycurta.com/Documents/Curta_2_Service_Manual_Curta2_green_e.pdf>

The file is large (~46 MB). Download locally if needed. Treat `mycurta.com` as a **specialist access mirror**, not as institutional provenance. The document itself may be primary manufacturer material if the scanned pages establish that identity.

Fallback identity/reference links from the same index include the 55-page German Type II scan and Type II factory drawings. Use them only if they materially resolve identity/page mapping; do not turn this slice into a 154-drawing geometry audit.

## B2. Direct inspection target

Inspect enough of the Type II English service manual to record defensible, page-specific facts for **control responsibility and model identity**, not full geometry.

At minimum record:

- title/cover identity, model, issuer/manufacturer, language, issue/date/revision if visibly stated;
- contents/index page(s), if present;
- exact viewer/PDF pages actually inspected for at least two of these responsibilities if the manual exposes them clearly:
  - crank/handle home or safety-lock responsibility;
  - carriage movement/position restriction;
  - result-counter versus revolution-counter clearing/reset responsibility;
  - plus/minus / reversing control;
  - decade-transfer/carry adjustment only if the service page explicitly establishes it;
- figure/table/part identifiers only where directly readable;
- any explicit Type II capacity or control difference that can be stated without importing Type I assumptions;
- what remains unreadable or not established.

If the PDF is image-only, use page rendering/OCR only as a locator and visually verify the exact words/figures before making a page-level claim. If direct access fails or the relevant pages cannot be read confidently, record the access boundary instead of guessing.

## B3. Keep document roles separate

Preserve these distinctions:

- US 2,525,352 = patented embodiment, not automatic proof of every production Curta;
- *Your CURTA Calculator* = operator guide covering Model I/II at its document precision;
- 1967 Type I service manual = Type I service document;
- newly inspected Type II service manual pages = Type II service evidence only at the pages/revision actually inspected;
- mycurta/vcalc indexes = specialist access/reference layer;
- repository `#/curta`, `setting-crank-interlock`, `operator-division`, and register-lifecycle traces = P or P/M teaching models unless explicitly source-bound.

Do not claim Type I and Type II hidden linkage identity merely because the operator guide says they are identical except capacity. Conversely, if the Type II service manual visibly documents a different part/control arrangement, record the difference precisely without extrapolating a whole production chronology.

## B4. Deliverable

Deepen `research/curta-source-map.md` with a compact Type II service-manual section containing:

```text
document identity
pages/figures directly inspected
what each inspected page supports
Type I / Type II boundary
access/provenance layer
what remains unestablished
```

If this yields a precise new source anchor, update the typed source-atlas/source-anchor data and the existing `#/source-atlas` Curta card minimally. Do not create a new route or source-specific Curta mechanism animation.

# Part C — reconciliation and verification

After Parts A–B are real:

- update `STATUS.md` only for replay guarantees/source precision that now genuinely exist;
- add one concise completed line to `TODO.md` covering this combined slice;
- update `docs/RESEARCH_GAPS.md` Priority 0.2 only if the Type II gap actually narrowed;
- update `docs/VERIFICATION.md` with current baseline/final test counts and actual checks;
- do not copy stale PR test counts into current verification;
- do not claim Pages deployment unless a completed deployment for the final exact commit is actually observed.

If source-atlas UI data changes, perform bilingual smoke at least for:

```text
#/source-atlas
#/curta
#/about
```

No browser smoke is required solely for the two replay-only code changes if no UI data/rendering changes.

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

All must pass.

Also run focused suites proving:

- canonical decimal-register replay still succeeds and unknown discriminators fail closed;
- continuous-integrator valid traces, action-derived replay, zero-action replay, and all tamper cases pass;
- current register-lifecycle, revolution-counter, operator-division, setting-crank, key-stroke-integrity, difference-column, and Analytical Engine replay tests remain green.

The final slice should answer these questions from code/evidence rather than prose alone:

> Can a serialized decimal-register trace smuggle an unknown event discriminator through replay?

> Can a continuous-integrator trace change/delete its recorded actions while keeping the recorded events and still verify?

> Which Curta Type II service-manual pages were actually inspected, and exactly what model/control responsibility do they establish?

After push:

- confirm remote `main` contains the coherent completion commit;
- inspect push CI if completed and record only completed outcomes;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
fix: bind legacy replay traces and deepen Curta II sources
```

# Evidence boundaries

- Decimal-register replay correction: software correctness only; no historical claim.
- Continuous-integrator action-bound replay: **M/P software provenance integrity**; no change to historical Differential Analyzer claims or physical accuracy.
- Type II service manual: **H/E1 only for primary pages actually inspected**, with specialist mirror access provenance kept explicit.
- Type I/II comparison: **H/R only where two directly identified documents support the comparison**; no universal production-revision claim.
- Existing generic controls/division/Curta UI: remain **P/M or P** unless explicitly source-bound.

# Stop conditions

Stop and leave a precise boundary note rather than guessing if:

- either PR's intent conflicts with newer current-main replay semantics rather than applying as a narrow hardening;
- action-derived integrator replay would require changing the numerical integration rule or public event vocabulary;
- the Type II manual cannot be downloaded/read at page precision within a bounded attempt;
- source inspection starts expanding into full factory-drawing geometry, serial-number chronology, lubrication practice, or restoration advice;
- updating the source atlas would require a large unrelated UI refactor.

If Parts A–B finish substantially before one hour, use remaining time for property/tamper tests, exact Type II page/figure metadata, and accessibility/source-card precision. **Do not start a new machine family, stochastic reliability model, 3D Curta reconstruction, or square-root algorithm in this slice.**
