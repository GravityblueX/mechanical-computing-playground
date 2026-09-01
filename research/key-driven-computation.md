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

### Secondary orientation and remaining limits

John Wolff's specialist history describes Model E/F chronology and an operator sequence of completing the errant stroke then clearing a lock with a white button. This remains **E3 orientation** here because that exact release sequence, trigger geometry, interference guards and upstroke ratchet were not independently matched to an inspected primary page/patent in this bounded pass.

Historical sources therefore establish that incomplete strokes were detected/blocked/corrected in particular controlled-key contexts without establishing the repository's event names, commit phases, exact trigger geometry, timing, or one universal Comptometer mechanism.

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