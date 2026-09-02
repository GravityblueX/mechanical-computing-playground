# Pascaline subtraction display and complement-register source map

**Checked: 2026-09-02**

## Question

What do Pascal's own *Avis* and Charles Belair's 1659 description directly establish about one-direction input, subtraction display and mental borrowing, and what must remain mathematical or P/M?

## Claim types

- Pascal/Belair text claims: **H**;
- identified institutional object context: **H**;
- physical reconstruction: **R**;
- fixed-width nines complement: **M**;
- repository complement-register state/events: **P/M**.

Historical evidence strength follows `docs/EVIDENCE_POLICY.md`.

## Sources and exact locations inspected

1. Blaise Pascal, *Avis nécessaire…*, Brunschvicg/Boutroux, *Œuvres de Blaise Pascal*, vol. I, 2nd ed. (1923), Wikisource transcription and linked DjVu:
   - DjVu pp. **359–360**: Pascal declines a written construction/use description and figures, saying oral explanation is more suitable;
   - DjVu p. **362**: opposed operations—addition/subtraction and multiplication/division—are performed by “un seul et unique mouvement”;
   - DjVu pp. **363–364**: hand calculation requires retaining/borrowing; the machine performs the desired work “sans rien retenir ny emprunter.”
2. Charles Belair to Christiaan Huygens, *Explication de la Machine de M. Pascal…* (1659), reproduced in the same volume, edited pp. 315–321; Wikisource/DjVu pp. **371–377**:
   - DjVu p. **371**: the machine in Belair's hands is a five-place integer machine; input wheels turn against digit order and “ne sçauraient aller de l'autre costé”;
   - DjVu p. **373**, first/second-figure discussion: sliding rule `R` hides half each opening; lower figures are exposed for addition, upper for subtraction; the same drum changes lower `1 → 0` while upper `8 → 9`; upper figures are in an order opposite the lower;
   - DjVu pp. **376–377**, second/third-figure discussion: four gravity pieces transfer movement sequentially; with addition windows at `99999`, adding one makes them fall one after another and display zeros.
3. Existing repository context: Cnam object `19600-0000` at institutional-description precision; CMU reconstruction at **R/E2**.

## What each source directly establishes

Pascal authored broad operational claims: one common movement serves opposed arithmetic operations, and the machine removes the user's mental retention/borrowing burden. He explicitly withheld written construction detail, so the *Avis* cannot establish sautoir geometry or an exact subtraction linkage.

Belair is a separate contemporary witness, not Pascal. His text describes one five-place machine he had in hand, but does not identify it with a modern surviving inventory number. It establishes one-direction input, a movable mask selecting addition versus subtraction halves of the same drums, reversed ordering of the two digit series, one paired transition, and sequential carry for `99999 + 1`.

## What is inferred / mathematical

Belair says the upper series is in the opposite order and gives one `1/8 → 0/9` example. That is consistent with digitwise `d ↔ 9-d`, but the inspected prose/figure discussion does not enumerate all ten pairs. The full fixed-width function `C(d)=9-d` per digit, or `C(n)=10^w-1-n`, is therefore **M**, not a quotation from Belair.

The algebra `C(A)+B = C(A-B)` for `0 ≤ B ≤ A` is likewise mathematical. Belair documents display/control relations, not the repository's exact software setup-and-increment sequence.

## Historical / representation crosswalk

| Claim / representation step | Source | Direct support | Claim/evidence | Repository consequence | Not established |
|---|---|---|---|---|---|
| opposed operations by one movement; no mental borrowing | Pascal *Avis*, DjVu 362–364 | authored operational statements | H/E1 via edited reproduction | explain why reverse carry is unnecessary as a premise | construction, display setup, exact algorithm |
| one-direction wheels and dual masked display | Belair 1659, DjVu 371, 373 | direct contemporary description | H/E1 | historical panel can state direction/mask/order | all digit pairs, exact operator subtraction sequence |
| sequential `99999 + 1` carry | Belair, DjVu 376–377 | four falling pieces act one after another | H/E1 | sharpens carry source boundary | dimensions, timing, every Pascaline revision |
| preserved Pascal machine | Cnam `19600-0000` | institutional object identity/context | H/E2 | named-object context only | identity with Belair's machine |
| working physical interpretation | CMU reconstruction | reconstructed behavior | R/E2 | contextual comparison | seventeenth-century identity |
| fixed-width nines complement | `10^w-1-n` | mathematical relation | M | helper/readout invariant | Pascal/Belair terminology |
| forward-add subtraction fixture | repository complement-register trace | deterministic state/action/events/replay | P/M | inspect representation and generic carry boundaries | “Pascal's subtraction algorithm,” physical timing/linkage |

## What the repository simplifies

`src/mechanisms/complement-register/` supports decimal width 1–15 and bounded `0 ≤ B ≤ A`. It initializes a physical/additive value to `C(A)`, applies `B` as **one bounded forward-add action**, and exposes the ordinary and complementary readouts after that action. Its v2 trace has begin/end markers, one register-advance event and at most one mathematical boundary-crossing summary per decimal order; event count is O(width), not O(B). Crossing counts and event order are P/M inspection semantics—not crank, stylus, operator-cycle or historical timing claims. It does not model a dial, mask, sautoir, mixed-radix currency, negative result or source-specific timing.

## Implementation consequence

A one-direction additive mechanism can present subtraction because representation changes what is read: advancing the physical value from `C(A)` by `B` makes the complementary view display `A-B`. The repository labels this flow P/M and labels the nines-complement relation M. Historical text supports the motivation and dual-display relation, not these event names or sequence.

## Uncertainties

- no complete digit-pair table was found in the inspected Belair prose;
- Belair's five-place machine is not mapped to a surviving inventory item;
- no primary operator subtraction setup sequence was found;
- exact sautoir geometry, dimensions, timing, force and revision applicability remain open.
