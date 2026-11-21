H37 Upcoming mockups (2026-11-02, night). Mockups only: overlays on the built X2+ page, nothing in tools/v22 or media touched.
Structure in every take: 1 The next bell (the close, the countdown, "8 of 16 trades in"), 2 the companies graded at that close with
their four trades, 3 "Upcoming predictions": the big names first (Mag 7, then CAPS; four), then the rest day by day.
Files: _h37.js (waits for x2p_up.js's model window.__u3, shapes it, mounts .h37-root; the generic board builder), _h37.css, _hb.css,
t<A-F>.js/.css (one take each). Paintings: img/ (Hedra gpt-image-2, high, 2K, $0.268 each, 6 images, jobs1.json, jobs2.json);
the crops (head, band, foot, tile) are cut from them; words and numbers are page text.
Run: serve ez/ on :8991 (python3 -m http.server 8991 --bind 127.0.0.1 from ez/), then
  bash all.sh "now A B C D E F" "390 320 1280"   (DPRP=3 for the 3x phone shots)  -> scratchpad/h37up/<take>-<w>.png/.json
  node gpu.js 40 <dir> <overlays>  /  node gpu.js 0 <dir> <overlays>, then perf/gpu/blk.py <ref> <run>
  /usr/bin/python3 board.py  -> ez/x2p-h37-up-390.png, ez/x2p-h37-up-1280.png
