# Differential Analyzer provenance and continuous-mechanics boundary

**Checked: 2026-09-02**

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

The 2026-09-02 retry rechecked the DOI and canonical ScienceDirect PII route. ScienceDirect presented a human-verification challenge rather than article pages. Wikimedia Commons exact-title search returned no facsimile, Internet Archive metadata search failed at the TLS boundary, and OpenAlex reported the work closed with no repository full text. No stable, lawfully accessible full facsimile or institutional scan was directly inspectable. Access therefore remains **bibliographic-only**: no page quotation, figure number, construction role, torque/error number, or figure-specific geometry claim is used. The bibliographic record identifies a 1931 publication about Bush's then-new machine; it does not establish that every later Differential Analyzer generation used one unchanged construction.

## 2. Smithsonian/National Museum of American History records

### Records

- object group, *Differential Analyzer Parts and Documentation*: <https://americanhistory.si.edu/collections/object-groups/mechanical-integrators/differential-analyzers>
- Integrator Unit from Bush Differential Analyzer, `MA.314824` / `nmah_1215155`: <https://www.si.edu/object/integrator-unit-bush-differential-analyzer%3Anmah_1215155>
- Input Table Carriage, `1983.3002.01` / `nmah_693232`: <https://www.si.edu/object/input-table-carriage-bush-differential-analyzer%3Anmah_693232>
- Adder / Differential Gear, `1983.3002.02` / `nmah_693233`: <https://www.si.edu/object/nmah_693233>
- Output Table Carriage / Tracer, `1983.3002.03` / `nmah_693234`: <https://www.si.edu/object/carriage-and-tracer-output-table-bush-differential-analyzer%3Anmah_693234>
- Frontlash Unit, `1983.3002.04` / `nmah_693235`: <https://americanhistory.si.edu/collections/object/nmah_693235>
- related frontlash-unit comparison records named by that catalog: `1983.3002.09` / `nmah_693240`, `.10` / `nmah_693241`, and `.11` / `nmah_693242`

The object-group page and all five named component records were directly inspected in the browser on 2026-09-01. The group page distinguishes the original analyzer completed in 1930, a later improved MIT analyzer, and postwar GE/UCLA components rather than flattening them into one generation. The component records identify these separate catalogued roles:

- `MA.314824` contains two of six original integrators associated with the MIT analyzer; its record also documents later transfer to Wayne University and Smithsonian provenance;
- input-table carriage `1983.3002.01` used a pointer to follow a graph, with the resulting motion transported by a shaft to an appropriate part of the machine;
- adder/differential gear `1983.3002.02` connected shafts `a` and `b`, with gearing chosen so shaft `c` represented the sum of their revolutions;
- output-table carriage/tracer `1983.3002.03` received result-shaft rotation and drew the result on an output table;
- the ca. 1930 frontlash unit `1983.3002.04` compensated for backlash in a drive between the output shaft of one unit and the input shaft of an adjacent unit. Its record explicitly directs comparison with `.09`, `.10`, and `.11`.

- Claim type: **H**.
- Evidence: **E1 for the surviving/catalogued objects and museum-described roles**.

### Access limitation and safe use

The `americanhistory.si.edu` object-group route initially displayed request verification but then rendered its catalog listing; the `www.si.edu` routes for the integrator, input carriage, adder, tracer and frontlash objects all rendered readable records. This is a route-specific observation, not a blanket Smithsonian availability claim.

The frontlash record describes a steel shaft/cylinder, thin brass drum, friction band, planetary gearing and disc, but this pass uses those details only as catalog description—not as a complete analyzer geometry map. The records do not establish that the surviving input, adder, integrator, frontlash and tracer objects were permanently wired as the exact chain used by the browser. They also do not place this particular frontlash object between any particular surviving pair. Images are linked, not copied.

## 3. Mathematical and engineering interpretation

### Integration relation

For a represented independent quantity `x`, input quantity/rate `u`, and integrated output `y`, the lesson uses the mathematical sampling relation:

```text
Δy = u · Δx
```

For a constant input, repeated contributions accumulate to the corresponding integral. This is **M**, validated by calculation and tests. The browser's finite inspection interval is not evidence that a physical analyzer moved in discrete ticks.

### Bush and Caldwell, 1931: directly inspected application paper

Direct APS facsimile: <https://harvest.aps.org/v2/journals/articles/10.1103/PhysRev.38.1898/fulltext>

V. Bush and S. H. Caldwell, “Thomas-Fermi Equation Solution by the Differential Analyzer,” *Physical Review* 38 (15 November 1931), printed pp. 1898–1902. The complete five-page facsimile was inspected.

- p. 1898 identifies the MIT authors, states that the numerical solution was mechanically obtained by the Differential Analyzer, points to the separate *Journal of the Franklin Institute* construction paper, and says the range was checked by an independent integration;
- p. 1899 describes splitting the problem, changing variables, running families of solutions, and notes that one solution could be run in a few minutes once the machine was set up;
- pp. 1900–1902 and Figures 1–3 show problem-specific connection diagrams labelled with multiplier, input table, integrator and output table roles; the text explicitly says scales, signs and gear ratios are disregarded;
- p. 1902 reports the independent integration check.

This is **H/E1 evidence for an actual 1931 application, its stated checking method, and the published schematic roles**. It is not a construction manual, does not replace the inaccessible Bush 1931 machine paper, and does not establish exact shaft routing, component placement, scale factors, gear ratios, or identity with later analyzer generations.

### Shannon, 1941: bounded access result

Claude E. Shannon, “Mathematical Theory of the Differential Analyzer,” *Journal of Mathematics and Physics* 20 (April 1941), pp. 337–354, DOI <https://doi.org/10.1002/sapm1941201337>.

The 2026-09-02 retry directly inspected the canonical Wiley landing page and OpenAlex metadata. They confirm author, title, April 1941 date, volume 20 issue 1–4 and printed pp. 337–354. The canonical PDF still returned HTTP 403; the rendered landing page exposed metadata/references but no article body, Wikimedia Commons exact-title search found no facsimile, and OpenAlex reported a closed work with no repository full text. Therefore this remains **bibliographic-only H/R**: no Shannon theorem, equation, machine-element relation, figure or content-page claim is made, and the theory paper is not used as a geometry, wiring or browser-phase source.

## 4. Machine-generation boundary

Do not flatten these into one timeless “Differential Analyzer”:

| Layer | Safe statement |
|---|---|
| original MIT analyzer / ca. 1930 surviving components | catalogued Bush-associated input, adder/differential, integrator, and tracer components survive |
| Bush 1931 construction publication | contemporary description of the new Differential Analyzer; exact uninspected page/figure claims remain open here |
| Bush & Caldwell 1931 application paper | directly inspected five-page application/checking account with problem-specific Figures 1–3; not a construction manual |
| Shannon 1941 mathematical theory | near-contemporary theory publication; bibliographic-only in this environment, so no theorem/equation/system-element/page/figure claim and no physical-geometry use |
| later improved MIT/Rockefeller work | later generation; not the default geometry for ca. 1930 objects |
| Bush & Caldwell, 1945, *A New Type of Differential Analyzer* | later machine publication; not silently merged into the original analyzer |
| postwar GE/UCLA Smithsonian material | different provenance/generation; not used to fill gaps in original MIT geometry |
| modern reconstruction/interpretation | R unless tied precisely to primary drawings/artifacts |
| this repository | generic P/M functional chain and inspection sampler |

## 5. Separate responsibilities

| Responsibility | Evidence boundary |
|---|---|
| integration mathematics | `Δy = u·Δx` is M; the browser's interval is a P/M inspection choice |
| shaft transmission | catalogued units expose input/output shaft roles at component precision; exact full-machine routing remains open |
| backlash compensation | `1983.3002.04` / `nmah_693235` is H/E1 object evidence for the museum-stated frontlash role between adjacent-unit shafts |
| output tracing | `1983.3002.03` / `nmah_693234` supplies the catalogued tracer role; browser output values/wiring are P/M |
| torque amplification | separate responsibility; no authoritative/primary construction claim was newly inspected here |

Frontlash compensation is not silently equated with torque amplification. Neither inaccessible Bush/Shannon full text is used to bridge that gap. The frontlash record establishes no numerical backlash, residual error, tolerance, efficiency, response time, or exact full-machine placement.

## 6. What is inferred and what remains open

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
- numerical backlash/residual error and the placement of identified frontlash units; slip, drift and error propagation;
- scale factors, units, tolerances and physical dimensions;
- real operating timing;
- exact distinctions among individual MIT revisions beyond the bounded records above.

## 7. Implementation consequence

`src/mechanisms/continuous-integrator/` now represents an independent coordinate, observed input, inspection interval, accumulated output, sample count, ordered P/M events and hardened replay. Its three phases—observe input, advance coordinate, advance integral—are an **inspection device**, not historical machine timing.

`src/exhibits/continuous-flow/` explicitly represents the adder relation and output/tracer boundary. The UI labels four layers:

```text
H/E1: catalogued component roles
M: addition/integration relation
P/M: exact values, wiring and serialized browser order
open: physical geometry/timing
```

The current lesson is a mechanism-level teaching model, not an emulator of Bush's complete analyzer.