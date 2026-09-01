# Why a Difference Engine can tabulate with addition

**Checked: 2026-09-01**

## Evidence boundary

- A degree-`k` polynomial has constant `k`th finite differences for equally spaced arguments: **M**.
- This repository's leading-value crank/update order: **P/M**.
- Claims about Babbage or Scheutz engines and printing mechanisms: **H/R**, mapped separately in [`difference-engine-source-map.md`](difference-engine-source-map.md).

For a degree-`k` polynomial, advancing a difference table can be reduced to adding each higher-order difference into the lower-order accumulator in a defined sequence. No general multiplication unit is needed during this table-generation step: the polynomial's structure is represented in the initialized differences, and repeated addition produces later values.

The repository's deterministic 2–5-column model makes that mathematical dependency inspectable. It is not a reconstruction of Babbage's racks, sectors, carries, printer, digit capacity or crank timing. The new tabular-output lesson likewise distinguishes a computed value from persistent checking/master-output roles without claiming historical printer phases or geometry.

For named-machine provenance, drawing identifiers, reconstruction boundaries, and the Scheutz comparison, use [`difference-engine-source-map.md`](difference-engine-source-map.md).