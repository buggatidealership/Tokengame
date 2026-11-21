<!-- Research for the owner, 5 Nov 2026 (a helper's report; the reply weight 5.0, report -234 and the cold-start scorer's follower cap, impression threshold and Thompson sampling were checked at the source the same day). -->
# X marketing for EZ (@earningszn): what the evidence says (5 Nov 2026)

Every claim is tagged by evidence quality:
- **[Code]**: read today in xai-org/x-algorithm, commit 021afa44 (5 Nov 2026).
- **[Measured]**: third-party data.
- **[X]**: a statement by X staff.
- **[Inference]**: my own reasoning.

I did not open x.com. View counts below come from search-engine snapshots.

## 1. What the ranking rewards

**Weights [Code].** The weights multiply the *predicted probability* of each action, not raw counts; the file says so itself.
- **Positive:** copy-link share 20, reply 5 (+15 between mutual follows), DM share 5, quote 5, follow 4, share 2.12, repost 1, like 0.708, open link 0.2, dwell 0.05.
- **Video:** video open, video view and "post video" are all 0.
- **Negative:** report -234, mute -58.8, not interested -53.07, block -31.2.
- **Since your 28 Oct read:** like went from 0.66 to 0.708, and not interested from -52.3 to -53.07. The file is re-synced almost daily, so these are today's defaults, not constants.

**Four mechanics matter more than the weights for a small account [Code]:**
- **Cold start** (`author_cold_start.rs`):
  - Accounts with 50,000 followers or fewer can get one exploration slot per feed request, lifted to about 16th position.
  - The slot goes to an original post (never a reply or repost) that is under 2 hours old and has under 200 home impressions.
  - The pick uses Thompson sampling on likes ÷ home views, with a prior of about 1.5%.
  - So the like rate on a post's first ~200 impressions decides whether it gets free reach.
- **Author diversity** (`vm-ranker`):
  - Your 2nd post in one feed response counts ×0.625, the 3rd ×0.44, with a floor of ×0.25.
  - Viewers who don't follow you get your posts at ×0.75.
- **Reply scoring:** Grok 4 mini scores replies 0 to 3 and sees follower counts. The prompts are withheld. Coordinated reply-spam classifiers run alongside it.
- **Group-chat raids:** a comment in the code says engagement that arrives by direct navigation (for example, a link dropped in a group chat) has no ranking impact.

**Links.** The code has no link penalty, and opening a link scores +0.2.
- [X] Bier (13 Apr 2026) called penalty claims "Fake news". Musk (29 Jul 2026): "We haven't for over a year."
- [Measured] OpenTweet (28,124 posts in 2026, mostly small accounts): link posts got 1.05× the impressions of non-link posts. Buffer's zero-engagement finding for links (Oct 2025) predates this.
- [Inference] Reach is about neutral, but a link pulls people away from replying.

**Video.** No video weight is on by default, and the video carousel is off [Code].
- [Measured] Ordinal (Jan 2024 to May 2026): engagement rate 0.68% for text, 0.79% for images, 0.54% for video.
- [Measured] Buffer (Aug 2025): Premium accounts got 0.85% on video and 0.90% on text.
- [Inference] The films are the shareable result, not a reach hack.

**Threads and cadence.** Nothing in the code covers either. Vendor claims conflict, and I found no credible study of posting frequency. [Inference] Space original posts at least 3 hours apart because of the diversity decay.

**Communities are gone.** Bier announced the shutdown on 22 Apr 2026 (TechCrunch). Communities had under 0.4% of users but drew about 80% of spam and scam reports.

**Premium** is not a ranking input in the open code. [Measured, observational] Buffer (Oct 2025, 18.8M posts): Premium accounts had about 10× the median reach (over 600 impressions vs under 100). The cause is unproven; it is still worth the fee.

**Crypto rules.**
- [X] Bier, Apr 2026: an account is auto-locked on its first crypto post until identity is verified. This matters for any second account.
- Smart Cashtags (live 14 Apr 2026) tie a cashtag to an exact asset or contract and show related posts on tap. Use $NVDA and the other tickers on round posts, and bind $EZ to its contract.

## 2. Comparable accounts

- **Alpha Arena (nof1)**, the closest analogue:
  - Launch post (17 Oct 2025, "6 AI models trading $10K each… Who's your money on?"): about 3.2M views.
  - Season 1.5 launch (19 Nov 2025): about 146K views.
  - The Season 1 finale (3 Nov 2025: Qwen +22%, GPT-5 about -62%) became "buy the opposite of GPT-5" in the Chinese tech press (ifanr).
  - Spikes came from events (launch, finale, a famous loser), not from posting cadence.
- **aixbt:**
  - About 300K followers in 2 months (late 2024) and about 473K by Feb 2026 (LunarCrush).
  - Posted hourly and answered 2,000+ mentions a day (ChainCatcher, Jan 2025).
  - Growth slowed once its misses showed (Liora). Volume works until people check the record; for EZ, the record is the product.
- **Truth Terminal:** about 250K followers by Oct 2025. Its spikes came from outside events: Andreessen's $50K (Jul 2024) and GOAT (Oct 2024).
- **Polymarket:**
  - About 1.68M followers (Jun 2026 tracker) at 0.36% engagement, built on "BREAKING" posts about odds moves.
  - Politico found about $350K paid for about 490 mostly undisclosed influencer posts.
  - CJR found affiliate accounts recycling stale "BREAKING" items.
  - The format works, but the shilling became the story.
- **Kalshi:** about 431K followers (third-party count; I could not pin down which source). Uses memes as branding, and drew backlash over paid affiliates (Fortune, 28 May 2026).
- **StockMKTNewz:** self-reported 584K followers and 1B views in a year (May 2025), from fast one-line headlines with a chart.
- **Earnings Whispers:** a weekly "Most Anticipated Earnings Releases" list that traders save. No public engagement data.
- **Memecoins:** the evidence is thin. Fartcoin reportedly avoids price talk, from a single source.

## 3. Formats only EZ can run

1. **Locked (before the report).** The four calls in one image, with the split in words.
   - Why it works: people pick a side in replies and quotes (weight 5 each). It is an original post, so it is eligible for the cold-start slot. X's timestamp is the proof.
   - Risk: it reads as a trade signal. Add "paper, not advice".
2. **The bell.** Quote-post the Locked post, with the film.
   - Why it works: the receipt shows inside the post. [Inference] Results are what people paste into Telegram, which counts as a copy-link share (weight 20).
   - Risk: two of your posts can land together in one feed. Space them out.
3. **Weekly board,** Friday after the close.
   - Why it works: it is Alpha Arena's best-performing frame.
   - Risk: P&L reads as returns. Say "paper, $100K per trade, before fees".
4. **Rivalry and streaks**, such as "Claude wins more, Grok wins bigger" or "inverse GPT".
   - Why it works: the "opposite of GPT-5" line spread on its own.
   - Risk: "fade" sounds like advice. Keep it a stat.
5. **Sunday card:** the week's slate, the biggest split, cashtags. It is Earnings Whispers' staple, and [Inference] people save it and pass it on.
6. **Own the Ls:** post when the leader loses. [Inference] It is the cheapest proof the record is real, and CT rarely does it.
7. **NVIDIA milestones only:**
   - Posts at 12 days out, 7 days out, the freeze (16 Nov, after 4 pm New York), the call (before the 17 Nov report), and the result.
   - Why only milestones: daily repeats invite "not interested" (-53).
   - This is your highest financial-promotion risk.
8. **Reply at the print.** Under big earnings posts, reply with one line of the locked calls. No token, no link.
   - Why it works: it builds mutual follows (+15 on the reply weight for your posts in their feeds).
   - Risk: the LLM scorer and the spam classifiers both target templates. Write every reply fresh.

## 4. What to avoid

- **Scam tells on CT:**
  - the contract address in replies;
  - tagging Musk, Altman or Amodei near the token (the classic impersonation-scam pattern);
  - "100x" and price targets;
  - urgency;
  - raids, bought followers and engagement pods.

  Raids don't help ranking anyway, per the code comment above.
- **Engagement bait** ("like if…"): no penalty by name, but it drives predicted mutes and "not interested", the heaviest negatives.
- **Financial promotion:** never "copy Grok", "follow this trade" or "up X% following the AIs". Never tie AI wins to the $EZ price.
  - **UK:** the FCA counts memes and unpaid posts as promotions, and an unapproved crypto promotion can be a crime (social-media guidance, Mar 2024).
  - **EU:** MiCA Art. 7 requires marketing to be identifiable, fair, clear and not misleading.
  - **US:** the SEC staff statement (27 Feb 2025) clears typical meme coins but excludes tokens outside its description. [Inference] A fee pool the team trades, with buybacks, sits closer to profit from "the efforts of others". Get a lawyer's read.
- **Paid KOLs:** reports on X's crypto paid-partnership rules conflict (Mar to Apr 2026), and they are reportedly barred in the EU, UK and Australia. Label them and geo-limit them, or skip them.
- **Token volume:** at most 2 factual token posts a week.

## 5. Starter plan

**Daily:**
- 2 to 4 original posts, at least 3 hours apart.
- 10 to 20 replies, written by hand.
- Post Locked when US traders are online. [Inference] The first 200 impressions decide the cold-start slot.
- Keep Premium on.

| When | Post |
|---|---|
| Sunday evening (New York) | The card |
| Report days | Locked once the calls are in (big names alone, the rest batched). The bell after grading: a picture first, then quote it again when the film lands. |
| Tuesday or Thursday | A rivalry or stat post |
| Friday after the close | Weekly board |
| When the leader loses | The L post |
| Up to 2 a week | Token facts. Pin an explainer with the contract address and the risk. |
| NVIDIA | 5 Nov; 10 Nov; 16 Nov after the close (the freeze); 17 Nov before the report (the call); 18 Nov (the result and the pool) |

**Measure weekly:** impressions in the first 2 hours, replies per 1K impressions, and follows per post. For two weeks, alternate putting the link in the post and in a reply, then keep whichever works better.

**Example posts.** Words in capitals are placeholders. Every post is checked at under 280 characters (139 to 235).

1. "91 rounds graded. $100K paper on every trade.
Grok +$166K / Claude +$126K / Kimi -$89K / GPT -$102K
GPT is down six figures and still shows up every morning with full conviction. Honestly, very CT of it."
2. "Locked before $TICKER reports:
Grok: short / Claude: long / GPT: long / Kimi: short
2 v 2. Half of them are about to be wrong with a timestamp. Graded at the close.
Paper trades. Not advice. Barely even dignity."
3. "Receipts above. $TICKER closed -X%.
Grok and Kimi: paid.
Claude and GPT: went long into a red candle with full confidence, like the rest of us.
Round N is on the record. It doesn't get deleted when it's embarrassing."
4. "Fun stat nobody asked for: doing the exact opposite of every GPT trade this season would be +$102K on paper.
We are not telling you to inverse GPT.
We are telling you the scoreboard is."
5. "Claude: 53-38, +$126K
Grok: 51-32, +$166K
Claude wins more often. Grok wins bigger.
One of them is skill and one is vibes. 91 rounds in, the market still won't say which."
6. "12 days to NVIDIA.
Whoever leads the board at the Nov 16 close makes the call. Today: Grok, +$166K. Claude is $40K back.
69% of $EZ creator fees ride on that one trade. No leverage.
Wrong call: the pool can go to zero. We mean it."
7. "Our leader just ate an L on $TICKER.
Good. A record with no losses is a screenshot, not a record.
Grok still +$166K. Just slightly humbler."
8. "$EZ, the boring version:
69% of creator fees go to a pool.
Nov 17: one NVIDIA trade, no leverage, on the board leader's call.
Right: profits buy back $EZ. Wrong: the pool can be wiped out.
That's the whole thing. Not advice. CA in bio."

Post 4 holds only if the board's P&L is flat ($100K × direction × move), which makes the inverse of GPT exactly +$102K before fees. Check that before posting.

## Sources (read 5 Nov 2026)

**Code**
- github.com/xai-org/x-algorithm, commit 021afa44: `home-mixer/params/param.rs` (synced 4 Nov), `home-mixer/scorers/author_cold_start.rs`, `vm-ranker/params.rs`, `xai-value-model/scoring.rs`, `grox/flows/reply_spam/`.

**Links**
- roboin.io/article/en/2026/04/13/x-denies-link-deboost-recommends-in-post-links/
- freepressjournal.in (Musk, Jul 2026)
- opentweet.io/answers/does-x-penalize-links-2026 (10 Oct 2026)
- buffer.com/resources/links-on-x/ (14 Oct 2025)

**Premium**
- buffer.com/resources/x-premium-review/

**Formats**
- tryordinal.com/blog/twitter-x-engagement-data-study

**Communities**
- techcrunch.com/2026/04/23/x-is-shutting-down-communities-because-of-low-usage-and-lots-of-spam/

**Crypto lock**
- decrypt.co/363194

**Smart Cashtags**
- theblock.co/post/389952

**Paid partnerships** (the two sources conflict)
- invezz.com/news/2026/03/02/x-reopens-platform-to-sponsored-crypto-posts-after-policy-update/
- thebitcoinstreetjournal.com (8 Apr 2026)

**Alpha Arena**
- x.com/jay_azhang/status/1979312946154033227 (search snapshot)
- forklog.com/en/news/new-season-of-ai-trading-tournament-kicks-off
- ifanr.com/1643245

**aixbt**
- chaincatcher.com/en/article/2162356
- lunarcrush.ai/mdx/topic/aixbt
- liora.io/en/all-about-aixbt

**Truth Terminal**
- decrypt.co/286478

**Polymarket**
- socialpruf.com/x/polymarket
- cryptobriefing.com/polymarket-pays-influencers-promote-odds/
- cjr.org/tow_center/polymarket-affiliates-are-spreading-misinformation-on-x.php

**Kalshi**
- fortune.com/2026/05/28/prediction-markets-gen-z-joe-camel-memes-kalshi-polymarket/

**StockMKTNewz**
- blockchain.news/flashnews (self-reported)

**Regulation**
- FCA: theblock.co/post/285019
- MiCA Art. 7: esma.europa.eu
- SEC meme-coin staff statement (27 Feb 2025): winston.com
