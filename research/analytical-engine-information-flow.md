# Analytical Engine information flow: source roles, reconstruction, and teaching trace

**Checked: 2026-09-01**

## Question

Which Store, Mill, card, and output claims come from nineteenth-century descriptions or drawings; which choices belong to later emulator reconstruction; and which event ordering belongs only to this repository?

## Claim types

- contemporary publications and catalogued drawings: **H**;
- John Walker/Fourmilab's choices where incomplete designs are made executable: **R**;
- `src/exhibits/analytical-engine-flow/`: **P/M**.

Evidence strength applies separately to H/R claims under `docs/EVIDENCE_POLICY.md`.

## 1. Menabrea/Lovelace publication (1842/1843)

### Access path

Fourmilab transcription of L. F. Menabrea's 1842 memoir and Ada Lovelace's translated/expanded 1843 publication:

<https://www.fourmilab.ch/babbage/sketch.html>

This is a later specialist-hosted transcription, not a facsimile/page citation. The nineteenth-century publication is **H**; this URL is the access path. Exact edition typography/page numbering remains open here.

### What the text establishes

The publication distinguishes the Store from the Mill: quantities are retained in columns/variables in the Store and quantities to be operated upon are brought to the Mill. It distinguishes Operation cards from Variable cards, and explains that card groups can be backed/repeated. Its tables and substitutions represent ordered analytical calculations, including intermediate variables.

- Claim type: **H**.
- Evidence: contemporary publication reached through transcription; **E1 for the published text**, with access/provenance limitation stated.

It does not supply one complete frozen production specification. This repository does not copy modern slogans or infer card holes, shafts, timing, or exact reader coordination.

## 2. Charles Babbage, *Passages*, Chapter VIII (1864)

### Access path

<https://www.fourmilab.ch/babbage/lpae.html>

Babbage retrospectively describes design work and continuing improvement, Jacquard control, the Store/Mill distinction, operation cards and variable cards. In the transcribed chapter:

- the Store holds variables and quantities arising from operations;
- the Mill receives quantities to be operated upon;
- one card set specifies operations and another variables/subjects;
- operation cards and associated variable cards form an ordered formula procedure;
- he explicitly says describing successive improvements would require many volumes.

- Claim type: **H** for Babbage's published retrospective account.
- Evidence: **E1 for what that publication says**, reached through a specialist transcription rather than verified edition/page facsimile.

The chapter is not evidence that one final complete Engine was built. Its own emphasis on successive improvements warns against flattening decades of design into one architecture.

## 3. H. P. Babbage, British Association paper (1888)

### Access path and status

<https://www.fourmilab.ch/babbage/hpb.html>

H. P. Babbage reported and explained Charles Babbage's design after Charles's death. It is direct evidence for H. P. Babbage's published account, not automatically an original Charles Babbage drawing specification.

### Concrete anchors

Items 10–15 distinguish:

- **Number Cards** communicating given constants;
- **Directive Cards** specifying Store destinations/transfers and general control;
- **Operation Cards** preparing the Engine for arithmetic operations.

Items 18–20 give `(ab+c)d` as a concrete flow:

1. Number cards associate `a,b,c,d` with Store columns 1–4;
2. Directive cards bring `a,b` to the Mill;
3. Operation card 1 multiplies them to `p`;
4. a directive returns `p` to Store column 5;
5. `p,c` return to the Mill and operation 2 produces `q`;
6. `q` goes to Store column 6;
7. `d,q` enter the Mill and operation 3 produces the final value;
8. that value goes to Store column 7 and then printing/stereo-moulding output.

Item 20 counts three Operation Cards and fourteen Directive Cards in separate sets/rollers. This is the historical formula shape used by the software; the fixture values `2,3,4,5` are not historical.

- Claim type: **H**.
- Evidence: historical published report, **E1 for what H. P. Babbage reported**.

## 4. Science Museum Babbage Papers: design records, not one frozen machine

Collection records establish the existence/title/date or description of design sheets:

- `BAB/A/125`, *Plan of consecutive mill counting apparatus for General Plan 28*, December 1843: <https://collection.sciencemuseumgroup.org.uk/documents/aa110000267/plan-of-consecutive-mill-counting-apparatus-for-general-plan-28-plan-note>
- `BAB/D/028`, *Mill. Sheet 28. Superseded by Sheet 25*, 12 June 1858: <https://collection.sciencemuseumgroup.org.uk/documents/aa110000376>
- `BAB/P/167`, *Plan of bolts for store*, with additional figures and an elevation dated 12 August 1859: <https://collection.sciencemuseumgroup.org.uk/documents/aa110000439>

- Claim type: **H**.
- Evidence: institutional records for catalogued historical documents, **E1 for record existence/metadata**.

The word “superseded,” dates spanning phases, and separate Store/Mill records demonstrate design evolution. The minimal catalog text does not establish every mechanical relationship shown on an image, nor a complete built Engine. The repository links records and does not reproduce images or infer geometry from titles.

## 5. Walker/Fourmilab: reconstruction and emulator conventions

### Sources inspected

- authenticity rationale: <https://www.fourmilab.ch/babbage/authentic.html>
- programming-card conventions: <https://www.fourmilab.ch/babbage/cards.html>
- web emulator and stepping: <https://www.fourmilab.ch/babbage/emulator.html>

Walker explicitly discusses the difficulty of emulating a machine never completed and differences among historical descriptions. The emulator chooses fifty-digit capacity from Babbage's later publication and states criteria for authenticity.

Its card manual distinguishes Operation, Number, and Variable cards, but also explicitly says the emulator **unifies historically separate card streams into one stream**, because their coordination was not precisely specified and one merged program is easier to prepare/read. It introduces textual card syntax and emulator behavior; these are reconstruction/emulator conventions, not nineteenth-century punched-card notation.

The web emulator provides Reset/Start/Step, an Annunciator panel exposing Mill, Store and current card, and trace output. Its Step processes the current card, advances and halts. These are directly verified features of that later emulator documentation.

- Claim type: **R** for reconstruction choices and emulator interpretation.
- Evidence: emulator author's own documentation, **E1 for what the emulator claims/does**, not historical E1 for the unfinished Engine.

No Fourmilab syntax or code is copied. A URL is not a reuse license.

## 6. Ambiguity resolved

These layers must not be merged:

| Layer | What it supports |
|---|---|
| Menabrea/Lovelace and Charles Babbage publications | Historical Store/Mill, operation/variable card concepts, repetition, analytical procedure |
| H. P. Babbage 1888 | A concrete reported Number/Directive/Operation-card flow for `(ab+c)d` |
| Science Museum records | Existence and evolution of particular Store/Mill design sheets |
| Walker/Fourmilab | A later executable interpretation, unified text-card stream, step/trace UI |
| This repository | A deliberately small deterministic P/M event trace |

The categories differ: Menabrea/Lovelace and Charles Babbage emphasize Operation/Variable roles, H. P. Babbage uses Number/Directive/Operation terminology, while Walker documents its own Number/Variable/Operation syntax and merged stream. The repository therefore labels events by explanatory **role** rather than claiming one exact historical reader order.

## 7. Software abstraction decision

`src/exhibits/analytical-engine-flow/` models only:

```text
given values → named teaching Store locations
Store → two Mill inputs
operation selection → validated arithmetic result
Mill → intermediate Store location
repeat for p, q, final result
Store → output
```

Every event is marked **P/M**. Reducer/replay validates sequence, Store sources/destinations, operand availability, arithmetic results, output timing and final state. The flow uses H. P. Babbage's `(ab+c)d` shape but small P/M values:

```text
a=2, b=3, c=4, d=5
p=6, q=10, result=50
```

It refuses to claim:

- complete Analytical Engine emulation;
- exact card holes, reader synchronisation, text syntax or instruction encoding;
- historical JavaScript object/Store geometry;
- exact Mill shafts, timing, capacities or carry mechanism;
- one design frozen across 1830s–1850s drawings and later publications;
- identity between Store/Mill and modern memory/CPU.

The exhibit's explanatory increment is evidence-aware, inspectable intermediate-value flow—not a replacement for Walker's emulator.