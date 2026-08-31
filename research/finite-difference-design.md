# Finite difference design

**Checked: 2026-09-01**

## Question

What can the repository teach with a minimal finite-difference column model, and which parts require separate historical evidence before they are attributed to Babbage's Difference Engine?

## Claim types

- finite-difference mathematics: **M**;
- claims about Babbage's actual engines/designs: **H/R**;
- `src/mechanisms/difference-column` update model: **P/M**.

See `docs/EVIDENCE_POLICY.md`.

## Mathematical layer

Finite differences are successive differences of a sequence. For a polynomial of degree `k`, the `k`th finite difference is constant (for equally spaced arguments). A difference table can therefore generate successive polynomial values using repeated additions once the appropriate starting differences are known.

The repository presets currently include:

```text
squares: [0, 1, 2]
cubes:   [0, 1, 6, 6]
```

The implemented tests verify that repeated crank steps generate square and cubic sequences from these states.

This is a **mathematical/computational claim (M)**. Historical evidence grading is not applicable to the theorem itself.

## Pedagogical state model

`src/mechanisms/difference-column` stores the leading value of each difference column and advances them in an explicit deterministic order. This gives the UI a visible sequence of state changes and lets tests replay multiple crank cycles.

Claim type: **P/M**.

The model is intentionally minimal. It does not claim that its arrays, object fields, or update function reproduce the exact racks, sectors, carry timing, locking, or shaft geometry of Difference Engine No. 1 or No. 2.

## Historical layer still needing stronger anchors

The repository can safely state at a broad level that Babbage's Difference Engine work used finite-difference methods to automate mathematical table production; `docs/PRIOR_ART.md` already points to the Computer History Museum Babbage materials:

- <https://www.computerhistory.org/babbage/overview/>
- <https://www.computerhistory.org/babbage/engines>
- <https://www.computerhistory.org/babbage/howitworks/>

But the following more precise claims should not be inferred from the current software model:

- exact physical update order of a particular engine revision;
- exact carry timing between columns;
- exact digit-wheel/carry geometry;
- printing/stereotyping sequence;
- maximum order/precision/performance for a named design;
- claims that the pedagogical crank maps one-to-one to a historical crank cycle.

Those are **H/R** claims and need primary drawings, Babbage documents, reconstruction documentation, or other source chains at the precision stated.

## Why the exhibit is still worthwhile

The explanatory increment is not “another Difference Engine emulator.” It is the ability to inspect the mathematical dependency:

```text
constant higher difference
→ repeated addition into the next lower difference
→ repeated addition into lower columns
→ next table value
```

A visitor should be able to infer why a polynomial table can be generated without a general-purpose multiplication operation, while the page simultaneously warns that this abstract update graph is not a mechanical blueprint.

## Project decision

Keep the current deterministic column model and square/cubic tests.

Before increasing historical mechanical detail:

1. identify a specific Babbage engine/design/revision;
2. add primary/reconstruction source anchors for sequencing and carry claims;
3. distinguish the mathematical update dependency from the actual mechanism used to realize it;
4. only then add source-specific geometry or timing to the exhibit.

A future essay `docs/WHY_DIFFERENCE_ENGINE_NEEDS_ADDITION.md` should be written from this separation: **mathematics first, historical mechanism second, pedagogical implementation third.**