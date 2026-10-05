# Tokengame

## EZ landing page (`ez/`)
- When the owner says **"sheet has been updated"** (or sends a new round film), follow `ez/SYNC.md` step by step.
- All numbers come from `ez/ez-data.js` (a checked snapshot of the owner's sheet). Never type results by hand anywhere else.
- `ez/v1-binder.html` is "Variant 1" and is frozen: do not edit it or the original media files it uses.
- **Locked (2026-09-30):** `ez/v6-primetime.html` ("Primetime") and `ez/v9-primetime-kraft.html` ("Primetime Kraft"). Do not change their design, layout or copy. They still pick up new data from `ez-data.js` (sheet syncs, new films) and are still republished by the sync routine.
- **Locked (2026-10-05):** `ez/v15-season.html` ("EZ Season") and `ez/v23-live-x1.html` ("EZ Live X1"). Do not change their design, layout or copy (v23 is built from v15 + `ez/tools/v22`, so changes there must leave X1 unchanged: gate them behind `X2`). They still pick up new data from `ez-data.js` and are republished by the sync routine.
- **Main page now: `ez/v24-live-x2.html` ("EZ Live X2")**, https://claude.ai/artifact/1HuRhevBKLrUfzBR5UUaZL. EZ Live X1 is retired (2026-10-05): kept as a file, no longer republished. When the owner says "Overview" they mean EZ Season and X2's Overview tab; "Leaderboard", "Results" etc. mean X2's tabs. X2-only changes are gated behind `X2` in `ez/tools/v22/routes.js`.
- Current exploration: three new variations built on the same data (see `ez/VARIANTS.md`, round 5). Index of all variants: `ez/VARIANTS.md`.
- Site copy: no long dashes; plain, direct sentences.
