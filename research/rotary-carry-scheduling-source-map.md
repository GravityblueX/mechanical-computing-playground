# Rotary carry scheduling and reliability source map

**Checked: 2026-09-01**

## Question

Why must successive carries in an Odhner-type rotary accumulator be scheduled, what documented failure modes motivated improvements, and what can a direction-neutral ordinal teaching model legitimately expose?

## Claim types

- patent mechanism and stated failure/experiment claims: **H/E1** for the described intended embodiments;
- broad pinwheel family context: **H/E2** institutional synthesis;
- repository dependency slots: **P/M**, with no historical angle or elapsed-time meaning;
- any broader reliability consequence not directly stated in a patent: **R** and kept separate below.

## W. T. Odhner US 514,725 (1894): baseline rotary transfer

Willgodt Theophil Odhner, US 514,725, *Calculating Apparatus*:

<https://patents.google.com/patent/US514725A/en>

The specification and Figs. 5–6 describe calculating wheels `B` with nine radially movable pins/rods `O`, set through annulus `D`. Projecting pins act through intermediate wheels `J` on registering wheels `G`. The text says those intermediate wheels ensure exact registering-wheel motion and prevent excess movement during rapid rotation.

The tens-transfer relationship around Figs. 9–10 is:

- registering-wheel pin `20` meets cam surface `19` and moves arm `M`/shoulder `I` into position;
- calculating-wheel carry pins/teeth `L`, normally displaced from the effective line, are deflected by cam surface `21`;
- the active `L` then advances the adjacent higher-order intermediate/registering wheel by one tooth;
- projecting piece `22` returns the shoulder/arm to its normal position.

The patent also indicates opposite crank directions for addition and subtraction in Figs. 2–3.

- Claim type/evidence: **H/E1**, patented intended mechanism.
- Not established: geometric identity across later Original-Odhner production revisions; quantitative speed, force, wear, or tolerance limits.

## Valentin Jakob Odhner US 1,377,269 (1921): rapid-rotation miscalculation risk

Valentin Jakob Odhner, US 1,377,269, *Transfer Mechanism of Calculating-Machines*:

<https://patents.google.com/patent/US1377269A/en>

The opening specification explicitly identifies US514725-type apparatus as prior context. It says the earlier fulcrum relation can allow ten-pins, especially during rapid calculating-wheel rotation, to throw the transfer arm back from its adjusted position; the ten-pins then never act and **miscalculation takes place**.

The proposed Fig. 1 relation locates the arm fulcrum inside the angle formed by tangents at the two pin-contact points so the two turning moments are equal and the tendency to throw the arm outward is minimized. Fig. 2 and claim 2 add a conical contact surface intended to give contact substantially along pin length and reduce wear. Cam piece `11` returns arm `7` to its inoperative position.

- Claim type/evidence: **H/E1**, patented intended improvement and explicitly stated failure mode.
- Bounded R inference: reliable conditioning matters because an unconditioned transfer opportunity can lose arithmetic state.
- Not established: safe RPM, failure probability, field rate, material life, or use in every production revision.

## Louis Talamini / Marchant US 1,867,603 (1932): successive opportunities and phase overlap

Louis Talamini, assigned to Marchant Calculating Machine Company, US 1,867,603, *Calculating Machine*:

<https://patents.google.com/patent/US1867603A/en>

The patent identifies US514725 as an example of the Odhner type and describes a reversible rotary actuator/drum. Additive and subtractive carry teeth are normally inactive; passage of the next-lower numeral wheel between `9` and `0` in the relevant direction interposes a cam that conditions a carry tooth.

The specification states why dependent carries cannot all operate simultaneously: one carry may itself move the receiving numeral wheel across the decimal boundary, so the next higher carry opportunity must arrive sufficiently later for that new crossing to condition its control. Successive addition/subtraction carry teeth therefore form spirals around the drum.

It also explains a spacing/capacity constraint. A carry member first undergoes a positioning phase and then a gear-driving phase; the prior minimum peripheral displacement included both. The described chamfered/complementary surfaces begin gear operation before positioning has fully completed, overlapping phases and allowing closer spacing. The patent reports about **22 percent** less safe peripheral displacement in its practical experiment, without increased manufacture/assembly care, and connects the improved spacing/centralization relation to capacity and operating speed.

- Claim type/evidence: **H/E1**, patented intended mechanism and described experiment.
- Not established: authorship by either Odhner; universal Odhner geometry; a universal 22% capacity/speed gain; exact production embodiment; safe RPM or failure curve.

## Smithsonian pinwheel family context

Smithsonian/NMAH, *Pinwheel Calculating Machines*:

<https://www.si.edu/spotlight/calculating-machines/pinwheel-calculating-machines>

This assigned institutional source is used only for broad family context: pinwheel machines set digits by exposing/effecting pins and transfer selected values during crank rotation. It returned HTTP 403 in this environment, so no new detailed carry claim or image interpretation is made from it.

- Claim type/evidence: bounded **H/E2** institutional context.
- Detailed scheduling remains anchored to the three patents.

## Evolution table

| Source/context | Carry problem exposed | Scheduling / transfer relationship | Evidence | Not established |
|---|---|---|---|---|
| US514725A (1894) | accurate decimal transfer during rotary operation | register crossing positions an arm; a deflected carry pin/tooth advances the next order; return piece restores the arm | H/E1 | later production universality; force/speed limits |
| US1377269A (1921) | rapid rotation can knock an adjusted arm out so carry pins do not act and miscalculation occurs | revised fulcrum/contact relation minimizes destabilizing moment; conical contact increases contact and reduces wear | H/E1 | safe RPM, failure rate, all revisions |
| US1867603A (1932) | carry-created crossings require successively later opportunities; spacing limits capacity | staggered/spiral opportunities; overlapping positioning and driving phases reduces spacing in the described design | H/E1 | Odhner authorship; universal geometry or universal 22% gain |
| repository ordinal schedule | expose dependency ordering only | deterministic, strictly increasing integer slots | tested P/M | angle, elapsed time, torque, teeth, geometry, failure probability |

## Repository simplification and implementation consequence

`src/mechanisms/rotary-carry-schedule/` is direction-neutral. Given only width and carry depth, it emits boundary, conditioning, transfer-opportunity, carry-out, and completion events. Every dependent transfer receives the next integer slot. Replay derives the event stream from initial state plus action and fails closed on altered order, slot, identity, insertion/removal, unknown events, malformed state, or final-state mismatch.

A slot is an ordinal dependency marker. It is **not** a degree, tooth location, millisecond, crank-speed sample, or production design. The model cannot estimate reliability; it demonstrates only why a later carry depends on a prior transfer having first conditioned it.

## Open evidence

- mapping patented embodiments to identified production revisions and surviving objects;
- exact materials, tolerances, lubrication, wear and maintenance data;
- forces, spring/contact loads, safe rotational rate, and measured failure envelopes;
- production capacity/speed effects and whether/how Talamini's described experiment transferred to manufactured machines;
- subtraction-path production details beyond the patent-level opposite-direction/carry-path statements.