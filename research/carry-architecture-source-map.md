# Carry architecture source map

**Checked: 2026-09-01**

## Question

How do different architectures preserve a carry while other motion may be occurring, and which source supports each relationship?

## Claim types

- decimal boundary transfer: **M**;
- historical text, preserved object/catalog, and patents: **H**;
- modern working interpretation: **R**;
- repository carry/key-driven event chains: **P/M**.

## Pascaline: operational claim, object description, and reconstruction are separate

### Pascal's `Avis`

Blaise Pascal, *Avis nécessaire à ceux qui auront curiosité de voir la Machine d'Arithmétique et de s'en servir*, public notice associated with the machine; inspected through the Brunschvicg/Boutroux 1923 edited text:

<https://fr.wikisource.org/wiki/%C5%92uvres_de_Blaise_Pascal/Lettre_D%C3%A9dicatoire_de_la_Machine_Arithm%C3%A9tique_et_Avis_n%C3%A9cessaire/Avis>

Pascal says the machine relieves the operator from mentally retaining or borrowing numbers: by necessary motions it performs what is wanted without the operator thinking through those carries/borrows. He also explicitly defends a more complex construction as necessary to make operation simple, convenient, quick, durable, and transportable.

- Claim type: **H**.
- Evidence: **E1 primary authored operational claim**, via a later edited public text.

The inspected `Avis` expressly declines a written construction description. It does **not** establish sautoir geometry.

### Cnam preserved object and institutional description

Musée des Arts et Métiers/Cnam, inventory `19600-0000`, object dated 20 May 1652:

<https://www.arts-et-metiers.net/musee/machine-arithmetique-de-pascal-chiffres-plus-sous-et-deniers-0>

The institutional page identifies a preserved Pascal arithmetic machine and says automatic carry is performed by the small part called the `sautoir`. It also records mixed-radix wheels for livres/sols/deniers on this identified object.

- Claim type: **H**.
- Evidence: **E2 institutional catalog/synthesis**; no direct measurement was performed here.

This does not prove one universal geometry across the roughly ten known surviving examples.

### CMU reconstruction

CMU reconstruction assembly documentation:

<https://www.cs.cmu.edu/~dst/Pascaline/assembly-instructions.html>

The inspected instructions document one working interpretation with `SautoirArm`, spring-loaded `CarryPawl`, and `CarryLever` assemblies, and a setup check that crossing `9 → 0` triggers carry.

- Claim type: **R**.
- Evidence: **E2 documented physical reconstruction**.

It demonstrates a plausible reconstructed transfer, not identity with every seventeenth-century manufactured detail.

## Felt 1887: early direct-key carry

Dorr E. Felt, US 366,945, *Adding Machine* (1887):

<https://patents.google.com/patent/US366945A/en>

The specification establishes denominational indicator wheels actuated by `1..9` keys through segment levers. It separately describes automatic carry, independent of the struck key: wheel cam `L` charges spring lever `M`; when a lower wheel completes a revolution, its stored work advances the next order through the described pawl/ratchet relation. Figures 1–12 and the associated specification were inspected at this relationship level.

- Claim type: **H**.
- Evidence: **E1 for the patented intended design**.

This source supports early key-driven local actuation plus automatic stored-energy carry. It does not establish the later Duplex solution for overlapping higher-column key motion and must not be generalized to every Comptometer revision.

## Felt 1904: delayed carry under overlapping key operation

Dorr E. Felt, US 762,520, *Calculating Machine* (1904):

<https://patents.google.com/patent/US762520A/en>

The opening specification identifies a concrete failure mode in earlier direct-key machines: if keys in different denominations are struck simultaneously, carry can be lost in the larger movement directly imparted to the receiving higher-order wheel. The new design is intended to permit habitual simultaneous multi-column key operation.

The inspected mechanism description assigns distinct roles:

- pinion `40` and carrying gear `41` follow numeral-wheel movement;
- spring `43` stores the work needed for carry;
- escapement/arm `45` with detents `46/47` controls intermittent release;
- latch `53`, resting on the receiving higher-order column actuator, delays the carrying mechanism until that actuator has returned to normal.

Thus the carry is not merely “another immediate increment”: stored work is scheduled so it is not swallowed by overlapping higher-column key motion.

- Claim type: **H**.
- Evidence: **E1 for the patented intended design**.

This is not proof that every Model A production mechanism used the exact illustrated linkage, dimensions, or timing. The repository's serialized `CARRY_PENDING → CARRY_PROPAGATED` order is not patent timing.

## Model A production/catalog context

Smithsonian/NMAH, Comptometer Model A `nmah_690484`:

<https://www.si.edu/object/comptometer-model%3Anmah_690484>

The assigned institutional record identifies the Model A as the first “duplex” Comptometer and says more than one column could add at once, with each column able to add, receive, and carry simultaneously.

- Claim type: **H**.
- Evidence: **E2 institutional catalog statement**.

The page returned HTTP 403 in this environment. Its task-assigned bounded catalog claim is retained, but no photograph or exact patent-to-object linkage was inferred.

## Comparison

| Case | Source/model | Human operation | How carry work is stored/scheduled | Source strength | Not established |
|---|---|---|---|---|---|
| repository generic carry | tested P/M `0099 + 1` | abstract increment/crank action | serialized visible event chain | P/M tests | historical geometry, force, timing |
| Pascaline | Pascal `Avis`; Cnam object; CMU reconstruction | dial/stylus-oriented operation | automatic carry; sautoir at institutional level; reconstruction shows one stored/released implementation | H/E1 operational text; H/E2 object description; R/E2 reconstruction | `Avis` geometry; universal surviving-machine geometry |
| Felt 1887 | US366945A | direct denomination key | wheel cam charges a spring lever; automatic carry independent of key pressure | H/E1 intended design | later Duplex overlap scheduling; all revisions |
| Felt 1904 Duplex design | US762520A | simultaneous different-denomination keys contemplated | spring stores carry work; receiving-actuator latch delays release until its stroke completes | H/E1 intended design | every production linkage, dimensions, exact timing |
| Model A | Smithsonian `nmah_690484` | catalogued multi-column duplex operation | catalog says columns can add, receive, and carry simultaneously | H/E2 catalog | exact US762520-to-object mapping |

## Repository boundary and implementation consequence

The visible-carry model remains the minimal P/M answer to “which dependent digit changed?” The key-driven accumulator likewise serializes digit and carry events for inspection. Historical profiles explain different storage/scheduling responsibilities but do not own either browser event sequence.

The key-driven trace replay contract now derives the expected event stream from initial state plus action and rejects altered/omitted/inserted carry events, changed identities/payloads, unknown event types, malformed state, or a mismatched final state.

## Open questions

- exact production-revision mapping between Felt patents and surviving machines;
- primary manufacturing drawings/manuals for Model A carry scheduling;
- source-specific forces, spring constants, tolerances, wear, maximum safe operating rate, and failure frequency;
- comparison with stepped-drum/pinwheel accumulator carry;
- source-specific geometry only after drawing/object-level evidence is inspected.