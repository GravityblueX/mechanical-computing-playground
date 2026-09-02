# Key-driven computation: the Comptometer changes the operation protocol

**Checked: 2026-09-01**

## Question

What changes when a number key is not merely an input selector but the action that directly drives an arithmetic state transition?

The repository currently teaches many operations as:

```text
set state
→ crank
→ mechanism advances
```

The Comptometer is valuable because it demonstrates a different human-machine protocol:

```text
press digit key
→ the press itself enters that amount
→ accumulator changes
```

That difference deserves its own mechanism study before any keyboard-themed UI is built.

## Claim types

- historical Comptometer claims: **H**;
- future generic key-driven state model: **P/M**;
- claims about operator workflow inferred from documented controls: **H/R** and should be kept at the precision supported by manuals/patents/object records.

See `docs/EVIDENCE_POLICY.md`.

## Sources

### Smithsonian overview

*Full-Keyboard – Hill to Felt & Tarrant*:

<https://www.si.edu/spotlight/adding-machines/full-keyboard-hill-to-felt-tarrant>

The overview explains that Dorr E. Felt wanted a machine capable of adding larger numbers quickly and used several columns of keys, with the key press itself entering the selected value into the mechanism.

### Early wooden-box production model

<https://americanhistory.si.edu/collections/object/nmah_690456>

The object has eight columns of keys, nine keys per column, result dials/windows, subtraction aids, and mechanisms for carry control/zeroing described in the catalog.

### Model A / duplex machine

<https://americanhistory.si.edu/collections/object/nmah_690484>

The Smithsonian record describes the Model A as a “duplex” Comptometer that could add in more than one column at once, with each column able to add, receive, and carry simultaneously; the earlier wooden-box models did not have this capability.

### Later mechanism/control study objects

Smithsonian study models and later Comptometers can be used to investigate correction, drive, and keyboard evolution. One useful example is the 520-series study model discussing individual-key drive versus a proposed universal-key drive:

<https://www.si.edu/object/comptometer-study-model-520-series-adding-machine-section%3Anmah_690465>

## 1. Input is already an operation

On a lever-set crank machine, an operator may first establish a number in a setting register and then separately request an operation by turning a crank.

A Comptometer-style key-driven machine collapses those stages. The human action has at least two roles:

```text
choose digit magnitude
apply mechanical stroke
```

The key is therefore both an **input symbol** and an **energy/control event**.

This matters to the repository's architecture because `HumanOperationEvent` should not assume that all machines have a separate `SET_VALUE` event followed by `CRANK_BEGIN`.

A generic key-driven trace might instead look like:

```text
KEY_DOWN column=2 digit=7
INPUT_STROKE_BEGIN
ACCUMULATOR_ADVANCE column=2 amount=7
CARRY_PENDING ...
CARRY_PROPAGATE ...
KEY_RETURN
```

That is a pedagogical event vocabulary, not a transcription of Felt & Tarrant terminology.

## 2. Keyboard geometry can encode magnitude

Historical full-keyboard adding machines often use one column per decimal place and keys `1–9` within each column. Smithsonian object descriptions for early Comptometers note progressively different key-stem geometry in some models.

This raises a mechanism question worth researching with patents/manuals:

> Does digit magnitude live only in the printed key label, or does the depth/travel/lever geometry of the selected key directly determine how far a register is driven?

Do not answer this generically from appearance. A future source pass should identify exact models and mechanism diagrams.

## 3. Multi-column entry changes carry requirements

The Smithsonian Model A description is especially relevant to this project because it states that multiple columns could operate at once and that each column could add, receive, and carry simultaneously.

That means the design problem is not merely:

```text
finish local digit movement
then propagate carry
```

The machine has to tolerate interactions between local input and incoming carry under a fast key-driven workflow.

A future exhibit could compare:

```text
serial abstract carry
vs
multi-column key-driven accumulator
```

without claiming identical physical timing.

## 4. Controlled-key incomplete-stroke boundary

### Turck 1921 directly inspected

The public-domain facsimile of J. A. V. Turck, *Origin of Modern Calculating Machines: A Chronicle of the Evolution of the Principles That Form the Generic Make-up of the Modern Calculating Machine* (Chicago, 1921; published under the auspices of the Western Society of Engineers) was directly inspected at viewer pages 179–182 / printed pp. 159–162.

<https://upload.wikimedia.org/wikipedia/commons/e/e1/Origin_of_modern_calculating_machines%3B_a_chronicle_of_the_evolution_of_the_principles_that_form_the_generic_make_up_of_the_modern_calculating_machine_%28IA_originofmodernca00turcrich%29.pdf>

Turck says incomplete key strokes were a known error problem; describes earlier full-stroke devices as insufficient because an unnoticed partly depressed key could be completed by a later action; and presents Felt's solution as locking keys in the **other orders**, thereby signaling the operator and compelling correction before further manipulation. Printed pp. 161–162 distinguish that error-only lock from cash-register group locking and name the commercial embodiment the “Controlled-key Duplex Comptometer.” Turck further says its means acted directly on the accumulator, locking registration until correction.

- Claim type: **H**; evidence: **E1 contemporary technical/historical account** at those pages.
- Context boundary: Turck was associated with Felt & Tarrant and argues priority/novelty; this is strong contemporary evidence for stated function/responsibility, not neutral proof of every production detail.
- Procedure boundary: these pages establish detection/signaling, blocking of other orders and correction-before-continuation. They do **not** specify a button-by-button operator release procedure, exact trigger geometry, threshold, timing, or patent number for the controlled-key feature.

### Smithsonian manual/catalog boundary

NMAH `nmah_905178`, ID `1989.3054.01`, identifies *Applied Mechanical Arithmetic As Practiced on the Controlled Key Comptometer* as a Felt & Tarrant 1914 company publication in a 1920 revision. The catalog says it trained users and describes a machine that did not allow imperfect key strokes. Its IIIF manifest `NMAH-AHB2018q019470` exposes one 3000×2382 object image, not a readable page sequence; no page-level recovery procedure is claimed.

<https://americanhistory.si.edu/collections/object/nmah_905178>

### Identified Model F object

Science Museum Group object `1921-16` identifies a section of Model F controlled-key Comptometer, made in Chicago in 1921 by Felt & Tarrant Manufacturing Company. Its catalog and photograph establish identity and visible survival only; they do not by themselves prove internal action.

<https://collection.sciencemuseumgroup.org.uk/objects/co60749/section-of-model-f-controlled-key-comptometer-by-felt-and-tarrant-manufacturing-co-model-calculating-machine>

### Felt & Tarrant operator recovery, directly inspected

Two directly scanned company manuals now establish the operator procedure at edition/page precision:

- *Easy Instructions for Operating the Controlled Key Comptometer*, ca. 1920, PDF p. 2 (unnumbered spread): an incomplete stroke locks the machine; the operator “completed the unfinished stroke, touched the release key and went right on”; printed p. **8** / PDF p. **5** gives the fuller rules and calls the control the red **Correction Button**;
- *Methods of Operating the Comptometer*, 1921 edition, printed pp. **IX–XI** / PDF pp. **7–8**: the Model H description says all other columns lock while the fault column stays identifiable; for addition, depress the partial key fully, then depress the **Release Button** near the 9-key and continue; each misoperated column must be corrected before release succeeds; multiplication/division guidance says cancel completely and redo rather than reuse the addition correction recipe.

The 1921 p. XI decision rule is more precise than a universal “finish then release”: try the last key; if it works, complete it and touch the red release button; if that last key is itself locked, touch release and add the previous key. The manual also gives a separate subtraction-cutoff/9-key/release/1-key correction for an unwanted partial depression. These are **H/E1 company operating procedures for the inspected editions**, not universal Comptometer behavior.

### Ziehm US 1,110,734 patented responsibility

The directly inspected 1914 facsimile supports the same core responsibility at patented-design precision:

- specification p. 1 describes locks against a further adding movement until the key returns to normal, plus locking other columns after partial depression and release;
- specification p. 4 (facsimile lines 65–91) says a partial depression/release arrests the accumulator and locks every other actuator; completing the formerly partial key gives the intended accumulation; release key `134` then releases all orders;
- the same passage explicitly says using release before completing the correction does **not** permanently release the keys;
- claims 11, 16 and 19 state partial depression/release → other-column lock → means for release; claims 3, 5 and 7 separately guard a completed adding movement until return to normal.

This is **H/E1 for the patented design**, not direct proof that every Model E/F used this exact embodiment. It does not historicalize repository event names, the exact `ARITHMETIC_COMMITTED` phase, or reducer timing.

### Object/catalog and production-mapping boundary

NMAH Model F objects `MA.335357` (1915) and `MA.333576` (1917) expose full keyboards, subtraction controls, result windows, separate zeroing handles and patent plates ending 15 September 1914. Science Museum Group `1921-16` identifies a Model F controlled-key section. These are **H/E1 object/catalog facts**. A matching plate/grant date does not prove which hidden lock uses US 1,110,734, so exact patent-to-production mapping remains E3/open.

Recovery is also distinct from result clearing: the company manuals name a Correction/Release Button for an integrity lock, while the identified objects separately describe a zeroing handle. The generic repository controller therefore remains **P/M**: its `INCOMPLETE_STROKE_*`, `INPUT_LOCKED`, exactly-once arithmetic commit and lock-release events are pedagogical decompositions, not historical event names or physical timing.

### Historical / P–M recovery crosswalk

| Claim / recovery step | Source / edition / model | Direct support | Claim/evidence | Repository consequence | Not established |
|---|---|---|---|---|---|
| incomplete stroke signals error; other orders blocked | Turck 1921, pp. 159–162 | contemporary technical account | H/E1 | motivates visible integrity responsibility | exact button procedure, neutral priority history |
| correct addition lock | *Easy Instructions* ca.1920 p.8; *Methods* 1921 pp.IX–XI | retry/complete errant key, red Correction/Release Button, then continue; branch if last key is locked | H/E1 company manual | historical panel may state edition-bounded operator sequence | every model/edition, physical trigger/timing |
| patented lock/release | Ziehm US1,110,734 p.4; claims 11/16/19 | partial release locks other columns; complete errant stroke; key 134 releases; early release fails to persist | H/E1 patented design | supports correction-before-release responsibility | universal Model E/F embodiment or repository event timing |
| Model F / publication identity | NMAH `MA.335357`, `MA.333576`, `nmah_905178`; SMG `1921-16` | identified objects/publication and visible/cataloged controls | H/E1 catalog precision | separates object/manual identity and zeroing control | patent-feature production mapping, hidden geometry |
| model/patent chronology | specialist indexes | navigation and orientation | H/E3 | keep explicit open mapping | primary production proof |
| interrupted `7` trace | repository `key-stroke-integrity` | deterministic action/state/event model; arithmetic committed exactly once | P/M | testable teaching decomposition | historic names, threshold, trigger path or physical time |

## 5. Subtraction is an operator-interface problem too

Smithsonian object records show complementary digits on keys and subtraction controls on many Comptometers.

That makes subtraction a combination of:

- arithmetic representation;
- key labeling;
- carry policy;
- operator procedure;
- machine mode/control.

A future `research/subtraction-and-division.md` should compare this with:

- Pascaline complement arithmetic;
- reverse-crank subtraction on pinwheel / stepped-drum machines;
- dedicated subtraction modes on later calculators.

## 6. Suggested minimal software model

Do **not** implement a whole Comptometer emulator first.

Create a mechanism-level model with:

```text
KeyDrivenColumnState
AccumulatorRegister
KeyStrokeAction
Correction / invalid-stroke state
Carry interaction
```

Minimum exhibit cases:

### Case A — one-column entry

```text
press 7
press 4
result: 11
```

The visitor should see that there is no separate crank.

### Case B — place-value keyboard

Press a tens-column `3` and units-column `4` and expose how the two columns contribute.

### Case C — carry collision question

Use a state such as `...9` and then press a key that forces carry while another column is active. The initial model may serialize these events, but the UI must label that serialization as pedagogical unless historical timing is sourced.

### Case D — incomplete stroke / correction

Implemented in `src/mechanisms/key-stroke-integrity/` as a tested **P/M generic controller** wrapping the existing accumulator. An interrupted stroke does not mutate arithmetic; detection locks unrelated input; completing the errant stroke commits once through `key-driven-accumulator`; releasing the integrity lock preserves that result and returns to idle. These software phases expose the sourced control responsibility without claiming Model E/F linkage timing.

## 7. Cross-machine teaching value

The Comptometer adds a genuinely new axis to the playground:

| Machine family | Human operation shape |
|---|---|
| Pascaline | stylus rotates input dial |
| stepped-drum / pinwheel | set levers, then turn crank |
| Comptometer | press key to enter/accumulate |
| Millionaire | set values/multiplier control, then one main crank per multiplier digit |
| Differential Analyzer | establish coupled continuous motion |

This is more interesting than another complete machine skin because it shows that “input” and “execute” are historically variable concepts.

## 8. Next source work

1. Find Felt/Tarrant patents for the early keyboard and carry mechanism.
2. Find an operator manual for a precisely identified Comptometer model.
3. Trace the transition from early non-duplex models to Model A duplex behavior.
4. Identify the mechanism behind partial-stroke correction in later models.
5. Record which claims belong to which model; do not write “the Comptometer” as though all revisions were mechanically identical.

## Project decision

Add **key-driven computation** as a first-class research/mechanism track.

The explanatory target is not “here is a vintage keyboard.” It is:

> **What happens to the architecture of arithmetic when the keystroke itself is the compute cycle?**