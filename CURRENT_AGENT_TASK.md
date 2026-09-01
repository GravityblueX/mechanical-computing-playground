# Current Agent Task

Issued: 2026-09-02
Owner: local coding/research agent
Target duration: about one useful hour
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-02-scheutz-patent-identity-audit.md`.

Administrator review also merged external PR #13 as `8b26b9f645d40e2ef55695b52c158405997262fd`, which hardens shared decimal-register trace/action provenance. **Fetch/pull current remote `main` before doing anything** and run the current-main baseline; do not assume the 320-test count from the previous research slice is still current. PR #13 reported 360 tests across 21 files on its exact head.

The Scheutz task completed in about 36 minutes with a tightly scoped 7-file diff, so this slice is intentionally somewhat larger while remaining one coherent question.

> **Question for this slice:** what can directly inspected Millionaire/Steiger sources establish about the real operator protocol of direct multiplication—especially multiplier-digit selection, one complete operating turn per multiplier digit, carriage/place handling, visible registers, and mode controls—and which parts of the repository's two-cycle `314 × 27` model must remain P/M rather than being silently upgraded to historical mechanism claims?

## Read before work

Fetch/pull remote `main`, then read in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 1 and the source-precision guardrails
6. `docs/VERIFICATION.md`
7. `tasks/archive/2026-09-02-scheutz-patent-identity-audit.md`
8. `research/multiplication-mechanisms.md`
9. `src/mechanisms/direct-multiplier/index.ts`
10. `src/exhibits/multiplication-compare/index.ts`
11. the multiplication rendering/evidence code in the public shell and its tests

Run baseline typecheck/tests before editing and record the actual test count. Inspect current replay semantics after merged PR #13; do not weaken or bypass them.

# Part A — direct primary/source audit of the Millionaire operator protocol

The repository already has Steiger patent references and a P/M direct-multiplication model, but its operator-protocol claims need better source separation.

## A1. Inspect Steiger US558,913 at operation-text precision

Directly inspect the patent text/figures rather than relying on repository paraphrase or search snippets:

- Otto Steiger, US 558,913 (1896): <https://patents.google.com/patent/US558913A/en>

Record exact figure/page/column or clearly locatable patent passages for the multiplication sequence, including only what is directly supported, such as:

- the multiplier lever/scale and what selecting a multiplier digit controls;
- the statement that the controlling mechanism represents the multiplication table;
- multiplicand setting/indication if directly described;
- the instruction to set the multiplier lever to a multiplier figure and turn the operating crank one complete rotation, repeated for successive multiplier figures;
- how primary/secondary transfer of tens/units partial products is described;
- factor/multiplier indication if directly stated;
- any explicit carriage/place-shift operation actually described.

Do not infer production-machine geometry from the patent beyond the claimed/described design. Patent = H/E1 for the described patented design, not proof that every surviving Egli machine implements every detail unchanged.

If US538,710 materially clarifies a point that US558,913 references as the former patent, inspect the exact relevant passage only; do not turn this into a complete two-patent mechanical reconstruction.

## A2. Inspect surviving-object records and related Millionaire documentation

Use directly inspectable institutional records to separate **produced-object controls** from **patented design**.

Start with NMAH Millionaire object records, especially examples that directly describe:

- lever-set manual machines;
- multiplier control selectable 0–9;
- A/M/D/S operation selector;
- operating crank;
- multiplier/quotient and result/dividend registers;
- carriage-shift control;
- zeroing knobs;
- the instruction sheet inside the lid.

Useful object records include:

- <https://americanhistory.si.edu/collections/object/nmah_694185>
- <https://americanhistory.si.edu/collections/object/nmah_694184>
- <https://www.si.edu/object/nmah_694169>

The same accession points to documentation `MA.319929.03` through `.07`. Resolve and inspect whichever records are publicly exposed. Two known starting records are:

- `MA.319929.04`, *Leaflet, The Millionaire Calculating Machine*: <https://americanhistory.si.edu/collections/object/nmah_694406>
- `MA.319929.05`, *Pamphlet, The Millionaire Calculating-Machine*: <https://americanhistory.si.edu/collections/object/nmah_694407>

Important: `.05` is described as disassembly instructions, so do not mislabel it as an operator manual merely because it is a booklet. Record document role exactly.

Also inspect the Powerhouse Collection record for the 1907 Egli booklet associated with a Millionaire:

- <https://collection.powerhouse.com.au/object/263911>

Its catalog says it is a 9-page booklet plus five figure pages and gives a title about taking the machine apart. If images/pages are publicly renderable, inspect them only for directly readable document identity/control/mechanical information. Respect copyright/display restrictions: record facts and page locations; do not copy long text or redistribute images.

## A3. Bounded operator-instruction hunt

Spend a bounded portion of the slice looking for a directly inspectable **operating** instruction sheet/manual, not merely a modern how-to transcription.

Good leads may include:

- lid-instruction images/IIIF from Smithsonian or another museum;
- accession-linked documentation;
- a digitized Egli/Morschhauser instruction sheet or catalog;
- a period trade/technical publication reproducing the operating sequence.

A modern specialist transcription such as the BHT Berlin Millionaire page may be used as **E3 navigation/secondary evidence only** unless it exposes/scans the original source it transcribes. Do not upgrade it to E1.

If no primary operating sheet is readable within the time budget, that is an acceptable negative result. The Steiger patent plus surviving-object controls can still sharpen the boundary.

# Part B — build a compact historical/P-M protocol crosswalk

Update `research/multiplication-mechanisms.md` or create `research/millionaire-operating-protocol.md` **only if the directly inspected evidence is substantial enough to justify a separate file**.

Create a compact table like:

```text
claim / operation step | source/model/date | direct support | claim/evidence | repository consequence | not established
```

At minimum distinguish:

1. **H/E1 patented design** — multiplier selection + complete operating rotation sequence as directly described in Steiger;
2. **H/E1 surviving-object/catalog controls** — actual control/register identities on identified Smithsonian examples;
3. **H/E1/E2 documentation object identity** — instruction/leaflet/disassembly documents, only at content precision actually inspected;
4. **P/M repository trace** — `314 × 27` decomposed as selected 7 contribution, shift, selected 2 contribution, with two modeled operation cycles.

Answer explicitly:

- Is “one modeled operation cycle per multiplier digit” historically supported at operator-protocol level, or only analogous to a patent crank rotation?
- Does the historical source establish the exact order/direction of multiplier digits used on production machines?
- Does it establish when/how carriage shifting occurs between multiplier digits?
- Does it establish that the repository's encoded `0..9` lookup table matches actual control-plate internal representation? If not, preserve P/M.
- Which registers/controls are directly present on identified surviving machines, and which are generic repository abstractions?

Do not let “one turn per digit” become a fake speed/throughput benchmark.

# Part C — public multiplication evidence integration, bounded

If Parts A/B materially sharpen the protocol, update the multiplication exhibit so the visitor can see **two separate layers**:

```text
Historical operator/control evidence (identified source/model)
vs
Repository P/M event trace (functional abstraction)
```

A small evidence/protocol panel is enough. Do not redraw the Millionaire internals.

The public layer should be able to state only claims directly supported, for example:

- a Steiger patent describes setting the multiplier lever for a multiplier figure and one complete crank rotation, repeated for successive figures;
- identified surviving Millionaire records expose multiplier control, operation selector, operating crank, registers and carriage-shift control;
- the repository models this distinction with one abstract selection/operation cycle per decimal multiplier digit, but does not claim exact cam/control-plate geometry or production timing.

If the source audit does **not** improve public precision enough, do not touch UI merely to create churn.

If UI/source data changes, add focused tests asserting source identity, claim/evidence labels, and explicit `notEstablished` boundaries. Preserve the existing direct-multiplier replay and arithmetic tests.

# Part D — reconciliation and verification

After the audit:

- update `STATUS.md` only if Millionaire provenance is genuinely sharper;
- add one concise completed line to `TODO.md`;
- narrow Priority 1 in `docs/RESEARCH_GAPS.md` only for gaps actually closed;
- update `docs/VERIFICATION.md` with baseline/final test counts and commands actually run;
- do not alter unrelated Curta, Scheutz, Analytical Engine, Differential Analyzer, carry, key-driven, division, output, continuous or backprop tracks.

If public multiplication UI/evidence changes, perform a bilingual browser smoke for:

```text
#/multiplication
#/source-atlas (only if atlas data is touched)
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

Run focused multiplication/evidence tests for any touched area. All final required checks must pass.

After push:

- confirm remote `main` contains the completion commit;
- inspect exact-head CI and Deploy Pages outcomes that complete before stopping;
- stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
research: ground Millionaire operator protocol
```

# Evidence boundaries

- Steiger patent text/figures directly inspected = **H/E1 for the patented design actually described**;
- Smithsonian/Powerhouse catalog records = **H/E1 at object/document identity and directly described control precision**;
- readable period instruction sheets/manual pages = **H/E1 at the exact procedure text inspected**;
- modern museum synthesis = H/E2 unless it is simply reporting object-visible controls;
- modern specialist transcription without exposed original = **E3 navigation/secondary evidence**;
- repository direct-multiplier events/table = **P/M**, even if they intentionally mirror a historically documented operator-level distinction;
- patent rotation count is not measured production speed, effort, reliability, or timing;
- object controls do not prove hidden control-plate/cam geometry;
- do not infer production revision chronology from serial-number estimates unless the source directly supports that chronology.

# Stop conditions

Stop a subpart and preserve the boundary rather than guessing if:

- instruction-sheet images are present but not readable at reliable resolution;
- museum pages expose only catalog metadata, not the document's actual procedure text;
- exact carriage-shift order for multiplication cannot be established directly;
- a source describes a later keyboard/electric Millionaire and cannot be safely generalized to the lever-set manual model;
- geometry claims would require interpreting an unlabelled photograph or patent drawing beyond the text;
- the work starts expanding into complete Millionaire disassembly, performance benchmarking, production serial chronology, division reconstruction, or another machine family.

If Parts A–C finish substantially before one hour, spend remaining time tightening exact patent figure/passage anchors, resolving accession documentation `.03`–`.07`, and strengthening focused evidence tests. **Do not start a new mechanism family in this slice.**
