# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-thomas-1868-operator-protocol.md`.

Administrator review accepted completion commit `435301cef07306a8aedaf802db7c9e29c2a53999` (`research: ground Thomas 1868 operator protocol`). Exact-head CI run `33581615620` and Deploy Pages run `33581615614` both passed. Assignment-to-completion was about 49 minutes with a nine-file / 157-line bounded diff and 362 passing tests, so this slice is intentionally a little broader while remaining one coherent representation/subtraction question.

**Fetch/pull current remote `main` before doing anything.** The administrator archive commit is `5e691f0026749bfc7a71fe93447c9ed98e128023`.

> **Question for this slice:** what do Pascal's own `Avis` and Charles Belair's 1659 description actually establish about one-direction input, dual addition/subtraction readouts, reversed digit order, and the avoidance of manual borrowing—and can the repository turn that evidence into a small generic P/M complement-register lesson without silently calling its software event sequence “the Pascaline subtraction algorithm”? 

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0 carry and Priority 3 subtraction
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-thomas-1868-operator-protocol.md`
8. `research/carry-is-the-hard-part.md`
9. `research/carry-architecture-source-map.md`
10. `research/subtraction-and-division.md`
11. current decimal-register / carry-chain state, transition, replay and tests
12. `src/exhibits/control-provenance/index.ts` and the visible-carry/controls rendering paths in `src/main.ts`

Run the current-main baseline before editing and record the actual test count. Do not weaken existing decimal-register trace provenance or carry validation.

# Part A — primary/contemporary Pascaline subtraction-display audit

Start with two distinct seventeenth-century texts. Keep authorship and evidentiary role separate.

## A1. Pascal's own `Avis`

Blaise Pascal, *Avis nécessaire à ceux qui auront curiosité de voir la Machine d'Arithmétique et de s'en servir*, inspected through the Brunschvicg/Boutroux 1923 edition/transcription:

<https://fr.wikisource.org/wiki/%C5%92uvres_de_Blaise_Pascal/Lettre_D%C3%A9dicatoire_de_la_Machine_Arithm%C3%A9tique_et_Avis_n%C3%A9cessaire/Avis>

Directly inspect the edited text and, where practical, the linked scan pages behind it. Record exact edited/scanned page locations for the passages you use.

Target claims to verify precisely:

- Pascal says opposed operations such as addition/subtraction and multiplication/division are practiced through one and the same movement;
- he contrasts hand calculation's need to retain/borrow with the machine doing the required operation without the operator mentally retaining/borrowing;
- the `Avis` explicitly declines a written construction description, so it is **not** a source for sautoir geometry or exact subtraction linkage.

Treat this as **H/E1 authored operational claim via later edited reproduction**, not a full operating manual.

## A2. Charles Belair to Huygens, 1659

Charles Belair, *Explication de la Machine de M. Pascal, par laquelle on pratique l'Arithmetique*, letter to Christiaan Huygens (1659), reproduced in the same 1923 volume, pp. 315–321:

<https://fr.wikisource.org/wiki/%C5%92uvres_de_Blaise_Pascal/Lettre_D%C3%A9dicatoire_de_la_Machine_Arithm%C3%A9tique_et_Avis_n%C3%A9cessaire/Appendice>

This source is especially important because the currently exposed transcription says, at the inspected text level, that:

- the input wheels turn in one direction and cannot simply be driven the other way;
- a sliding rule hides one half of each drum window;
- the lower figures are exposed for addition and the upper figures for subtraction;
- the upper figures are arranged in the opposite order to the lower figures;
- one concrete example pairs the lower transition `1 → 0` with the upper transition `8 → 9`;
- the same description separately explains the sequential falling carry pieces for `9999 + 1`.

Do **not** stop at those paraphrases. Inspect the source yourself, recover exact edited/scanned page/figure anchors where possible, and answer:

1. Does the text/figure establish a digitwise `d ↔ 9-d` relationship for all displayed decimal digits, or only reversed order plus one example?
2. Is the machine Belair had “in hand” identifiable as one specific surviving object? If not, do not assign it to a modern inventory number.
3. Does Belair actually describe a subtraction procedure, or only the dual display and one-way physical relation?
4. Which claims are Belair's direct contemporary description, versus Pascal's own operational claims?

Treat Belair as **H/E1 contemporary primary correspondence/description at the exact text/figure precision inspected**, while preserving that it is not Pascal-authored and need not describe every surviving Pascaline revision.

## A3. Object/reconstruction context only as needed

Use existing repository sources conservatively:

- Cnam Pascal machine `19600-0000` for identified preserved-object context;
- CMU Pascaline reconstruction only as **R/E2** for one working reconstruction;
- CMU teaching material about nines-complement arithmetic only as **M/P teaching orientation**, never as proof of Pascal's exact operator procedure.

Do not spend the slice doing a surviving-object census or geometric reconstruction.

# Part B — create a focused source map

Create:

```text
research/pascaline-subtraction-source-map.md
```

Use the repository research contract:

```text
Question
Claim types
Sources
Exact locations inspected
What each source directly establishes
What is inferred / mathematical
What the repository simplifies
Implementation consequence
Uncertainties
Date checked
```

Include a compact crosswalk:

```text
claim / representation step | source | direct support | claim/evidence | repository consequence | not established
```

At minimum separate:

1. Pascal `Avis` — H/E1 authored operational claims;
2. Belair 1659 — H/E1 contemporary description of one machine/display/carry relation;
3. Cnam object context — H/E2 institutional object description, only at its stated precision;
4. CMU physical reconstruction — R/E2;
5. mathematical digitwise nines complement — M;
6. repository generic complement-register/subtraction trace — P/M.

Also update `research/carry-architecture-source-map.md` and/or `research/subtraction-and-division.md` only where the new source audit materially sharpens an existing sentence. Avoid duplicating the full new note into three files.

# Part C — bounded generic complement-register mechanism

Only after Part A/B makes the historical boundary explicit, add a small deterministic P/M mechanism under `src/mechanisms/`, using existing naming conventions, for example:

```text
src/mechanisms/complement-register/
```

This is **not** a Pascaline emulator. It is a mathematical/pedagogical model that makes the representation trick inspectable.

## C1. Minimum representation

Support configurable decimal width within safe integer limits. Make explicit:

- width / modulus `10^width`;
- physical/additive register value or digits;
- ordinary/addition readout;
- complementary/subtraction readout;
- encoded minuend;
- subtrahend action;
- before/after register state;
- ordered carry events where the existing decimal-register core provides them naturally;
- cycle/action count only if it helps inspection;
- deterministic replay / action-derived validation consistent with the repository's current provenance hardening.

A mathematical helper such as `ninesComplement(value, width)` is acceptable and should be labeled **M**, not H.

## C2. Teaching operation

Model one bounded non-negative subtraction teaching flow, conceptually:

```text
want to display minuend A in subtraction/complement view
→ physical/additive register holds C(A)
→ add subtrahend B in the one permitted additive direction
→ physical register becomes C(A) + B
→ complementary readout shows A - B
```

Scope this to `0 <= B <= A < 10^width`. Reject unsupported negative-result/underflow cases explicitly rather than inventing sign conventions.

The source audit may justify saying that Belair documents a dual reversed display and one-way input. It does **not** automatically justify calling the software sequence above Belair's or Pascal's exact operator instructions. Keep the trace **P/M** unless the inspected contemporary text directly supplies the corresponding step.

## C3. Required tests

Add focused Vitest coverage for at least:

1. `ninesComplement(1234, 4) = 8765`;
2. complement is involutive at fixed width: `C(C(n)) = n`;
3. the two readouts remain complementary for every state touched in a fixture;
4. a simple subtraction fixture such as `5678 - 1234 = 4444` reaches the correct complement readout;
5. a carry-bearing fixture such as `1200 - 345 = 855` exposes carry in the physical/additive register transition if reuse of the decimal-register core makes that natural;
6. `B = 0` and `B = A` boundary cases;
7. unsupported `B > A`, invalid width/value, and overflow/malformed serialized inputs reject explicitly;
8. same initial state + action yields the same ordered result/events;
9. replay reproduces the final state and fails closed on a tampered action/event/final-state envelope if the module owns serialized traces.

Prefer reuse/composition of the hardened decimal-register core for digit/carry transitions if it fits cleanly. **Do not rewrite shared carry semantics merely to satisfy this lesson.** If reuse would require a broad core migration, keep the complement model smaller and record that carry-detail integration remains open.

# Part D — minimal public teaching integration

Add one compact bilingual panel to an existing route rather than a new full machine page. Prefer `#/visible-carry` because the repository already discusses Pascal/Felt carry there; `#/controls` is acceptable only if it yields a cleaner boundary.

The panel should make two layers visibly separate:

```text
H/E1 historical evidence:
- Pascal: same movement / no mental borrowing claim
- Belair: one-direction input + dual addition/subtraction display relation

P/M teaching model:
- explicit complement register state
- one bounded subtraction example
- carry events from the generic decimal core where modeled
```

Expose enough state/text that a visitor can answer:

> Why can a one-direction arithmetic mechanism still present subtraction without pretending that “subtract = reverse the carry train”?

Do not draw source-specific sautoir/linkage geometry or claim the repository's event names/timing were used historically.

Add focused tests for the typed evidence profile/panel if you introduce one. Keep the historical source IDs/locations and `supports` / `notEstablished` boundaries testable.

# Part E — reconciliation and verification

After source/model/UI work:

- update `STATUS.md` only for evidence/model work that actually landed;
- add one concise completed line to `TODO.md`;
- narrow the Pascaline complement item in `docs/RESEARCH_GAPS.md` only for gaps actually closed;
- update `docs/VERIFICATION.md` with baseline/final test counts and commands actually run;
- do not alter Thomas, Controlled-Key, Millionaire, Curta, Analytical Engine, Differential Analyzer, Scheutz, output, continuous, or backprop tracks in this slice.

If the public panel changes, attempt bilingual browser smoke for:

```text
#/visible-carry
#/about
```

If browser tooling is unavailable, state that explicitly; build/tests are not browser smoke.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Run focused tests for every new mechanism/provenance module. All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head CI and Deploy Pages outcomes that complete before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: ground Pascaline complement subtraction
```

or, if the mechanism dominates the diff:

```text
feat: add complement-register subtraction lesson
```

# Evidence boundaries

- Pascal's `Avis` = **H/E1 authored operational claim via later edited reproduction**, not construction geometry;
- Belair 1659 = **H/E1 contemporary description at exact text/figure precision**, not Pascal-authored and not automatically every surviving Pascaline;
- Cnam object page = **H/E2 institutional object context** unless direct artifact measurement is performed;
- CMU physical reconstruction = **R/E2**, not seventeenth-century identity;
- nines-complement arithmetic = **M**;
- repository complement-register transitions/UI = **P/M**;
- do not call the P/M software sequence “Pascal's subtraction algorithm” unless a directly inspected historical procedure explicitly establishes those steps;
- do not infer reverse carry, gear geometry, sautoir dimensions/timing, force, wear, safe operating speed, or universal production revision from the dual-display evidence.

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- the linked 1923 scans cannot be matched to the transcribed Pascal/Belair text at usable page precision;
- Belair's text/figures do not justify a full digitwise `d ↔ 9-d` relation beyond the one example and reversed-order statement;
- no primary/contemporary source directly describes the operator subtraction sequence you hoped to name historically;
- composing with the decimal-register core would require weakening or broadly redesigning its hardened replay/carry contract;
- the work starts expanding into full Pascaline geometry, surviving-machine revision census, mixed livres/sols/deniers arithmetic, or a full emulator.

If Parts A–D finish substantially before one hour, spend remaining time strengthening scan/page/figure anchors, adversarial replay tests, accessibility/text-state visibility, and the historical/P-M boundary. **Do not start another machine family.**
