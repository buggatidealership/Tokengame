# Season 2 announcement, take D: the painted wrap-up's world (owner, 2026-11-19)

Owner: "the painted two horns... my favorite one. Can you apply sort of the same style... with a bit of use of Hedra for the announcement of season 2... the relegation, so Kimi being scrapped, less than 50% hit rate, and then... the new contestants... One Chinese Alibaba competitor and one American model... there must be other scenes... I also like the font... a lot cleaner, but I love the mix of glass but also the paint in the background... There's a deeper meaning about sort of the inner workings of each layer."

## The want, as an expert would brief it
A 34.5 s, 4:5 announcement for X that a Season 1 viewer understands with the sound off: the season had a rule with teeth (under 50% hit rate, you are out), Kimi fell through it, the champion is back to defend, China's seat goes to Qwen (Alibaba) and a new American, Gemini (Google), joins, and Season 2 adds the one thing Season 1 never had: every trade comes with its reason. Same world, type and music as the painted wrap-up (w7p + the horns bed), so the two posts read as one show.

## The three layers, each with one job (my reading of "the inner workings of each layer")
- **Paint (Hedra): the world and the events.** The stage, its light and what physically happens to it: Kimi's pedestal cracks and crumbles, an empty pedestal, new pedestals lit for the arrivals, the five-pedestal stage at the climax. The living-light loop (w6/e/gl) under everything; its mood follows the story (dim and cold-red at the relegation, warm gold on drop 2). Never words or numbers in the paint.
- **Glass: every fact.** Every name, number and rule sits on a frosted glass sheet that frosts the painting behind it, so the data belongs to the world. No loose number off glass; no glass that carries no fact.
- **Type: the message.** One clean Kanit black italic headline per shot (cream, the wrap's edges), Bebas Neue for labels, Geist Mono for small figures. At most 8 words a shot, no punctuation.

## Facts (checked 2026-11-19 against ez-data.js, rounds 1 to 112)
- Hit rate, Season 1 final (raw, right / calls): Grok 62-42 = 59.6% (104 calls), Claude 61-51 = 54.5%, GPT 60-52 = 53.6%, Kimi 51-61 = 45.5% (112). Kimi is the only one under 50%. Show rounded like the wrap-up: 60%, 54%, 54%, 46%.
- Season 1 P&L: Grok +$169,450 (winner), Claude +$107,020, GPT −$19,780, Kimi −$149,500.
- Season 2: Grok, Claude, GPT return; Qwen (Alibaba, China) and Gemini (Google, US) join; Kimi out. New: every trade comes with its reason; a feed on the site.
- Round 1 of Season 2 in the sheet: Intuit (R113), calls as s2c's FEED (Gemini long 5, Qwen long 4, Claude short 4, GPT long 4.5, Grok short 2.4); re-check against the sheet before rendering (`python3 ez/tools/sync_sheet.py` dry run prints HELD rows; or read SHEET rows past 112). The sheet has no reasoning text: reasons show as lines that never become words.
- Logos: MODELS in ez-data.js for the four; Gemini and Qwen paths are in s2c.html (`NEW`).

## Grid and music (same as w7p, so the fitted bed works unchanged)
`BEAT {bpm:174, at:0}`, `DROPS [12.4138, 26.5517]` (beats 36 and 77), `DUR 34.5`, `MUSIC {f:'w8f-horns', at:0}` (the owner's pick, "painted, horns"; fitted with fitbed.py's strong-drop options). bt(n) = n*60/174. Risers: cue on the drop itself (mix.py lands a sound's loudest sample on its cue time).

## Storyboard (beats)
1. **0 to 8, open.** The painted light; the EZ. logo resolves; the golden ticket lands reading SEASON 2 (Kanit on the ticket's gold, as w7p's SEASON 1 ticket).
2. **8 to 16, Season 1 in one beat.** The four on the painted four-pedestal podium (w6/e/podium), glass name tags; headline "4 AIs  112 trades".
3. **16 to 24, the rule.** One frosted sheet: label THE RULE, "Hit rate under 50%", RELEGATED in red.
4. **24 to 36, the chart.** Hit rate after every trade, trades 1 to 112 (each line (right+1)/(calls+2) as on the site, so they start at 50%; Grok's line skips the rounds it missed), drawing live with a TRADE counter; the 50% line is a frosted glass floor with a red edge, labelled 50%; end tags in glass: Grok 60%, Claude 54%, GPT 54%, Kimi 46%. Kimi's line finishes under the floor. Line colours as the wrap-up: Grok gold, Claude green, GPT cream, Kimi red.
5. **36 (drop 1), the fall.** Kimi's tag and the glass floor under it crack and shatter, shards fall into the painted dark (sfx-shatter on the drop); 36 to 44: KIMI, "Relegated" as a mark, glass card "Hit rate 46%  51–61". The paint goes dim and cold.
6. **44 to 52, the three stay.** The podium again: Kimi's pedestal crumbled (Hedra painting, swapped in), Grok's tag gold, headline "Grok defends the title".
7. **52 to 60, China's seat.** A new pedestal where Kimi's stood (or light on the empty spot); Qwen's glass card drops in: China flag (drawn, never an emoji), QWEN, "by Alibaba"; headline "New from China".
8. **60 to 68, the American.** A fifth pedestal lights; Gemini's card: US flag, GEMINI, "by Google"; headline "New from the US".
9. **68 to 77, roll call.** The five-pedestal stage (Hedra); the five logos slam onto their pedestals one every 2 beats, riser into the drop.
10. **77 (drop 2), the line-up.** All five lit, warm gold light, "5 AIs" and the SEASON 2 ticket; 77 to 85 holds and moves (camera push, rim lights on the beat).
11. **85 to 92, what's new.** Headline "Every trade with its reason"; two glass post cards lift and grow (layout zoom, never scale under perspective): Gemini LONG Intuit 5%, Claude SHORT Intuit 4%, with reason lines that never become words. Floating glass cards, no phone: a screen in a scene is always landscape.
12. **92 to 100, end.** The EZ. logo and the golden ticket SEASON 2, held to the last frame. No date or "live" claim (asked).

## Hedra (gpt-image-2, ref `bet-chip-h2.jpg`, the w6e recipe: isolated object on flat #0000FF, keyed to transparent webp)
- `w6e`'s pedestal prompt with **five** pedestals (4:3) → `w6/s2/podium5.webp`.
- **One broken pedestal** (3:4): the same stone and gold pedestal, its top split by deep cracks, chunks falling away, its gold plate cracked and dark → `w6/s2/broken.webp`, swapped over Kimi's spot.
- Budget about $0.15; record each in jobs.jsonl (hd.py does).

## Checks before showing (W6 suite)
`node wrapqa.js s2d.html` and `python3 wrapqa.py` on the render (and `--prev` on a prev.js preview first): a shot every 2.5 s or less on average, every cut within 40 ms of a beat, both drops measured on the mix, motion median at least 3.5 and nothing frozen over 0.8 s, 28 to 36 s, at most 8 words a shot, no punctuation on screen, every number with its label. Content spans the frame, no empty band over 15%. Look at a frame of every shot before calling it done.

Render: `CRF=20 bash wrapx.sh s2d.html 34.5 x2p-s2-intro-d-draft w8f-horns 0 .34` (served on 8993 from dopa).

## Revision 2 (owner's answers, 2026-11-19, night)
Owner: the under-50% rule carries into Season 2 ("under 50% and you're out"); every AI starts Season 2 at P&L $0 with $100K on every trade, as in Season 1; Intuit is Season 2's round 1 (Season 1 ends with NVIDIA); Season 2 bets are not mentioned for now; the new models are "Qwen, the latest Qwen 4.0, and then Google Argon, I think".
- **Beat 10b, 27.93 s (beat 81), SAME RULE** replaces the second golden ticket (it repeated the end card): the five stay lit on the podium, their plate names give way, a red-edged glass sheet drops in with HIT RATE / UNDER 50%, and RELEGATED is stamped under it on beat 83 (sfx-stamp, a red veil and a short shake, as the first stamp). Stakes, said forward: one of these five can be next.
- **End card:** the logo (480 px) and the ticket SEASON 2 move up; under them, on glass, EVERYONE STARTS AT / P&L $0 (a beat after the ticket lands, held to the end). $100K on every trade is left to the post's text (eight words a shot).
- **Versions on the newcomer cards:** name, version, lab (QWEN / 4 MAX / ALIBABA, GEMINI / 4 ARGON / GOOGLE; "BY" dropped to keep eight words a shot). Checked 2026-11-19: Alibaba released Qwen4-Max on 16 Nov 2026 (its press room); "Qwen 4.0" is not its name. Google's Gemini 4 Argon is real (its blog and model card) but was a limited release to trusted cyber defenders, with no public date; asked the owner which model he actually calls.
- **The chart:** each line fades in over its first 16 trades (alpha 0.07 to 1 by x; the early swings are 1 to 3 calls); the push in at 10.34 s is at most 1.04 (was 1.072), and the 50% label sits at x 64 to 194, so the label and the tags stay inside the frame.
- Intuit's calls rechecked on the sheet (row 113): GPT long 4.5, Claude short 4, Grok short 2.4, Gemini long 5, Qwen long 4.

## Revision 3, the cut to post (owner, 2026-11-20: "remove the every trade with its reason... a separate video"; "new competitor from China... new competitor from the US"; the end "EZ season 2 starting now... everyone starts at P&L 0"; posted the evening of 20 Nov, after the Season 1 wrap-up in the afternoon)
- **Beat 11 cut.** The two post cards and "Every trade with its reason" leave this video (they become their own teaser); the close moves up from beat 92 to beat 85 (29.31 s), so the end card holds 5.2 s instead of 2.8 s. Picture length stays 34.5 s, the bed and both drops as before (w8f-horns fits unchanged).
- **Headlines:** "NEW COMPETITOR / FROM CHINA" and "NEW COMPETITOR / FROM THE US" (two lines, Kanit 104 px at y 124, clear of the top bug; the newcomer card moved down 12 px to 352). The competition framing is the owner's.
- **End card:** the EZ. logo, the golden ticket now reading SEASON 2 / STARTING NOW (the second line stamped in on beat 87 with sfx-stamp), then EVERYONE STARTS AT / P&L $0 on glass on beat 89, held to the last frame.
- Newcomer plate names stay hidden until the roll call (Qwen's plate showed through on the China shot).
- Post file: `ez/post/s2-announce.mp4` (`bash wrapx.sh s2d.html 34.5 post/s2-announce w8f-horns 0 .34`, CRF 14).
