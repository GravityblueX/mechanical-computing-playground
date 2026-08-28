# Finite difference design

**Checked: 2026-08-28 · evidence grades A–D**

Finite differences are successive subtractions of a sequence. For a polynomial of degree `k`, the `k`th difference is constant. A table can therefore advance by adding the current highest difference into the next lower column, from high order down to the output column. The square preset starts `[0, 1, 2]`; the cubic preset starts `[0, 1, 6, 6]`.

The code in `src/mechanisms/difference-column` is a deterministic pedagogical column model (grade D). It stores the leading value of each column and makes update order explicit; it is not a claim to reproduce every rack, pin, or timing detail of Babbage's Difference Engine. The mathematical polynomial property is grade A. Historical construction details require the primary drawings and reconstruction literature, and are deliberately not inferred from this small model.

## Project decision

Ship a text-visible, stepwise model before any gear animation. Each crank yields a new output and a serializable state. This adds explanatory value without pretending to be a full historical emulator.
