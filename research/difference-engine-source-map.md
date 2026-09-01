# Difference Engine provenance and tabular-output boundary

**Checked: 2026-09-01**

## Question

Which claims belong to Babbage's designs, the surviving 1832 fragment, modern Difference Engine No. 2 reconstruction, and actually built Scheutz printing engines—and what changes when a calculated value becomes persistent output without human re-copying?

## Claim types

- finite-difference table generation: **M**;
- historical objects, drawings, designs and uses: **H**;
- modern Difference Engine No. 2 construction from Babbage's plans: **R**;
- repository calculation/output trace: **P/M**.

Historical evidence strength follows `docs/EVIDENCE_POLICY.md`.

## 1. Machine and design generations

| Layer | Source-supported boundary |
|---|---|
| Difference Engine No. 1 design/construction project | Babbage design intended finite-difference calculation and automatic printing; not completed |
| surviving Difference Engine No. 1 portion | Joseph Clement assembled the surviving portion in 1832; approximately one-seventh/2,000 parts, not the complete machine or printer |
| Difference Engine No. 2 design | Babbage design of 1847–1849, including calculation plus printing/stereotyping output concepts |
| modern Difference Engine No. 2 | Science Museum calculating section completed 1991; printing/stereotyping apparatus completed and added 2002; institutional reconstruction, not a lifetime Babbage-built artifact |
| Scheutz prototype and metal engines | working 1843 prototype; metal machines of 1853 and 1859; actually built nineteenth-century printing difference engines distinct from Babbage's printer architecture |
| this repository | generic P/M leading-value arithmetic and serialized output responsibilities, not source-specific machinery |

## 2. Difference Engine No. 1

Science Museum Group, object `co62243`, *Difference Engine No. 1*:

<https://collection.sciencemuseumgroup.org.uk/objects/co62243/difference-engine-no-1-difference-engine>

The institutional record states that the object is a portion of Babbage's calculating machine built by Joseph Clement in London in 1832. It describes approximately 2,000 parts and one-seventh of the complete engine, and states that the planned Difference Engine was intended to calculate series using finite differences and automatically print results.

- Claim type: **H**.
- Evidence: **E1** for the surviving/catalogued object and its provenance; institutional description for project intent.

The surviving portion does **not** prove that the planned printer was physically completed in 1832. The repository does not transfer geometry from this fragment to the output lesson.

## 3. Difference Engine No. 2: design versus reconstruction

### Institutional object

Science Museum Group, object `co62748`, *Babbage's Difference Engine No 2, 2002*:

<https://collection.sciencemuseumgroup.org.uk/objects/co62748>

The record separates the 1847–1849 Babbage design from Science Museum construction: calculating section first completed in June 1991, printing mechanism completed and added in 2002. It states that Difference Engine No. 2 was not built in Babbage's lifetime.

- Babbage design: **H/E1–E2** at the level established by the design/archive and institutional catalog.
- modern built engine: **R/E2**, directly documented institutional reconstruction.

### Directly inspected institutional technical description

Doron D. Swade, *Charles Babbage's Difference Engine No. 2: Technical Description*, Science Museum, London, March 2020:

<https://www.sciencemuseum.org.uk/sites/default/files/2023-09/DE2_Technical_Description.pdf>

The complete 232-page PDF (front matter i–vi, numbered text pp. 1–222) was directly inspected. Its “Scope and Purpose” page `i` explicitly calls the account a detailed interpretation of Babbage's designs and records design/engineering decisions plus precautionary/remedial modifications made during the modern physical realization. It is therefore **R/E2 institutional technical reconstruction**, not H/E1 merely because it is detailed.

Exact inspected anchors used here:

- p. i: scope distinguishes decoding nineteenth-century drawings, modern engineering decisions, and modifications to the operational reconstruction;
- pp. 4–9: source/editorial discussion; the text states that original drawings omit choices of materials, manufacture, requisite precision and finish, while 219 modern construction drawings specify the reconstructed machine's 8,000 parts;
- pp. 21–24, Figures 3.2–3.4: interpretation of original Timing Diagram `BAB/F/385/1` and addition/carriage drawing `BAB/A/171`;
- pp. 33–45, Figures 3.16–3.20: reconstructed account of warning and carriage of tens, restoration and warning-latch reset;
- pp. 49–54, Figures 4.1–4.3: output apparatus and result transfer from tabular figure wheels to printing/punch-wheel roles;
- pp. 83–85: omitted paper-loading/securing provisions and modern additions, clearly reconstruction/build decisions;
- pp. 187–188: original timing diagram lacks exact lock phasing; modern diagram `337 X 21` supplies reconstruction detail;
- pp. 212–218: appendix mappings for original archive drawings, including `BAB/B/001–003`, `BAB/A/171`, and `BAB/F/385/1`, versus modern construction drawings.

The account supports reconstruction-level interpretation of separate giving-off, warning/carry and restoration phases, and of the calculated-result transfer to inked printing and stereotype mould roles. It does **not** turn modern lock phasing, materials, tolerances, manufacturing drawings, fixes or modifications into Babbage-lifetime specifications.

Computer History Museum's *The Engines* and *A Modern Sequel* remain useful institutional context, but the Science Museum PDF is now the exact technical anchor used here.

The central output-contract point remains conservative: a persistent checking copy or plate-making path reduces re-copying/typesetting of computed table values. It does not eliminate every human or production error, and the repository's three P/M output events are not the reconstruction's physical timing.

## 4. Babbage Papers drawing and notation anchors

The Science Museum Group archive index was directly inspected:

- *The Babbage Papers*, `BAB` / institutional record `aa110000003`, made 1821–1905:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000003/the-babbage-papers>

The catalog describes 11 plan-press drawers plus 8 linear metres of shelving, open access, and three broad material types: notebooks, engineering drawings, and notations describing intended actions. This is H/E1 for archive identity, extent, arrangement and catalogued scope—not a source-specific geometry claim.

### General design and calculation/addition-drive subjects

- `BAB/B/001` / `aa110117998`, *Elevation of Difference Engine No.2*: directly inspected record; one sheet, made 1847–1848, Babbage maker attribution, open access. Its archive browser also identifies `BAB/B/002` as the plan tracing of `BAB/A/164` and `BAB/B/003` as the addition-carriage/axis-drive tracing of `BAB/A/171`. This is H/E1 for record identity, date, extent and catalogued subject only; the displayed record does not support tooth counts, timing or manufacturing interpretation.
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110117998/elevation-of-difference-engine-no-2>
- `BAB/A/171` / `aa110000314`, *Addition carriage and mode of driving the axes of Difference Engine No. 2*:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000314/addition-carriage-and-mode-of-driving-the-axes-of-difference-engine-no-2>

The directly inspected record identifies one sheet, 62 × 89 cm, open access. Its title safely anchors a calculating/addition-carriage drive subject. It is not evidence for printer timing or full printer geometry.

### Printing/stereotype subjects

Directly inspected records include:

- `BAB/B/013` / `aa110000343`, tracing of `BAB/A/172`, *End view of inking printing paper and stereotyping apparatus*, made 1847–1848, one sheet:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000343>
- `BAB/B/014` / `aa110000344`, tracing of `BAB/A/173`, *Plan of inking, printing and stereotype apparatus*, made 1847–1848, one sheet:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000344>
- `BAB/A/174`, rack pinions connecting table figure wheels with printing/stereotype sectors, `aa110000317`; tracing `BAB/B/012`, `aa110000342`:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000317/rack-pinions-for-connecting-table-figure-wheels-with-printing-stereotype-sectors-elevation>
- `BAB/A/175`, plan of cams for punching with small stereotype sectors and removing paper rollers, `aa110000318`:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000318/plan-of-cams-for-punching-with-small-stereotype-sectors-and-cams-for-removing-paper-rollers>
- `BAB/A/176`, calculating part with means of conveying numbers to stereotype sectors, `aa110000319`; tracing `BAB/B/004`, `aa110000115`:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000319/plan-of-the-calculating-part-of-the-difference-engine-with-the-means-of-conveying-numbers-to-stereotype-sectors>

### General-motion notation

The archive records directly expose the `BAB/A/178` set rather than leaving it as an index-only pointer:

- `BAB/A/178` / `aa110000321`, *General notation of the motions of the Difference Engine No. 2*: six related plans, open access;
- `BAB/A/178/1` / `aa110000322`, circular motions of calculating axes;
- `BAB/A/178/2` / `aa110000323`, vertical motions of calculating axes;
- `BAB/A/178/3` / `aa110000324`, *Motions of the printing apparatus*, August 1848, one sheet, 64 × 94 cm;
- `BAB/A/178/4` / `aa110000325` and `/5` / `aa110000326`, motions of stereotype frames; `/4` was directly inspected as August 1848, one sheet, 64 × 94 cm.

Parent: <https://collection.sciencemuseumgroup.org.uk/documents/aa110000321>

- Claim type: **H**.
- Evidence: **E1** for archive identity/existence, dates/dimensions where stated, and catalogued subjects.

The records are open access and state that copies may be supplied under current copyright legislation and Science Museum Group terms. Images were viewed only to identify the records and were not copied. Titles and image availability do not establish tooth counts, linkage paths, synchronization, force/load, tolerances, manufacturing method, whether the complete printer was built in Babbage’s lifetime, or the repository browser event order.

The source chain therefore remains separated:

```text
BAB/A/171 calculation/addition-drive subject
BAB/A/172–178 printing/stereotype drawing and motion-notation subjects
Science Museum 1991/2002 construction = R/E2 institutional reconstruction
repository difference/output trace = P/M inspection model
```

## 5. Scheutz: built printing engines are a separate history

### CHM synthesis

Computer History Museum, *Georg & Edvard Scheutz*:

<https://www.computerhistory.org/babbage/georgedvardscheutz/>

The account distinguishes a working 1843 prototype from metal machines completed in Stockholm in 1853 and London in 1859. It reports the 1853 engine went to the Dudley Observatory and is now at Smithsonian, while the 1859 engine contributed to the 1864 English Life Table.

### Surviving 1859 engine

Science Museum Group, object `co62255`, *Scheutz Difference Engine, third model, 1859*:

<https://collection.sciencemuseumgroup.org.uk/objects/co62255>

The catalog identifies a Bryan Donkin & Co. 1859 machine, bought by the British government for the English Life Table of 1864, and includes a surviving holder described as part of the printing apparatus.

### Smithsonian boundary

Smithsonian record `MA.323659` / `nmah_997042` and the institutional difference-engine group were requested, but this environment returned HTTP 403. Their identifiers are retained as future anchors; no additional inaccessible catalog detail is asserted here.

- Built engines/object provenance: **H/E1** where established by the surviving Science Museum record.
- CHM historical synthesis: **H/E2**.

Scheutz machines show that printing difference engines were actually built in the nineteenth century. Their architecture must not be relabelled as Babbage's printer architecture, and their use/effectiveness must not be romanticized: CHM notes that the 1859 machine's contribution was limited and operation temperamental.

## 6. Repository model and output boundary

`src/mechanisms/difference-column/` is **P/M**. It models 2–5 leading finite-difference values and a deterministic low-order-first teaching update. Tests validate arithmetic, sequence, row/output consistency and replay. It does not claim historical columns, digit widths, carry timing or crank timing.

`src/exhibits/difference-output-flow/` consumes the next value produced by that tested mechanism and serializes three responsibilities:

```text
TABLE_VALUE_READY
→ CHECK_COPY_RECORDED
→ STEREOTYPE_OUTPUT_ROLE_RECORDED
```

These are **P/M inspection states**, not three historical stop-motion phases and not a simulation of `BAB/A/173–176`. “Stereotype output role” records only the functional distinction between a visible checking copy and a master/plate-production path.

## 7. Conclusion and open work

```text
M: finite differences generate polynomial tables through repeated addition.
H/R: Babbage designs and modern reconstruction include automatic tabular print/stereotype output at the source-supported level.
H: Scheutz provides actually built nineteenth-century printing-difference-engine comparisons.
P/M: the repository serializes calculation-ready → persistent-output roles solely for inspection.
```

Open before any source-specific mechanical visualization:

- legible drawing/facsimile interpretation beyond titles;
- printer synchronization and transfer timing;
- formatting controls at drawing/mechanism level;
- stereotype materials and production process details;
- tolerances, force, backlash and reconstruction manufacturing decisions;
- independently accessible Smithsonian object detail for the 1853 Scheutz engine.