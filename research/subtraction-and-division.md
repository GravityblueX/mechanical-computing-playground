# Subtraction and division: representation, controls, and the operator loop

**Checked: 2026-09-01**

## Question

When a mechanical calculator has no single `divide(a, b)` instruction, which parts of division live in machine state and which remain operator decisions?

## Claim types

- arithmetic decomposition and the repository mechanism: **M/P**;
- statements about documented machines and operator instructions: **H**;
- interpretations connecting controls to computation: **H/R**.

Historical evidence strength is stated separately under `docs/EVIDENCE_POLICY.md`.

## Sources and provenance

- Smithsonian, *Stepped Drum Calculating Machines*: <https://americanhistory.si.edu/it/collections/object-groups/calculating-machines/stepped-drum-calculating-machines>
- Smithsonian Thomas Arithmometer object `nmah_690683` (identified 1867 control/counter anchor): <https://americanhistory.si.edu/collections/object/nmah_690683>
- Smithsonian Thomas Arithmometer object `nmah_690684` (separate object; do not merge revisions): <https://americanhistory.si.edu/collections/object/nmah_690684>
- Smithsonian Burkhardt Arithmometer object `nmah_690681`: <https://www.americanhistory.si.edu/collections/object/nmah_690681>
- Smithsonian record for Thomas operating instructions (1868), `nmah_904757`: <https://www.americanhistory.si.edu/collections/object/nmah_904757>
- Curta.org manual archive and transcription: <https://curta.org/wiki/CurtaManuals>
- Curta.org division transcription: <https://curta.org/wiki/DivisionAlgorithm>
- ACONIT/Inria, *La Pascaline*: <https://aconit.inria.fr/omeka/exhibits/show/histoire-machines/prehistoire/pascaline.html>
- CMU Pascaline reconstruction: <https://www.cs.cmu.edu/~dst/Pascaline/>

The Smithsonian pages are museum catalog/institutional synthesis, generally **H/E1–E2** depending on whether a statement is directly visible in the object or supplied by catalog interpretation. Curta.org is a specialist archive hosting/transcribing operator-manual material; this note uses it as operator-procedure evidence and does not promote it to proof of internal geometry. The exact edition/page provenance should be strengthened before quoting source-specific dimensions or timing.

## 1. Stepped-drum / arithmometer family

Keep the control responsibilities separate rather than treating them as one bundle:

- identified Thomas object `nmah_690683` (1867): a lever selects addition/multiplication versus subtraction/division, and its catalog description associates opposite revolution-register direction with those mode groups;
- identified later Thomas examples: separate controls/knobs are documented for zeroing result and revolution registers; these must remain attached to their own object/date records;
- Burkhardt object `nmah_690681`: the catalog describes a bell when subtraction passes through zero, especially for division—an **overshoot indication**, not proof of a universal correction linkage;
- Thomas instruction pamphlet `nmah_904757` (1868): catalog existence/date/provenance is established, but its uninspected pages are not evidence for an operator sequence here;
- operator correction/add-back: supported at generic procedure level and by separately identified Curta material below, not inferred from the Thomas mode lever or Burkhardt bell.

- Claim type: **H**.
- Evidence: identified museum objects/catalog descriptions, **E1–E2** at the precision stated.

These records support a workflow involving modes, registers, repeated operations, carriage place and sometimes an overshoot indication. They do **not** establish one universal gear train, counter sign convention, zeroing geometry, bell timing, or add-back path for all arithmometers. Detailed control provenance is mapped in [`control-and-zeroing-source-map.md`](control-and-zeroing-source-map.md).

## 2. Curta operator procedure

### Directly inspected operator-guide facsimile boundary

The two-page specialist-mirrored facsimile *Your CURTA Calculator* was directly inspected:

<https://www.mycurta.com/Documents/Curta-User-Guide-Your-CURTA-Calculator-210810.pdf>

Viewer page 1/2 identifies Contina, Vaduz/Liechtenstein, and says the instructions apply to both Model I (`8×6×11`) and Model II (`11×8×15`). It labels the black result/product dial and white counter/quotient dial; requires the handle to return to zero stop before manipulating other parts; describes raising, rotating and reseating the carriage; and identifies the reversing lever's lower position for special cases including subtractive division. No edition/date or printed page number was visible, and the available scan did not expose a directly inspectable division-example page.

- Claim type: **H** for those visible operator-control statements.
- Evidence: **E1 primary operator-guide facsimile via a specialist mirror**, at viewer-page-1 precision only.
- Access boundary: the host is not the original publisher or an institution; no unseen division example is promoted to E1.

### Separate specialist transcription

Curta.org's `DivisionAlgorithm` page was directly inspected as a transcription, not a facsimile. It gives examples `42÷7`, `1728÷12`, and `17.29÷1.2`: the operator builds toward the dividend, notices an overstep, makes one minus turn, moves the carriage to the next lower position, and reads the quotient in the white dial. It also describes subtractive division when the dividend is already present.

<https://curta.org/wiki/DivisionAlgorithm>

- Claim type: **H/R** for the transcribed operator procedure.
- Evidence: **E3 specialist transcription** until its exact manual edition and printed page are directly matched.

Together these sources support that carriage position, quotient/counter state, overstep recognition, reversal and operator sequencing participate in Curta calculation. They do not prove that every stepped-drum calculator follows Curta controls, or that the repository's negative-residual phases are Curta internal states.

## 3. Complement subtraction is not reverse motion

The repository's cited ACONIT/Inria Pascaline account describes the sautoir carry as directional and explains subtraction through complementary representation rather than simply reversing the carry train. CMU's reconstruction supplies engineering evidence for a plausible reconstructed sautoir, not a surviving seventeenth-century mechanism.

- Claim type: **H** for the museum synthesis; **R** for reconstruction behavior.
- Evidence: **E2**.

The present sources justify the high-level contrast—complement representation versus reversed operation—but not a new source-specific Pascaline subtraction geometry. Complement digit conventions, exact setup, and model variations remain future primary-source work.

## 4. Control is computation

The following are not decorative UI when they determine legal arithmetic transitions:

- **mode/reversing control** determines whether a stroke adds or subtracts and how a counter behaves;
- **carriage position** determines decimal place;
- **revolution/quotient register** records repeated operations by place;
- **zeroing** establishes initial register invariants;
- **overshoot indication** tells the operator a quotient digit was attempted once too far;
- **correction/add-back** reverses that attempt before a place shift;
- **locks/interlocks** prevent actions while crank, carriage, or clearing controls are in incompatible states.

Actual machines distribute these responsibilities differently. No universal physical implementation is asserted.

## 5. Software abstraction decision

`src/mechanisms/operator-division/` is a **P/M generic operator-procedure model**. It represents:

```text
signed residual
+ divisor × decimal carriage offset
+ per-place quotient/revolution count
+ explicit subtraction
+ visible overshoot
+ mandatory add-back correction
+ carriage shift
+ completion
```

For `8478 ÷ 314`, the model subtracts `3140` three times, exposes `-942`, adds `3140` back and reverses the tens quotient step, shifts to units, then performs seven subtractions. The quotient therefore emerges from events and operator decisions; it is not inserted by a hidden division call.

The model refuses to claim:

- Thomas, Burkhardt, Curta, or Pascaline gear geometry;
- a universal crank direction or counter direction;
- historical signed-register representation;
- exact bell/lock timing;
- automatic division;
- simultaneous mechanisms or source-specific correction paths.

Its signed residual and temporary quotient digit 10 first enter `OVERSHOOT_PENDING`; a separate detection event makes correction legal; add-back then restores the prior non-negative residual and quotient digit before shift. Exact-zero results must still shift through implied lower zero quotient places. These phases, quotient convention and mandatory add-back-before-shift rule are tested **P/M choices**. They do not reproduce a Thomas/Burkhardt bell, crank direction, counter direction/sign, Curta dial motion, or machine-specific add-back linkage.

Its arithmetic and replay integrity are computationally tested. Historical interpretation remains in this note and [`control-and-zeroing-source-map.md`](control-and-zeroing-source-map.md) rather than being smuggled into generic geometry.