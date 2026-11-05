<!-- Research for the owner, 5 Nov 2026 (a helper's report). Builds on x-marketing-research.md; does not repeat it. -->
# A chart video per round on X: what the evidence says (5 Nov 2026)

Grades: **[Code]** read in a local copy of xai-org/x-algorithm (commit 5ed79637, 28 Oct 2026); **[Measured]** data or a study; **[Reported]** credible article or docs; **[Opinion]**. I could not open x.com, so nothing below was checked on a live post.

## 1. Chart posts that work, and what they share

- **Alpha Arena** (Oct to Nov 2025): one account-value line per AI, real money, "Who's your money on?". The spikes came from events: launch, finale, a famous loser ([Reported], earlier file). Each model's logo sat at the tip of its line: my recollection, unsourced.
- **One number as the headline.** Kobeissi: "BREAKING:" plus ticker plus one figure; top posts at about 21M to 26M views (superx tracker, undated). Polymarket: one odds line ("30% chance"); 1.59M followers, 0.34% engagement (socialpruf) [Reported].
- **PnL cards** (Hyperliquid Share P&L, Crypto.com Live P&L banner): one big green or red % [Reported, docs; no engagement data].
- **Race videos.** "Data is beautiful" grew from about 6K to 870K subscribers in four months on bar-chart races; people "watch to the end to see the final ranking" (OMR, 21 Nov 2019) [Reported]. Animations are read less accurately than static charts but enjoyed more (2008 InfoVis study, via Built In, 13 Nov 2020) [Measured, old].
- **Earnings-reaction accounts** (StockMKTNewz, Stocktwits, Benzinga): no format data found. **Thin.**
- **What they share** [Opinion]: named contestants, one number, a real stake, and an open question that a ranking reveal settles.

## 2. X video mechanics

- **Ranking** [Code]:
  - Video-quality-view weight 0 by default, and only videos **longer than 10,000 ms** are eligible (viewers under 10K followers). The disabled RL scorer uses the same 10 s gate at weight 1.0. Dwell 0.05, continuous dwell 0.006, video open 0.02 (the 5 Nov read of commit 021afa44 had video open at 0; defaults move).
  - Watching earns little today; over 10 s is a free hedge. Likes in the first ~200 impressions still decide cold start (earlier file).
- **Aspect ratio:**
  - Nikita Bier (X's head of product, Feb 2026) said portrait is ideal and that "cropping the video incentivized people to post square videos. We are a mobile company." The new iOS player opens full screen on a tap and swipes up to the next video. X said it would stop cropping vertical video (TechCrunch, 18 Feb 2026) [Reported].
  - X ad help: 1:1, 16:9, 9:16; vertical under 15 s recommended (search snapshot, undated). Kapwing (4 Feb 2026): 16:9 uncropped in the feed but small in the video tab; free accounts 720p, Premium 1080p [Reported].
  - **No measured timeline sizes found.**
- **Autoplay** is muted; users can set Wi-Fi only or never, and Data Saver stops it (guides citing X Help). A view = 2 s at 50% on screen (Digiday) [Reported].
- **Thumbnail:** the first frame; custom ones only via Media Studio for subscribers (one undated source) [Reported].
- **Length:** completion falls with length on short-video platforms (Kuaishou duration-bias papers, 2022 to 2023) [Measured, not X].
- **Image vs video:** Ordinal (87,528 posts, Jan 2024 to May 2026): video 0.53% engagement vs images 0.99%, but 30,684 vs 13,053 average impressions [Measured; confounded by account size, and Ordinal's pages disagree]. Buffer 2026 (secondhand): text plus image best on X, video average. Nothing finance-specific.

## 3. Suspense and the reveal

- **Suspense keeps viewers.**
  - CS:GO on Twitch (Simonov, Ursu & Zheng, JMR 2023): suspense explains 9.2% of viewership's evolution; surprise had no detectable effect on joining.
  - Wimbledon (Bizzozero, Flepp & Franck, JEBO 2016) and the Premier League (Buraimo et al., 2020): both lift audiences, more so late.
  - [Measured, live broadcasts, not 15 s clips.]
- **Reveal gradually.** In theory, suspense is maximised when uncertainty shrinks step by step, not in one jump (Ely, Frankel & Kamenica, JPE 2015) [Measured, theory].
- **Predicting first:** fans who predicted before watching highlights reported more curiosity and flow, incl. a compete-against-AI condition (Jang et al., IJHCI 2025) [Measured, self-report].
- **Countdowns:** I found no direct evidence. **Evidence is thin.**

## 4. Design implications for a 10 to 20 s generated video

1. **Ratio 4:5, 1080×1350, posted from the Premium account** (1080p).
   - Taller than square on phones, near X's portrait preference, fine on desktop. Keep the chart inside the central square in case a surface crops; test 9:16 later.
2. **12 to 16 s, never 10 s or less** (the code's 10 s gate). The result should land by about 11 s, and the end frame should hold for 3 s.
3. **Frame 1 is a complete still** (autoplay off, poster): $TICKER and logo, "4 AIs. 1 earnings print.", the price into the report, four labelled target lines, no result. It must earn likes as a picture.
4. **The AIs live on the chart.**
   - Logo and call ("▲ +6%") at the end of each target line, in the site's model colours.
   - As candles run, a "closest now" tag jumps when price crosses a line: the surprise beats.
5. **Keep the countdown short:** "Earnings in 3, 2, 1" in 1.5 s or less, then the gap candle at the open (or after hours), then about 6 s of candles to the close. Uncertainty should shrink step by step, not cut straight to the answer.
6. **One number at the bell.**
   - The move ("−3.31%") is the largest thing on screen; then PASS/FAIL per line, the winner's line gold and crowned; then P&L on $100K per AI.
   - The close must match the sheet's move; flag any gap over 0.05%.
7. **Type for a muted phone.**
   - A timeline video shows about 310 to 330 pt wide [Opinion, estimated from the app's layout]: smallest text 40 px or more (about 12 pt) at 1080 wide, key numbers 100 px or more.
   - At most about 8 words per frame, high contrast, no voice.
8. **End frame:** the result, the standings change ("Grok takes #1"), what's next ("Next: $NVDA · Nov 17 · @earningszn"). If it loops, frame 1 still follows.
9. **Post text:**
   - Cashtag, no spoiler ("4 AIs locked $HOOD before the print. One landed within 0.11%."), one honest question on the next round ("Next up $NVDA. Who are you taking?"), "Paper, $100K per call. Not advice."
   - Never "watch till the end". Quote the round's Locked post (earlier file).
10. **Measure for two weeks:** alternate the video with a static end-frame image; compare first-2-hour impressions, likes and replies per 1K, follows, and completion. The evidence does not settle video vs image here.

## Sources (read 5 Nov 2026)

**X**
- techcrunch.com/2026/02/18/x-continues-to-bet-on-vertical-video-with-its-latest-update
- dataconomy.com (19 Feb 2026)
- kapwing.com/resources/how-to-post-videos-on-x-in-2025-vertical-video-tab (4 Feb 2026)
- help.x.com/en/business-and-advertising/creative-ad-specifications (search snapshot)
- itechguides.com and techloy.com (autoplay)
- digiday.com/media/youtube-facebook-platforms-count-video-views
- leon-animations.squarespace.com (thumbnails)

**Formats**
- tryordinal.com/blog/twitter-analytics
- tryordinal.com/blog/twitter-x-engagement-data-study
- socialecho.net (Buffer 2026 summary)
- superx.so/creators/KobeissiLetter
- socialpruf.com/x/polymarket
- hyperliquidguide.pages.dev
- crypto.com/product-news
- omr.com/de/daily/datenvisualisierung-youtube-millionen-views
- builtin.com/articles/bar-chart-races

**Studies**
- Simonov, Ursu & Zheng, JMR 2023 (CEPR DP17353)
- Bizzozero, Flepp & Franck, JEBO 130 (2016)
- Buraimo et al., Economic Inquiry 58(2) (2020)
- Ely, Frankel & Kamenica, JPE 123(1) (2015)
- Jang et al., IJHCI 41(1) (2025)
- arXiv 2206.06003 and 2308.14276 (duration bias)

**Code**
- xai-org/x-algorithm, commit 5ed79637: `home-mixer/params/param.rs`, `home-mixer/util/candidates_util.rs`, `phoenix/xrex/models/page_rl.py`
