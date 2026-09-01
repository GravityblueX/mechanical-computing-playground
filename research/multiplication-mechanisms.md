# Multiplication mechanisms: repeated addition, stepped drum, pinwheel, and direct multiplication

**Checked: 2026-09-01**

## Question

What changes mechanically when multiplication stops being “repeat an addition and shift place value” and begins to encode part of the multiplication table in the machine itself?

This note deliberately compares **operator algorithms** as well as internal actuators.

## Claim types

- arithmetic decomposition and repository operation traces: **M/P**;
- historical machine/mechanism claims: **H**;
- simplified `stepped-drum` and `pinwheel` code in this repository: **P**, not geometric reconstruction.

See `docs/EVIDENCE_POLICY.md`.

## 1. Repeated addition is an operator algorithm

For a typical manual calculating machine, a multiplication such as:

```text
314 × 27
```

can be decomposed as:

```text
314 added 7 times at units position
shift carriage one decimal place
314 added 2 times at tens position
```

The key point is that **place-value shift** changes what the same accumulator contribution means. A carriage shift is therefore not a cosmetic movement; it is part of the algorithm.

Smithsonian's general calculating-machine overview describes this repeated-crank / carriage-shift workflow for early stepped-drum and pinwheel machines:

<https://www.si.edu/spotlight/calculating-machines>

Claim type: **H/M**.

Evidence: Smithsonian institutional synthesis, **E2** for the historical operator pattern.

## 2. Stepped drum: digit value becomes engagement count

### Sources

- Smithsonian, *Stepped Drum Calculating Machines*: <https://www.si.edu/spotlight/calculating-machines/stepped-drum-calculating-machines>
- Smithsonian, Thomas Arithmometer object: <https://www.si.edu/object/nmah_690692>

The Smithsonian describes Thomas-style arithmometers as using cylindrical stepped drums whose teeth vary in length. Moving a setting lever to a digit determines how many teeth participate in the transfer during a crank.

At the functional level:

```text
set digit d
→ expose / engage an effective d-step transfer
→ crank
→ accumulator changes by contribution proportional to d
```

A multiplication still requires repeated cranks according to multiplier digits and carriage shifts between decimal places.

Claim type: **H**.

Evidence: museum object + institutional mechanism overview, **E1–E2**. Carry is separately revision-sensitive: [`stepped-drum-carry-source-map.md`](stepped-drum-carry-source-map.md) records Thomas 1865's H/E1 successive cylinder phasing and simultaneous-load failure without treating those details as universal stepped-drum geometry.

### Repository abstraction

`src/mechanisms/stepped-drum/` models the **effective engagement count** and resulting contribution. It does not claim tooth profile, shaft placement, timing, or Thomas/Leibniz geometry.

Claim type: **P**.

## 3. Pinwheel: digit value becomes number of active pins

### Sources

- Smithsonian, *Pinwheel Calculating Machines*: <https://www.si.edu/spotlight/calculating-machines/pinwheel-calculating-machines>
- Smithsonian, Original Odhner machine: <https://www.si.edu/object/nmah_690753>
- W. T. Odhner, US 514,725 (1894): <https://patents.google.com/patent/US514725A/en>

Smithsonian describes the pinwheel family as using wheels with retractable pins. Setting a digit releases a corresponding number of pins, and crank rotation transfers a contribution to the calculating mechanism.

Odhner's patent is useful primary evidence for the family because it describes adjustable pins on calculating wheels and their setting/registration mechanisms.

Functionally:

```text
set digit d
→ make d pins effective
→ crank
→ d effective contacts contribute to the register
```

Again, this does **not** by itself eliminate repeated-addition multiplication at the operator level.

Claim type: **H**.

Evidence:

- patent: **E1** for the described design;
- museum overview/object: **E1–E2** for surviving family examples and synthesis.

### Repository abstraction

`src/mechanisms/pinwheel/` models the number of effective pins/teeth and resulting contribution. It does not claim that its geometry is an Odhner reconstruction.

Claim type: **P**.

## 4. Why stepped drum vs pinwheel is not yet the full multiplication story

Stepped drums and pinwheels are important actuator differences, but they can expose a surprisingly similar human algorithm:

```text
set multiplicand
→ crank N times for one multiplier digit
→ shift carriage
→ crank M times for next digit
```

If the repository compares only those two, a visitor may learn “two ways to make a variable mechanical digit” but miss a larger architectural question:

> Must the operator supply multiplication by repetition, or can the machine mechanically select the correct multiple in one cycle?

That missing branch is **direct multiplication**.

## 5. Millionaire: a multiplication table becomes mechanism

### Sources

- Smithsonian, *Direct Multiplication Calculating Machines*: <https://www.si.edu/spotlight/calculating-machines/direct-multiplication-calculating-machines>
- Smithsonian, Millionaire mechanism/object: <https://www.si.edu/object/nmah_694168>
- Otto Steiger, US 538,710 (1895), *Multiplying or Dividing Machine*: <https://patents.google.com/patent/US538710A/en>
- Otto Steiger, US 558,913 (1896), calculating-machine improvements: <https://patents.google.com/patent/US558913A/en>

Smithsonian identifies Otto Steiger's Millionaire as a commercially successful direct-multiplication machine: a number and a multiplier digit can be set, and an operating turn produces the corresponding product contribution rather than requiring the operator to crank once per unit of that multiplier digit.

The 1896 Steiger patent is especially important because it describes the essential controlling mechanism as a **mechanical representative of the multiplication table**. The specification discusses recessed control plates corresponding to products.

Claim type: **H**.

Evidence:

- Steiger patents: **E1** for the patented design language;
- Smithsonian surviving-object / institutional description: **E1–E2**.

### Why this matters conceptually

The information burden changes.

Repeated-addition machine:

```text
operator knows multiplier digit
operator repeats crank digit times
machine accumulates
```

Direct-multiplication machine:

```text
operator sets multiplier digit once
machine's mechanism selects the corresponding multiple
one main operating cycle transfers it
```

Some of the multiplication table has moved from **operator procedure** into **machine geometry/control state**.

That is exactly the kind of “where does the algorithm live?” question this repository is built to expose.

## 6. Four-way exhibit

The browser comparison now makes the conceptual axes explicit:

```text
314 × 27
```

### A. Pure repeated-addition baseline

Purpose: expose the arithmetic decomposition without claiming a historical machine.

### B. Stepped drum + carriage

Purpose: show variable engagement encoded by stepped geometry.

### C. Pinwheel + carriage

Purpose: show the same digit encoded by a variable number of effective pins.

### D. Direct multiplication / Millionaire-style control

Purpose: show a multiplier digit selecting a pre-encoded multiple rather than determining the number of repeated operating cranks.

The D track is implemented as a functional model, not a geometric Millionaire reconstruction.

## 7. Comparison dimensions

For each architecture, record:

| Dimension | Question |
|---|---|
| Input state | How are multiplicand and multiplier digit entered? |
| Digit encoding | Lever position, tooth engagement, active pins, control plate? |
| Main operation | What does one crank/cycle physically request? |
| Repetition | Who/what supplies repeated addition? |
| Place value | How is decimal position shifted? |
| Accumulator | Where is the running result stored? |
| Revolution count | Is operator repetition recorded? |
| Pre-encoded knowledge | How much arithmetic is embodied in the mechanism? |
| Human protocol | What must the operator remember and sequence? |
| Error surface | Wrong setting, wrong crank count, wrong carriage position, invalid mode? |

This makes “mechanism comparison” more useful than merely counting cranks.

## 8. What not to claim yet

The current repository does not yet justify claims about:

- exact stepped-drum tooth profiles for a particular Arithmometer revision;
- exact Odhner pin geometry/timing for a particular serial/model;
- Millionaire control-plate geometry as rendered in a future UI;
- comparative torque, speed, wear, or reliability from the simplified state models;
- which architecture is universally “better.”

Those require model-specific primary sources and, for performance claims, engineering evidence.

## 9. Implementation status

As of 2026-09-01, `src/mechanisms/direct-multiplier/` implements a bounded functional model with explicit digit selection, operation cycles, carriage shifts, accumulator state, human-operation counts, and deterministic replay. The multiplication exhibit exposes the `314 × 27` trace one event or one operating cycle at a time.

Replay validates event order and derived arithmetic rather than trusting serialized event fields. Tests cover zero digits, decimal positioning, unsafe arithmetic, deterministic replay, and tampered event data.

The next research decision is whether a control-plate visualization would add explanatory value. It must not be drawn as Millionaire geometry until exact patent figures, object revision, and reconstruction choices are mapped.

## Project decision

The strongest multiplication story is no longer “stepped drum versus pinwheel.” It is:

> **How much of multiplication is performed by repeated human operation, how much is encoded in a variable actuator, and how much is pre-encoded in the machine's control geometry?**

That is a mechanism-level increment not supplied by another cosmetic calculator emulator.
