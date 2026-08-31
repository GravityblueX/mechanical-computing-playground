# Evidence policy

This repository mixes mathematics, surviving historical machines, engineering reconstructions, software models, and deliberately counterfactual teaching devices. A single A–D ladder cannot describe all of those without becoming ambiguous.

The repository therefore uses **two separate questions**:

1. **What kind of claim is this?**
2. **How strong is the historical/mechanical evidence for the claim?**

Do not use historical evidence grades for mathematical truths, and do not use “pedagogical simplification” as though it were merely a weak historical source.

## Axis 1 — Claim type

### M — Mathematical / computational

Examples:

- a degree-`k` polynomial has constant `k`th finite differences;
- a particular state transition produces `0099 → 0100` under the repository's abstract register model;
- a computed analytic gradient matches a finite-difference check within a stated tolerance.

These are established by proof, calculation, tests, or mathematical references. They are **not** historical evidence claims.

### H — Historical record

Claims about what a real historical machine, document, manufacturer, operator, or inventor did.

Examples:

- a surviving Comptometer has a particular keyboard arrangement;
- an Odhner patent describes adjustable pins;
- a Steiger patent describes a multiplication-table control mechanism;
- a manual instructs an operator to turn the crank in a particular direction.

Historical claims require provenance.

### R — Engineering reconstruction / interpretation

Claims that connect incomplete historical evidence into a working engineering account.

Examples:

- a modern reconstruction interprets a drawing in a particular way;
- a museum reconstruction demonstrates a plausible timing sequence;
- a software emulator chooses one historically defensible interpretation among multiple possibilities.

A reconstruction may be excellent engineering without being identical to a lost historical machine.

### P — Pedagogical or counterfactual model

A mechanism invented or simplified for explanation.

Examples:

- the repository's generic carry arrow;
- a schematic gear that exists only to make a state dependency visible;
- the hand-crank backpropagation machine;
- a simplified stepped-drum model that exposes engagement count without claiming historical geometry.

P is not “bad evidence.” It is a different kind of object and should be judged by explanatory fidelity to the underlying computation, not by historical authenticity.

## Axis 2 — Historical evidence strength

Use this axis for H and R claims only.

### E1 — Direct / primary

Strongest ordinary historical support available for the claim, for example:

- surviving physical machine with catalog/provenance;
- original patent;
- original drawing;
- contemporary manual;
- contemporary technical paper or inventor description;
- direct measurement of a surviving mechanism.

E1 does **not** mean infallible. Patents can describe intended rather than manufactured designs; manuals can omit internal construction; surviving machines can be later revisions.

### E2 — Authoritative reconstruction / institutional synthesis

Examples:

- museum technical study;
- documented reconstruction based on primary drawings;
- scholarly history using primary evidence;
- specialist mechanism study with explicit provenance.

Use E2 when the claim depends on interpretation but the evidentiary chain is visible and strong.

### E3 — Reliable secondary

Useful for orientation or low-precision context, for example:

- reputable historical overview;
- established specialist reference without full primary-source trace for the particular detail.

Do not use E3 alone for precise internal geometry, timing, or originality claims when E1/E2 material is available.

### E4 — Open / inference

The project currently lacks sufficient evidence, or the relationship is an explicit inference.

E4 claims should normally be phrased as questions, hypotheses, or engineering choices rather than historical facts.

## Compatibility with the older A–D badges

Older code and UI use:

```text
A: preserved physical machine / direct measurement
B: original drawing/manual + faithful reconstruction
C: documented but interpretation required
D: pedagogical simplification
```

Those labels conflate claim type and evidence strength. Until the UI is migrated, interpret them conservatively:

- old **A** ≈ H/E1;
- old **B** ≈ H or R/E1–E2;
- old **C** ≈ R/E2–E4 depending on the actual source chain;
- old **D** ≈ P, not “weak history.”

New research notes should prefer the explicit notation:

```text
Claim type: H
Evidence: E1
```

or:

```text
Claim type: P
Historical evidence: not applicable
Computational validation: tested against <model/reference>
```

## Required structure for research notes

When a note makes mechanism claims, include:

```text
Question
Claim type(s)
Sources
What the source directly establishes
What is reconstructed/inferred
What this repository simplifies
Implementation consequence
Uncertainties
Date checked
```

For a patent, also record what is actually being used: claim text, specification, figure, or merely bibliographic priority.

For a museum object, distinguish the catalog description from conclusions the repository draws from it.

## Examples

### Finite differences

> A cubic polynomial has constant third differences.

- Claim type: M
- Support: mathematics / test fixture
- Historical evidence grade: not applicable

> Babbage's Difference Engine was designed to exploit finite-difference computation.

- Claim type: H
- Evidence: should be E1/E2 using Babbage documents, surviving drawings, and/or documented reconstruction literature.

> Our `difference-column` update order represents the exact gear timing of Difference Engine No. 2.

- Claim type: H/R
- Current evidence: not established unless a source chain for that exact timing is supplied.

> Our column model advances higher differences before lower ones so the user can see the dependency.

- Claim type: P/M
- Validation: deterministic code/tests

### Carry

> `0099 + 1` requires two higher-place increments under a decimal positional register.

- Claim type: M

> Pascal's sautoir used stored mechanical energy to trigger carry into the next order.

- Claim type: H
- Evidence: use a primary or documented reconstruction/museum source and state the exact supported detail.

> The arrow shown on the website is the physical lever path inside Pascal's machine.

- Claim type: H
- Do not make this claim unless the drawing is actually sourced; the default arrow is P.

## Why this matters

The interesting part of this project is precisely the boundary between an abstract operation and the historical mechanism that made it possible. If mathematical certainty, artifact evidence, reconstruction confidence, and teaching convenience are collapsed into one grade, that boundary disappears.

The repository should make uncertainty **more visible as the model becomes more mechanically specific**, not less.