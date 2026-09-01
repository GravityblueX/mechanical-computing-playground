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

### 2.3 Type II service manual

Directly inspected specialist-hosted primary scan:

<https://www.mycurta.com/Documents/Curta_2_Service_Manual_Curta2_green_e.pdf>

The 43-page image-only scan was rendered locally and visually checked. PDF page 1 identifies *Servicehandbuch – Service Manual*, `CURTA Mod. II`, and `CONTINA AG. VADUZ FL`; the cover shows no capacity, issue date, or revision number. PDF page 2 says replacement leaves contain the latest modifications, with changes/additions in red, and warns that Model I service-manual pictures are reused where convenient because Model II is “in principle very similar,” while details and especially size proportions may deviate from the actual Curta II.

Directly inspected control/service anchors:

- PDF page 6, printed leaf `N I-a`: crank-removal instructions say “Pull crank up and turn backwards”; the retaining-bush step requires “Mainshaft in zero position”; carriage removal warns the operator to cover the housing so spring/bush parts are not lost, and identifies locking pin `21223-1`;
- PDF page 10, printed leaf `O-1-2`: dismantling step 11 identifies the `reversing lever complete`, part `2531`, and gives its removal sequence; the same leaf separately identifies RZ/UZ tens-carry levers and their spring, without establishing an operator carry procedure;
- PDF page 34, printed leaf `S 3`: assembly groups separately identify `complete reversing lever`, `complete clearing plate`, `complete crank`, and `complete zero positioner`; clearing-plate remarks require its positioning plunger to snap into the lever hole.

- Claim type: **H**.
- Evidence: **E1 for this scanned Type II service document at the listed page/leaf precision**.
- Access provenance: manufacturer document accessed through the `mycurta.com` specialist mirror; Museum Mura is credited by the index as source layer.
- Revision boundary: the replacement-leaf notice means this 43-page assembled scan is not safely treated as one dated frozen issue. Red additions and retained older leaves are mentioned, but no complete leaf-version chronology was reconstructed.
- Model boundary: the manual itself warns that reused Model I pictures can differ in detail and proportion from actual Type II. Therefore neither the Type I cover nor the dual-model operator guide is used to assert hidden-part identity.

These pages establish Type II service responsibilities and named assemblies, not exact historical operator timing, every linkage, production-wide part identity, capacity, serial range, or equality with repository P/M controls.

### 2.4 Type II systematic service-leaf census

The bounded page-by-page census is maintained in [`research/curta-type-ii-service-leaf-index.md`](curta-type-ii-service-leaf-index.md). It resolves all three actual targets, visually inspects every page of the English-green and German-1967 scans, and inspects the German-green cover/front matter to establish its corresponding German replacement notice.

The result is deliberately narrower than a production chronology:

- both green scans internally identify `CURTA Mod. II` / Contina and state that newly supplied leaves contain latest modifications, changes/additions are red, replaced leaves may be retained, and reused Model I pictures may differ from Model II in detail/proportion;
- neither green cover exposes an issue date, revision identifier or document number, and readable per-leaf revision dates were not found;
- the separate German cover internally identifies `MODELL II 11×8×15` and explicitly says the service handbook appeared in **autumn 1967**;
- its printed leaves and revision/addition tables establish one dated document issue and a revision-table structure, but entries too small to read reliably are left unreadable;
- the directly readable green anchors include `N I-a`, `O 1-a`, `O 3-a`, `B-2`, `B-3`, `B-4`, `S1-4` through `S3-4`, and `F 52 a`; ambiguous characters are not normalized;
- no exact cross-scan leaf identity or complete replacement sequence can be ordered from printed evidence.

Therefore one frozen **German 1967 issue** is established separately from two **undated green replacement-leaf assemblies**. PDF order, collector filenames, the modern `Dec.2013 hansjoerg` mark, and the separate BOM/drawing sheet dates do not fill the missing chronology.

### 2.5 Type II bill of material and drawing-sheet identity

Two further manufacturer-origin image facsimiles were opened from the existing mycurta index on 2026-09-02. The mirror labels and filenames were treated only as access provenance; claims below come from visible document-internal text.

#### Bill of material

Direct scan: <https://www.mycurta.com/Documents/curta_2_bill_of_material_de.pdf>

- the 14-page access PDF begins with a modern wrapper reading `CURTA 2 Calculator Bill of Material`, `www.museummura.li`, and `Dec. 2013 hansjoerg`; those are access/assembly metadata, not a Contina issue date;
- the first underlying table visibly identifies `CONTINA A.G. MAUREN` and `CURTA II`;
- its title block is dated **3.9.52** and exposes columns for drawing number, subject, quantity, material and remarks;
- directly readable rows include drawing `2.001` (`Stufenwalzenkörper`) and subsequent numbered parts, establishing a manufacturer Type II parts-list identity at this inspected sheet—not a complete production chronology.

#### Engineering drawing set

Direct scan: <https://www.mycurta.com/Documents/Curta_2_Engineering_Drawings_c_de.pdf>

- the 154-page access PDF's first sheet visibly identifies `CONTINA A.G. MAUREN`, `Type II`, subject `Stufenwalzenkörper`, drawing `2'001.-*2`, replacement reference `205'001-2`, and `Stück p. Masch.: 1`;
- the sheet carries a drawn date **19.9.51** and a change table with visible entries including **1.4.53**; these are sheet-level dates, not proof of Type II production launch or a complete revision sequence;
- the sheet itself includes type applicability and technical title-block fields. This pass uses it only for document/sheet identity and revision-table existence, not for reverse-engineered shape, dimensions, fits, materials, tolerances or interchangeability.

- Claim type: **H**.
- Evidence: **E1 at the directly inspected cover/table/first-sheet precision**.
- Capacity boundary: neither inspected Type II BOM/drawing first page visibly states `11×8×15`; capacity remains independently established only by the already inspected dual-model Contina operator guide.
- Chronology boundary: the 1951/1952/1953 dates belong to particular drawing/list sheets. They do not establish one frozen manual issue, complete replacement-leaf chronology, production start, or unchanged construction across all Type II machines.

### 2.6 Mirror/index boundary

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
Type II BOM first table: internal CONTINA A.G. MAUREN / CURTA II identity; sheet date 3.9.52
Type II drawing-set first sheet: internal Type II identity; drawn 19.9.51 and visible change-table entry 1.4.53
Type II German service cover: Model II 11×8×15; autumn 1967
Type II green service variants: undated replacement-leaf/latest-modification assemblies; no complete chronology
patent: one identified patented embodiment
```

Still open:

- serial/revision mapping from patent embodiment to production machines;
- complete Type II replacement-leaf version chronology and readable per-leaf revision dates for the undated green assemblies; the separate German autumn-1967 issue is now established, while BOM/drawing dates remain sheet-level only;
- whether hidden parts/linkages changed across all production revisions;
- exact handle, clearing, carriage and safety-lock geometry/timing beyond the inspected Type II service responsibilities;
- tooth profiles, ratios, decade-transfer sequence, tolerances and measured performance.

## 5. Repository boundary

`#/curta` remains a P operational diagram. `set 314 → seven turns → shift → two turns → 8478` is a tested arithmetic/operator abstraction, not a source-specific Curta transition model. The generic `operator-division` and `setting-crank-interlock` modules remain separate P/M lessons.

The implementation consequence of this source pass is evidence metadata and cross-linking only—no source-specific internal animation.