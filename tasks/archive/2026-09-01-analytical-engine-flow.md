# Archived Agent Task — Analytical Engine information flow

Issued: 2026-09-01
Completed: 2026-09-01
Agent task assignment commit: `b9cc0282b9972c6bc9ed7cbdeb54559fff7671a7`
Completion commit: `83163bdd7c3c98dd37a12a2949f6e31c486cd960`
Observed wall-clock from assignment commit to completion commit: about 32 minutes
Status: accepted

## Intended slice

The task asked the local coding/research agent to replace the placeholder Analytical Engine information-flow note with a provenance-aware source map, build a deterministic P/M Store/Mill/card/output teaching trace around `(ab+c)d`, upgrade `#/analytical-engine` with step/reset/state/event visibility, and reconcile the stale GitHub Pages status.

The task was intentionally estimated at roughly 75–105 minutes because the preceding source-heavy slice had also completed unusually quickly.

## What actually landed

The completion checkpoint changed 11 files, approximately `+470 / -22` relative to the assignment commit. It:

- expanded `research/analytical-engine-information-flow.md` from a placeholder into a historical/reconstruction/P/M provenance map;
- separated Menabrea/Lovelace, Charles Babbage, H. P. Babbage, catalogued Babbage Papers drawings, Walker/Fourmilab reconstruction choices, and repository teaching choices;
- replaced the static flow labels with a deterministic `(ab+c)d` trace exposing Store, Mill, card roles, intermediate `p=6`, `q=10`, final `50`, ordered events, replay and tamper validation;
- upgraded the browser lesson with event stepping, reset, bilingual state panels and event log;
- added `tests/analytical-engine-flow.test.ts`;
- reconciled Pages publishing documentation and recorded the verified public Project Pages URL;
- updated STATUS/TODO/verification/teaching documentation.

Recorded verification at completion:

```text
npm run typecheck        pass
npm test -- --run        pass, 91 tests / 11 files
npm run build            pass
git diff --check         pass
local #/analytical-engine smoke pass
```

The public Project Pages root was verified reachable before the new Analytical Engine commit; the task correctly did not claim the newer route deployed until its deployment completed.

## Throughput observation

This was the second consecutive substantial source+implementation slice completed in roughly half an hour rather than the nominal hour-plus budget. Future tasks can therefore contain a larger but still coherent research+implementation+verification bundle. Do not respond by weakening source discipline or combining unrelated machines.

## Administrator follow-up before next assignment

Three small external hardening PRs were reviewed and squash-merged after the Analytical Engine checkpoint:

- PR #3 — reject unknown direct-multiplication event discriminators → `c5babcf72acdeaf06f35a5ee8bcd8969cd4ba33a`;
- PR #4 — reject unknown setting–crank action/event discriminators → `8d150ec10cff37ba5f9b784a57756655b8b29b76`;
- PR #5 — reject unknown operator-division action/event discriminators → `be1b5c80dca1d88553997236669859460a26a067`.

All three were mechanism-local, had focused regression tests, and did not conflict with the Analytical Engine work. Main CI run `33449580167` completed successfully for `be1b5c80dca1d88553997236669859460a26a067`. No open PRs remained after the merges.
