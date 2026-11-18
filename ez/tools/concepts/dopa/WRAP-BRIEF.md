# Season 1 conclusion video, round 2 (owner, 2026-11-18)

The owner on the 35 s draft (`ez/x2p-s1-wrap-draft.mp4`): "not a bad season finale", but it must make sense to someone
who has never heard of us (we have few followers), tell a compelling story that invites a reaction, explain what we do,
show the biggest rounds with the company, the move and what each model made, give the interesting facts (bears made
money, bulls lost it), the accuracy, Kimi's relegation and its replacement, and end on Season 2 with more hype.
"Max animation", "Apple-like production". Two to three generations, "all very different from one another".

## The input, made computable (every take is checked against this)

1. **A stranger gets it, sound off.** From the frames alone a viewer can answer eight questions:
   (1) what the experiment was (4 AIs, 112 earnings reports, long or short before each, $100K on every trade);
   (2) who finished first and with how much; (3) every AI's P&L; (4) the biggest rounds: company, move, each AI's P&L;
   (5) whether shorting or buying paid; (6) every AI's hit rate; (7) who is relegated and why; (8) what comes next.
2. **Hook:** the premise sentence is complete and readable by 3.0 s (X autoplays muted).
3. **Reading time:** every line stays at least 1 s + 0.08 s per character; at most 7 words per display line; one idea per shot;
   no text under 30px on the 1080px frame; 56px safe margins.
4. **Reaction:** at least two flat, checkable, surprising statements a viewer can disagree with (e.g. "Shorting every
   report beat all four AIs."). Never a request ("reply with...", "follow for...").
5. **Max animation:** motion share at least 80% (`smooth.py`), longest still stretch at most 1.0 s (`measure.py` C11),
   no linear moves (springs and eases from `lib.js`), every hit within 50 ms of a beat of the bed.
6. **Apple-like:** two type families (Inter, Geist Mono), one type scale, everything on a grid (siblings within 1px),
   brand colours only (`python3 ../fresh/palcheck.py` under 2% off-brand on 8 frames), no overlaps, no dead space,
   no stock effects (no glows for their own sake, no confetti, no particles).
7. **Truth:** every number comes from `data/wrap.json` (written by `node prep-wrap.js`); nothing is typed into a page.
   While `final` is false the frame carries a small DRAFT tag and says "after 109 of 112 rounds" where a total is claimed;
   when `final` is true the same page reads as final with no edit.
8. **Length:** 45 to 60 s (the first draft was 35 s; eight answers at about 6 s each).
9. **Different:** the three takes share no structure, no camera grammar, no ground and no bed; frame correlation between
   any two takes at most 0.3.

## Corrections to the owner's wording (already agreed in spirit: "don't take this wording literally")

- Not "$100,000 starting capital": it is **$100,000 on every trade** (Kimi's loss of $150,590 could not happen on a
  $100K account).
- Not "worse than a coin flip" (the owner banned the coin flip on 2026-11-03): **"right less than half the time"**.
- "We paid Max plan for all these AIs" becomes **"We paid for the top plan of 4 AIs."** (the owner's claim, to confirm).
- No date for Season 2. No "everyone back to $0" (unconfirmed). No long dashes. No "locked N minutes before".

## The facts (from `data/wrap.json`; the draft's figures in brackets)

- `total` 112 rounds, `rounds` graded so far (109), `final`.
- `ai[]` in rank order: `name`, `k`, `rank`, `pnl`, `w`, `l`, `calls`, `hit` (whole %), `hitx`, `longs`, `shorts`,
  `shortPct`, `longP`, `shortP`, `lean` (BEAR or BULL), `best` and `worst` ({p, n, co, t, move, side}).
  [Grok +$168,360, 60-41, 59%, short 91 of 101 · Claude +$108,890, 55%, short 81 of 109 · GPT −$17,910, 54%, long 67
  of 109 · Kimi −$150,590, 45%, long 77 of 109]
- `s[K]`: each AI's P&L after every graded round (the race). `lead`: lead changes.
- `mkt`: `down` (62) and `up` (47) reports, `short` (+$175,430: $100K short on every report), `long` (−$175,430).
  "No AI beat shorting everything" may be printed only while `mkt.short > ai[0].pnl`.
- `big[]`: the five biggest moves, each {n, co, t, move, logo, dark, p{K}, side{K}, sum, right[], wrong[]}
  [Reddit −29.27% (only Grok right), Intel −28.58%, ServiceNow −26.97%, CoreWeave +24.71% (only GPT right), DraftKings].
  `best` / `worstR`: the round with the best / worst combined P&L [ServiceNow +$53,940 / Accenture −$64,080, all four wrong].
- `releg[]`: AIs under 50% [KIMI]. The line: "Kimi: right less than half the time. Relegated. A new model takes its
  place in Season 2."
- Marks and colours of the AIs: `models.json`. Brand tokens: #0e0c0b, #f2ede6, #8e8680, #5f5853, #fdbc2a, #55d6a2, #e8576b.

## The story beats every take must carry (order and form are the take's own)

1. The premise (the hook). 2. How it went: the season and the final P&L of all four. 3. The biggest rounds.
4. Bears against bulls. 5. Accuracy and the relegation. 6. Season 2 is coming, with a new model.

## The three takes

- **K, the keynote** (`wrapk.html`, `x2p-s1-wrap-k-draft`): by topic. A black stage, one idea per shot, giant numerals that
  count, zoom-through transitions (never a hard cut), ending on a recap grid of tiles that assemble one by one.
- **L, one line** (`wrapl.html`, `x2p-s1-wrap-l-draft`): by time. One continuous camera over one big chart world, zero cuts:
  the premise lies along the baseline before round 1, the four lines grow as the camera rides, time slows at the biggest
  rounds and a card grows out of the spike, then the camera travels on to the bears-against-bulls split, the accuracy
  lanes and the 50% line where Kimi drops out and an empty lane waits for Season 2.
- **C, the report cards** (`wrapc.html`, `x2p-s1-wrap-c-draft`): by character. Full-bleed colour cards cut hard on the beat
  (the Slam's grammar, which the owner picked for hype), the four AIs from last place to first, each with its verdict
  (BULL or BEAR, P&L, hit rate, best and worst trade), Kimi stamped RELEGATED, the round that split them, the lesson
  (the bears won), then Season 2 with Kimi's seat empty.

## How to build and check

- A page defines a pure `window.R(t)`, `window.READY`, `window.CUES`, `window.MUSIC {f, at}`, `window.DUR`; see `wrap.html`.
- Stills: `node render.js "wrapk.html" <scratch dir> 1,3,5.5,...` (the server on :8993 serves this folder).
- Full draft: `bash wrapx.sh wrapk.html <seconds> x2p-s1-wrap-k-draft` (10 s chunks, one render at a time on the machine).
- Bed: `python3 ../launchvid/hedra/ha.py <name> elevenlabs-music '<json>'` ($0.60; see `jobs.jsonl` for s1-wrap's input).
- Checks: `python3 measure.py <mp4>`, `python3 smooth.py <mp4>`, `python3 ../fresh/palcheck.py <frames>`.
