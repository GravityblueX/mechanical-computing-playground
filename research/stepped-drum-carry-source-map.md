# Thomas / Arithmometer stepped-drum carry evolution

**Checked: 2026-09-01**

## Question

How did Thomas-family stepped-drum machines address carry order, rapid-motion overrun, and simultaneous carry load across distinct patent revisions, and what may the repository compare without collapsing these mechanisms into Odhner-family rotary geometry?

## Claim types and source roles

- Thomas 1820, Thomas 1865, and Thomas de Bojano 1880 patent descriptions: **H/E1** for their described/intended mechanisms and stated problems;
- Smithsonian identified-object boundary: **H/E2** institutional catalog statement;
- Arithmometre.org production/revision chronology: **R/E3** specialist history, not patent fact;
- repository integer transfer slots: **P/M**, expressing dependency order only.

The Arithmometre.org transcriptions and linked figures/PDFs were inspected in the browser. Smithsonian pages returned HTTP 403 in this environment, so only the task-assigned bounded institutional statements are retained.

## 1820 patent: a distinct early architecture

Charles-Xavier Thomas de Colmar, French Brevet No. 1420, 18 November 1820:

<https://arithmometre.org/Brevets/PageBrevet1820FR.html>

The patent begins by dividing the machine into three movement systems: multiplier, multiplicand, and `système des retenues`. In the carry section it describes wheels `p`, forks `q`, coil springs, catches, and pins that condition a decimal transfer when zero is crossed. This establishes a patent-specific early carry system.

- Claim/evidence: **H/E1**, edited transcription of the patent and its figure references.
- Not established: that this geometry continued unchanged into the stabilized commercial machines.

Smithsonian/NMAH's oldest surviving Thomas Arithmometer, `nmah_690692`, ca. 1820:

<https://americanhistory.si.edu/collections/object/nmah_690692>

The assigned institutional record explicitly says the object is not identical to the 1820 patent drawings and more closely resembles drawings prepared in 1821 for the 1822 Hoyau report.

- Claim/evidence: **H/E2**, institutional object/revision statement.
- Consequence: `1820 patent drawing != earliest surviving object != later commercial Thomas geometry`.

## 1849: revision-history boundary

Thomas de Colmar, French Patent No. 8282 (1849):

<https://arithmometre.org/Brevets/PageBrevet1849FR.html>

The text presents the contemporary machine as a developed/perfected successor and discusses prolonged prototype and workmanship difficulties. It is used here only to establish that the architecture remained under development between 1820 and later commercial forms. No 1865 carry linkage is back-projected into 1849.

- Claim/evidence: **H/E1** for revision context.

## 1865 patent: moderation, sequential phasing, and a replaced load path

Charles-Xavier Thomas de Colmar, Brevet No. 68923, 30 September 1865:

<https://arithmometre.org/Brevets/PageBrevet1865FR.html>

### Rapid-motion overrun

Under `Pièces montées dans la cage`, item 2, the patent says that in older machines rapid movement could let the stepped cylinder, through the conducting wheel and square shaft, carry the corresponding dial one or two teeth too far by acquired motion. It describes moderation cylinder `Q` and Malta-cross piece `R` stopping that acquired motion when the last stepped-cylinder tooth disengages.

- Claim/evidence: **H/E1**, 1865 patented description.
- Not established: a numerical safe crank speed, measured frequency, or universal production performance.

### Carries one after another

Under item 5, the transmission-shaft gearing is described with successive phase offsets: the second cylinder's first tooth acts while the first makes its second, the third begins when the second makes its second, and so on. The patent then states that by this means the carries fall in turn, **one after another**, avoiding errors.

- Claim/evidence: **H/E1**, source-specific stepped-cylinder phasing.
- Repository consequence: the existing ordinal P/M schedule can illustrate the dependency shape, but its slots are not Thomas tooth positions, angles, or times.

### Older simultaneous-load failure and hook serviceability problem

In `Retenues`, the patent first recaps an older design using double inclined steel planes that pressed carry levers vertically. If several dial planes pressed their corresponding carry levers together, combined resistance could cause the dial plate to lift instead of the levers descending. Weakened engagement could then give false products/results.

The described hook remedy held the dial plate down while the crank moved. But if the crank stopped during the cycle, the hook remained engaged until crank home; the plate could not be lifted, making access to the stoppage cause very difficult or impossible.

These are two separate source-stated problems:

1. simultaneous carry load can redirect motion into plate lift and weaken engagement;
2. a lock-down remedy can obstruct mid-cycle service/recovery.

### 1865 replacement relationship

The new relation replaces vertical action with square steel stud `c` on each dial. Crossing `0 ↔ 9` moves carry square `b` horizontally. Through forked carry lever `A` and rod/fork `d`, the moderation cylinder and attached carry finger `S` descend so the finger takes one tooth on carry wheel `T`. The patent's double-spring relation is intended to force the carry fully down or fully returned rather than leave it halfway.

- Claim/evidence: **H/E1**, described patent mechanism and Figs. 2–4, 8.
- Not established: identical detailed construction in every manufactured Thomas-family revision.

## 1880 patent: proposed simplification, not established adoption

Thomas de Bojano, Brevet No. 138912, 29 September 1880:

<https://arithmometre.org/Brevets/PageBrevet1880FR.html>

The `Retenues` section recaps the older arrangement before enumerating its parts. It counts 20 parts per carry effect, then lists a proposed new arrangement of 10 parts per effect. The text further states that carries made during a crank turn remain down/conditioned and are reset together by a return action when the crank reaches its starting point.

- Claim/evidence: **H/E1**, patented simplification proposal.
- What it proves: the patent proposed and described a 20 → 10 part carry simplification and a reset relationship.
- What it does not prove: adoption in manufactured machines.

Arithmometre.org chronology/revision history:

<https://arithmometre.org/Biographie/ChronologieENG.html>

The specialist chronology calls the 1880 patent effectively a `phantom`: it says no referenced Arithmometer has the simplified carry mechanism and that nearly all known French and foreign machines into the 1920s follow the T1865 pattern.

- Claim/evidence: **R/E3** specialist production-history interpretation.
- Not established: an exhaustive artifact census or proof that no unrecorded implementation existed.

## Cross-family comparison

| Source/context | Carry/reliability problem | Documented response | Evidence role | Not established |
|---|---|---|---|---|
| Thomas 1820 patent | early machine needs a distinct carry system | patent-specific spring/fork/wheel relation | H/E1 | later commercial geometry or universality |
| Smithsonian ca.1820 object | surviving early machine differs from patent drawing | institutional object/revision boundary | H/E2 | exact transition from patent to object |
| Thomas 1865 patent | inertia overrun; simultaneous carry load can lift plate and give false results; dependent carries need ordered action | moderation/Malta-cross stop; horizontal conditioning and full-position springs; successively phased stepped cylinders | H/E1 | safe rate/load/failure envelope; every production revision |
| Thomas de Bojano 1880 patent | simplify the recapped 1865 carry arrangement | proposed 10 parts rather than 20; conditioned carries reset at crank home | H/E1 proposal | production adoption |
| specialist chronology | known machines reportedly retain T1865 rather than 1880 carry | revision-history interpretation | R/E3 | exhaustive artifact census |
| Talamini/Marchant 1932 | Odhner-type carry-created crossings need later rotary opportunities | displaced/spiral opportunities and phase overlap | H/E1 | Thomas geometry or universal Odhner implementation |
| repository ordinal scheduler | make dependency order inspectable | strictly increasing integer slots | tested P/M | Thomas/Odhner tooth angles, times, forces, or geometry |

## Similar dependency, different architectures

Thomas 1865 and Talamini/Marchant 1932 both document why dependent carries cannot be treated as one simultaneous arithmetic mutation. Their physical accounts are distinct:

- Thomas 1865: successively phase the stepped cylinders so carries fall one after another, while replacing an older vertically loaded carry relation;
- Talamini/Marchant 1932: displace carry opportunities around an Odhner-type rotary drum so a carry-created crossing can condition the next order.

The shared P/M timeline represents only `boundary → condition next order → later transfer opportunity`. It does not merge stepped-cylinder phasing with a rotary carry spiral.

## Open evidence

- exact 1850/1851/1865 production-revision mapping;
- factory instructions and direct measurements of identified surviving carry mechanisms;
- exhaustive adoption evidence for the 1880 proposal;
- materials, spring/contact loads, tolerances, lubrication, wear, maintenance, safe crank rate, and measured error/failure envelopes;
- exact historical tooth angles or timing only after source- and revision-specific evidence is inspected.