# Curta source map

**Checked: 2026-09-01**

## Question

Which Curta operator and architectural claims can the playground safely make, and which require a more precise model/revision/manual map before implementation?

## Claim types

- patent and operator-document statements: **H**;
- interpretation that connects documents to a machine model: **H/R**;
- the current browser cylinder and any generic mechanism modules: **P** or **P/M**.

## 1. Curt Herzstark patent US 2,525,352

### Provenance

Curt Herzstark, US 2,525,352, published/granted 10 October 1950:

- Google Patents text and drawings: <https://patents.google.com/patent/US2525352A/en>
- linked patent PDF: <https://patentimages.storage.googleapis.com/44/9b/f8/683916f0988046/US2525352.pdf>

This is **H/E1 evidence for the patented design**, not automatic proof of every production Type I/II detail.

### Supported claims and anchors

The specification defines the invention as a miniature machine for addition, subtraction, multiplication and division. It says the figure drums and associated transmission members of the result-counting mechanism and revolution-counting mechanism are arranged in a circle around a common driving member, for example an echelon drum.

Useful drawing anchors:

- Figures 1–2: vertical sections with counting mechanisms engaged/disengaged;
- Figures 3–4: diagrammatic plan views of result and revolution counting mechanisms at different decade positions;
- Figures 5–7: modified counting-mechanism embodiment and outside view;
- Figures 8–11: details relevant to the compact arrangement;
- Figure 11 in the transcription identifies two offset tooth groups on the common driving element, acting on result and revolution transmission members.

The claims describe two groups of transmission shafts arranged around the same circular line, one for revolution counting and one for result counting, with angular spacing intended to let each group bridge non-pertinent transmission members during decade displacement.

### Safe consequence

Future UI may say that the patent describes a compact circular architecture with result and revolution counting mechanisms around a common drive. It may not say that a schematic on this site reproduces the exact tooth, pinion, axle, detent, decade-transfer, or production Type I/II geometry unless that figure/embodiment is deliberately mapped.

## 2. Curta operator manuals via Curta.org

### Provenance limitation

<https://curta.org/wiki/CurtaManuals>

Curta.org is a specialist archive. Its page states that several consumer manual versions, layouts and languages existed, and lists distinct service/repair manuals. The hosted operator excerpt is valuable, but the current repository has not tied every paragraph to a fully identified edition, printing date, page number and facsimile image. Treat it as **H/E2–E3 operator-procedure evidence**, not E1 production geometry.

### Operator-facing concepts supported by the transcription

- setting knobs/register show a selected decimal value;
- black dial is the result/product dial;
- white dial is the counter/quotient dial;
- carriage position changes decimal place;
- a full handle turn completes at the home detent or zero stop;
- handle use is clockwise-only in the instructions, and backward turns are locked/warned against;
- handle plus/minus position distinguishes additive/subtractive turns;
- carriage motion requires handle zero stop; raising the carriage locks the handle;
- clearing uses a lever with stop positions, and an intermediate clearing position can prevent carriage seating and keep the handle locked;
- the reversing lever has specified operator uses;
- multiplication is developed through repeated turns recorded by the counter and carriage shifts.

The transcription says its exercises apply to Type I (`8×6×11`) and Type II (`11×8×15`) capacities and illustrates Type I, but the repository should not infer that all internal components are identical solely from that sentence.

## 3. Division procedure

<https://curta.org/wiki/DivisionAlgorithm>

This specialist-hosted transcription describes:

- divisor in the setting register;
- black result/product dial and white quotient/counter dial;
- carriage position selecting quotient place;
- repeated turns until a target prefix is attained or overstepped;
- an immediate opposite turn after overshoot;
- movement to the next lower carriage position;
- a subtractive method using the reversing lever when a dividend already exists in the result dial.

This is operator-procedure evidence, not a proof that the repository's `operator-division` signed residual events reproduce Curta internals. The generic division module remains **P/M**.

## 4. Existing reference/simulator landscape

See [`simulator-matrix.md`](simulator-matrix.md):

- npm `curta`: whole-machine/software behavior; license and maintenance require direct inspection before reuse;
- CurtaSim: interactive whole-machine simulation; reuse status unverified;
- Jaap's mechanical-calculator Curta page: specialist explanatory reference;
- Curta.org: specialist manual/transcription archive;
- this repository: state/event lessons, not a full Curta emulator.

A link is not a license grant. Existing simulators should be linked or inspected rather than replaced by another result-only cylinder skin.

## 5. Mapping to current repository UI

The current `#/curta` view shows setting sliders, crank, result counter, turn counter and carriage as an **operational teaching diagram (P)**. The sequence `set 314 → seven turns → shift → two turns → 8478` is an arithmetic/operator abstraction informed by documented register/carriage roles, not a source-specific internal transition model.

The repository's generic modules are separate:

- `operator-division`: P/M overshoot/correction procedure;
- `setting-crank-interlock`: P/M mutual-exclusion lesson;
- neither is named or represented as Curta geometry.

## 6. Safe claims and open work

### Safe now

- identify operator-facing setting/result/counter/carriage/handle roles at the transcription's precision;
- state the documented zero-stop and carriage/handle restrictions as operator instructions;
- state the patent's compact circular result/revolution-counter architecture with figure references;
- label current visuals and state machines P or P/M.

### Still requires stronger mapping

- exact manual title, language, printing, page and facsimile for each quoted instruction;
- production Type I versus Type II internal revisions;
- exact handle, clearing, carriage and safety-lock linkage geometry/timing;
- exact tooth profiles, transmission ratios, decade-transfer sequence and tolerance;
- mapping a patent embodiment to a particular serial-production machine;
- performance, reliability, torque, wear or speed comparisons.

Future Curta code should not become more geometrically specific until those anchors exist.