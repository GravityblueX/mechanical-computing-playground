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

### Reconstruction account

Computer History Museum:

- *The Engines*: <https://www.computerhistory.org/babbage/engines>
- *A Modern Sequel*: <https://www.computerhistory.org/babbage/modernsequel/>

The reconstruction account says Babbage's twenty large design drawings did not specify all manufacturing details such as tolerances, materials, finish and manufacturing method; modern manufacturing drawings were therefore required. It dates the calculating section to 1991 and printer/stereotyping completion to 2002.

The CHM account supports, at institutional-reconstruction level, a printer shared in design lineage with Analytical Engine work that produced an inked checking copy and stereotype impressions for making printing plates, with tabular-format controls. This is evidence for design/reconstruction functions, not exact historical timing in an unbuilt lifetime machine.

The central output-contract point is conservative: a persistent checking copy or plate-making path reduces the need to re-copy and typeset computed table values manually, moving the trust boundary beyond arithmetic alone. It does not eliminate every possible human or production error.

## 4. Babbage Papers drawing anchors

Science Museum Group catalog/search records directly verify these drawing identities and described subjects:

- `BAB/A/173`, plan of inking, printing and stereotype apparatus; direct record `aa110000316`; tracing `BAB/B/014`, `aa110000344`:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000316/plan-of-inking-printing-and-stereotype-apparatus>
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000344/plan-of-inking-printing-and-stereotype-apparatus-tracing-of-bab-a-173>
- `BAB/A/174`, rack pinions connecting table figure wheels with printing/stereotype sectors, `aa110000317`; tracing `aa110000342`:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000317/rack-pinions-for-connecting-table-figure-wheels-with-printing-stereotype-sectors-elevation>
- `BAB/A/175`, plan of cams for punching with small stereotype sectors and removing paper rollers, `aa110000318`:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000318/plan-of-cams-for-punching-with-small-stereotype-sectors-and-cams-for-removing-paper-rollers>
- `BAB/A/176`, calculating part with means of conveying numbers to stereotype sectors, `aa110000319`; tracing `aa110000115`:
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110000319/plan-of-the-calculating-part-of-the-difference-engine-with-the-means-of-conveying-numbers-to-stereotype-sectors>

- Claim type: **H**.
- Evidence: **E1** for archive identity/existence and catalogued subject.

The available pages expose images, but this pass uses catalog identity/title only. It does not claim tooth counts, dimensions, exact linkage paths, synchronization or timing. Images were not copied.

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