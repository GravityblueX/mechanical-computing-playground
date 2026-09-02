# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-complement-register-v2.md`.

Administrator review accepted completion commit `999b4a9902e60ac1b6346ab16d59f63ba12dc022` (`fix: bound complement-register trace semantics`). Exact-head CI run `33588235192` and Deploy Pages run `33588235237` both passed. Assignment-to-completion was about 30 minutes with a 7-file / ~274-line diff and the suite rose from 375 to 380 tests, so this slice is deliberately somewhat broader while staying one coherent evidence/teaching question.

**Fetch/pull current remote `main` before doing anything.** The administrator archive commit is `1a71ce913359764d2be1d6d350f362dcd2412e71`.

> **Question for this slice:** can the playground show that the modern Difference Engine No. 2 reconstruction interprets carry as a staged responsibility—giving-off/addition, warning/carry handling, restoration/reset—without turning reconstruction detail into a Babbage-lifetime mechanism claim or inventing geometry/timing?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0 carry architecture and named-machine source anchors
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-complement-register-v2.md`
8. `research/difference-engine-source-map.md`
9. `research/carry-is-the-hard-part.md`
10. `research/carry-architecture-source-map.md`
11. `src/exhibits/carry-provenance/index.ts`
12. `tests/carry-provenance.test.ts`
13. the `#/visible-carry` rendering path in `src/main.ts`
14. `src/exhibits/source-atlas/index.ts` and `tests/source-atlas.test.ts` only for reusable provenance/test patterns

Run the current-main baseline before editing and record the actual test count.

# Part A — bounded re-inspection of the DE2 technical source

Use the already identified institutional source, not a generic web summary:

Doron D. Swade, *Charles Babbage's Difference Engine No. 2: Technical Description*, Science Museum, March 2020.

The repository already records these directly inspected anchors:

- p. i — scope: interpretation of Babbage designs plus modern engineering decisions/modifications;
- pp. 4–9 — source/editorial boundary; omitted original specifications such as materials/manufacture/precision/finish;
- pp. 21–24, Figs. 3.2–3.4 — interpretation of original timing/addition material;
- pp. 33–45, Figs. 3.16–3.20 — warning, carriage of tens, restoration, warning-latch reset in the reconstructed account;
- pp. 187–188 — original timing diagram does not supply exact lock phasing; modern drawing `337 X 21` supplies reconstruction detail;
- pp. 212–218 — original/archive versus modern construction drawing mapping.

Re-open/re-check only the pages needed for this slice. Do not perform another broad Difference Engine census.

## Research deliverable

Tighten `research/difference-engine-source-map.md` with a compact **carry-phase responsibility table** if the pages support it. For each stage/responsibility record:

- exact source page / figure;
- source wording or conservative paraphrase;
- whether it is Babbage-source identity (**H/E1 at archive-record precision**) or Swade/Science Museum reconstruction interpretation (**R/E2**);
- what is *not* established by that source.

The table must keep at least these boundaries visible:

```text
Babbage archive/drawing identity ≠ modern reconstructed phase interpretation
modern reconstructed phase interpretation ≠ lifetime-built machine
phase responsibility/order ≠ measured duration/force/geometry
modern lock phasing ≠ Babbage-specified exact lock phasing
```

If exact terminology/order on the re-opened pages differs from the shorthand currently in the repository, follow the source and correct the shorthand. Do not force the words in this task into the source.

Do not infer tooth counts, linkage paths, spring forces, material choices, manufacturing tolerances, safe speed, wear, or timing duration.

# Part B — typed DE2 carry provenance / phase responsibility model

Add the smallest useful typed representation under the existing carry-provenance exhibit layer. Prefer extending `src/exhibits/carry-provenance/` rather than creating a new mechanism or machine emulator.

The model should let code/tests/UI inspect something equivalent to:

```text
source identity
claim type = R
evidence strength = E2
ordered reconstructed carry responsibilities
exact page/figure anchors per responsibility
explicit not-established boundaries
```

If a compact deterministic teaching sequence adds explanatory value, it may expose one ordered P/R inspection trace mapped to the sourced responsibilities. It must **not** pretend to reproduce physical timing or Babbage-lifetime event timing.

Rules:

- source-derived phase/responsibility names must come from the re-checked source at the precision actually readable;
- any repository event names or simplified sequence are **P/R mapping**, not historical event terminology;
- do not modify the generic decimal carry core merely to fit DE2;
- do not claim that the existing `0099 + 1` generic carry trace is a DE2 simulation;
- do not copy modern reconstruction geometry into a generic carry diagram.

A typed profile/card may be enough if that is the cleanest architecture. A new numeric mechanism is not required.

# Part C — public visible-carry integration

Add a compact bilingual DE2 reconstruction section to the existing `#/visible-carry` route. Do not create a new route.

The visitor should be able to distinguish three layers:

1. generic P/M decimal carry behavior already demonstrated by `0099 + 1`;
2. H/E1 archive/drawing identity for Babbage source records;
3. R/E2 Science Museum reconstruction interpretation of staged carry responsibilities.

Minimum public information:

- source title/institution and exact relevant page/figure anchors;
- an ordered text/state phase strip or responsibility list derived from the typed profile;
- explicit statement that this is a **modern reconstruction interpretation**, not proof that an identical fully built Babbage machine operated this way in his lifetime;
- explicit statement that phase order/responsibility is not a duration, force, tooth-count, linkage, or material claim;
- one sentence explaining why this matters pedagogically: a carry is not just a value change; an engineered machine must schedule detection/transfer/restoration responsibilities.

Reuse existing evidence/provenance UI patterns. No decorative gearing and no large redesign.

# Part D — tests and fail-closed provenance boundaries

Add focused tests in `tests/carry-provenance.test.ts` or a narrowly justified adjacent file.

At minimum verify:

1. the DE2 profile/sequence uses claim type `R` and evidence strength `E2` for the modern reconstruction interpretation;
2. page/figure anchors for the included responsibilities are explicit and stable;
3. ordered responsibilities are deterministic and cannot silently reorder through UI/adaptor code;
4. the profile explicitly records that exact lifetime lock phasing, materials, tolerances, duration/force and source-specific geometry are not established;
5. no adapter promotes the R/E2 phase interpretation into H/E1 merely because Babbage archive identifiers are also cited;
6. generic `0099 + 1` arithmetic/carry tests remain unchanged and passing;
7. if you introduce a serialized teaching trace, same input yields identical events and replay/validation rejects unknown/reordered/tampered phase identifiers rather than trusting serialized data;
8. the public adapter consumes the typed profile rather than maintaining a second contradictory hard-coded source list.

Do not add meaningless assertions that only restate string literals without protecting an evidence boundary or public contract.

# Part E — reconciliation and verification

After research/code/UI work:

- update `STATUS.md` only for the DE2 carry-provenance/teaching layer actually landed;
- add one concise completed line to `TODO.md`;
- update `docs/RESEARCH_GAPS.md` only if this slice genuinely narrows a listed DE2/Babbage carry-source gap;
- update `docs/VERIFICATION.md` with baseline/final test counts and commands actually run;
- do not modify Curta, Analytical Engine, Differential Analyzer, Millionaire, Controlled-Key, Thomas, Pascaline complement, printing-ledger, division, continuous or backprop tracks in this slice except for a necessary cross-reference sentence.

Attempt bilingual browser smoke for:

```text
#/visible-carry
#/about
```

If browser tooling is unavailable/disconnected, say so explicitly; do not convert build success into a browser-smoke claim.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Run the carry-provenance focused tests separately as well. All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head CI and Deploy Pages outcomes that complete before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: add DE2 carry-phase provenance lesson
```

# Evidence boundaries

- Babbage archive record identity/title/date/subject where directly catalogued = **H/E1 at catalog precision**;
- Swade / Science Museum 2020 technical description of the constructed DE2 and its interpreted mechanism = **R/E2**;
- repository ordering/adaptor/phase strip = **P/R mapping** unless it is merely presenting source text;
- modern construction drawing `337 X 21`, modern lock phasing, materials, fixes and modifications must not be rewritten as Babbage-lifetime specifications;
- do not infer physical duration, torque, force, contact load, wear, safe speed, tooth counts, linkage geometry or manufacturing tolerance from phase sequence;
- do not call the Science Museum reconstruction a surviving nineteenth-century Difference Engine No. 2.

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- the cited PDF/pages cannot be re-opened at usable precision;
- the source does not support a stable responsibility/order claim beyond what is already written;
- exact phase terminology is ambiguous enough that the UI would overstate it;
- implementation would require changing shared decimal-carry semantics or constructing a source-specific geometric emulator;
- the work starts expanding into printer geometry, Scheutz, manufacturing/tolerance research, or another machine family.

If Parts A–D finish substantially before one hour, spend remaining time on source-boundary/adversarial tests, accessibility/text-state visibility, and exact page/figure wording. **Do not start another machine family.**

## Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect current code/tests before adding abstractions;
- keep this one coherent provenance/teaching checkpoint;
- run all acceptance commands;
- inspect diff for unrelated edits;
- update status/verification only after tests pass;
- commit and push to remote `main` according to the repository's established workflow;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.
