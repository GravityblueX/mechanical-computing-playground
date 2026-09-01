# Carry is the hard part

**Checked: 2026-09-01**

## Question

Why is a multi-digit mechanical register more than a row of ten-position wheels, and what can the repository legitimately learn from real carry mechanisms without pretending that its generic event chain is a historical reconstruction?

## Claim types

- General decimal-register behavior: **M** (mathematical/computational).
- Claims about Pascaline and Comptometer mechanisms: **H**, with sources below.
- The repository's `carry pending → carry propagated` event chain: **P/M** (pedagogical model with deterministic computational validation).

See `docs/EVIDENCE_POLICY.md`. Exact Pascaline/Felt source separation lives in [`carry-architecture-source-map.md`](carry-architecture-source-map.md); Odhner-family rotary conditioning, rapid-rotation failure, and staggered opportunity evidence lives in [`rotary-carry-scheduling-source-map.md`](rotary-carry-scheduling-source-map.md).

## 1. The abstract problem

A decimal digit can be represented by ten stable states. The difficult transition is the boundary:

```text
9 → 0
```

If that transition changes a higher-order digit, then `0099 + 1` is not one local state change. It is a sequence of dependent changes:

```text
ones:    9 → 0
carry to tens
tens:    9 → 0
carry to hundreds
hundreds:0 → 1
```

That statement is computational, not a claim that all calculators used the same gears, levers, timing, or force path.

The repository therefore exposes carry as ordered events instead of hiding it in the final integer. This is a teaching abstraction.

## 2. Pascaline: stored energy and a non-reversible carry path

### Sources

- ACONIT / Inria virtual museum, *La Pascaline*: <https://aconit.inria.fr/omeka/exhibits/show/histoire-machines/prehistoire/pascaline.html>
- CMU Pascaline reconstruction project: <https://www.cs.cmu.edu/~dst/Pascaline/>
- CMU assembly instructions for the reconstructed sautoir: <https://www.cs.cmu.edu/~dst/Pascaline/assembly-instructions.html>

### What the source directly supports

The ACONIT / Inria description identifies the Pascaline carry device as a **sautoir**. During rotation of one order, the mechanism is progressively armed; when the wheel passes the `9 → 0` boundary, the sautoir falls under gravity and advances the next order by one step. The description emphasizes that this arrangement leaves the digit wheels comparatively independent and avoids a long continuously coupled carry train locking during multi-place propagation.

It also notes a crucial operational consequence: the sautoir is not reversible in the simple sense of turning the machine backward for subtraction. Pascaline subtraction is therefore handled through complementary representation rather than merely reversing every carry motion.

Claim type: **H**.

Evidence:

- museum/institutional historical synthesis: **E2**;
- CMU's physical reconstruction is useful **R/E2** evidence for how a plausible reconstructed sautoir can be assembled and observed, but it is not itself the surviving seventeenth-century machine.

### Project consequence

The Pascaline case makes a good teaching point that the generic event:

```text
CARRY_PENDING
```

may correspond in a real machine to **temporarily stored mechanical energy and delayed release**, not to a permanently meshed gear train simply dragging every higher digit at once.

The website's carry arrow must still be labeled pedagogical. It is not the Pascaline's physical linkage unless a specific sourced diagram is being reproduced.

## 3. Comptometer: carry under a different human-operation model

### Sources

- Smithsonian, *Full-Keyboard – Hill to Felt & Tarrant*: <https://www.si.edu/spotlight/adding-machines/full-keyboard-hill-to-felt-tarrant>
- Smithsonian, early wooden-box Comptometer: <https://americanhistory.si.edu/collections/object/nmah_690456>
- Smithsonian, Model A Comptometer: <https://americanhistory.si.edu/collections/object/nmah_690484>

### What changes

The Comptometer is useful because it breaks the repository's default intuition that arithmetic always looks like:

```text
set digits
→ turn crank
→ transfer result
```

Smithsonian's overview describes Felt's machine as key-driven: pressing a key both selects a digit and **enters it into the mechanism**. This changes the timing and human-machine protocol of addition.

The Smithsonian Model A record is even more instructive: it describes the Model A as a “duplex” machine able to add in more than one column at a time, with each column able to add, receive, and carry simultaneously; earlier wooden-box models did not have that capability.

Claim type: **H**.

Evidence: Smithsonian catalog statement, **H/E2** in this repository pass. No direct measurement was performed, and the page was inaccessible here; the bounded object/model claim is kept separate from US762520A's **H/E1 patented intended design**.

### Project consequence

Carry is not only a `9 → 0` rule. The architecture must also answer:

- Can several input columns be active in one human action?
- Can a column receive a carry while its own key-driven addition is occurring?
- What interlocks or sequencing prevent an incomplete keystroke from corrupting state?
- Is carry propagation serial, partially parallel, or phase-separated?

The current generic carry-chain should remain simple, but a future **carry architectures** exhibit could compare:

```text
abstract serial carry
Pascaline sautoir / stored-energy transfer
Comptometer key-driven multi-column carry
```

without pretending that one software state machine is a geometric replica of all three.

## 4. Rotary carry adds conditioning and opportunity order

The Odhner-family patent chain exposes a third problem distinct from Pascaline stored release and Felt key overlap. US514725A describes a register crossing positioning a transfer arm so a rotary carry pin can advance the next order. US1377269A explicitly warns that rapid rotation may throw that arm out of its adjusted position, preventing carry action and causing miscalculation. US1867603A explains that a carry may itself create the next boundary crossing, so dependent rotary opportunities cannot all arrive simultaneously; they must be staggered.

The repository models only that last dependency with strictly increasing ordinal slots. Those slots are P/M—not historical angles, milliseconds, speeds, tooth locations, or failure probabilities.

## 5. Carry and subtraction are coupled design choices

The Pascaline example shows why subtraction belongs next to carry research. If the transfer mechanism is naturally one-directional, subtraction may be expressed using complements rather than by reversing the whole transfer train.

Later adding machines frequently place complementary digits directly on keys or displays as operator aids. That is not merely notation; it is part of the human-machine arithmetic protocol.

This repository should therefore avoid a universal assumption that:

```text
subtract = run add mechanism backward
```

until a specific machine's mechanism/manual supports it.

## 6. What the current code proves — and what it does not

The current exhibit can prove that its own deterministic model:

```text
0099 + 1 → 0100
```

contains two ordered carry propagations and can be replayed independently of animation.

It does **not** prove:

- the tooth count or geometry of Pascal's sautoir;
- the exact timing of a Felt & Tarrant production model;
- that every historical decimal calculator propagated carries serially;
- that carry force, wear, spring loading, or maximum crank speed follow the repository's abstract event duration.

Those require machine-specific evidence.

## 7. Next research tasks

1. Add primary/facsimile Pascaline drawing anchors beyond Pascal's operational `Avis`; that text does not describe sautoir geometry.
2. Map US762520A to particular Model A production revisions only if manufacturing/object evidence supports it.
3. Map US514725A/US1377269A/US1867603A to identified production revisions only with object/manufacturing evidence.
4. Add a stepped-drum accumulator-carry comparison distinct from the now-sourced pinwheel/rotary path.
5. Measure/source force, spring/contact load, wear, tolerance, lubrication and safe-rate/failure-envelope claims before reliability modeling.

## Project decision

Keep the current abstract carry chain as the minimal deterministic teaching model.

Do **not** make it more visually “mechanical” by adding unsourced gear geometry. Instead, add historically grounded comparison cases that show how different machines solved the same functional problem with different force, timing, and operator constraints.