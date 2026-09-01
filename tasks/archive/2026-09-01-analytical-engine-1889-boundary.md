# Archived Agent Task — Analytical Engine 1889 publication-access boundary

Issued: 2026-09-01
Completed by local coding/research agent: 2026-09-01
Completion commit: `67c83087777d277c342ee8f1ada5780aafb34818` (`research: clarify Analytical Engine 1889 evidence boundary`)
Assignment commit: `47d2c0086f92f8d9d4c0c1dc9ed467c5b3bfa11e`

## Outcome

The slice completed in about 37 minutes from assignment to completion commit. It changed 7 files with 78 total line changes (`+60/-18`) and retained the 291-test / 21-file suite.

The agent directly confirmed the institutional publication identity and chapter range for Henry P. Babbage's paper as reproduced in the 1889 Spon compilation, but could not directly inspect the content pages containing items 10–20. It therefore correctly preserved the card-role and `(ab+c)d` claims at the Fourmilab specialist-transcription boundary instead of fabricating E1 page anchors. It also declined to invent a cross-walk between the inaccessible printed drawing catalogue and modern Science Museum `BAB/*` record codes.

The source atlas now distinguishes:

- 1888 Bath reading/event date;
- 1889 printed compilation identity and chapter range pp. 331–338 at institutional bibliographic precision;
- Fourmilab items 10–20 as E3 specialist-transcription content;
- Science Museum drawing records as H/E1 record metadata;
- Walker/Fourmilab emulator choices as reconstruction;
- repository `(ab+c)d` event trace as P/M.

## Verification

Completion commit `67c8308` reports:

- `npm run typecheck` — pass;
- `npm test -- --run` — pass, 291 tests across 21 files;
- `npm run build` — pass;
- `git diff --check` — pass;
- bilingual browser smoke for `#/source-atlas`, `#/analytical-engine`, and `#/about` — pass.

Exact-head push workflows completed successfully:

- CI run `33528641107` — success;
- Deploy Pages run `33528641115` — success.

No open PR remained after completion.

## Remaining boundary

Do not retry the same inaccessible 1889 content pages every hour. The remaining Analytical Engine gap is now explicitly contingent on a directly inspectable content-page reproduction or defensible catalogue cross-walk. Future work should move to another source-backed gap unless new access becomes available.
