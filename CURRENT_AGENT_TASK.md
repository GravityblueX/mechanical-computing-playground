# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-millionaire-operator-protocol.md`.

Administrator review accepted completion commit `a94a0b01f77460b0434d90fc607f61ceb8f988d4` (`research: ground Millionaire operator protocol`). The exact-head CI run `33572128376` and Deploy Pages run `33572128381` both passed. Assignment-to-completion was about 29 minutes with a bounded eight-file diff, so this slice is intentionally somewhat larger while remaining one coherent evidence question.

**Fetch/pull current remote `main` before doing anything.** The administrator archive commit is `90f645a7339f991ff5f860ef2df8df4a4f762221`.

> **Question for this slice:** what do directly inspectable company manuals, patents, and identified surviving objects establish about Controlled-Key Comptometer incomplete-stroke detection, correction, release/recovery, and operator locking—and which parts of the repository's generic `key-stroke-integrity` controller must remain P/M rather than being silently upgraded to a Model E/F reconstruction?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 2 and Priority 4
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-millionaire-operator-protocol.md`
8. `research/key-driven-computation.md`
9. `research/control-and-interlocks.md`
10. `research/control-and-zeroing-source-map.md`
11. `src/mechanisms/key-driven-accumulator/index.ts`
12. `src/mechanisms/key-stroke-integrity/index.ts`
13. `src/exhibits/control-provenance/index.ts`
14. related control/key-driven tests and the public controls rendering in `src/main.ts`

Run the current-main baseline before editing. Record the actual test count. Do not weaken replay/tamper validation to make source integration easier.

# Part A — primary operator-manual audit of Controlled-Key recovery

The repository already has Turck 1921 printed pp. 159–162 establishing incomplete-stroke signaling, blocking of other orders, and correction-before-continuation. The unresolved point is the **operator recovery procedure** and its edition/model boundary.

## A1. Directly inspect period Felt & Tarrant operating material

Start with the directly available period scan:

- *Easy Instructions for Operating the Controlled-Key Comptometer Adding and Calculating Machine* (period Felt & Tarrant material):
  <https://www.jaapsch.net/mechcalc/pdf/easyinstr1920.pdf>

Use the manual index only as navigation, not as primary evidence itself:

- <https://www.jaapsch.net/mechcalc/comptometer_books.htm>

From that index, inspect the most relevant directly scanned edition of *Methods of Operating the Comptometer* (prefer the 1921/1928-era material if readable) for sections on:

- Controlled-Key mechanism / incomplete key strokes;
- error signaling or locked keyboard/orders;
- how an operator corrects or completes an imperfect stroke;
- any release/reset/control key or button used after correction;
- distinction between recovery from an incomplete stroke and clearing/zeroing the accumulator;
- any edition/model wording that prevents generalizing one procedure to every Comptometer.

Record **printed page number and viewer/PDF page** where both are available. Short quotation fragments are fine for identification, but summarize rather than copying long passages.

## A2. Smithsonian company-publication boundary

Inspect the Smithsonian record:

- *Applied Mechanical Arithmetic As Practiced on the Controlled Key Comptometer*, Felt & Tarrant, 1914 publication / cataloged 1920 revision, `nmah_905178`:
  <https://americanhistory.si.edu/collections/object/nmah_905178>

Resolve any publicly exposed IIIF/page sequence if possible. If the catalog exposes only an object image or metadata, record **identity/catalog precision only** and do not invent page-level procedure text.

Use the catalog description to establish only what it directly supports: training/use context, revision identity, and the statement that the machine did not allow imperfect key strokes if that wording is present in the record.

## A3. Identified surviving Model F / Controlled-Key objects

Inspect object identity/control records, keeping hidden mechanism claims out:

- Smithsonian Model F, `nmah_690479`:
  <https://americanhistory.si.edu/collections/object/nmah_690479>
- Smithsonian Model F, `nmah_690481`:
  <https://americanhistory.si.edu/collections/object/nmah_690481>
- Science Museum Group section of Model F Controlled-Key Comptometer, `1921-16`:
  <https://collection.sciencemuseumgroup.org.uk/objects/co60749/section-of-model-f-controlled-key-comptometer-by-felt-and-tarrant-manufacturing-co-model-calculating-machine>

Record only directly described model/date/patent-plate/visible-control facts. A surviving Model F with a last patent date does **not** by itself prove which patent implements which hidden controlled-key action.

# Part B — patent mapping, bounded and fail-closed

A specialist patent index points to Kurt F. Ziehm US 1,110,734 (filed 1914; granted 15 September 1914) as a Controlled-Key mechanism lead. Treat that index as **E3 navigation only** until the patent itself is inspected.

Directly inspect:

- US 1,110,734, Kurt F. Ziehm:
  <https://patents.google.com/patent/US1110734A/en>

Determine, from the actual specification/claims/figures:

- what error/incomplete-stroke condition the patented mechanism detects or prevents;
- what is locked, disabled, signaled, or released;
- whether the patent itself describes an operator action to recover after a partial stroke;
- whether completion of the errant stroke is part of the described recovery;
- whether a release key/button is actually named/described and what it controls;
- which statements concern the patented design versus a specific commercial model.

Record exact page/column/line/figure/claim locations at the precision available in the patent facsimile/text.

Do **not** write “Model F used US 1,110,734” as H/E1 merely because a secondary patent list says “presumably introduced” and a surviving machine plate ends on the same grant date. If direct Felt & Tarrant documentation or an object record explicitly maps the patent to the model, record that; otherwise preserve the production mapping as E3/open.

If the patent points to one earlier Felt/Ziehm patent that is essential to understand a single recovery step, inspect only that exact dependency. Do not expand into a complete Comptometer patent genealogy.

# Part C — historical / P–M recovery crosswalk

Update `research/key-driven-computation.md` and, only where directly relevant, `research/control-and-interlocks.md` or `research/control-and-zeroing-source-map.md`.

Build a compact crosswalk:

```text
claim / recovery step | source / edition / model | direct support | claim/evidence | repository consequence | not established
```

At minimum separate:

1. **H/E1 contemporary technical account** — Turck 1921 incomplete-stroke signaling / other-order blocking / correction-before-continuation;
2. **H/E1 company operating manual** — exact recovery sequence only if directly readable in the period scan;
3. **H/E1 patented design** — exact locking/release/correction responsibility directly described in US 1,110,734;
4. **H/E1 object/catalog identity** — identified Model F / company-publication facts at catalog precision;
5. **E3 specialist orientation** — any chronology or “presumably introduced” patent-to-model mapping not independently established;
6. **P/M repository controller** — `key-stroke-integrity` phases/events and exactly-once arithmetic commit.

Answer explicitly:

- Does a primary company/manual source establish “finish the incomplete/errant stroke, then release the lock,” or only a more general correction instruction?
- Is a white/release button directly documented in the inspected primary source? If yes, what is it called and what exactly does it release? If no, keep that operator sequence E3/open.
- Does the mechanism block all keys, other orders/columns, or some narrower set? Keep the source's wording and model/edition boundary.
- At what point does arithmetic registration occur relative to the incomplete stroke and correction, according to the source? If exact timing is not stated, do not infer it.
- Is recovery/reset distinct from result-register zeroing/clearing? Do not merge those controls because both “reset something.”
- Which current P/M events (`INCOMPLETE_STROKE`, detection, input lock, exactly-once commit, lock release, etc.) are pedagogical decompositions rather than historical event names/timing?

# Part D — bounded source-aware code/public integration

Only after Parts A–C establish a sharper boundary, add a compact typed evidence adapter/profile rather than rewriting the core mechanism.

Preferred location:

- `src/exhibits/control-provenance/index.ts`

Add something equivalent to a `controlledKeyRecoveryEvidence` profile that exposes:

- exact source identity / edition or patent number;
- claim type and evidence strength;
- `supports`;
- `notEstablished`;
- explicit link to the generic P/M controller without claiming geometric identity.

If the primary sources support a clear operator recovery sequence, integrate a small bilingual historical-evidence panel into the existing controls lesson in `src/main.ts`. Show two layers:

```text
Historical Controlled-Key recovery evidence
vs
Repository generic P/M integrity trace
```

Do **not** create a new full Comptometer route. Do not add decorative keyboard geometry.

Add focused tests, likely in:

- `tests/control-provenance.test.ts`;
- `tests/key-stroke-integrity.test.ts` only if a genuine P/M semantic clarification is needed.

Tests must assert source IDs/edition labels, H/E1 versus E3/P-M boundaries, and `notEstablished` statements so future edits cannot silently historicalize the generic controller.

**Default expectation:** the generic arithmetic/control state machine should remain unchanged. If the source audit reveals that its current semantic claim is actually wrong (not merely differently named), stop and document the conflict before redesigning core transitions.

# Part E — reconciliation and verification

After the audit/integration:

- update `STATUS.md` only for provenance actually improved;
- add one concise completed line to `TODO.md`;
- narrow Priority 2 / Priority 4 in `docs/RESEARCH_GAPS.md` only for gaps actually closed;
- update `docs/VERIFICATION.md` with exact baseline/final test counts and commands actually run;
- do not alter Millionaire, Curta, Thomas division, Scheutz, Analytical Engine, Differential Analyzer, output, continuous, or backprop tracks in this slice.

If public controls evidence changes, perform bilingual browser smoke for:

```text
#/controls
#/about
```

If browser tooling is unavailable, state that explicitly; build/tests are not a browser smoke.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Run focused control/key-integrity tests for touched files. All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head CI and Deploy Pages outcomes that complete before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: ground Controlled-Key recovery protocol
```

# Evidence boundaries

- directly read period Felt & Tarrant manual pages = **H/E1 at the exact edition/page/procedure inspected**;
- Turck 1921 directly inspected pages = **H/E1 contemporary technical/historical account**, with author/priority-context caveat already recorded;
- US 1,110,734 directly inspected = **H/E1 for the patented design actually described**;
- Smithsonian / Science Museum catalog = **H/E1 at object/publication identity and directly described control precision**;
- specialist patent/manual indexes = **E3 navigation/secondary evidence** unless they expose the original source being cited;
- patent grant date matching a machine plate is not sufficient proof of patent-feature production mapping;
- repository `key-stroke-integrity` state/events = **P/M** unless a particular individual statement is separately source-backed;
- no source-specific trigger geometry, key travel, timing, spring/linkage path, simultaneous multi-column behavior, throughput, error rate, training effect, or production-wide revision claim without direct evidence.

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- a manual scan is unreadable or lacks reliable page identity;
- the Smithsonian publication exposes only catalog metadata/object photography rather than readable pages;
- US 1,110,734 does not actually support the recovery step a secondary source attributes to it;
- a release button/operator sequence appears only in a modern specialist description and cannot be matched to primary material;
- Model E/F chronology or patent-to-production mapping conflicts across sources;
- integrating historical evidence would require pretending the generic P/M event order is physical timing;
- work starts expanding into full keyboard/carry geometry, simultaneous duplex operation, measured operator productivity, or another machine family.

If Parts A–D finish substantially before one hour, spend remaining time resolving exact manual edition/page anchors, directly mapping patent figure/claim language, and strengthening evidence-boundary tests. **Do not start another mechanism or machine family in this slice.**
