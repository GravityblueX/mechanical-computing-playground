# Simulator and prior-art matrix

**Checked: 2026-09-01**

This matrix records where the repository should link, inspect, or reuse existing work instead of rebuilding whole machines. Blank/unknown fields are intentional; licenses and maintenance are not guessed.

| Resource | Machine/family | Kind | Input model | Single-step? | Internal state visible? | Event/operation trace? | License/reuse status | Last-maintained signal | Reuse/link instead of rewrite | Remaining explanatory gap |
|---|---|---|---|---|---|---|---|---|---|---|
| [CHM Babbage Engine](https://www.computerhistory.org/babbage/) | Difference Engine / Analytical Engine | Museum history + documented reconstruction | Explanatory web material | Not established in this check | Illustrated mechanism/reconstruction material | Not established | Content reuse not established; link/cite | Not responsibly verified | Historical overview, reconstruction context, images subject to terms | Tested mechanism-level state/events and explicit M/H/R/P boundaries |
| [aroman/difference-engine](https://github.com/aroman/difference-engine) | Difference Engine mathematics | Open-source simulator | Polynomial/difference setup | Not verified in this bounded check | Source/state inspectable in repository | Not verified | Repository license must be checked before code reuse | Not responsibly verified | Link for existing numerical simulator rather than rewrite its CLI role | Show per-column dependency, carry abstraction, and evidence boundary |
| [Fourmilab Analytical Engine](https://fourmilab.ch/babbage/contents.html) | Analytical Engine | Emulator lineage + documentation | Programming/operation cards | Emulator supports execution; exact stepping affordance not re-verified | Mill/Store/card concepts documented | Not established as repository-style event log | Reuse terms/code only after checking site terms; link/cite is preferred | Not responsibly verified | Card language/emulation and authenticity discussion | Visual information flow and explicit provenance for each interpreted operation |
| [cakenggt/analytical-engine](https://github.com/cakenggt/analytical-engine) | Analytical Engine | Node emulator derived from Walker lineage | Card reader/program | Not re-verified | Mill, Store, reader, printer and curve apparatus represented in source | Not re-verified | License must be checked in upstream before reuse | Not responsibly verified | Inspect/reuse emulator execution rather than invent an instruction set | Pedagogical single-step information flow and claim mapping |
| [npm `curta`](https://www.npmjs.com/package/curta) | Curta | Software calculator/simulator package | Programmatic operations | Not verified | Not verified | Not verified | Package license/versions must be checked at npm/upstream before reuse | Not responsibly verified | Existing arithmetic behavior instead of another result-only emulator | Explain crank phase, carriage, result/counter registers, and operator correction |
| [CurtaSim](https://www.rand-emonium.com/curtasim/) | Curta | Interactive simulator | Virtual controls | Not verified | Visual controls; internal state depth not verified | Not verified | Link only; reuse status unknown | Not responsibly verified | Link to whole-machine interaction | Source-mapped mechanism state and replayable operator procedure |
| [Jaap's Curta page](https://www.jaapsch.net/mechcalc/curta.htm) | Curta | Specialist reference | Documentation | N/A | Mechanism explanations/illustrations | N/A | Link/cite; image/text reuse not assumed | Not responsibly verified | Specialist orientation and terminology | Exact manual/patent/model provenance for UI claims |
| [Smithsonian calculating-machine groups](https://www.si.edu/spotlight/calculating-machines) | Stepped drum / pinwheel / direct multiplication | Museum objects + institutional synthesis | Historical controls described | N/A | Object/catalog mechanism roles | N/A | Link/cite under institutional terms; no code reuse | Living collection; page maintenance date not verified | Family classification, objects, operator roles | Deterministic cross-family operation traces without invented geometry |
| [jsemu collection](https://github.com/fcambus/jsemu) | Difference Engine, Analytical Engine, Z1/Z3 and others | Emulator collection | Browser/program inputs vary | Varies; not re-verified | Varies | Not established as common event model | Check repository/subproject licenses individually | Not responsibly verified | Inspect existing emulators before adding a named machine | Shared evidence-aware mechanism/event comparison |
| This repository | Cross-machine mechanism studies | P/M explanatory playground | Crank, key, selector, carriage, discrete/continuous actions | Yes for several exhibits | State/events intentionally visible | Yes where implemented | MIT OR Apache-2.0 (repository files) | Current repository checkpoint 2026-09-01 | Reuse/link prior emulators for whole-machine behavior | Isolate carry, multiplication, key-driven input, and operator division as inspectable state transitions |

## Decision

The explanatory increment is not another complete emulator. It is the connection:

```text
source or mature simulator
→ bounded mechanism question
→ deterministic state/action/events
→ inspectable operator labor
→ explicit evidence boundary
```

Before copying third-party code, inspect that specific project's license and provenance. A URL in this matrix is not a license grant.