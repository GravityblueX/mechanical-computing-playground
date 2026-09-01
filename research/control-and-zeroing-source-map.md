# Control, zeroing, correction, and actuation provenance

**Checked: 2026-09-01**

## Question

Which non-result-bearing controls are documented for particular mechanical-calculator families, and which relationships must remain generic P/M teaching abstractions?

## Claim types

- identified object, patent, and instruction-record claims: **H**;
- museum/reconstruction interpretation: **H/R** or **R**;
- repository interlock/division/key-driven state models: **P/M**.

Historical evidence strength follows `docs/EVIDENCE_POLICY.md`.

## Why control is computational state

A mode selector, zeroing actuator, crank-home lock, canceling control, or key stroke may contain no arithmetic result. It still determines which transition is legal, what operation occurs, whether a register begins in a valid state, and whether a jammed or incorrect operation can be recovered. These responsibilities are distributed differently by machine and revision; there is no universal calculator control mechanism.

## 1. Thomas arithmometer: keep identified objects separate

Institutional anchors:

- Smithsonian/NMAH Thomas Arithmometer `nmah_690683`: <https://americanhistory.si.edu/collections/object/nmah_690683>
- stepped-drum object group: <https://americanhistory.si.edu/it/collections/object-groups/calculating-machines/stepped-drum-calculating-machines>
- *Instructions pour se Servir de l'Arithmomètre* (1868), `nmah_904757`: <https://www.americanhistory.si.edu/collections/object/nmah_904757>

At the precision recorded by the specified museum material, the identified 1867 Thomas object supports separate responsibilities for:

- selecting addition/multiplication versus subtraction/division with a lever;
- opposite revolution-register direction for those mode groups;
- identified Thomas examples having dedicated knobs/controls for zeroing result and revolution registers.

- Claim type: **H**.
- Evidence: **E1** for the identified catalogued object/control; catalog interpretation must not be expanded beyond its wording.

The Smithsonian pages returned HTTP 403 in this environment. The identifiers and bounded claims required by the institutional records are retained, but no photograph, internal linkage, or additional model detail was inferred. The 1868 pamphlet catalog establishes existence/date/provenance only. Its pages were not inspected, so this note makes no page-level operating-instruction claim.

Do not merge `nmah_690683`, the separately cited `nmah_690684`, Burkhardt objects, later Thomas zeroing controls, and an uninspected pamphlet into one canonical Thomas geometry.

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

## 5. Pascaline: complement representation, not generic reverse carry

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
| Pascaline H/R sources | directional carry and complement-oriented subtraction boundary | representation can replace reverse mechanical motion | source-specific subtraction train/digit convention |

## Repository P/M boundary and implementation consequence

- `setting-crank-interlock` remains a generic tested permission/phase model; no historical profile owns its event sequence.
- `operator-division` remains a generic signed-residual, repeated-subtraction, overshoot, add-back, shift and count procedure. Its negative residual, correction event, counter convention, and event timing are not Thomas, Burkhardt, or Curta internals.
- `key-driven-accumulator` uses a generic serialized keypress/contribution/carry trace. Turck supports the immediate-actuation architectural contrast, not this exact event sequence.
- The typed profiles under `src/exhibits/control-provenance/` are evidence metadata, not simulators.

Open before mechanism-specific modeling: exact Thomas model/manual pages; production mapping of patented embodiments; partial-stroke correction sources; zeroing linkage/timing; source-specific counter sign/direction conventions; carry/cancel interactions across Comptometer revisions; Pascaline primary/facsimile subtraction procedure.