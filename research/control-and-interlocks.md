# Control and interlocks: legal transitions are part of computation

**Checked: 2026-09-01**

## Question

A lock does not represent a number. Why can it still be part of the computation?

## Claim types

- Odhner patent statements and Curta operator instructions: **H**;
- connecting those controls to general state-machine invariants: **H/R**;
- `src/mechanisms/setting-crank-interlock/`: **P/M**.

Historical evidence strength is separate from claim type under `docs/EVIDENCE_POLICY.md`.

## 1. Odhner crank/setting mutual exclusion

### Source

Valentin Jakob Odhner, US 1,510,100, *Calculating Machine*, filed 17 November 1922, patented 30 September 1924:

<https://patents.google.com/patent/US1510100A/en>

### What the patent directly establishes

The specification opens by describing calculating machines whose crank cooperates with a locking device so that the crank and calculating discs can be locked at the zero position. It then states the invention's objective: a guiding device keeps that crank lock inactive during rotation except at zero, avoiding the need to hold the handle displaced throughout the turn.

In the illustrated embodiments:

- Figures 1–4 show a handle/part, crank locking end, frame notch, guide ring and zero-position notch;
- Figures 5–7 show an altered sliding-handle embodiment;
- Figure 8 schematically combines features of both embodiments;
- the description links crank-lock state to another locking device associated with cam discs, so releasing the crank and locking/liberating setting-related cam discs are coordinated rather than independent.

Claim 1 explicitly concerns a crank lock for zero position combined with guiding means that keep it disengaged away from zero and a cam-disc locking relationship. Later claims vary the handle movement and guide arrangement.

- Claim type: **H**.
- Evidence: patent text/drawings, **E1 for the claimed design**.

### Boundary

The patent proves what Odhner claimed and illustrated. It does not prove that every production Odhner-family machine used this exact embodiment, nor that roller, notch, sector, ring, and cam-disc geometry is universal to pinwheel calculators. This repository takes only the abstract lesson: **setting-related state and crank operation can be mutually constrained around a home position**.

## 2. Curta operating-handle and carriage control

### Source and provenance

Curta.org specialist manual archive/transcription:

<https://curta.org/wiki/CurtaManuals>

The page says multiple consumer manuals, languages and layouts existed. The hosted excerpt is operator material, but the page does not supply a complete edition/page/facsimile mapping for every paragraph. It is therefore used conservatively as specialist-hosted operator-procedure evidence, not as a production drawing.

### Supported operator invariants

The transcription states that:

- the handle is to be turned clockwise only and is locked against backward turns;
- one full turn completes when the handle returns to its home detent or “zero stop”;
- the handle must be at zero stop before other parts are manipulated;
- the carriage can be raised only at zero stop;
- while the carriage is raised the handle is locked until the carriage snaps down;
- a clearing lever outside either stop prevents the carriage from seating and leaves the handle locked;
- setting knobs, black result/product dial, white counter/quotient dial, carriage position, plus/minus handle position and reversing lever have distinct operator roles.

The associated division transcription documents carriage selection, repeated turns, overshoot recognition, an immediate undoing turn, and lower carriage positions for later quotient digits:

<https://curta.org/wiki/DivisionAlgorithm>

- Claim type: **H** for the transcribed operator instructions; **H/R** for the state-machine interpretation.
- Evidence: conservatively **E2–E3** until exact manual edition/page/facsimile provenance is mapped.

These instructions do not prove that Curta and Odhner locks share geometry. Curta's clockwise-only policy is also not generalized into the generic software mechanism.

## 3. Why control is computation

A control carries algorithmic meaning when arithmetic correctness assumes its invariant:

- changing a setting during transfer could combine parts of two operands in one nominal cycle;
- beginning another cycle before the current one returns home makes cycle/revolution counting ambiguous;
- changing carriage position mid-cycle changes place value during a transfer;
- changing plus/minus mode mid-cycle makes the requested operation ill-defined;
- failing to correct an overshoot before shifting produces a wrong quotient digit;
- clearing or releasing controls in an intermediate position can leave registers or drive state incompatible.

The lock does not store a numerical magnitude. It stores **permission and phase**, preserving the boundary around an arithmetic operation.

## 4. Software abstraction decision

`src/mechanisms/setting-crank-interlock/` is a generic **P/M** lesson. It models:

```text
HOME: crank locked, setting free
BEGIN: setting locks before crank release
ACTIVE: crank active, setting unavailable
COMPLETE: cycle counted, crank returns home and locks, setting releases
```

It exposes setting value/revision, crank position, both locks, phase, cycle count, human-operation count, ordered events, invalid actions and hardened replay.

It refuses to claim:

- Odhner roller/notch/ring/sector/cam geometry;
- Curta internal lock geometry or timing;
- a universal crank direction;
- one mechanism shared across historical families;
- arithmetic transfer, carry, torque, backlash, or animation timing.

The model is judged by deterministic invariants and tests. Historical implementation remains in source-specific research.