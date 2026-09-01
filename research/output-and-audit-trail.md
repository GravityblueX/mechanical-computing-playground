# Persistent output and the audit-trail comparison

**Checked: 2026-09-01**

## Question

What changes when a result leaves a transient machine register and becomes a persistent item list, subtotal, total, checking copy, or reproduction master?

## Claim types

- identified objects and patents: **H**;
- Difference Engine reconstruction interpretation: **H/R**;
- repository printing-ledger and Difference Engine inspection traces: **P/M**.

“Audit trail” is used here as a **modern analytical label** for a persistent record that can be reviewed. The inspected early sources use terms such as listing, items, totals and subtotals; this note does not claim they used the modern phrase.

## Why output belongs to the computation contract

A live accumulator answers “what is the working sum now?” A persistent record can additionally answer “which items produced it?”, “was this an intermediate footing or a closing total?”, and “what remained after the result was printed?” Thus output changes both inspectability and legal next state.

## 1. Register-only/non-printing comparator

Smithsonian/NMAH, Burroughs Calculator `nmah_690197`:

<https://americanhistory.si.edu/collections/object/nmah_690197>

The assigned institutional record identifies this object as a full-keyboard, key-driven, non-printing adding machine with result wheels/windows. It supports only the narrow contrast that changing a result register does not itself create a machine-produced paper list.

- Claim type: **H**.
- Evidence: **E2 institutional catalog description**; this environment returned HTTP 403, so no photograph or further object detail was inspected.

This does not imply that users had no bookkeeping or copying workflow, nor that all Burroughs Calculator revisions shared one clearing procedure.

## 2. Identified printing/listing objects

Smithsonian/NMAH:

- Burroughs Class 3 Adding Machine `nmah_690654`: <https://americanhistory.si.edu/collections/object/nmah_690654>
- Burroughs Style 9 Adding Machine `nmah_690660`: <https://americanhistory.si.edu/collections/object/nmah_690660>

At the assigned catalog precision, the Class 3 record documents a printing mechanism and operator-visible paper tape plus identified non-add, total, subtotal and repeat controls. The Style 9 record documents a wide carriage/printing arrangement using tape or sheets whose printing is not visible to the operator in that arrangement.

- Claim type: **H**.
- Evidence: **E2 institutional catalog description**; pages returned HTTP 403 in this environment.

The contrast is source-specific: visible versus non-visible output affects immediate checking, but it does not establish a universal Burroughs paper path, type-bar layout, control linkage or timing.

## 3. Total and subtotal are different state transitions

William E. Swalm, US 885,202, *Adding and Listing Machine* (1908):

<https://patents.google.com/patent/US885202A/en>

The specification explicitly situates the invention in machines that list/print individual items while accumulating them and print totals or subtotals. It states that, in taking totals in the described class, accumulating wheels return to and remain at initial/zero position; in taking subtotals they return to their accumulated position, so subsequent items and later subtotals/totals include the retained amount. Its mechanism discussion likewise distinguishes disengagement after totaling from continued engagement/restoration for subtotaling.

- Claim type: **H**.
- Evidence: **E1 for the patented intended design/class context**.

Consequently a printed `20` is not semantically complete without its line kind:

```text
SUBTOTAL 20 → persistent line; working accumulator remains 20
TOTAL 20    → persistent line; working accumulator becomes 0
```

This is not proof that every Burroughs production revision used the same geometry or key sequence.

A later, deliberately separate context is Robert E. Boyden, US 2,583,810 (1952), *Accumulator State Control Positioning Mechanism*: <https://patents.google.com/patent/US2583810A/en>. Its specification explicitly distinguishes non-add (print keyed amount without accumulator entry), total (print and clear), and subtotal (print and retain). It is not projected backward onto the early Class 3/Style 9 objects, and the bounded P/M implementation below omits `NON_ADD` to keep the main lesson narrow.

## 4. Difference Engine persistent output is a different problem

Existing source map: [`difference-engine-source-map.md`](difference-engine-source-map.md).

Babbage's designs, the 1991/2002 institutional reconstruction, and actually built Scheutz comparisons concern mathematical table production: calculation can lead to checking copy and stereotype/master or printed-table roles, reducing re-copying/typesetting exposure. That differs from an office listing machine's item-by-item transaction record and footing semantics. The technologies, paper paths and operator workflows are not treated as identical.

The repository's `TABLE_VALUE_READY → CHECK_COPY_RECORDED → STEREOTYPE_OUTPUT_ROLE_RECORDED` sequence remains **P/M inspection order**, not historical printer timing.

## Comparison

| Output contract | Identified source/example | What persists | Working state after output | Verification/re-copying change | Unmodeled |
|---|---|---|---|---|---|
| register-only | `nmah_690197` | machine register only | live register remains until separately changed/cleared | no automatic paper list from documented object | office procedure, clearing sequence, revisions |
| printing/listing | Class 3 `nmah_690654`; Style 9 `nmah_690660` | items/footings on tape or sheets | source/control-dependent | persistent list; immediate visibility differs by object | printer, carriage, ribbon and paper-feed geometry |
| subtotal | US885202A context | subtotal line | accumulator retained | intermediate footing can be reviewed without ending series | production mapping and geometry |
| total | US885202A context | total line | accumulator cleared in described class | closes series while preserving printed footing | production mapping and geometry |
| Difference Engine persistent output | Babbage/Scheutz source map | checking/table/master roles | table-generation state is conceptually separate | reduces transcription/re-copying in table production | printer/stereotype geometry and timing |

## Repository P/M boundary and implementation consequence

`src/mechanisms/printing-ledger/` models only safe non-negative integer items, a working accumulator, structured persistent lines, subtotal retention, and total clearing. Every transition is deterministic and replay/tamper checked. It is **not** a Burroughs simulator and contains no historical key sequence, type bars, carriage, paper motion, ribbon, printing timing, accounting rules or physical clearing mechanism.

The typed profiles under `src/exhibits/output-contracts/` preserve source identity and uncertainty. Open work includes direct access to the Smithsonian records, model/revision manufacturing evidence, actual office procedures and terminology, print visibility consequences, and source-specific printer/control geometry.