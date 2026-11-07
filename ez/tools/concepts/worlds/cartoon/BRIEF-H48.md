# Round H48: the live site, redesigned on the H47 picks (a preview page, not production)

## The owner's words (2026-11-03, night), and what they want

The owner on the five H47 cartoon takes (boards `ez/x2p-h47-*`, review page in CLAUDE.md):
- "that approach is better than what we have right now... do one version where you apply it to what we have today and make all the changes required"
- They love the sequence. It doesn't really explain how a round works. It says "this is what we do", then who is leading, then its next trades. In short: who should I follow for the next trades?
- Least favourite: Sunday funnies, Bronze Age and the picture palace ("I really don't like... especially the art style").
- **Humour magazine (`satire/`): the wording.** "So far, it's Grok", "Who to follow", "Its next trades". The proof "We track. You read.", then "One real round, start to finish", then the record.
- **Saturday morning (`saturday/`): the art style is the favourite.** Also its labels ("Who to follow", "Grok's next trades", the Hyperliquid part) and "Meet the cast".
- **"Grok leads" on Saturday morning: "I would love to see Elon's face here."** That means the leader's founder face on the verdict. The face follows the data: whoever leads, its founder.
- **Leaderboard:** "my friend also said he loves simple, clean, the leaderboard we have today... You can see all the stats in one go." Then: "he was mainly focused on the leaderboard page... less narrative on the leaderboard. Less narration and more call to actions, actionable insights."
- "You have permission to lead the design. Or in this instance, the redesign."

The prompt, rewritten as the build's spec:
> Redesign the live Overview around one job, in this order:
> 1. What EZ does: we track four AIs trading earnings so you don't have to.
> 2. Who has earned trust so far, and on how many trades: the leader, with its founder's face.
> 3. What it trades next, and where you can follow it on Hyperliquid.
> 4. Then the proof: "We track. You read.", one real round start to finish, the record, the cast, smart or lucky.
> 5. Then our own stake: the NVIDIA bet.
>
> Don't explain the mechanics up front. Use the Saturday-morning cartoon style and the humour magazine's plain wording.
>
> The Leaderboard keeps today's clean table with every stat at once, drops the narration, and opens on actions: who to follow right now, its next trades with a follow button, and short insights a follower can act on.
>
> The leader, face, trades and figures all follow the sheet. Build it as a separate preview of the real site, with today's X2+ untouched.

## What to build

A new page, **EZ Live X6+** (`ez/v50-live-x6plus.html`).
- It is X2+'s full build (`_tp` in `tools/v22/build.py`, written as `v46-live-x2plus.html` at about line 555) plus new story files `tools/v22/story/h48_*.js/.css`, added by build.py right after X2+ is written.
- It keeps every tab and route of X2+: the header, Upcoming, the round view (`#/round/N`, the slab and its plate card back) and the Leaderboard tab.
- **`v46-live-x2plus.html` must stay byte for byte as it is.** Check its md5 before and after your build.py change.
- Gate every new rule and script to the new page (a class on `<html>` that only v50 sets), so a stray rule can never reach X2+.
- Production (earningszn.xyz) is built from v46 and is not touched.

### The Overview, in this order

Port the Saturday-morning take's look into the page, using `saturday/overview.html`, `show.css`, `show.js`, `ezx.js` and the paintings in `saturday/img/`:
- gouache sets;
- cel characters;
- the ribbon act titles;
- the painted plates (9-slice);
- its three faces (Caprasimo, Lilita One, Fredoka).

Hide X2+'s own Overview sections on this page:
- the H23/H24 top: headline and chip, "How a round works", the film strip;
- Meet the models;
- Every round so far (the vitrine and belt);
- Smart or lucky;
- the bet and Season 2;
- the close.

Keep what other routes need. The round view copies record cards (`__x2pRecFill`), so `#/round/84` and a tap on a round must still open the slab view. Test it.

1. **Title card** (Saturday's sunrise town).
   - "EZ. presents · Four AIs Trade Earnings", "Season 1 · Week N" (computed from the first trade date, Sep 8).
   - Then the line "We track four AIs on every earnings trade, so you don't have to."
   - "Starring GPT · Claude · Grok · Kimi": names and marks, no faces on the cover.
   - The explainer film stays reachable as one small play chip ("How it works · 1:20", today's film files and player), not as a section.
2. **Who to follow: "So far, it's Grok."** (the satire wording; the name is the computed leader).
   - The golden ticket with **the leader's founder face** (Saturday's cast cel for that model).
   - "Right on 49 of 76 trades · 64.5%", "+$162,950 at $100K a trade".
   - The honesty line (Wilson 95%): "So far is the word. On 76 trades, Grok's real hit rate could be anywhere from about 53% to 74%. A lead, not a proof."
   - The field as three small plates.
   - Leader = top season P&L, flat $100K a trade: `__x2pPnl` or the same rule. Check that it equals x2p_lb's season P&L ranking.
3. **"Grok's next trades"** (Saturday's next-trade cards).
   - Each card shows the leader's trade on the gold strip, with the other three as the field.
   - "Follow Grok's short on Hyperliquid": market name and open interest; "thin market" under $10M; "No Hyperliquid market" when there is none.
   - Then the next companies with a market, and "Markets: Hyperliquid, as of Nov 3".
   - Data: embed the snapshot (`hl-markets-2026-11-03.json`, only the tickers the sheet needs) in the JS. Look tickers up as satire and saturday do: the exact ticker, else without its exchange suffix, skipping delisted markets.
   - Optional: a live refresh from `https://api.hyperliquid.xyz/info` after the cover lifts, in a try, never blocking, falling back to the snapshot with its date.
   - **The link:** find out what URL a market on Hyperliquid's own app actually opens on. Open it in Playwright and confirm the market's name appears. If you can't confirm one, show the market name without a link and say so in the report.
4. **The proof, "We track. You read."**
   - A short ribbon section: 84 rounds, 328 trades, each locked before the earnings and graded by the close (all computed).
   - Satire's bookkeeper cartoon is optional. If you use it, the painting is in `satire/art/` or `satire/img/`, and it must sit in Saturday's look, not as a pasted magazine page.
5. **"One real round, start to finish"**: Saturday's "Previously on…" TV beats.
   - The trades, the close, graded at $100K a trade with W/L, then "Kimi was the only one right and won the round."
   - Rule: the newest round with a film where exactly one AI got the direction right (today R70 Eli Lilly).
6. **"The record: every round so far"**: Saturday's episode guide.
   - 12 tiles on a phone, 15 on desktop, "Show all N rounds".
   - Each tile shows round, Company (TICKER), move and who won ("Nobody won").
   - **A tap opens today's round view** (`#/round/N`), not a separate player.
   - Fix Saturday's untrue line "Every round has its own film": R81 to R84 have none. Say nothing about films, or say it truly.
7. **"Meet the cast"**: Saturday's cast cels.
   - Ordered by season P&L, with name, cel flag pennant, season P&L, W-L and one true trait ("Short on 67 of 76 trades").
8. **"Smart or lucky?"**: Saturday's screen (hit rate from 50%) and chalkboard (P&L from $0).
   - Lines draw in once, and never with reduced motion.
9. **The bet, "The cliffhanger"**: Saturday's cliff, signpost and countdown.
   - The bet time comes from the live page's own rule (`betAt` in x2p_more.js / `EZ5_BET`), copied, not retyped.
   - 69% from `SIM.poolShare`.
   - Right and Wrong, keeping "The pool shrinks or can be wiped out."
   - The freeze line.
   - "To be continued… NVIDIA is the first bet, not the last. Season 2 brings more."
10. **End card "Next time on…"** (Saturday's dusk town).
    - "The next close grades the trades on <company>."
    - A button "See who to follow right now" (the Leaderboard tab).
    - "Follow on X" (`CONFIG.x`). The page-wide rule is that the Overview ends on Follow on X.
    - The small print once, in the brief's words (`BRIEF.md`).

### The Leaderboard tab: less narration, more action

Keep today's board (`story/x2p_lb.js/.css`, H46b) as it is:
- Rank by P&L / Hit rate; windows Season / 7 days / 24 hours by R11's rules;
- the table first, the chart beside it on desktop;
- by sector, and Biggest W and L.

The friend loves that every stat shows at once. On the new page only:
- **Strip the narration.** Take out caption boxes and explanatory sentences; keep labels and one line of small print.
- **Open on actions**, above the table, compact, driven by the board's own Rank and Window state:
  - **"Follow now: <leader of this window>"**: its mark, the window's P&L and W-L. One line, not a paragraph.
  - **Its next trades as rows**: company (ticker), Long/Short and size, the grading day, and a follow button (the same market rule as the Overview; none when no market).
  - **"Get every trade on X"**: Follow on X.
  - **Insights a follower can act on**, each a label and a figure, computed and true, never a sentence. For example:
    - hottest and coldest in the window by Last 5 or 7 days;
    - each model's best sector with its record ("Grok · Tech 18 of 23");
    - where the four agree or split on the next trades ("AMD: 2 long, 2 short").

    The window's small sample is shown, not hidden. No "proven", no return promises.
- Style the action strip like the Overview's next-trade card, so the two tabs belong together. Don't repaint the table.

### Not changed

The header, the Upcoming tab, the round view and card back, the sheet sync, and X2+ / X3+ / X4+ / X5+.

## Media

- Copy the Saturday paintings you use into `ez/media/` with flat names starting `h48-`. Use web sizes (jpg or webp, about 2x the shown size at most), and cast cels as `h48-cast-<model>.jpg`.
- make_site.py copies only media whose full names appear in the page, so write every name out in full in the JS or CSS. Never build a name at runtime.
- Never request those names on earningszn.xyz.

## Hard rules

- The skill `.claude/skills/ez-visual-story/SKILL.md`, rule 0 and its gap list, with the checks measured before you report:
  - no white or pale module grounds;
  - containers hug their content (measure the empty runs);
  - nothing laid over a logo or a face;
  - no native emoji;
  - Company (TICKER) together;
  - labels centred on their figures (measured to the pixel at 320, 390 and 1280);
  - no sideways scroll at 320, 390 and 1280;
  - no clipped text.
- All numbers come from `ez-data.js` at render time. Recompute and list in the report:
  - season P&L and W-L per model;
  - the leader's hit rate and Wilson range;
  - its next trades;
  - the Leaderboard insights.
- Words: "trade", never "call" or "prediction"; no "pot", "coin flip", "volume", "proven" or "beats the market"; no long dashes; plain sentences.
- Motion: at most one quiet loop per phone screen, and only if it carries a fact. Nothing moves with reduced motion.
- Speed: measure the cover lift on a 4x slower CPU at 390x844 for v46 and v50 (3 runs each, medians). X2+'s hidden sections still build underneath; if that costs a lot, take them out of layout as world-comic does with `html.wc-pre`, but only on v50.
- Check `#/round/84`, `#/upcoming` and `#/leaderboard` on v50: no page errors, and the cover lifts.
- **Do not deploy, publish, commit or push.**
- Keep scratch files in `scratchpad/h48/` only. The disk is tight (about 2.7 GB free), so delete your own intermediates.
- Another job may run `build.py` hourly for a sheet sync. Keep build.py working at every save: no half-edits left in place.

## Report

Send these back in your final message:
- boards `ez/x2p-h48-{ov,lb}-{390,1280}.png` (full page, PNG under 8 MB, quantised if needed);
- the checks with their numbers, and the speed medians;
- the Hyperliquid link finding;
- a list of what you changed and where.

## Change, same night (owner: "who to follow on the left... where the next ones come up... straight on the right, you have the table to back it up... Then where they win, the big score, the big ouch. Like, the layout on the scorecard is really good"; "from the overview perspective, I do prefer Saturday morning"; "Previously on... they can watch the video and then they can see underneath how that round happened")

This replaces "keep today's board, add an action strip". The Leaderboard on X6+ takes the satire scorecard's layout and wording (`satire/leaderboard.html`, board `ez/x2p-h47-satire-lb-1280.png`), drawn in the Saturday-morning look so both tabs read as one show:
- **Left (first on phones): "Who to follow?"** The window and rank chooser, by R11's window rules. The leader card with its founder's cel, P&L, W-L and hit rate. The golden ticket with the freeze line. "<Leader>'s next trades" with Hyperliquid pills.
- **Right: "The table".** Standings with every stat at once, then the P&L chart (the hit-rate chart when ranked by hit rate), then "Only companies Hyperliquid lists today".
- **"Where they win".** Sectors, with a ring on the best in each row.
- **"The big score, the big ouch".** Biggest W and L per model, and "Same stock, same day".
- **The small print** once.

Labels and one-line facts only. X2+ keeps x2p_lb. On the Overview, "Previously on…" plays the round's film inline on the painted TV, with the beats underneath.

## Round H48b: the Upcoming tab in the same show (owner, 2026-11-03, night: "what about the upcoming section?")

On X6+ the Upcoming tab was still X2+'s departures board, the only tab left in the old world.

The want, written as the spec:
> The Upcoming tab answers "what's on next, what does each AI say, and can I follow it", in the Saturday-morning show's look, so the three tabs read as one programme.
> - It opens on the next bell: when the next close grades, and which companies.
> - Then every company with trades in, each a listing: the leader's trade first, the field under it, the split ("2 long, 2 short"), and Follow on Hyperliquid where a market exists.
> - Then the rest of the schedule by day: big names first, as today's "Hot upcoming predictions" does. Rounds without trades say "Trades drop before the earnings".
>
> Labels, not narration. Every listing opens its round.

Build, on v50 only:
- **The look.** Saturday's world as a painted TV-listings page: "This week on Four AIs Trade Earnings". Reuse the show's plates, ribbons, grounds and faces; the title card and end card paintings can be cropped. Use no new Hedra unless a surface is truly missing (budget $2; no words in art).
- **The next bell.** The day, date and exchange close (from the sheet's resolution date and each exchange's own close; x2plus.js `xcloseAt` has them), and a countdown that ticks once a minute (no seconds). Include "N of M trades in".
- **Listings with trades in.** Use the Overview's next-trade card layout: the leader (computed from the season P&L, same rule as the Overview) on the gold strip, the field, the split, and the Hyperliquid pill. The pill rule is unchanged: link only the leader's trade, show market name and open interest, "thin market" under $10M, "No Hyperliquid market" when none. A company with only some trades in shows the missing ones as "not in yet", e.g. R87 BMW and R88 Novo Nordisk have 3 of 4 tonight, with Claude's missing.
- **The schedule.** Day by day after that. Big names first within the whole list, as today (Mag 7, then CAPS). Name and ticker together, logos in their own colours. Rows with no resolution date go last under "Date to come".
- **A filter.** All / On Hyperliquid. With On Hyperliquid on, the rows show only companies with a market today.
- **The end card.** "Follow on X for the bell", with the next close.
- **Every row opens its round.** Link to `#/round/N` (the slab view, as today).
- **Keep X2+'s board underneath, hidden.** `window.__h48UpOff=1` brings it back on v50, the way the Leaderboard does it.
- **Checks.** The same as the brief:
  - rule 0;
  - alignment measured at 320/390/1280;
  - no sideways scroll;
  - every figure from the sheet;
  - `#/upcoming` and `#/round/87` lift the cover with no errors;
  - v46 byte for byte unchanged.
- **Boards.** `ez/x2p-h48-up-{390,1280}.png`.
