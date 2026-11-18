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

---

# Round 3 (owner, 2026-11-18, afternoon, after seeing takes C and L)

The owner's decisions (asked, answered):
- **Season 1 ends on Season 1.** The conclusion video is the last Season 1 post. It ends on the final leaderboard and the
  winner, then **one small line**: "Season 2 soon." No Season 2 card, no empty seat, no "?" seat, no "new model" line.
- **Kimi is out, and the Season 1 video says so** (under 50% on direction). Who replaces it is NOT said here: that is the
  Season 2 launch video's news (Gemini and Qwen join; five models).
- **Not the owner's wording** ("do not use my wording, use your own... optimized for Twitter crowd"). The deck below is
  mine; the "top plan" claim is gone (unverified, and his words).
- Post order tonight: Disney outcome, Home Depot outcome, NVIDIA outcome (a finale cut), then the Season 1 conclusion.
- Alibaba (R113 in the sheet) is Season 2, round 1: Season 1 is 112 rounds and `wrap.json` never counts past 112.

## The copy deck (every line is printed only while the data makes it true; numbers come from `wrap.json`)

Hooks, one per take, complete by 3.0 s:
- **K:** "4 AIs. 112 earnings reports." / "$100K on every trade." then "One made $172K. One lost $147K."
  (the first and last P&L rounded to $K; only while the first is up and the last is down).
- **L:** "We made 4 AIs trade earnings for a whole season." / "112 reports. Long or short. $100K a trade."
- **C:** "4 AIs traded 112 earnings reports." / "Paper money. Real calls. Public record." / "The report cards."

Shared lines:
- Standings label: "Final P&L · 112 rounds" (draft: "P&L after 111 of 112 rounds").
- A big round's verdict, by rule: one AI right: "Only Grok was short." (or long); one AI wrong: "Only GPT missed.";
  nobody right: "All four got it wrong."; otherwise "Grok and Claude called it."
- "64 of 111 stocks fell on earnings."
- "The bears got paid. The bulls got rekt." (only while every BEAR is up and every BULL is down; else "Shorts beat longs.")
- "Grok shorted 93 of its 103 calls." (the leader, while its `lean` is BEAR)
- "Short everything: +$179,410. No AI beat that." (while `mkt.short > ai[0].pnl`; else "Short everything: +$X. Grok beat it.")
- Accuracy head: "How often did they pick the right side?"
- Relegation: "Kimi was wrong more often than right." / "Relegated." (for each AI in `releg`; no replacement named)
- The winner, the last big beat: "Grok wins Season 1." with its P&L, on the bed's biggest moment.
- The last line, small, under the winner: "Season 2 soon."

Never: "coin flip", "top plan", "starting capital", "coming soon" as a card, a date for Season 2, a request to the viewer.

## What each take changes

- **K:** relegation shot without the "?" seat (Kimi's mark, its %, the line, the stamp); the recap grid ends with the winner's
  tile growing to take the frame ("Grok wins Season 1." and the P&L) on the bed's drop at 48.0 s; "Season 2 soon." small at
  the foot; cut the Season 2 card (the video may end 3 to 5 s earlier).
- **L:** after the accuracy lanes and the relegation, the camera travels back to the end of the race for the last beat:
  the final standings with the winner ringed in gold, "Grok wins Season 1.", on the bed's second drop (52.0 s);
  "Season 2 soon." small; no empty lane, no end title card.
- **C:** Kimi's card keeps RELEGATED; the run ends on the final table and then a full-bleed gold winner card
  ("Grok wins Season 1.", the P&L) on the bed's last lift; "Season 2 soon." small; no seats, no "?".

## Round 3b: what "polished" means (owner, 2026-11-18, right after round 3)

His words: "not having too much dead space, but also not having too many numbers within one screen... each screen is to
show 2 data points max, and the 2 data points need to correlate... no overflow of information... an Apple launch video
teaser... this glassy aspect... cleaner... not too crowded". A lead, not a spec. Made computable; every take must pass:

- **P1, two data points a scene.** A scene (the stretch between two transitions) puts at most TWO data points at full
  contrast, and both are about the same subject (a company and its move; an AI and its P&L; a strategy and its result).
  A data point is one number or one verdict word. Anything else on screen is a small grey label, or something an earlier
  scene already introduced, kept at 35% opacity or less. A table is built one row a scene (each row is "who, how much").
  The report lists every scene with its data points.
- **P2, few words.** At most 12 words on screen in a scene, labels included; at most 3 type sizes.
- **P3, no dead space, no crowd.** The full-contrast content of a scene sits centred (within 4% of the frame's centre),
  is 35% to 70% of the frame's height and at least 70% of its width, with no empty band taller than 30% of the frame
  between two of its elements.
- **P4, glass (take K, the NVIDIA finale's added beats, one Season 2 mockup; not L or C).** Apple's own description of
  its material: it "reflects and refracts its surroundings" and reacts to movement "with specular highlights"
  (Apple newsroom, June 2025). In CSS terms (LogRocket and others, 2025): a sheet with a white fill of about 8 to 12%,
  backdrop blur 16 to 30px and saturate 140 to 200%, a bright edge only where light would hit (top, top-left), a faint
  inner shade at the foot, radius 36px or more, and a soft shadow. Glass only reads over something that moves, so a slow
  field of brand-colour light (green, red, gold on black) drifts behind it. One sheet a scene. `palcheck` stays under 2%.
  If `backdrop-filter` makes frames slow or uneven in the renderer, pre-blur a copy of the field under the sheet instead.
- **P5, calm motion.** One transition per scene change; things arrive in 0.5 s or less on a spring or ease; at most two
  things move at once; a held scene drifts slowly (scale 1 to 1.03) so it is never frozen, never busy.
- **P6, so the content is cut, not squeezed.** 45 to 60 s stays. Big rounds: two, each the move and the one AI that
  stood out (the four P&Ls appear once, in the table built row by row). Leans: the winner's only. Accuracy: the best
  and the relegated one get numbers; the others can be bars without numbers.

Trade-off to tell the owner: with two data points a scene, "each model's P&L on every big round" no longer fits; the
table carries all four once.

---

# Round 4 (owner, 2026-11-18, evening, after watching K, L and C round 2). THIS REPLACES the round 3 copy deck and its hooks.

What he said: the wording is bad ("we paid for the top plans" is "horrible", "in front" makes no sense: say leader); the
music is boring; everything lands at once ("roll it out step by step, so somebody understands what they are looking at");
"a human does not by default think in numbers"; "anything that can confuse them should not be there"; L round 2 is far
too much on one scene with no time to digest. And again: do not echo his words, find what he is trying to do.

What he is trying to do: a stranger on X, sound off, follows the whole season without effort and without knowing
anything about us. So the video is no longer a stats recap. It is six small scenes that each build one thought.

## The rules (computable; they sit on top of P1 to P6)

- **R1, say what it is first.** Every scene opens with a line of plain words (6 words or fewer, no number) that says what
  the scene is about. It is alone on screen for at least 0.7 s before anything else arrives.
- **R2, one thing at a time.** Elements arrive one by one, at least 0.7 s apart. Never two new things in the same 0.7 s.
  What has arrived stays, so the scene builds like a sentence.
- **R3, time to digest.** After a scene's last element lands it holds at least 1.6 s (or 1 s + 0.08 s per character of
  the scene's text, if that is longer) before the scene leaves.
- **R4, words before numbers.** A number never appears without the words that make it mean something to a non-trader
  ("the stock fell 29%", never "-29.27% · stock move after earnings"). No label a stranger must decode: no "P&L", no
  "IN FRONT", no "RIGHT SIDE OF THE MOVE", no "1 OF 3". Say "1st", "the winner", "made", "lost", "bet on a fall".
- **R5, round numbers.** Whole per cents and whole thousands ("29%", "+$172K"). One number in the whole video is exact:
  the winner's final total on the last card.
- **R6, four questions, not eight.** What was this? Who won? Why? Who is out? Everything else is cut: no accuracy bars,
  no bears-against-bulls table, no recap grid, no second or third big round, no best and worst trades.
- **R7, a bed that moves.** 120 BPM or more, a beat from the first second, one clear drop on the winner's reveal (the
  mix's loudness rises there by 6 dB or more) and a second lift on the last card. No stretch of 4 s without drums.

## The script (the same six scenes and the same words in every take; only the look differs). Numbers from `wrap.json`.

1. **What this is.** "4 AIs bet on 112 earnings reports." (complete by 1.5 s, with the four marks) → "Each time: will
   the stock go up, or down?" → "$100K a bet. Not real money."
2. **One example.** "One example: Reddit." (logo) → "After earnings, the stock fell 29%." → "Only Grok bet on a fall."
   (its mark lights, the other three dim) → "Grok made $29K. The other three lost $29K each."
   (the biggest move where exactly one AI was right: `big[]`; all words follow the data)
3. **Who won.** "After 112 reports:" (draft: "After 111 of 112 reports:") → "4th · Kimi · lost $147K" → "3rd · GPT ·
   lost $17K" → "2nd · Claude · made $110K" → "1st · Grok · made $172K" on the bed's drop, in gold.
4. **Why.** "How did Grok win?" → "It bet on a fall 9 times out of 10." (the winner's `shortPct`, as "N times out of
   10"; only while its `lean` is BEAR) → "And most stocks did fall: 64 of 111." → only while `mkt.short > ai[0].pnl`:
   "Betting on a fall every single time would have made even more."
5. **Who is out.** "One AI is out." → "Kimi was wrong more often than right." (its mark; no percentage) → "Relegated."
6. **The end.** "Grok wins Season 1." (its mark, gold) → "+$172,340" (the one exact number) → small: "Season 2 soon."

About 45 to 50 s. If a scene cannot hold R1 to R3 in its time, the video gets longer; a scene never gets denser.

## Round 5 wording (owner, 2026-11-18, night): replaces the side words in round 4

- An AI's side is **long** or **short**. Never "up or down", "bet on a fall", "bet on a rise". The stock may fall or jump.
- Never "Not real money" (or simulated, paper). Never "every earnings report". Never his spoken phrasing as copy.
- Script lines changed: "Each time: long or short?" / "$100K on every trade." / "Only Grok went short." / "It went short 9 times
  out of 10." / "Going short every single time would have made even more."
- The look to build on is glass (s2a.html's engine; `nvglass.html` is the last round in it). Music: not s2-a.
