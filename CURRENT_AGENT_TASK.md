# Current Agent Task

Issued: 2026-09-01
Owner: local coding/research agent
Target duration: about one useful hour at the agent's observed throughput
Repository authority: remote `main`

Previous task is complete and archived at `tasks/archive/2026-09-01-output-contracts.md`.

The output-contract slice landed as `2ad181408d7a3c6d816d3c090604538636919f61` about 42 minutes after assignment, changing 11 files with roughly 345 additions and raising the recorded suite to 150 tests. CI and Pages both passed. The preceding substantial slices were generally closer to 30–33 minutes. This task is therefore slightly broader again, but it remains one coherent question:

> How do different mechanical architectures preserve a carry when another operation is happening, and how can the repository expose that difference without turning its generic carry events into fake historical geometry?

Fetch/pull remote `main` before starting. Remote state always wins.

## Read before work

Read in this order:

1. `STATUS.md`
2. `TODO.md`
3. `AGENTS.md`
4. `docs/EVIDENCE_POLICY.md`
5. `docs/RESEARCH_GAPS.md`, especially Priority 0 carry and Priority 8 reliability
6. `research/carry-is-the-hard-part.md`
7. `research/key-driven-computation.md`
8. `research/control-and-zeroing-source-map.md`
9. `src/mechanisms/key-driven-accumulator/index.ts` and `tests/key-driven-accumulator.test.ts`
10. current visible-carry mechanism/UI/tests and `src/main.ts`
11. `docs/REPRESENTATION_AND_PROTOCOL.md`, `docs/TEACHING_PATH.md`, and `docs/VERIFICATION.md`

Do not use stale `IMPLEMENTATION_PLAN.md` checkboxes as task authority.

Before editing, run the current full test suite once and record the actual baseline.

# Objective

Complete four connected parts:

1. deepen carry research from museum-level summary into a **source-separated carry architecture map**, anchored by Felt primary patents and a bounded Pascaline source chain;
2. harden the existing key-driven accumulator so its carry events are part of the **validated replay contract**, not payload-bearing no-ops that can be tampered with silently;
3. add typed carry-provenance profiles and a bilingual comparison on the existing visible-carry lesson, showing functional differences among the generic P/M chain, Pascaline sautoir, early Felt key-driven carry, and Felt's later Duplex/delayed-carry design;
4. update tests/status/verification without inventing source-specific geometry or pretending that one state machine reproduces all of these mechanisms.

Do **not** build a Pascaline emulator, a Comptometer emulator, a new gear animation, or a source-specific carry linkage in this slice.

---

# Part A — carry architecture source map

Prefer creating a focused new file:

```text
research/carry-architecture-source-map.md
```

Then keep `research/carry-is-the-hard-part.md` as the explanatory essay and link it to the source map. If the repository's current research conventions strongly favor expanding the existing note instead, that is acceptable, but the final structure must make exact source/model boundaries easy to inspect.

Use the two-axis evidence policy.

## A1. Pascaline boundary

Required source roles:

- Musée des Arts et Métiers / Cnam object page for the preserved arithmetic machine and institutional description of automatic carry by the `sautoir`:
  <https://www.arts-et-metiers.net/musee/machine-arithmetique-de-pascal-chiffres-plus-sous-et-deniers-0>
- Pascal, *Avis nécessaire à ceux qui auront curiosité de voir la Machine d'Arithmétique et de s'en servir*; a public edited text is available via Wikisource from the Brunschvicg/Boutroux 1923 edition:
  <https://fr.wikisource.org/wiki/%C5%92uvres_de_Blaise_Pascal/Lettre_D%C3%A9dicatoire_de_la_Machine_Arithm%C3%A9tique_et_Avis_n%C3%A9cessaire/Avis>
- existing CMU reconstruction material already cited in `research/carry-is-the-hard-part.md` may remain as **R/E2** reconstruction evidence.

Use Pascal's own text only for what it actually establishes: the machine automatically relieves the operator from mental carrying/borrowing and that mechanical complexity was accepted to make operation simple/reliable. Do **not** claim that Pascal's `Avis` itself gives the sautoir geometry if it does not.

Keep the institutional object/reconstruction evidence separate from Pascal's own operational claims.

## A2. Felt 1887 early key-driven carry — primary source

Required primary patent:

- Dorr E. Felt, US 366,945, *Adding Machine* (1887):
  <https://patents.google.com/patent/US366945A/en>

Inspect the patent itself. Record only source-supported roles such as:

- key-driven numeral wheels / column actuation;
- carry from a lower numeral wheel to the next denomination;
- the patent's actual cam/pawl/spring or stop-motion relationships only at the figure/text precision you inspected;
- why this is an early Felt design and **not yet equivalent to the later Duplex carry scheduling problem**.

Do not generalize this one patent to every Comptometer revision.

## A3. Felt 1904 delayed carry / Duplex problem — primary source

Required primary patent:

- Dorr E. Felt, US 762,520, *Calculating Machine* (1904):
  <https://patents.google.com/patent/US762520A/en>

This is the key source for the slice. Inspect the text and relevant figures directly.

Capture at source-supported precision:

- the machine is direct-key operated;
- the carrying mechanism stores power for carry;
- the specification explicitly addresses the problem that a carry may be lost/“swallowed” if it overlaps the larger movement produced by a key in the higher denomination;
- the described solution delays/controls the carry until the higher-order key/actuator movement is completed;
- relevant figure numbers / part numbers for the delayed-carry relationship if the patent text makes them clear (for example the carrying spring and delaying latch relationships), without turning them into a new geometric reconstruction.

The historical claim is about the patented intended mechanism. Label it **H/E1**, not “every Model A production machine was exactly this drawing.”

## A4. Production/artifact corroboration

Required institutional source:

- Smithsonian/NMAH, Comptometer Model A `nmah_690484`:
  <https://www.si.edu/object/comptometer-model%3Anmah_690484>

Use it to establish the model/date context and the catalog statement that the Model A was the first “duplex” machine, with more than one column able to add and each column able to add, receive, and carry simultaneously.

Do not infer the exact US762520 linkage from the museum record alone. Keep:

```text
patented intended mechanism
!=
artifact/catalog production statement
```

If you use Felt US960528A to connect later Felt text back to the 1904 Duplex patents, label that source separately and do not use it as a substitute for the 1904 patent itself.

## A5. Required conclusion

End the source map with a compact table along these lines:

| Case | Source/model | Human operation | How carry work is stored/scheduled | Source strength | Not established |
|---|---|---|---|---|---|
| repository generic carry | P/M | abstract increment/key action | serialized event chain | tested P/M | historical geometry/timing |
| Pascaline | identified Pascaline / institutional + reconstruction sources | dial/stylus operation | sautoir/stored-energy automatic carry at supported level | H/R separated | exact universal geometry across surviving revisions |
| Felt 1887 | US366945A | direct key actuation | source-specific early carry mechanism | H/E1 | later Duplex behavior |
| Felt 1904 Duplex design | US762520A | overlapping multi-column key operation problem | delayed/controlled carry after higher actuator stroke in described design | H/E1 | every production revision geometry |
| Model A | Smithsonian object/catalog | multi-column duplex operation | catalog says add/receive/carry simultaneously | H/E2 | exact patent-to-object linkage/timing |

Also record what remains open: source-specific force values, spring constants, tolerances, wear, maximum safe rate, and exact production-revision mapping.

---

# Part B — harden key-driven carry replay semantics

The current `src/mechanisms/key-driven-accumulator/index.ts` exposes useful carry events, but review found a concrete integrity weakness:

- `CARRY_PENDING` and `CARRY_PROPAGATED` currently reduce as no-ops;
- `replayKeyStroke()` simply reduces the stored event array;
- therefore a stored carry event's payload/order can be altered or removed in some cases without the same fail-closed action/event verification used by newer mechanism modules.

Fix this conservatively. Do not redesign the whole key-driven mechanism.

## B1. Required replay contract

At minimum, make replay validate the stored trace against the deterministic event stream derived from:

```text
initial state + action
```

before accepting it.

Required rejection cases:

- changed event sequence number;
- changed `cycleId`;
- changed `fromColumn` / `toColumn` on `CARRY_PENDING` or `CARRY_PROPAGATED`;
- omitted carry event;
- inserted extra carry event;
- changed digit-advance payload;
- altered final state;
- unknown runtime event type rather than silently ignoring it.

The implementation may follow the printing-ledger pattern: derive expected events from the action, compare them, then reduce and verify final state.

If the cleanest implementation also adds explicit transient `pendingCarry` state so individual carry reducers validate sequencing, that is acceptable, but do not expand state merely for visual effect. The minimum requirement is **fail-closed trace replay**.

## B2. State validation

Add or strengthen a state assertion if necessary so replay/transition reject malformed runtime state, including invalid digits, non-idle public action start, invalid counts, and impossible active-key/phase combinations.

Preserve existing public examples (`7 + 4 = 11`, `99 + 7 = 106`) and deterministic behavior.

## B3. Tests

Add focused tests proving:

1. valid `99 + 7 -> 106` still exposes the two-column carry path and replays;
2. tampering `CARRY_PENDING.fromColumn` fails;
3. tampering `CARRY_PROPAGATED.toColumn` fails;
4. removing one carry event fails;
5. changing event sequence/cycle identity fails;
6. changing final state fails;
7. an unknown runtime event fails instead of becoming a no-op;
8. malformed input state is rejected explicitly.

Do not claim this serialized P/M order is historical Comptometer timing.

---

# Part C — typed carry provenance + visible-carry comparison

Create a typed source dataset under an appropriate path such as:

```text
src/exhibits/carry-provenance/
```

Follow the shape conventions already used by `control-provenance` and `output-contracts` rather than inventing a wholly new evidence framework.

Each profile should expose at least:

- stable id;
- identified family/source/model context;
- claim type;
- E1–E4 strength where applicable;
- source label + URL;
- documented carry role/relationship;
- operator-protocol implication;
- explicit `notEstablished` boundary.

Minimum source-separated profiles:

1. Pascaline institutional/surviving-machine carry case;
2. US366945A early Felt carry case;
3. US762520A delayed/controlled Duplex carry design;
4. Smithsonian Model A production/catalog case.

Do not merge the two Felt patents and the Smithsonian object into one profile called “the Comptometer.”

## C1. Provenance tests

At minimum test:

- IDs unique;
- every H/R profile has source URL, claim type, strength, and non-empty `notEstablished`;
- required source profiles exist;
- US366945A and US762520A remain separate contexts;
- Model A profile does not claim the exact 762520 linkage;
- Pascal's historical text and modern/institutional mechanism evidence are not mislabelled as the same kind of source.

## C2. Public integration

Prefer extending the existing `#/visible-carry` lesson instead of creating another route.

The existing generic event chain must remain visibly **P/M**. Add a compact bilingual historical comparison beneath or beside it that answers:

```text
same functional problem: a lower denomination crossed its boundary
but what stores/schedules the carry, and what can overlap with it?
```

Required visible distinctions:

- generic repository chain = serialized P/M teaching events;
- Pascaline = sautoir / stored-energy carry at the supported institutional/reconstruction level;
- Felt 1887 = early direct-key carry design from US366945A;
- Felt 1904 = delayed/controlled carry designed to avoid carry loss during overlapping higher-denomination key movement;
- Model A = catalogued duplex production context, not proof that the browser is reproducing patent geometry.

Show source/model/date, claim type/evidence strength, `documented`, and `not established` in text. No meaning only by color.

Do not draw a latch, spring, cam, pawl, or gear as if geometrically faithful unless the page explicitly says it is a non-geometric schematic. Prefer state/responsibility diagrams and source cards.

---

# Part D — docs and verification

After Parts A–C are real:

- update `STATUS.md` to record the carry source map, typed provenance comparison, and hardened key-driven replay;
- update `TODO.md` only if a carry/evidence item genuinely belongs in the short current queue;
- update the carry row in `docs/REPRESENTATION_AND_PROTOCOL.md` if the new sources materially improve it;
- update `docs/TEACHING_PATH.md` so the visible-carry lesson points to the architecture comparison;
- update `research/carry-is-the-hard-part.md` to point to the source map and remove any wording made too broad by the new primary-source inspection;
- update `docs/RESEARCH_GAPS.md` only in the carry section, marking what is now sourced and what remains open; do not turn the research queue into a status dump;
- update `docs/VERIFICATION.md` with the actual baseline/final test counts and commands run;
- update README only if needed to make the carry comparison discoverable.

Before commit/push, run:

```text
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Perform a local browser smoke check for `#/visible-carry` in both English and Chinese if the established tooling makes that practical. Record exactly what was checked; do not claim a browser run you did not perform.

# Acceptance

The finished slice must let a visitor/test answer all of these without relying on unsourced gear drawings:

1. Why is `0099 + 1 -> 0100` more than a final arithmetic result?
2. What is the difference between the repository's serialized P/M carry chain and Pascaline/Felt historical carry evidence?
3. Why did overlapping key movement create a special carry-scheduling problem in Felt's later key-driven design?
4. Which source supports that claim, and what does it **not** prove about production geometry?
5. Can a tampered key-driven carry trace now fail closed instead of silently replaying?

# Evidence boundaries

- mathematical decimal carry relation: **M**;
- repository carry/key-driven event order: **P/M**;
- Pascal's own `Avis`: **H/E1** for his stated operational aims/claims, not for geometry absent from the text;
- Cnam/Musée des Arts et Métiers and CMU reconstruction: institutional **H/E2** and reconstruction **R/E2** roles must remain distinct;
- US366945A and US762520A: **H/E1** for the patented intended mechanisms described there;
- Smithsonian Model A catalog: **H/E2** for identified object/model context and catalogued duplex behavior;
- patent drawing != proof every production machine was manufactured exactly that way;
- do not infer spring force, maximum speed, wear, tolerance, or exact timing without source evidence.

# Stop conditions

Stop and leave a precise blocker rather than guessing if:

- a source cannot actually be inspected and the requested historical claim depends on it;
- making the visible comparison requires source-specific geometry not supported by inspected material;
- hardening key-driven carry replay requires a breaking rewrite across unrelated mechanism APIs;
- a conflicting carry-provenance implementation has already landed on remote `main`;
- the current carry model has a deeper arithmetic bug that must be fixed before provenance/UI work.

If all required work finishes substantially before the target duration, use remaining time only for the same question: strengthen carry tamper tests, source figure/section anchors, bilingual accessibility/text-state visibility, or a very small P/M delayed-carry scheduling experiment clearly labelled as engineering pedagogy. **Do not start a new reliability/torque simulation, another machine family, or source-specific geometry in this slice.**

# Git discipline

- remote `main` is authoritative;
- fetch/pull before work;
- inspect existing modules/tests before creating parallel abstractions;
- one coherent implementation checkpoint;
- run all acceptance commands;
- inspect diff for unrelated changes;
- update status/verification only after tests pass;
- commit and push to remote `main` according to the established workflow;
- after push, stop and wait for the next `CURRENT_AGENT_TASK.md` revision.

Suggested commit subject:

```text
feat: ground carry architecture provenance
```
