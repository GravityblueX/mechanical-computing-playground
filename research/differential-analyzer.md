# Differential Analyzer provenance and continuous-mechanics boundary

**Checked: 2026-09-01**

## Question

What do the original MIT/Bush record and surviving catalogued components establish; what is the mathematical integration relation; and what discrete ordering exists only so this browser can inspect a continuous process?

## Claim types

- contemporary publication and surviving/catalogued components: **H**;
- later mathematical/system interpretation: **H/R**;
- the repository's integrator and continuous-flow lesson: **P/M**.

Evidence strength is separate under `docs/EVIDENCE_POLICY.md`.

## 1. Vannevar Bush, 1931

### Bibliographic anchor

Vannevar Bush, “The Differential Analyzer. A New Machine for Solving Differential Equations,” *Journal of the Franklin Institute*, vol. 212, no. 4 (October 1931), pp. 447–488. DOI: <https://doi.org/10.1016/S0016-0032(31)90616-9>.

- Claim type: **H**.
- Evidence: **E1 for what Bush published**.

This pass verified the bibliographic metadata/DOI route, but did not obtain a stable full facsimile through the available environment. It therefore makes no uninspected page quotation or figure-specific geometry claim. The paper identifies a 1931 publication about Bush's then-new machine; it does not establish that every later Differential Analyzer generation used one unchanged construction.

## 2. Smithsonian/National Museum of American History records

### Records

- object group, *Differential Analyzer Parts and Documentation*: <https://americanhistory.si.edu/collections/object-groups/mechanical-integrators/differential-analyzers>
- Integrator Unit from Bush Differential Analyzer, `MA.314824` / `nmah_1215155`: <https://www.si.edu/object/integrator-unit-bush-differential-analyzer%3Anmah_1215155>
- Input Table Carriage, `1983.3002.01` / `nmah_693232`: <https://www.si.edu/object/input-table-carriage-bush-differential-analyzer%3Anmah_693232>
- Adder / Differential Gear, `1983.3002.02` / `nmah_693233`: <https://www.si.edu/object/nmah_693233>
- Output Table Carriage / Tracer, `1983.3002.03` / `nmah_693234`: <https://www.si.edu/object/carriage-and-tracer-output-table-bush-differential-analyzer%3Anmah_693234>

The task's institutional-record anchors identify the following catalogued roles:

- the integrator unit contains two of six original integrators associated with the MIT analyzer;
- an input-table carriage converted motion produced by tracing a graph into shaft motion supplied to the machine;
- a differential gear combined two shaft rotations so its output represented their sum;
- an output-table carriage/tracer converted result-shaft rotation into a drawn result.

- Claim type: **H**.
- Evidence: **E1 for the surviving/catalogued objects and museum-described roles**.

### Access limitation and safe use

Direct requests to the Smithsonian object/group pages returned request-verification/403 responses in this environment. The repository therefore preserves the exact identifiers and bounded catalogued-role statements supplied by the institutional records/task, but does not pretend to have inspected additional dimensions, inscriptions, photographs, internal geometry, or wiring descriptions.

The records do not establish that these four surviving objects were permanently wired as the exact chain used by the browser. Images are linked, not copied.

## 3. Mathematical and engineering interpretation

### Integration relation

For a represented independent quantity `x`, input quantity/rate `u`, and integrated output `y`, the lesson uses the mathematical sampling relation:

```text
Δy = u · Δx
```

For a constant input, repeated contributions accumulate to the corresponding integral. This is **M**, validated by calculation and tests. The browser's finite inspection interval is not evidence that a physical analyzer moved in discrete ticks.

### Shannon, 1941

Claude E. Shannon, “Mathematical Theory of the Differential Analyzer,” 1941, DOI <https://doi.org/10.1002/sapm1941201337>.

- Claim type: **H/R** for a near-contemporary mathematical/system account.
- Evidence: bibliographic anchor verified; full-paper detail was not inspected in this pass because the publisher route rejected automated access.

The paper is retained as the correct interpretation path, not used here for unverified equations, page claims, or component geometry.

## 4. Machine-generation boundary

Do not flatten these into one timeless “Differential Analyzer”:

| Layer | Safe statement |
|---|---|
| original MIT analyzer / ca. 1930 surviving components | catalogued Bush-associated input, adder/differential, integrator, and tracer components survive |
| Bush 1931 publication | contemporary description of the new Differential Analyzer; exact uninspected page/figure claims remain open here |
| later improved MIT/Rockefeller work | later generation; not the default geometry for ca. 1930 objects |
| Bush & Caldwell, 1945, *A New Type of Differential Analyzer* | later machine publication; not silently merged into the original analyzer |
| postwar GE/UCLA Smithsonian material | different provenance/generation; not used to fill gaps in original MIT geometry |
| modern reconstruction/interpretation | R unless tied precisely to primary drawings/artifacts |
| this repository | generic P/M functional chain and inspection sampler |

## 5. What is inferred and what remains open

The broad functional connection—continuous quantities can be coupled, added, integrated, and plotted—is historically grounded at role level. The repository's exact sequence:

```text
A=2 and B=1
→ adder output 3
→ inspect over Δx=0.5
→ integrated contribution 1.5
→ tracer output 1.5
```

is **P/M**. It is not a claim that those specific surviving objects were wired this way, stopped between phases, or used these scale values.

Open/unmodeled:

- disk-and-wheel geometry and contact kinematics;
- torque-amplifier construction;
- shaft routing and actual interconnection;
- backlash/frontlash, slip, drift and error propagation;
- scale factors, units, tolerances and physical dimensions;
- real operating timing;
- exact distinctions among individual MIT revisions beyond the bounded records above.

## 6. Implementation consequence

`src/mechanisms/continuous-integrator/` now represents an independent coordinate, observed input, inspection interval, accumulated output, sample count, ordered P/M events and hardened replay. Its three phases—observe input, advance coordinate, advance integral—are an **inspection device**, not historical machine timing.

`src/exhibits/continuous-flow/` explicitly represents the adder relation and output/tracer boundary. The UI labels four layers:

```text
H/E1: catalogued component roles
M: addition/integration relation
P/M: exact values, wiring and serialized browser order
open: physical geometry/timing
```

The current lesson is a mechanism-level teaching model, not an emulator of Bush's complete analyzer.