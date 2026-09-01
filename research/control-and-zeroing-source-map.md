# Control, zeroing, correction, and actuation provenance

**Checked: 2026-09-02**

## Question

Which non-result-bearing controls are documented for particular mechanical-calculator families, and which relationships must remain generic P/M teaching abstractions?

## Claim types

- identified object, patent, and instruction-record claims: **H**;
- museum/reconstruction interpretation: **H/R** or **R**;
- repository interlock/division/key-driven state models: **P/M**.

Historical evidence strength follows `docs/EVIDENCE_POLICY.md`.

## Why control is computational state

A mode selector, zeroing actuator, crank-home lock, canceling control, or key stroke may contain no arithmetic result. It still determines which transition is legal, what operation occurs, whether a register begins in a valid state, and whether a jammed or incorrect operation can be recovered. These responsibilities are distributed differently by machine and revision; there is no universal calculator control mechanism.

## 1. Thomas arithmometer: pamphlet, objects, and reconstruction remain separate

### 1.1 Directly inspected 1868 pamphlet image

Smithsonian/NMAH `nmah_904757`, ID `MA.318961.02`, identifies *Instruction pour se servir de l'Arithmomètre, machine à calculer inventée par M. Thomas (de Colmar)*, Paris, Imprimerie de Félix Malteste et Cie, 1868, gift of Columbia University Henry Krumb School of Mines, related to `MA.335215`.

<https://americanhistory.si.edu/collections/object/nmah_904757>

The IIIF manifest `NMAH-AHB2018q019415` exposes **one canvas**, 3000×1846. It is a photograph of one open spread: the left side is the title/cover; the right is an `ARITHMOMÈTRE` drawing and `EXPLICATION DU DESSIN`, not a complete page sequence. The readable legend directly identifies:

- `B`: operation selector; drawing labels visibly separate addition/multiplication from subtraction/division;
- `C`: windows containing operation results;
- `D`: windows indicating multiplier and quotient;
- `O`: right-hand knob resetting the figures in windows `D` to zero;
- `P`: left-hand knob resetting the figures in windows `C` to zero;
- a note says both knobs also serve to lift and slide movable plate/carriage `M`.

- Claim type: **H**; evidence: **E1 primary pamphlet image**, at this single-spread precision.
- Access boundary: no printed page number is visible; no additional canvases expose full multiplication/division procedure, initial/final state, counter direction, or exact zeroing linkage/timing. Small obscured words in the `M`/`N` legend are not used for claims.

### 1.2 Identified Smithsonian objects

The 1867 object `nmah_690683` / `MA.327900`, maker number recorded by the object text as No. 787 (manifest metadata says 747), has eight setting levers, seven carriage positions, nine revolution windows and sixteen result windows. Its catalog states that a lever selects addition/multiplication versus subtraction/division, the revolution register runs clockwise for subtraction/division and counterclockwise for addition/multiplication, and a right carriage knob zeros the revolution register. The left control is described only as a lifting knob; the record does not state that it zeros the result register.

<https://americanhistory.si.edu/collections/object/nmah_690683>

The ca.1873 object `nmah_690686` / `MA.335215`, maker No. 1068, has ten setting levers, eleven revolution windows and twenty result windows. Its catalog explicitly assigns the black right knob to zeroing the revolution register and the left knob to zeroing the result register. It also states that the separately stored instruction book is dated 1868.

<https://americanhistory.si.edu/collections/object/nmah_690686>

Both manifests expose object photographs only (one canvas each); catalog descriptions and visible objects are H/E1 at their stated precision. The two capacities, knob descriptions and provenance histories must not be merged into one canonical revision.

### 1.3 Oxford / 1865 booklet attribution

Stephen Johnston's Museum of the History of Science institutional account, *Making the arithmometer count* (1997), says its Figure 1 engraving comes from an 1865 instruction booklet. It describes mature-machine result dials `C`, quotient/counter dials `D`, and independent zeroing by the two knurled knobs at opposite carriage ends (`O`, `P`). This is used as **R/E2 institutional reconstruction/synthesis**: the web article and figure attribution were inspected, not a bibliographically complete primary booklet scan.

<https://www.mhs.ox.ac.uk/staff/saj/arithmometer/>

### 1.4 Remaining boundary

Specialist `arithmometre.org` chronology remains E3 orientation for serial/revision mapping. The directly inspected evidence supports separate register responsibilities on identified 1860s/1870s sources. It does not establish one linkage, action timing, knob geometry, clearing procedure, or production revision history for every Thomas arithmometer.

## 2. Odhner US 1,510,100: crank-home locking

Valentin Jakob Odhner, US 1,510,100, *Calculating Machine*, filed 1922, patented 1924:

<https://patents.google.com/patent/US1510100A/en>

The specification describes a calculating-disc machine whose crank cooperates with a locking device so the crank and discs can be locked at zero. A guide keeps the lock inactive during crank rotation except at the zero position. It further connects this relation to locking/liberating cam or disc-setting parts.

Inspected anchors:

- Figures 1–4: first embodiment, including crank/handle, frame notch, guide ring/notch and cam-disc locking relation;
- Figures 5–7: altered embodiment;
- Figure 8: schematic combination of the embodiments;
- claim 1 and following claims: zero-position crank lock, guide relation, and association with calculating-disc/cam-disc locking.

- Claim type: **H**.
- Evidence: **E1 for the patented intended design**.

The patent does not prove that every Odhner-family production machine used either illustrated embodiment. The repository's `SETTING_LOCKED → CRANK_RELEASED → ...` trace is P/M and is not patent timing.

## 3. Felt US 960,528: canceling and carry-strain recovery

Dorr E. Felt, US 960,528, *Calculating-Machine*, filed 1908, patented 1910:

<https://patents.google.com/patent/US960528A/en>

The patent explicitly situates its embodiment in the Duplex Comptometer context and describes two related objectives:

- a faster/lighter canceling actuator with reduced noise, jar, and resistance;
- positive mechanism operated incidentally by canceling to release surplus strain in the carry mechanism that could jam or lock the machine after improper manipulation, such as holding a key or numeral wheel while repeatedly rotating lower wheels.

Inspected anchors:

- opening specification/object statement;
- Figures 1–18 and their listed subjects;
- the canceling handle/shaft/cam and release relationships described after the figure list.

- Claim type: **H**.
- Evidence: **E1 for this patented Duplex embodiment**.

“Cancel” here cannot safely be reduced to a cosmetic display reset: the documented control also restores a valid carry/control condition. Conversely, this patent does not establish a generic partial-stroke correction mechanism or identical canceling geometry across all Comptometers.

## 4. Turck US 1,154,897: a key can be the operation

Joseph A. Turck, US 1,154,897, *Calculating-Machine*, assigned to Felt & Tarrant, patented 1915:

<https://patents.google.com/patent/US1154897A/en>

The opening specification explicitly identifies keyboard calculating machines in which the register operates immediately in response to manipulation of the value key, without intervening power-providing or power-controlling keys or levers. It addresses prime actuation, high-speed keyboard use, and positive power transmission from keys to numeral wheels.

Inspected anchors:

- opening statement and objectives;
- Figures 1–8;
- claims covering denominational driving keys, column members, oscillating/camming members and numeral-wheel actuation.

- Claim type: **H**.
- Evidence: **E1 for the patented intended design**.

This is a primary anchor for the architectural statement `keypress → accumulate`. It does not establish universal Comptometer actuator, carry, canceling, simultaneous-column, or correction geometry.

## 5. Curta Type II: exact service-leaf responsibility anchors

The systematic service census at [`research/curta-type-ii-service-leaf-index.md`](curta-type-ii-service-leaf-index.md) improves provenance for responsibilities already recorded; it does not derive a new procedure or linkage.

- English-green PDF p. 6 / printed leaf `N I-a`: crank-removal text includes the mainshaft zero-position precondition; the same leaf covers carriage removal and locking-pin responsibility.
- PDF p. 10 / leaf `O 1-a`: dismantling names the reversing-lever upper group and explicitly prints `RZ`; p. 11 / leaf `O 3-a` continues reversing-lever/lower transmission names. No `UZ` claim is made from an unreadable mark.
- pp. 25–26 / leaves `B-2` and `B-3`: assembly groups identify complete reversing lever, complete clearing plate, complete crank and complete zero positioner.
- pp. 28–30 / leaves `S1-4` through `S3-4`: the same responsibility clusters appear in assembly tables.
- p. 32 / leaf `F 52 a`: clearing-locking/control-disc and zero-positioner adjustment names are visible.

These are **H/E1 document/leaf anchors**. They do not establish operator event timing, complete linkage or force paths, production-wide identity, or equivalence with the repository `setting-crank-interlock` state machine.

## 6. Pascaline: complement representation, not generic reverse carry

Existing bounded sources:

- ACONIT/Inria, *La Pascaline*: <https://aconit.inria.fr/omeka/exhibits/show/histoire-machines/prehistoire/pascaline.html>
- CMU Pascaline reconstruction: <https://www.cs.cmu.edu/~dst/Pascaline/>

The institutional synthesis describes a directional sautoir carry and explains subtraction through complementary representation/operator procedure rather than simply reversing that carry. CMU provides reconstruction evidence for a plausible working interpretation.

- Claim type: **H** for museum synthesis; **R** for reconstruction behavior.
- Evidence: **E2**.

No seventeenth-century primary text was newly inspected. Exact complement digit conventions, setup, subtraction train, and model variations remain open.

## Comparison

| Case | Documented control responsibility | Repository may teach | Not established / unmodeled |
|---|---|---|---|
| Thomas identified object(s) | mode, revolution-register direction, identified zeroing controls | mode/counter/initial-state responsibilities | one linkage/timing across revisions; uninspected 1868 instructions |
| Odhner US1510100A | crank-zero lock plus calculating-disc/cam-setting lock relation | legal actions depend on phase/home position | production-family generalization; repository event order as patent timing |
| Felt US960528A | canceling plus release of carry strain/jam in specified Duplex context | canceling can restore valid control state | generic partial-stroke correction; all-model geometry |
| Turck US1154897A | value key immediately actuates the register | keypress itself can be a compute cycle | universal Comptometer drive/carry/canceling geometry |
| Curta Type II service leaves | `N I-a`, `O 1-a`/`O 3-a`, `B-2`/`B-3`, `S1-4`–`S3-4`, `F 52 a`: zero/home, carriage/lock, reversing, clearing and zero-positioner responsibility names | controls and home preconditions are computational responsibilities | operator event timing, linkage/force paths, production-wide identity, repository state-machine equivalence |
| Pascaline H/R sources | directional carry and complement-oriented subtraction boundary | representation can replace reverse mechanical motion | source-specific subtraction train/digit convention |

## Repository P/M boundary and implementation consequence

- `setting-crank-interlock` remains a generic tested permission/phase model; no historical profile owns its event sequence.
- `operator-division` remains a generic signed-residual, repeated-subtraction, overshoot, add-back, shift and count procedure. Its negative residual, correction event, counter convention, and event timing are not Thomas, Burkhardt, or Curta internals.
- `key-driven-accumulator` uses a generic serialized keypress/contribution/carry trace. Turck supports the immediate-actuation architectural contrast, not this exact event sequence.
- The typed profiles under `src/exhibits/control-provenance/` are evidence metadata, not simulators.

Open before mechanism-specific modeling: exact Thomas model/manual pages; production mapping of patented embodiments; partial-stroke correction sources; zeroing linkage/timing; source-specific counter sign/direction conventions; carry/cancel interactions across Comptometer revisions; Pascaline primary/facsimile subtraction procedure.