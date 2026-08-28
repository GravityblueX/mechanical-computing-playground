# Verification

Checked 2026-08-28 on Windows and in the pushed repository checkpoint.

- `npm test`: 3 files, 21 tests passed.
- `npm run typecheck`: passed.
- `npm run build`: passed with Vite and repository base path.
- Core canonical carry fixture replay: passed.
- Finite-difference square/cubic generation: passed.
- Stage A gradient/update and Stage B hidden adjoint references: passed.
- Pages workflow: `.github/workflows/pages.yml` added; GitHub Pages still requires repository Pages configuration and a successful deployment run.
- Known limitation: the browser shell is text/state-first; drag-crank interaction, full Stage B phase visualization, and browser smoke automation remain follow-up work.
