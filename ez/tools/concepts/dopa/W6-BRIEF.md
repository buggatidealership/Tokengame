# Season 1 wrap-up, round 6: five different shows (owner, 2026-11-19)

## What he said about the last one (`wrapg.html`, `ez/x2p-s1-wrap-g2-draft.mp4`)
"The branding is not strong enough. It's lackluster, it's not exciting. It's not hype. It's boring... It looks like a PDF slideshow.
There's no charts... not having any charts is stupid. You should have a chart which shows this is how season 1 played out. No dead
space, not too much information, which is hard to digest. Everything very crystal clear. There should be a leaderboard by the P&L, then
on the accuracy as well. The music needs to be a bit more hype. Five completely different variations."

## The better input
Make a 30-second Season 1 wrap-up that a crypto trader on X would watch twice: open on the brand, show the season as one live P&L
chart, then the P&L leaderboard, then the accuracy leaderboard, then crown Grok. Cut on a fast beat, never hold a still frame, fill the
frame, say five things only.

## His words as checks (your page must pass them; two scripts measure them)
| He said | Check | Measured by |
|---|---|---|
| boring, PDF slideshow, not hype | a new shot at least every 2.5 s on average; every cut within 40 ms of a beat; no plain cross-fade between shots (cut, wipe, push, camera move); something moves in every half second and the median motion is at least 3.5 grey levels (the old wrap-up: 1.69) | `wrapqa.js`, `wrapqa.py` |
| length | 28 to 36 s | both |
| branding | the EZ. logo (`ezlogo.svg`) opens and closes the video and stays on screen as a small bug throughout; headlines in a heavy italic like the logo's letters (Kanit 800/900 italic is the nearest free face) unless your take's concept needs another; only the brand's colours: black #04070e / #0a0908, cream #f2ede6, green #55d6a2 (or the logo's #03c870), red #e8576b (or #ff3a31), gold #fdbc2a | your eyes |
| charts are crucial | one chart of the whole season: each AI's P&L round by round, all 112 trades (`D.s[k]`, 113 points from $0), drawn live, on screen at least 6 s; charts and leaderboards together at least half the runtime | `wrapqa.js` (window.CHART) |
| no dead space | on every shot the content spans at least 75% of the frame's width and of its height, and no empty band is taller than 15% of the frame | `wrapqa.js` |
| not too much information | five messages only (below); at most 8 words and 2 data points a shot (a leaderboard's four rows count as one data point); a line stays readable for 1 s plus 0.08 s a character | `wrapqa.js` (words) |
| leaderboard by P&L, then accuracy | two boards, in that order | `wrapqa.js` (figures) |
| music more hype | your bed is given below: 140 BPM or faster, drops measured; the chart finishes on drop 1, the winner lands on drop 2 | `wrapqa.js` |

## The five messages, in order (suggested times; fit them to your bed's drops)
1. **Brand open** (0 to about 2 s): the EZ. logo, "Season 1".
2. **What it was** (about 2 to 5 s, two or three shots): 4 AIs (their marks: `L.mark(k, size)`), 112 earnings trades, long or short, $100K on every trade.
3. **How the season played out** (about 5 s to drop 1): the P&L chart drawing live from round 1 to 112, finishing on drop 1 with each AI's final P&L at its line's end. Lead changes are in `D.lead`. Colours: use each AI's own line colour consistently (pick four that read apart on your ground; the leader may be gold).
4. **P&L leaderboard** (drop 1 to about 19.5 s), then **accuracy leaderboard** (to just before drop 2). Kimi's row carries a small "Relegated" mark on one of them.
5. **The winner** (drop 2 to the end): "Grok wins Season 1", "P&L +$169,450", then a small "Season 2 soon" and the logo close.

## The numbers (from `data/wrap.json`; read them from the file, never type them)
- P&L, $100K on every trade, 112 trades: Grok +$169,450 · Claude +$107,020 · GPT −$19,780 · Kimi −$149,500 (`D.ai[i].pnl`; boards may round to +$169K, +$107K, −$20K, −$150K; the winner's total is exact).
- Accuracy = trades on the right side: Grok 60% (62-42 on 104 trades) · Claude 54% (61-51) · GPT 54% (60-52) · Kimi 46% (51-61) (`D.ai[i].w`, `.l`, `.hit`; compute Kimi's and the others' percent as round(100 * w / (w + l)); Claude ranks above GPT on wins). Label it "Accuracy" and show the W-L beside the percent.
- The season's series: `D.s.GROK` etc. (cumulative P&L after each round, index 0 = $0). Peaks and lows in `D.peak`.

## Wording, hard rules (he has rejected copy for each of these)
- An AI's side is **long** or **short**, nothing else. Never "up", "down", "bet on", "said it would fall". A stock may fall or close −2.89%.
- Money is a **signed P&L** with its label: "P&L +$169,450", "+$169K" under a "P&L" header. Never "made" or "lost". No number without a label.
- **No punctuation on screen at all**: no full stops, commas between words, colons, question marks, exclamation marks, no "·" separators (use a wide space). Digits keep their comma, minus (U+2212 "−", never "-"), plus, $ and %.
- Never "not real money", "simulated", "paper", "every earnings report", "coin flip", "top plans", "starting capital". Say "112 earnings trades" or "112 trades".
- Never invent a number, a quote, a model version or a reason. No request to the viewer (no "follow", "reply").
- Sentence fragments, headline style. One name per thing.

## The tools (all in this folder, `ez/tools/concepts/dopa/`)
- A page defines `window.R(t)` (draw the frame at t seconds, pure function of t: no timers, no CSS animations, no requestAnimationFrame), sets `window.READY = 1` when fonts and images are in, and `window.DUR`, `window.CUES` (`[[t, 'sound', peak], ...]`, sounds are the `r11-*` and `sfx-*` files in `../launchvid/hedra/music/`), `window.MUSIC = { f: '<bed>', at: <bed second at video 0> }`.
- For the checks also set `window.SHOTS = [0, t1, ...]` (each shot's start; in a one-take video, each story beat), `window.BEAT = { bpm, at }`, `window.DROPS = [d1, d2]`, `window.CHART = [[a, b], ...]`. Mark the brand bug, the fine print, axis ticks and grounds `data-chrome` (they are not counted as content or words). All words and numbers are DOM or SVG text (never drawn on a canvas); a canvas that draws content carries `data-content` and is sized to what it draws.
- Read `wrapg.html` for the boot code (fonts, `models.json`, `data/wrap.json`, `L.grain`), `lib.js` for helpers (`L.n`, `L.eo`, `L.eio`, `L.spring`, `L.money`, `L.mark`), `slam.html` for full-bleed type on a beat, `outcome.html` for a live chart with rows. `L.css` imports Inter and Geist Mono; add your own Google Fonts link and wait for it (`document.fonts.load`).
- The server: `curl -s -o /dev/null -w "%{http_code}" localhost:8993/wrapg.html` should say 200 (it serves this folder). If not: `(setsid nohup python3 -m http.server 8993 --directory /home/user/Tokengame/ez/tools/concepts/dopa </dev/null >/dev/null 2>&1 & disown)`.
- Stills: `DUR=<s> node render.js <page> <your scratch folder> 1.2,4,7.5` writes `<t>.jpg` (1080x1350). Look at them with Read. Tile many: `ffmpeg -loglevel error -y -pattern_type glob -i "<folder>/*.jpg" -vf "scale=360:450,tile=6x3" -frames:v 1 <folder>/sheet.jpg`.
- Motion preview: `node prev.js <page> <out.mp4>` (10 fps, 432x540, about a minute), then `python3 wrapqa.py <out.mp4> --prev` (frozen windows, median motion).
- Page checks: `node wrapqa.js <page>`.
- Beat grid of a bed: `python3 beat.py <bed>`. A cut belongs on `at + n * 60 / bpm`.
- **Do not run the full render** (`wrapx.sh`): the main session renders the five one at a time.

## Rules of the room
- Five builders share this folder and this machine (4 cores, about 1.5 GB of free disk). Touch only your own files: `w6<id>.html` and anything under `w6/<id>/` (assets) here, and your scratch folder `/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/w6/<id>/`. Do not edit `lib.js`, `render.js`, the QA scripts or anyone else's page. Overwrite your stills instead of piling them up; keep your scratch folder under 150 MB. Delete with plain full paths only (never `rm -rf` on a shell variable).
- Do not commit or push; do not start other agents. No foreground `sleep`.
- Hedra (only where your brief says so): `python3 ../launchvid/hedra/hd.py <name> <model> '<json>'` for a picture (read the top of the file for models and inputs), `hv.py` for a 5 s clip from a picture. The key is in the environment: never print it, never write it to a file. Words and numbers are never baked into generated art (the page sets them). No people, no real persons.
- Look at your own frames before you report. Check every shot against: can a stranger say what this shot tells them in two seconds, sound off? Is anything overlapping, clipped, tiny (under 28 px), or left in a corner with empty space beside it?

## Report back (short)
The page's path, what the take is in two sentences, the output of `node wrapqa.js` (pass/fail lines) and of `wrapqa.py --prev`, the exact render command (`CRF=20 bash wrapx.sh <page> <DUR> x2p-s1-wrap6-<id>-draft <bed> 0 .34`), your contact sheet's path, any Hedra spend, and what you know is weak.
