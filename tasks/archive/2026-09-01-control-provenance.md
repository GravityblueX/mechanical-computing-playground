# Completed task — subtraction / zeroing / control provenance

Status: completed
Assigned from: `4521ce9a1e37ba6e4632c4804d60b939d7399bd0`
Implementation commit: `36c7775f6d2b933bfaa2f273e13b8b3a87587688` (`feat: ground subtraction and control provenance`)
Observed elapsed time from task assignment commit to implementation commit: about 33 minutes.

## Delivered

- Added `research/control-and-zeroing-source-map.md` with family-separated Thomas, Odhner, Felt/Tarrant, Turck, and Pascaline control provenance.
- Tightened `research/subtraction-and-division.md` so mode, counter direction, zeroing, correction, and P/M operator procedure are not collapsed into one universal historical mechanism.
- Added typed `src/exhibits/control-provenance/` profiles with claim type, E1–E4 strength, source/model identification, documented roles, and explicit not-established boundaries.
- Upgraded `#/controls` so the tested generic setting–crank interlock remains visibly P/M while source-specific historical control responsibilities are shown separately.
- Added focused provenance-data tests and reconciled STATUS/TODO/representation/teaching/verification docs.

## Verification observed

The implementation raised the recorded suite from 128 tests across 12 files to 133 tests across 13 files. The repository records local typecheck, test, build, diff-check, and controls-route smoke passing.

GitHub check-runs for `36c7775f6d2b933bfaa2f273e13b8b3a87587688` were also observed complete/success for:

- `verify`
- Pages `build`
- Pages `deploy`

No open pull request remained for this work.

## Throughput note

The previous continuous-mechanics and Difference Engine slices also landed in roughly 30–33 minutes. This confirms the local agent is completing the older one-hour-sized assignments at about twice the expected rate. The next assignment is therefore intentionally broader while remaining one coherent research/implementation question.
