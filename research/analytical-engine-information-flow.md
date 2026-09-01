# Analytical Engine information flow: source roles, reconstruction, and teaching trace

**Checked: 2026-09-01**

## Question

Which Store, Mill, card and output claims are directly anchored in nineteenth-century pages/drawings; which choices belong to a later emulator; and which ordering exists only in this repository?

## Claim types

- contemporary publications and catalogued drawings: **H**;
- John Walker/Fourmilab executable choices: **R**;
- `src/exhibits/analytical-engine-flow/`: **P/M**.

## 1. Menabrea/Lovelace 1843: direct facsimile/page anchors

Directly inspected access paths:

- Project Gutenberg #75107, credited from Internet Archive page images: <https://www.gutenberg.org/ebooks/75107>
- HTML preserving original `[Pg …]` pagination: <https://www.gutenberg.org/files/75107/75107-h/75107-h.htm>
- scanned *Scientific Memoirs*, vol. III page images: <https://en.wikisource.org/wiki/Index:Scientific_Memoirs,_Vol._3_(1843).djvu>

Publication identity: L. F. Menabrea, translated with notes by Ada Lovelace, *Sketch of the Analytical Engine invented by Charles Babbage, Esq.*, Richard and John E. Taylor, London, 1843, article XXIX, printed pp. 666–731.

Exact inspected printed-page anchors:

- **p. 677** (scan leaf `/687`): numbers are transferred to the Mill for operation and results to indicated Variable columns; the text identifies the Mill as the working portion and Variable columns as where results are represented/arranged;
- **p. 679** (scan leaf `/689`): a table explicitly separates operation-cards, cards of variables, source columns and result columns for an intermediate calculation;
- **p. 704** (scan leaf `/714`, Lovelace note): Operation cards put the Mill into operation states, while Variable cards supply numbers and locate temporary/ultimate results.

The page images themselves were directly visible; no page number was derived merely from a modern heading.

- Claim type: **H**.
- Evidence: **E1 for the 1843 published pages**.

These pages establish published functional roles, not one frozen final machine, exact card holes/readers/synchronisation, Mill–Store linkage geometry, or a complete built Analytical Engine.

## 2. H. P. Babbage 1888: transcription boundary

Fourmilab transcription:

<https://www.fourmilab.ch/babbage/hpb.html>

The transcription identifies a paper read at Bath on 12 September 1888. Items 10–15 distinguish Number, Directive and Operation cards. Items 18–20 report `(ab+c)d`:

```text
Number cards associate a,b,c,d with Store columns 1–4
Directive cards bring operands to the Mill
three Operation cards produce p=ab, q=p+c, then d×q
Directive cards retain p/q in Store columns 5/6
final result goes to Store column 7 and printing/stereo-moulding
```

Item 20 reports three Operation Cards and fourteen Directive Cards in separate sets/rollers.

A bounded Open Library/Internet Archive discovery attempt did not yield a stable directly inspectable 1889 scan in this environment. Therefore:

- historical publication claim type: **H**;
- current access strength in the typed atlas: **E3 specialist transcription**;
- no historical printed page number, facsimile typography or figure claim is made.

This is the historical formula shape used by the repository; values `2,3,4,5` and repository event serialization are P/M.

## 3. Science Museum drawing records

Directly re-inspected:

- `BAB/A/125` / `aa110000267`, *Plan of consecutive mill counting apparatus for General Plan 28*, December 1843, one sheet, 65×94 cm:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000267/plan-of-consecutive-mill-counting-apparatus-for-general-plan-28-plan-note>
- `BAB/D/028` / `aa110000376`, *Mill. Sheet 28. Superseded by Sheet 25*, 12 June 1858, 63×98 cm:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000376>
- `BAB/P/167` / `aa110000439`, *Plan of bolts for store*, made 8 June–12 August 1858, with additional figures/elevation dated 12 August 1859:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000439>

- Claim type: **H**.
- Evidence: **E1 for record identity, metadata and catalogued subject**.

“Superseded” and the separated dates/phases demonstrate design evolution. Titles/images do not prove exact Store–Mill connections, card-reader timing, every depicted geometry, or a completed machine.

## 4. Walker/Fourmilab reconstruction boundary

Directly inspected:

- authenticity rationale: <https://www.fourmilab.ch/babbage/authentic.html>
- programming-card documentation: <https://www.fourmilab.ch/babbage/cards.html>
- emulator documentation: <https://www.fourmilab.ch/babbage/emulator.html>

Walker explicitly documents that the Engine was never completed and historical descriptions changed. The emulator chooses an executable interpretation. Its card documentation says historically separate card streams are abstracted into one textual stream because coordination was not precisely specified and a merged representation is easier to prepare/read.

- Claim type: **R**.
- Evidence: **E2 for documented reconstruction choices**; the pages are direct evidence of what the emulator chooses, not nineteenth-century machine syntax.

The textual `N/L/Z/S/+/-/*//` forms, unified stream, Step control and software state are not historical punched-card encodings or exact reader order.

## 5. Layers that must remain separate

| Layer | Safe use |
|---|---|
| Menabrea/Lovelace 1843 pages | H/E1 Store/Mill and operation/variable-card functional roles at printed pp. 677, 679, 704 |
| H. P. Babbage 1888 transcription | `(ab+c)d` Number/Directive/Operation shape without printed-page precision |
| Science Museum records | H/E1 design-record identity, date, dimensions and subject |
| Walker/Fourmilab | R/E2 executable interpretation and merged text-card convention |
| This repository | tested P/M small-value event trace |

## 6. Repository abstraction

`src/exhibits/analytical-engine-flow/` models:

```text
given values → teaching Store locations
Store → two Mill inputs
operation selection → validated arithmetic result
Mill → intermediate Store location
repeat for p, q, final result
Store → output
```

All events remain **P/M**. Reducer/replay validates ordering and arithmetic for `a=2,b=3,c=4,d=5 → 50`. It does not claim historical event timing, card holes, reader synchronization, exact Mill/Store geometry, one frozen design, or CPU/memory identity.

This slice changes evidence anchors and discoverability only; mechanism-core semantics remain unchanged.