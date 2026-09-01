# Human-machine division of arithmetic work

**Checked: 2026-09-01**

## Question

Which concrete arithmetic responsibilities remain operator procedure, and which move into represented machine state, control, or persistent output across mechanisms already implemented by this repository?

Here **labor** means arithmetic responsibility: selecting, repeating, shifting place, deciding when to stop, correcting, retaining state, and requesting output. It does not mean wages, employment conditions, labor markets, gender history, productivity, or economic effects.

## Claim types and source boundary

- repository scenario values, events, state, and grouped counts: **P/M**, derived from tested deterministic mechanisms;
- patents, identified objects, manuals, and institutional descriptions: **H** at their stated **E1–E3** precision;
- cross-machine responsibility synthesis: **P/R**, not a ranking or historical performance measurement.

Primary internal anchors:

- [`multiplication-mechanisms.md`](multiplication-mechanisms.md)
- [`key-driven-computation.md`](key-driven-computation.md)
- [`subtraction-and-division.md`](subtraction-and-division.md)
- [`control-and-zeroing-source-map.md`](control-and-zeroing-source-map.md)
- [`output-and-audit-trail.md`](output-and-audit-trail.md)
- [`../docs/REPRESENTATION_AND_PROTOCOL.md`](../docs/REPRESENTATION_AND_PROTOCOL.md)

## Bounded institutional use context

Smithsonian, *Calculating Machines*:

<https://www.si.edu/spotlight/calculating-machines>

The page was directly inspected in the browser. It says that by 1900 calculating machines were common tools of scientists, engineers, statisticians, actuaries, government officials, and payroll clerks, and that business students learned to use them. It also directly describes early stepped-drum/pinwheel multiplication as setting the multiplicand, winding the crank according to each multiplier digit, and shifting the carriage between decimal places.

- Claim/evidence: **H/E2**, institutional overview.
- Safe consequence: calculating machines supported multiple identified kinds of technical and office arithmetic, and at least one institutional account explicitly assigns repetition and place shift to the user in early multiplication workflows.
- Not established here: operator demographics beyond the page wording; training time, skill ranking, throughput, fatigue, wages, time saved, error-rate reduction, or employment effects.

## Repeated-crank multiplication

For the repository's `314 × 27` P/M comparison:

```text
7 unit-place cycles
→ shift one decimal place
→ 2 tens-place cycles
```

The conceptual stepped-drum and pinwheel paths both count nine operator-supplied operation cycles and one place shift. The mechanism represents the set multiplicand contribution and accumulates it; the operator supplies the multiplier-digit repetition and place sequence.

Historical support exists at functional level in the Smithsonian overview and machine-family sources. But the repository's exact count is a **P/M observation for this chosen arithmetic case**, not measured time or universal historical cost.

## Direct multiplication

The Steiger/Millionaire source chain supports the functional distinction that multiplier-digit selection can invoke a mechanically represented multiplication-table relation. In the repository model:

```text
select 7× multiple → operation cycle
shift place
select 2× multiple → operation cycle
```

The direct trace therefore has two operation cycles for multiplier `27`, while carriage/place handling remains explicit. Some multiplication-table responsibility has moved from operator repetition into machine/control representation.

This is **P/M** state/event behavior informed by **H/E1–E2** sources. It does not establish historical speed, effort, control-plate geometry, or identical workflows across Millionaire revisions.

## Key-driven accumulation

Turck US1154897A is an **H/E1** anchor for a value key immediately actuating a register without a separate intervening power/control key. The generic repository mechanism preserves the architectural distinction:

```text
press tens 3 → contribute 30
press units 4 → contribute 4
accumulator = 34
```

Two key strokes are two arithmetic cycles. There is no separate crank action. The operator chooses digit and decimal column; the mechanism applies place value, updates decimal state, and performs any serialized P/M carry.

The trace is not Comptometer geometry or timing. It does not model simultaneous columns, incomplete strokes, correction, or one universal keyboard workflow.

## Operator-controlled division

The generic `8478 ÷ 314` P/M trace exposes rather than hides its loop:

- maintain the current carriage offset;
- request subtraction repeatedly;
- observe an overshoot marker;
- request add-back correction;
- shift down one place;
- continue until quotient/remainder state permits completion.

The mechanism maintains residual, quotient digits, operation phase, and legal-action constraints. The teaching algorithm assigns decision/correction requests to the operator-facing action stream. The tested trace includes ten subtraction events, one overshoot, one correction, and one place shift before quotient `27`, remainder `0`.

This is not back-filled as a Thomas, Burkhardt, Curta, or Odhner manual sequence. Exact historical control directions, bells, counter signs, correction linkages, and stop decisions remain source/model specific.

## Persistent output

Calculation, live state, and persistent output are separate responsibilities. In the repository ledger:

```text
+12, +8, SUBTOTAL, +5, TOTAL
```

- item entry changes the accumulator and writes an ITEM line;
- subtotal writes `20` and retains accumulator `20`;
- total writes `25` and clears the working accumulator to `0`;
- all five structured lines persist after clearing.

US885202A is an **H/E1** anchor for distinct subtotal-retain and total-clear semantics in its described class. The repository event order remains **P/M**, not Burroughs geometry or office procedure. Difference Engine persistent output addresses mathematical-table copying/typesetting responsibilities rather than transaction listing.

No quantified labor saving, productivity, throughput, or error-rate claim is made.

## Responsibility matrix

| Source/lesson context | Evidence role | Input/selection | Operator repetition | Place-value management | Stop/decision | Correction/recovery | Machine-encoded arithmetic/control | Persistent output | Not established |
|---|---|---|---|---|---|---|---|---|---|
| early stepped-drum/pinwheel multiplication; repository `314×27` | H/E2 functional overview + P/M counts | set multiplicand/multiplier procedure | operator supplies 7 then 2 cycles in lesson | operator shifts one place | operator sequences digits | not modeled here | selected engagement/pins and accumulator contribution | register result only in lesson | historical time/cost; universal model workflow/geometry |
| direct multiplication / Millionaire-informed lesson | H/E1–E2 functional control relation + P/M trace | select each multiplier digit | one modeled operation cycle per selected digit | one explicit shift | operator sequences digit/place path | source-specific controls open | encoded multiple table/control selects contribution | accumulator result | speed/effort; control-plate geometry; revision universality |
| key-driven `30+4` | H/E1 immediate key actuation anchor + P/M trace | choose column/digit and press | two key-stroke cycles; no separate crank | key column supplies place | each press completes one lesson cycle | incomplete-stroke correction not modeled | place-value contribution, accumulator/carry state | live accumulator | simultaneous columns, model timing, operator performance |
| operator division `8478÷314` | P/M trace; H/R procedure context remains separate | dividend/divisor and initial place | ten subtraction requests | one shift down | overshoot/completion decisions exposed | one add-back correction | residual, quotient, phase and legal transitions | quotient/remainder state | named-machine manual sequence, directions, bells/linkage |
| printing ledger | H/E1 subtotal/total semantics + P/M ledger | enter items/request output kind | three item actions | not applicable | choose subtotal versus total | subtotal retains; total clears | accumulator and structured line semantics | five ITEM/SUBTOTAL/TOTAL lines persist | printer geometry, office procedure, quantified savings/errors |

## Conclusion and implementation consequence

Mechanization does not simply replace “manual calculation” with “automatic calculation”; it moves particular arithmetic responsibilities between operator procedure, represented machine state, control mechanisms, and output systems.

The public comparison therefore presents categorical P/M counts and responsibilities, not a scalar automation/efficiency score. Unlike operations are not ranked, and repository events are never relabeled as historical seconds, effort, skill, fatigue, productivity, or cost.

## Open evidence

- exact operator-manual pages for identified stepped-drum/pinwheel models;
- model-specific Millionaire operating controls and revision mapping;
- Comptometer manual/model evidence for simultaneous input, incomplete stroke, and correction;
- source-specific division stop/correction procedures;
- period office procedures and directly measured effects of persistent output.