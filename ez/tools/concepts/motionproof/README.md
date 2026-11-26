# Motion proof and outcome template (2026-11-10)

three.js pages rendered frame by frame in headless Chromium (WebGL through SwiftShader).
- `npm i three@0.160.0` in this folder, serve it (`python3 -m http.server 8998`), then `PAGE=outcome.html DUR=10 node rs.js <outdir> all` (or `t1,t2,...` for stills); launch flags in rs.js enable SwiftShader.
- `proof.html`: kinetic type, chrome knot, Grok trades as cubes (grok.json). `outcome.html` reads `outcome.json` (round, calls, move, closes, the line).
- Mux: ffmpeg -framerate 30 -i <outdir>/%04d.jpg plus a music bed.
