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

## 4. Human error is part of the mechanism

Later Comptometer descriptions include correction keys, subtraction controls, zeroing mechanisms, operator locks, and other controls.

For this repository, those should not be treated as decorative UI details. They define valid and invalid state transitions.

Questions to research:

- What happens if a key is only partially depressed?
- Can another key in the same column be pressed before return?
- Can several columns be struck together?
- What mechanism detects or prevents an incomplete stroke?
- How is a mistaken entry corrected without destroying the accumulated total?
- What does a “locked” operator state actually prevent?

These are ideal state-machine questions.

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

Only after a sourced historical mechanism is understood, model why an interrupted key stroke is dangerous and how a correction/interlock design addresses it.

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