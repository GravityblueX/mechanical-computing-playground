# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-rotary-carry-scheduling.md`.

The rotary-carry slice landed as `ea30534b4af542ef2c31d41a325e1de5887a6ab7` about 34 minutes after assignment. It changed 14 files (about 353 additions / 23 deletions), raised the recorded suite from 170 tests in 15 files to 190 tests in 16 files, and recorded passing typecheck/tests/build/diff plus bilingual visible-carry smoke. Several preceding substantial slices also landed in roughly 30–42 minutes. This task is therefore deliberately broader while remaining one coherent question:

> How did Thomas-family stepped-drum machines solve carry sequencing and carry-load/reliability problems, how did that mechanism change across patents, and what does this add to the repository's new rotary-carry lesson without collapsing distinct machine families into one generic geometry?

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read, in order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially carry/reliability and source-specific geometry boundaries
6. `research/carry-is-the-hard-part.md`
7. `research/carry-architecture-source-map.md`
8. `research/rotary-carry-scheduling-source-map.md`
9. `research/multiplication-mechanisms.md`
10. `research/subtraction-and-division.md`
11. `src/mechanisms/rotary-carry-schedule/index.ts`
12. `src/exhibits/carry-provenance/index.ts` and its tests
13. current `#/visible-carry` UI in `src/main.ts`
14. `docs/REPRESENTATION_AND_PROTOCOL.md`, `docs/TEACHING_PATH.md`, and `docs/VERIFICATION.md`

Before editing, run the full test suite once and record the actual baseline. Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

# Objective

Complete four connected parts:

1. create a source-separated **Thomas/Arithmometer stepped-drum carry evolution map**, centered on the 1820, 1865, and 1880 patent contexts plus surviving-object/reconstruction boundaries;
2. add typed provenance profiles that preserve those revision contexts separately and expose the documented carry scheduling/reliability problems without claiming universal production geometry;
3. extend the public carry lesson so a visitor can compare **Thomas 1865 stepped-drum sequential carries** with the already implemented **Odhner/Talamini rotary ordinal scheduling** and see that similar dependency problems were solved in distinct architectures;
4. add tests and update status/verification/research gaps. Reuse the existing P/M carry-dependency model where it is genuinely source-neutral; do not create a duplicate arithmetic scheduler merely to add another machine name.

Do **not** build a Thomas Arithmometer emulator, source-specific 3D linkage, torque/spring-force model, random failure simulator, or exact angular/timing reconstruction in this slice.

---

# Part A — stepped-drum carry / revision source map

Create:

```text
research/stepped-drum-carry-source-map.md
```

Use the two-axis evidence policy. Keep patent text, surviving objects, modern reconstruction, and specialist revision history as different evidence roles.

## A1. Thomas de Colmar, French patent 1420 (1820) — early architecture, not the later commercial machine

Primary-patent transcription/digital source:

- Charles-Xavier Thomas de Colmar, Brevet No. 1420, 18 Nov 1820:
  <https://arithmometre.org/Brevets/PageBrevet1820FR.html>
- Digitized patent PDF if useful:
  <https://arithmometre.org/Bibliotheque/BibNumerique/Brevet1820/Brevet1820.pdf>

Institutional surviving-object boundary:

- Smithsonian/NMAH, oldest surviving Thomas Arithmometer, ca. 1820:
  <https://americanhistory.si.edu/collections/object/nmah_690692>

Record only what the sources support:

- the 1820 patent explicitly divides the machine into movement systems including a `système des retenues` (carry system), alongside multiplier/multiplicand systems;
- the patent is a distinct early design and must not be treated as a description of the stabilized later commercial Thomas machine;
- the Smithsonian explicitly says its oldest surviving example is **not identical to the drawings of Thomas's 1820 patent** and more closely resembles drawings made in 1821 for the 1822 Hoyau report.

This boundary is important. `patent 1820 -> every later Thomas carry` is not acceptable.

If you inspect the patent's detailed carry section, cite section/figure locations in the research note, but do not infer later production use from it.

## A2. 1849 development context — evidence that the design was still changing

Useful source:

- Thomas de Colmar, Patent No. 8282 (1849), French text:
  <https://arithmometre.org/Brevets/PageBrevet1849FR.html>
- English translation hosted by the same specialist archive:
  <https://arithmometre.org/Brevets/PageBrevet1849EN.html>

Use this mainly as a **revision-history boundary**, not as a shortcut to assert a specific later carry linkage. The text presents the contemporary machine as a developed/perfected version of the early design and discusses repeated prototype/workmanship difficulties.

If a carry-specific claim is used, inspect the relevant text directly and record its exact context. Otherwise keep 1849 as evidence that the architecture was not static between 1820 and the later commercial forms.

## A3. Thomas de Colmar, Brevet No. 68923 (1865) — primary carry scheduling and failure evidence

Primary-patent transcription/digital page:

- Brevet No. 68923, 30 Sep 1865:
  <https://arithmometre.org/Brevets/PageBrevet1865FR.html>

This is the central source for this slice. Inspect the text and figures directly. At minimum record these source-supported claims, with section/figure anchors where possible:

### A3.1 rapid-motion overrun / moderation

The patent says older machines could, under rapid movement, let inertia carry a corresponding dial one or two teeth too far. It describes a `cylindre de modération` and Malta-cross relationship intended to stop that acquired motion when the stepped cylinder's last tooth disengages.

Treat this as **H/E1 for the patented 1865 description**. Do not turn it into a numerical safe crank speed, measured field-failure rate, or universal Thomas-machine performance number.

### A3.2 sequential phasing of the stepped cylinders

The patent states that the stepped cylinders are geared on the transmission shaft with successive phase offsets: the second cylinder's first tooth acts when the first reaches its second, the third begins when the second reaches its second, and so on. It explicitly says this makes the carries (`retenues`) fall **one after another** and thereby avoids errors.

This is the key stepped-drum comparison point. It is a source-specific H/E1 statement of successive carry scheduling in the 1865 patent.

Do not replace it with the existing P/M ordinal schedule and then call that schedule the historical tooth timing. The P/M scheduler may illustrate dependency order only.

### A3.3 older simultaneous-load failure mode

In the `Retenues` section, the patent says an older design used double inclined steel planes pressing carry levers vertically. When several dial inclined planes pressed their respective carry levers at the same time, the combined resistance could make the dial plate lift instead of the levers descending; weakened engagement could then produce **false products/results**.

It also says an attempted hook remedy kept the dial plate down while the crank moved, but created a serviceability problem if the crank stopped mid-cycle because the plate could not be lifted to reach the cause of the stoppage.

Record both failure/problem statements separately.

### A3.4 1865 replacement relationship

The patent describes replacing the older vertical action with a square steel projection on each dial that, when crossing `0 <-> 9`, moves a carry square horizontally; through the carry lever/fork and rod, this lowers the moderation cylinder/carry finger so it takes one tooth on the carry wheel. The text also describes double springs intended to make the carry reach either full down or full returned position rather than remaining halfway.

This is H/E1 for the described patent mechanism. It is **not** permission to draw unsourced exact production geometry beyond the figures/text actually inspected.

## A4. Thomas de Bojano, Brevet No. 138912 (1880) — simplification claim versus production evidence

Primary-patent transcription/digital page:

- Brevet No. 138912, 29 Sep 1880:
  <https://arithmometre.org/Brevets/PageBrevet1880FR.html>

Record at source-supported precision:

- the patent explicitly recaps the older carry mechanism before describing a new carry arrangement;
- it enumerates the older carry effect as 20 parts and the proposed new arrangement as 10 parts per carry effect;
- it describes the new relation in its own patent context and describes all carries made during a crank turn remaining conditioned until a return/reset action at crank home.

Important boundary: a **patented simplification is not proof of production adoption**.

For the adoption/revision question, use a separate specialist secondary source and label it accordingly rather than H/E1:

- Arithmometre.org chronology/revision history:
  <https://arithmometre.org/Biographie/ChronologieENG.html>

That specialist chronology says the 1880 carry simplification is effectively a "phantom" in the referenced surviving-machine corpus and that the known French/foreign arithmometers largely continued on the T1865 pattern. Treat this as specialist reconstruction/history (**R/E3 or another defensible non-E1 classification under repository policy**), not as primary patent evidence.

Do not write `the 1880 design replaced the 1865 production mechanism` unless an actual production/object source proves it.

## A5. surviving family context

Use Smithsonian stepped-drum object records for broad identified-object context, not detailed carry internals:

- stepped-drum calculating machine group:
  <https://americanhistory.si.edu/collections/object-groups/calculating-machines/stepped-drum-calculating-machines>

The group supports identified Thomas machines, stepped drums, setting levers, result/revolution registers, carriage and mode controls at object-record precision. It also reinforces that the earliest surviving object is not identical to the 1820 patent drawing.

## A6. required source-map conclusion

End the note with a compact evolution/boundary table, approximately:

| Source/context | Carry/reliability problem | Documented response | Evidence role | Not established |
|---|---|---|---|---|
| Thomas 1820 patent | early carry system exists as a distinct movement system | patent-specific early mechanism | H/E1 | later commercial geometry/universality |
| Smithsonian ca.1820 object | surviving early machine differs from patent drawing | object/revision boundary | H/E2 institutional object record | exact missing transition from patent to object |
| Thomas 1865 patent | inertia overrun; simultaneous carry load can lift plate / produce false results; cascaded carries need ordered action | moderation/Geneva-stop relation, horizontally conditioned carry, staggered cylinder phasing | H/E1 | measured speed/load/failure envelope; all production revisions |
| Thomas de Bojano 1880 patent | simplify 1865 carry mechanism | proposed 10-part carry vs recapped 20-part carry | H/E1 patent proposal | production adoption |
| specialist revision chronology | known machines apparently retain T1865 pattern rather than 1880 carry | production-history interpretation | R / non-E1 | exhaustive artifact census unless source proves it |
| repository ordinal scheduler | dependency-order teaching only | abstract increasing slots | P/M | Thomas tooth angles/times/forces/geometry |

Also list open evidence: exact 1850/1851/1865 production-revision mapping, inspected factory instructions, direct measurement of surviving carry mechanisms, material/spring/contact loads, lubrication/wear, safe crank rate, and measured error/failure envelopes.

---

# Part B — typed Thomas carry provenance

Extend the existing carry provenance dataset rather than inventing a second evidence framework.

Add source-separated profiles for at least:

1. Thomas 1820 patent context;
2. Smithsonian ca.1820 surviving object/revision boundary;
3. Thomas 1865 patent — rapid-motion moderation + successive carry phasing;
4. Thomas 1865 patent — older simultaneous-load failure and replacement carry relation (may be a separate profile if that keeps claims precise);
5. Thomas de Bojano 1880 patent — carry simplification proposal;
6. specialist 1880 production/revision interpretation only if the dataset supports R claims cleanly.

Each profile must retain:

- stable unique id;
- source/model/date context;
- H or R claim type and evidence strength;
- exact source URL;
- documented relationship/problem;
- architecture/operator implication;
- non-empty `notEstablished` boundary.

Do not merge 1820, 1865, and 1880 into one generic `Thomas carry` profile.

## Provenance tests

At minimum verify:

- IDs remain unique;
- all H/R entries have source + evidence strength + `notEstablished`;
- the Smithsonian profile explicitly preserves `surviving object != 1820 patent drawing`;
- the 1865 profile records both **successive carry phasing** and the documented older simultaneous-load/false-result problem at the correct source context;
- the 1880 patent profile records a proposed 20 -> 10 part simplification without claiming production adoption;
- any `phantom/no known surviving implementation` statement is R/specialist-history, not H/E1 patent content;
- no Thomas profile is mislabeled as Odhner/Talamini evidence and vice versa.

---

# Part C — public cross-family carry comparison

Extend `#/visible-carry` conservatively. Keep the generic `0099 + 1` P/M lesson and the completed rotary-carry section working.

Add a compact bilingual **stepped-drum / Thomas 1865** subsection that visibly answers:

```text
Why did Thomas 1865 stagger cylinder action so carries occur one after another?
What failure did the patent describe when several older carry levers were loaded simultaneously?
Why is the 1865 solution not the same mechanism as Odhner/Talamini rotary carry scheduling even though both expose an ordering constraint?
What does the 1880 simplification patent prove, and what does it not prove about manufactured machines?
```

## Reuse before refactor

The existing ordinal P/M scheduler already teaches carry dependency order. Do not create another scheduler simply to put `Thomas` in a module name.

If the existing `rotary-carry-schedule` presentation can be reused **without implying its slots are Thomas 1865 historical phasing**, reuse only the source-neutral dependency concept in the UI and label it P/M.

If the module name/API makes reuse misleading, make the smallest safe refactor toward a neutral carry-dependency schedule and preserve existing behavior/tests. Do not perform a broad core migration merely for naming aesthetics.

The public comparison should distinguish:

- **Thomas 1865 H/E1:** actual patent text says cylinders are phased so carries fall one after another; it also describes a specific older simultaneous-load failure and replacement mechanism;
- **Talamini/Marchant 1932 H/E1:** a different Odhner-type rotary actuator architecture with successively displaced carry opportunities and phase-overlap optimization;
- **repository P/M:** ordinal dependency timeline only.

No source-specific animated linkage is required. Text + typed source cards + a source-neutral ordinal dependency diagram are preferable.

---

# Part D — docs, verification, and bounded cleanup

After Parts A–C are real:

- update `STATUS.md` with the stepped-drum carry provenance/revision boundary;
- update `TODO.md` only if this completed slice belongs in the short queue;
- update the carry row in `docs/REPRESENTATION_AND_PROTOCOL.md` to include Thomas 1865 without collapsing it into the Odhner row;
- update `docs/TEACHING_PATH.md` so visitors can discover the stepped-drum/rotary carry comparison;
- update `research/carry-is-the-hard-part.md` with a concise pointer and the cross-family lesson;
- update `research/multiplication-mechanisms.md` only where the stepped-drum carry evidence changes the current mechanism comparison;
- update only relevant carry/reliability items in `docs/RESEARCH_GAPS.md`;
- update `docs/VERIFICATION.md` with actual baseline/final counts and commands run;
- README only if needed for discoverability.

If there is substantial time left after all acceptance criteria pass, improve test/replay/evidence-card accessibility and bilingual text-state visibility. Do **not** start a new machine family or reliability simulation.

# Acceptance

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a local browser smoke check for `#/visible-carry` in English and Chinese if the established tooling makes that practical. Record exactly what was checked; do not claim a browser run you did not perform.

The finished slice must let a visitor/test answer all of these:

1. Why can't the 1820 patent simply be treated as the geometry of later commercial Thomas machines?
2. What rapid-motion overrun problem does the 1865 patent describe?
3. What older simultaneous-carry-load failure does the 1865 `Retenues` section say could produce false results?
4. What does the 1865 patent explicitly say about successive phasing of stepped cylinders and carries occurring one after another?
5. How is that source-specific Thomas scheduling evidence similar in dependency shape—but mechanically distinct from—the Odhner/Talamini rotary scheduling evidence already in the repository?
6. What does the 1880 patent's 20-part -> 10-part carry simplification prove, and why is that not proof of production adoption?
7. Does the UI keep H/E1 patent claims, institutional object claims, R specialist revision history, and P/M ordinal teaching state visibly separate?

# Evidence boundaries

- decimal carry arithmetic: **M**;
- repository ordinal dependency events/slots: **P/M**;
- Thomas 1820, 1865, Thomas de Bojano 1880 patent text: **H/E1** for the described patent mechanisms/problems only;
- Smithsonian identified-object/revision statements: **H/E2** institutional evidence at catalog precision;
- specialist production/revision interpretation from Arithmometre.org: **R** with a defensible non-E1 strength; do not present it as patent fact;
- patent proposal != production adoption;
- earliest surviving object != 1820 patent drawing;
- Thomas 1865 staggered stepped cylinders != Odhner/Marchant rotary carry spiral geometry;
- do not infer exact historical tooth angles, timing in milliseconds, crank RPM, torque, spring constants, contact loads, materials, tolerance stack, wear life, lubrication interval, production field-failure rate, or universal performance from these sources.

# Stop conditions

Stop and record a blocker rather than guessing if:

- a source-specific Thomas claim cannot be located in the cited text/figure context;
- implementation would require inventing missing linkage geometry or numerical mechanical parameters;
- reusing/refactoring the ordinal scheduler risks changing existing carry semantics substantially;
- a conflicting stepped-drum carry implementation/source map already landed on remote `main`;
- the evidence is insufficient to separate patent proposal from production revision for a claim the UI would otherwise make.

If one secondary/specialist source is inaccessible, continue with the primary patent + Smithsonian boundary and mark the production-adoption question open rather than blocking the whole slice.

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect current code/tests before creating parallel abstractions;
- one coherent implementation/research checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after tests pass;
- commit and push to the repository's normal remote path;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: ground stepped-drum carry evolution
```
