# Curta source map

**Checked: 2026-09-01**

## Question

Which Curta operator and architectural claims are tied to directly inspected primary documents, and which still require model/revision mapping?

## Claim types

- patent and identified primary documents: **H**;
- interpretation connecting documents to production machines: **H/R**;
- current browser cylinder and generic interlock/division modules: **P** or **P/M**.

## 1. Curt Herzstark patent US 2,525,352

Directly inspected:

- Google Patents text: <https://patents.google.com/patent/US2525352A/en>
- linked four-page patent PDF: <https://patentimages.storage.googleapis.com/44/9b/f8/683916f0988046/US2525352.pdf>

The PDF identifies Curt Herzstark, filing 9 January 1948, Austrian priority 7 March 1946, grant/publication 10 October 1950, two drawing sheets and five claims. Drawing sheets 1–2 (Figures 1–11) and specification pages 1–4 were inspected.

At this precision, the patent supports a miniature four-operation design whose result-counting and revolution-counting members are arranged around a common driving member. The specification maps Figures 1–2 to engaged/disengaged sections, Figures 3–4 to result/revolution counting positions, Figures 5–7 to a modified embodiment, and Figures 8–11 to compact-arrangement details.

- Claim type: **H**.
- Evidence: **E1 for the patented embodiment**.

It does not prove that every production Type I or Type II exactly matches every figure/claim, nor that the repository cylinder reproduces tooth, pinion, axle, detent, transfer or safety-linkage geometry.

## 2. Directly inspected operator and service facsimiles

### 2.1 *Your CURTA Calculator*

Directly inspected specialist-hosted primary scan:

<https://www.mycurta.com/Documents/Curta-User-Guide-Your-CURTA-Calculator-210810.pdf>

Identity visible on viewer page 1/2:

- exact title: *Your CURTA Calculator*;
- language: English;
- printed provenance: Contina, Manufactory of Office and Calculating Machines Ltd., Vaduz/Liechtenstein (via Switzerland);
- document role: operator guide;
- stated coverage: Model I `8×6×11` and Model II `11×8×15`; only Model I is illustrated;
- no printed edition/date was visible on the inspected page.

The inspected page directly supports these operator instructions and roles:

- clockwise handle operation and return to its zero-stop/home position;
- raised/lowered handle for minus/plus turns;
- carriage can be raised only at zero stop; raised carriage locks the handle;
- setting knobs/register, black result/product dial, white counter/quotient dial;
- clearing lever stop positions and their operator-visible lock consequence;
- reversing-lever operator roles.

- Claim type: **H**.
- Evidence: **E1 for what this identified primary operator page says**.
- Access provenance: `mycurta.com` is a specialist mirror, not the original publisher or an institution.

The guide's statement that the models are “identical but for capacity” is an operator-guide statement at this document's precision. It does not establish equality of every hidden part/revision, exact interlock linkage, or identity with the repository's generic state machine.

### 2.2 Type I service manual

Directly inspected specialist-hosted scan:

<https://www.mycurta.com/Documents/Curta_1_Servivce_Manual_engl.pdf>

The cover (viewer page 1/59) identifies:

- *Service-Manual: Curta Calculating Machine*;
- Model I `8×6×11`;
- English;
- Contina AG, Mauren, Liechtenstein;
- issued autumn 1967.

- Claim type: **H**.
- Evidence: **E1 for document identity shown on the cover**.
- Document role: service manual, **not** operator manual.

Only the cover was used here. No hidden linkage, adjustment procedure, production-change chronology, or Type II construction is inferred from uninspected pages.

### 2.3 Mirror/index boundary

The mycurta/vcalc index exposes distinct Type I and Type II English/German service-manual, BOM and drawing links. Curta.org separately lists operator-manual transcriptions. These indexes are access/reference layers; filenames or collector descriptions are not silently promoted into manufacturer provenance.

- mycurta: <https://www.mycurta.com/cu.htm>
- mirror: <https://vcalc.org/cu.htm>
- Curta.org index/transcription: <https://curta.org/wiki/CurtaManuals>

## 3. Division transcription

<https://curta.org/wiki/DivisionAlgorithm>

This specialist transcription describes divisor setting, black result/product dial, white quotient/counter dial, carriage-place selection, repeated turns, overshoot followed by an immediate opposite turn, and a subtractive method using the reversing lever. It is not a directly inspected primary facsimile and has no facsimile-page precision in the atlas.

The repository `operator-division` signed residual events remain **P/M**, not Curta internal timing.

## 4. Production Type I / Type II boundary

Directly established in this pass:

```text
operator guide: Model I 8×6×11; Model II 11×8×15
Type I service cover: Model I 8×6×11; autumn 1967
patent: one identified patented embodiment
```

Still open:

- serial/revision mapping from patent embodiment to production machines;
- Type II service-document content beyond index identity;
- whether hidden parts/linkages changed across all production revisions;
- exact handle, clearing, carriage and safety-lock geometry/timing;
- tooth profiles, ratios, decade-transfer sequence, tolerances and measured performance.

## 5. Repository boundary

`#/curta` remains a P operational diagram. `set 314 → seven turns → shift → two turns → 8478` is a tested arithmetic/operator abstraction, not a source-specific Curta transition model. The generic `operator-division` and `setting-crank-interlock` modules remain separate P/M lessons.

The implementation consequence of this source pass is evidence metadata and cross-linking only—no source-specific internal animation.