# Mechanical error-control responsibilities across machine families

**Checked: 2026-09-01**

## Question

How do documented mechanical-computing architectures keep a mathematically valid relation from becoming a physically wrong result, and what may the repository compare without inventing a numerical reliability model?

## Claim types and sources

- Thomas 1865, Valentin Odhner 1921, and Talamini/Marchant 1932 patent statements: **H/E1** for their described problems and intended controls;
- Smithsonian frontlash unit `1983.3002.04` / `nmah_693235`: **H/E1** for the surviving/catalogued object and museum-described role;
- this repository's source-card comparison: **P**, with no physics or probability model.

Detailed patent anchors remain in [`stepped-drum-carry-source-map.md`](stepped-drum-carry-source-map.md) and [`rotary-carry-scheduling-source-map.md`](rotary-carry-scheduling-source-map.md). The Smithsonian frontlash object and both its NMAH and SI routes were directly inspected in the browser.

## Thomas 1865: several correctness problems, not one generic carry error

Charles-Xavier Thomas de Colmar, Brevet No. 68923 (1865):

<https://arithmometre.org/Brevets/PageBrevet1865FR.html>

The patent describes four distinct responsibilities:

1. **Rapid-motion overrun:** acquired motion could carry a dial one or two teeth too far. A moderation cylinder and Malta-cross relation are described as stopping that motion after the final stepped-cylinder tooth disengages.
2. **Simultaneous carry load:** several older vertical carry-lever loads could redirect resistance into lifting the dial plate; weakened engagement could give false results. The replacement conditions carry horizontally.
3. **Dependent carry order:** successively phased stepped cylinders make carries fall one after another.
4. **Full-position conditioning:** a double-spring relation is intended to take the carry fully down or fully returned, rather than leave it halfway.

These are **H/E1 patent-described** problems and responses. They establish neither safe crank speed, force/load values, field failure rates, nor one universal production geometry.

## Odhner-family rotary carry: conditioning and later opportunities

### Baseline

W. T. Odhner, US514725A (1894): <https://patents.google.com/patent/US514725A/en>

The patent describes register crossing positioning a transfer arm so a normally displaced carry pin can advance the next order. This baseline remains separate from later improvement claims.

### Rapid-rotation displacement

Valentin Jakob Odhner, US1377269A (1921): <https://patents.google.com/patent/US1377269A/en>

The patent says rapid rotation could throw the adjusted transfer arm back so the carry pins did not act and miscalculation occurred. Its revised fulcrum/contact relation is intended to minimize the destabilizing turning moment; a conical contact is also described to increase contact and reduce wear.

### Carry-created crossings and opportunity spacing

Louis Talamini / Marchant, US1867603A (1932): <https://patents.google.com/patent/US1867603A/en>

A carry can make its receiving wheel cross the next decimal boundary. The next higher opportunity must therefore arrive later, after that crossing has conditioned its control. The patent describes displaced rotary opportunities and overlap between positioning and driving phases.

All three are source-specific **H/E1 patent contexts**. Thomas stepped-cylinder phasing and Odhner/Talamini rotary opportunity displacement share a dependency question but not geometry.

## Bush Differential Analyzer: backlash between transmission stages

Smithsonian/NMAH, *Frontlash Unit from the Bush Differential Analyzer*, catalog `1983.3002.04`, record `nmah_693235`, ca. 1930:

- <https://americanhistory.si.edu/collections/object/nmah_693235>
- <https://www.si.edu/object/frontlash-unit-bush-differential-analyzer%3Anmah_693235>

The directly inspected catalog description calls the object a **frontlash unit** and states that it compensated for backlash in a drive between the output shaft of the unit and the input shaft of an adjacent unit. The record identifies Vannevar Bush as maker, ca. 1930, and tells readers to compare `1983.3002.09`, `.10`, and `.11`.

- Claim/evidence: **H/E1**, surviving/catalogued object and museum-described responsibility.
- Artifact-family boundary: the related numbers establish comparison context only; this pass does not assign their incomplete or complete construction to a specific full-machine position.
- Not established: numerical backlash magnitude, residual error, tolerance, efficiency, response time, exact full-machine placement/wiring, or a connection between this object and any particular surviving adder, integrator, or tracer.

A frontlash unit's stated responsibility is **backlash compensation in shaft transmission**. It is not silently a torque amplifier. Integration mathematics, torque amplification, shaft transmission, backlash compensation, and output tracing are separate responsibilities.

## Bush 1931 access boundary

Vannevar Bush, “The Differential Analyzer. A New Machine for Solving Differential Equations,” *Journal of the Franklin Institute* 212(4), October 1931, 447–488, DOI <https://doi.org/10.1016/S0016-0032(31)90616-9>.

A bounded DOI/library/archive search did not yield a stable inspectable full facsimile in this environment. No page, figure, geometry, or quotation claim is manufactured from the uninspected paper. The directly inspected Smithsonian object record is sufficient for the bounded frontlash responsibility.

## Comparison matrix

| Source/context | Documented physical correctness problem | Documented response/control | Evidence role | Not established |
|---|---|---|---|---|
| Thomas 1865 | inertia overrun; simultaneous carry load/plate lift; dependent carry order; half-position risk | moderation/Malta-cross relation; horizontal and full-position carry conditioning; successive stepped-cylinder phasing | H/E1 patent | measured speed/load/failure envelope; universal production geometry |
| Valentin Odhner 1921 | rapid rotation can displace an adjusted transfer arm so carry fails and miscalculation occurs | patent-specific fulcrum/contact control | H/E1 patent | failure probability, safe RPM, universal Odhner geometry/adoption |
| Talamini/Marchant 1932 | carry-created crossings need later rotary opportunities; phase spacing constrains action | displaced opportunities and overlapping positioning/driving phases | H/E1 patent | Thomas geometry; universal production implementation or gain |
| Bush ca. 1930 frontlash unit | backlash in a drive between adjacent unit shafts | catalogued frontlash compensation unit | H/E1 surviving/catalogued object | numerical backlash/residual error; exact full-machine placement/wiring; torque amplification |
| repository comparison | make distinct error-control responsibilities inspectable | typed, source-separated cards and responsibility matrix | P | reliability probability, physical parameter, or failure simulation |

## Conclusion and implementation consequence

```text
mathematically correct relation
!=
physically guaranteed transmission
```

But this does not imply one universal mechanical-error mechanism. Carry order, inertia/load redirection, rotary conditioning, and backlash between shafts require different source-specific controls. The public comparison therefore contains evidence metadata only. It does not modify the ideal continuous integrator, inject random failures, or estimate RPM, torque, friction, tolerance, wear, backlash magnitude, or probability.

## Open evidence

- exact production mapping and direct measurements for Thomas and Odhner-family mechanisms;
- numerical loads, rates, tolerances, maintenance, wear, and measured failure envelopes;
- full Bush 1931 facsimile/page/figure inspection;
- exact Differential Analyzer shaft routing, frontlash placement, torque-amplifier construction, scale factors, and residual error.