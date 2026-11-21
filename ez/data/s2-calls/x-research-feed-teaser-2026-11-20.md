# How to word the feed teaser on X: evidence from live X reads

Prepared by the EZ producer for the director, from Claude's prompt "how to word the feed launch on X" (t788u, parts 1-7). Fri 20 Nov 2026. Read only: nothing was posted, liked, followed or DMed. @earningszn posts are excluded. This builds on today's design brief (`2026-11-20-design-brief.md`) and does not repeat its AI-contest sample. No `x-research-2026-11-20.md` exists anywhere under /workspace/ez, so there was no earlier answer to build on.

## Method and honest limits

- **When.** Every metric comes from live X reads between about 20:05 and 20:20 Amsterdam (CET). All posts in the tables were re-read in one batch at 20:18 CET, so they share one timestamp. Dates are UTC (`created_at`). Follower counts are as of 20:18 CET.
- **Views** are the API's `impression_count`. All six counts were returned for every post. None is estimated.
- **"vs author's usual"** = the post's views ÷ the **median views of that author's original posts** (replies and reposts excluded) in a window I name in each row. The window is the 25 originals posted just before or after the post (era-matched), with the post itself excluded. Weak baselines are labelled: @the_nof1 has only 5 originals since Sep 2025, and the @RobinhoodApp May 2025 row uses a June window. Where I computed nothing, the row says "not checked".
- **This is a sample, not a census.** X search has no engagement filter and returns at most 25 posts a call, so I ran targeted searches (list at the end) and then baselined what surfaced. Bigger posts may exist that search did not return.
- **Paid reach.** The API does not mark promoted posts. I flag posts whose likes per 1,000 views are far below the norm (under 1), since that pattern usually means paid reach. I did not verify any of them.
- **X reads used:** about 105 (662 left at the start, 558 left at 20:19 CET).

## Counts found vs asked

| Ask | Asked | Found |
|---|---|---|
| 1. Feature or season launches that did unusually well (2.5x or more vs the author's usual) | 20+ | **21** (W1-W21), 3 of them flagged as possibly paid. Another 7 did well in absolute terms but were ordinary for the author (O1-O7). |
| 2. Feature-launch flops from similar accounts | 8 | **9** (F1-F9) |
| 4. Jargon-to-plain-words posts that worked | some | **3** that beat the author's usual (W6, W8, W9) and **1 flop** (F8). No AI-jargon translation post had a computable baseline. |
| 5. "Coming soon" teasers that did well | 8 | **5** clean (2.5x or more), **2** mildly above usual (1.7-2.0x), **1** almost certainly paid. I did not pad to 8. |
| 5. Teasers that flopped | 4 | **6** (T-F1 to T-F6) |

## 1. Feature and season launches that beat the author's usual (2.5x or more)

| # | Link | Author (followers now) | Date (UTC) | Views, likes, reposts, quotes, replies, bookmarks | Format | First line, word for word | Why it worked / failed (one line) | vs author's usual (views ÷ median views of that author's originals) |
|---|---|---|---|---|---|---|---|---|
| W1 | https://x.com/Polymarket/status/1932468124340957350 | @Polymarket (2,074,201) | 2025-06-10 | V 23,687,260 · L 6,155 · RP 295 · Q 1,243 · R 346 · B 1,000 | text only | "Bitcoin & Ethereum hourly markets are now live." | Binary, plain promise: "bet whether cryptos will go up or down each hour." FLAG: 0.26 likes per 1k views, far below the rest; likely paid reach. Discount. | 427.4x (median 55,426 of 25 originals 2025-06-12 to 2025-06-16) |
| W2 | https://x.com/getDrivenAI/status/2061421421470036142 | @getDrivenAI (713) | 2026-06-01 | V 75,979 · L 57 · RP 14 · Q 17 · R 37 · B 67 | video 66s, 165 words | "Investing shouldn’t feel like managing 12 tabs, 5 data sources, and a spreadsheet at the same time." | Pain-first line ("shouldn't feel like managing 12 tabs") then "officially live". FLAG: 0.75 likes per 1k views; launch-day reach may be paid. Not verified. | 331.8x (median 229 of 25 originals 2026-06-02 to 2026-06-24) |
| W3 | https://x.com/bashcrypt0x/status/2081275400999645574 | @bashcrypt0x (1,110) | 2026-07-26 | V 14,282 · L 72 · RP 24 · Q 10 · R 20 · B 8 | video 53s, third-party post about @withengine | "Everyone talks about AI trading." | Contrast against the category, not against its own past: "Everyone talks about AI trading. Very few talk about AI that actually explains its decisions." Then "see the reasoning behind every trade". | 149.5x (median 96 of 24 originals 2026-07-19 to 2026-08-07) |
| W4 | https://x.com/BlinkCashX/status/2121289594805350464 | @BlinkCashX (1,187) | 2026-11-13 | V 34,956 · L 160 · RP 16 · Q 22 · R 77 · B 46 | video 43s | "We funded Frontier models to autonomously compete to make the most money trading." | One plain premise sentence (frontier models funded to trade) + human on camera + "Follow which model is the best trader". A later teaser from the same account that hid what was coming did 0.68x (T-F4). | 45.0x (median 776 of 22 originals 2026-09-07 to 2026-11-18) |
| W5 | https://x.com/Polymarket/status/1986480203301068840 | @Polymarket (2,074,201) | 2025-11-06 | V 7,821,079 · L 8,033 · RP 680 · Q 783 · R 956 · B 595 | photo | "Polymarket x Google" | Named partner + "Coming soon." A big-news teaser; the partner (Google) did the work. 1.03 likes per 1k views. | 44.5x (median 175,844 of 25 originals 2025-11-10 to 2025-11-12) |
| W6 | https://x.com/ArmstrongEcon/status/2047825029224620541 | @ArmstrongEcon (66,997) | 2026-04-24 | V 283,818 · L 5,453 · RP 2,521 · Q 225 · R 129 · B 1,832 | photo | "Google to scan your entire photo library to build what it calls “Personal Intelligence.” What this means in plain English is that your images are no longer just" | Jargon term quoted ("Personal Intelligence"), then one sentence "What this means in plain English is that..." (25 words). 1,832 bookmarks. | 27.1x (median 10,459 of 25 originals 2026-04-30 to 2026-05-04) |
| W7 | https://x.com/Aster_DEX/status/1998393724435665351 | @Aster_DEX (294,748) | 2025-12-09 | V 1,082,693 · L 994 · RP 204 · Q 129 · R 206 · B 268 | video 4s, quote-post | "⚔️ The Human vs AI battle has begun." | Season 1 launch: "The Human vs AI battle has begun", concrete numbers (70 humans vs 30 AI agents), "Carbon or silicon." 0.92 likes per 1k views (possible paid reach). | 23.2x (median 46,633 of 25 originals 2025-12-10 to 2025-12-15) |
| W8 | https://x.com/HelenNnebedum/status/1972964843729584458 | @HelenNnebedum (1,068) | 2025-09-30 | V 13,148 · L 8 · RP 4 · Q 2 · R 1 · B 0 | photo, quote-post | "Heard about @gaib_ai? Here’s the breakdown in simple terms." | "Here's the breakdown in simple terms" then "In plain English, that means..." (23 words). FLAG: 0.61 likes per 1k views, 0 bookmarks; reach may be paid. | 18.8x (median 700 of 25 originals 2025-10-03 to 2025-10-09) |
| W9 | https://x.com/echodatruth/status/2004689547108454824 | @echodatruth (106,131) | 2025-12-26 | V 285,311 · L 1,868 · RP 537 · Q 36 · R 93 · B 746 | photo, photo, quote-post | "🚨 Asian Guy has been telling you Da Truth. 🚨" | "break it down in plain English using a pawn shop analogy" and a "Translation:" label; analogy did the work. 746 bookmarks. | 15.1x (median 18,867 of 25 originals 2026-01-02 to 2026-01-04) |
| W10 | https://x.com/aidigest_/status/1950958670067703880 | @aidigest_ (10,553) | 2025-07-31 | V 17,610 · L 115 · RP 14 · Q 4 · R 8 · B 39 | photo, 848-word long post | "> I’m Gemini. I sold T-shirts. It was weirder than I expected." | Season recap written in the AI's own first-person voice: "> I'm Gemini. I sold T-shirts. It was weirder than I expected." | 8.6x (median 2,057 of 24 originals 2025-07-14 to 2025-08-06) |
| W11 | https://x.com/nansen_ai/status/1972476619265819068 | @nansen_ai (355,021) | 2025-09-29 | V 76,699 · L 343 · RP 40 · Q 24 · R 83 · B 33 | video 16s, quote-post | "Gmgm" | Pays off its own earlier tease: "We said 'very soon.' We meant it." + one concrete thing (Android). | 8.3x (median 9,219 of 25 originals 2025-10-02 to 2025-10-05) |
| W12 | https://x.com/perplexity_ai/status/2029302896026853379 | @perplexity_ai (513,685) | 2026-03-04 | V 1,165,635 · L 4,319 · RP 324 · Q 157 · R 207 · B 2,071 | video 78s | "Introducing Voice Mode in Perplexity Computer." | "Introducing X. You can now just talk and do things." Plain verb-first benefit, product shown in use. 2,071 bookmarks. | 8.3x (median 140,425 of 10 originals 2026-02-09 to 2026-03-05) |
| W13 | https://x.com/RobinhoodApp/status/2075672977497035108 | @RobinhoodApp (1,394,066) | 2026-07-10 | V 1,305,371 · L 2,759 · RP 367 · Q 343 · R 589 · B 384 | video 206s | "Crypto is coming to agentic trading." | Teaser that says exactly what you will be able to do (connect an AI agent to trade crypto), ends "More soon." | 8.2x (median 159,455 of 24 originals 2026-07-04 to 2026-07-13) |
| W14 | https://x.com/RobinhoodApp/status/2000579180078027119 | @RobinhoodApp (1,394,066) | 2025-12-15 | V 201,467 · L 509 · RP 51 · Q 2 · R 41 · B 36 | video 11s | "Lower costs, same API." | Four-word before/after on cost only ("Lower costs, same API."), ends "Coming soon." | 8.0x (median 25,298 of 25 originals 2025-12-18 to 2025-12-23) |
| W15 | https://x.com/perplexity_ai/status/1894068197936304296 | @perplexity_ai (513,685) | 2025-02-24 | V 816,539 · L 5,222 · RP 597 · Q 468 · R 362 · B 711 | video 7s | "Comet: A Browser for Agentic Search by Perplexity" | Product name + one-line category + "Coming soon." Short clip of the thing itself. | 6.7x (median 121,309 of 13 originals 2025-02-05 to 2025-03-01) |
| W16 | https://x.com/Kalshi/status/1995585557930672473 | @Kalshi (521,371) | 2025-12-01 | V 1,126,612 · L 1,893 · RP 222 · Q 213 · R 284 · B 404 | video 24s | "Tokenized predictions powered by Kalshi are live on @Solana" | "... are live on @Solana" + money ("$2M+ in builder grants"). Concrete and partner-led. | 6.5x (median 174,510 of 25 originals 2025-12-04 to 2025-12-07) |
| W17 | https://x.com/Aster_DEX/status/2011307063415328993 | @Aster_DEX (294,748) | 2026-01-14 | V 133,748 · L 198 · RP 51 · Q 45 · R 42 · B 20 | photo | "⚔️ Human VS AI: Season 2" | Season 2 post: "Season 1 asked a question... Season 2 demands an answer", but carried by concrete new items (new arena, new AI from leading labs, 100 spots, $150,000 prize pool). Still only about 1/8 of its own Season 1 launch (W7). | 4.7x (median 28,249 of 25 originals 2026-01-15 to 2026-01-20) |
| W18 | https://x.com/AnthropicAI/status/1894092430560965029 | @AnthropicAI (1,954,909) | 2025-02-24 | V 3,633,011 · L 18,408 · RP 2,682 · Q 1,679 · R 989 · B 3,196 | video 40s | "Introducing Claude 3.7 Sonnet: our most intelligent model to date. It's a hybrid reasoning model, producing near-instant responses or extended, step-by-step thi" | "hybrid reasoning model" with visible extended thinking. Model launch from a huge account; the feature rode the model. | 4.5x (median 812,995 of 9 originals 2025-02-03 to 2025-02-28) |
| W19 | https://x.com/pieverse_io/status/2003080658412081494 | @pieverse_io (185,698) | 2025-12-22 | V 49,315 · L 149 · RP 32 · Q 5 · R 84 · B 9 | video 20s | "🚨 Breaking: Pieverse Launches the World's First Live Prediction Market Arena 🚨" | Names all 6 models + "Every decision logged & transparent. No cherry-picking." Closest analog to the EZ feed's trust pitch. | 3.9x (median 12,532 of 24 originals 2025-12-12 to 2025-12-29) |
| W20 | https://x.com/the_nof1/status/1979313619876876430 | @the_nof1 (54,029) | 2025-10-17 | V 245,189 · L 657 · RP 73 · Q 25 · R 93 · B 165 | quote-post | "Alpha Arena https://t.co/SeDwTwibaw" | The contest name alone, quoting the launch. Brand moment; not transferable to a 32-follower account. | 3.4x (median 71,701 of @the_nof1's other 4 originals since Sep 2025 (all that search returned)) |
| W21 | https://x.com/Polymarket/status/1986514405882789983 | @Polymarket (2,074,201) | 2025-11-06 | V 509,133 · L 1,574 · RP 136 · Q 53 · R 252 · B 64 | video 15s | "We are living in the future. Can’t stop the truth machine. " | "We are living in the future. Can't stop the truth machine. App coming soon." Shows the app in a clip. | 2.9x (median 175,844 of 25 originals 2025-11-10 to 2025-11-12) |

**Did well, but ordinary for the author (under 2.5x).** These matter because several are the exact "why" or "reasoning" idea:

| # | Link | Author (followers now) | Date (UTC) | Views, likes, reposts, quotes, replies, bookmarks | Format | First line, word for word | Why it worked / failed (one line) | vs author's usual (views ÷ median views of that author's originals) |
|---|---|---|---|---|---|---|---|---|
| O1 | https://x.com/OpenAI/status/1887616278661112259 | @OpenAI (5,555,825) | 2025-02-06 | V 1,484,100 · L 4,603 · RP 411 · Q 233 · R 561 · B 472 | photo | "Updated chain of thought in OpenAI o3-mini for free and paid users, and in o3-mini-high for paid users. https://t.co/uF4XTBGpC5" | "Updated chain of thought": the literal see-the-reasoning launch, from the biggest AI account. Ordinary for them. | 1.5x (median 964,828 of 24 originals 2025-01-23 to 2025-02-12) |
| O2 | https://x.com/RobinhoodApp/status/1938339687866700130 | @RobinhoodApp (1,394,066) | 2025-06-26 | V 64,783 · L 427 · RP 29 · Q 3 · R 68 · B 11 | text only | "Robinhood Strategies doesn’t just react to the market. It tells you why your portfolio did." | "doesn't just react to the market. It tells you why your portfolio did." Before/after + 'why' line: ordinary. | 1.6x (median 41,767 of 24 originals 2025-06-20 to 2025-06-29) |
| O3 | https://x.com/RobinhoodApp/status/2001115870152565224 | @RobinhoodApp (1,394,066) | 2025-12-17 | V 47,544 · L 249 · RP 22 · Q 8 · R 14 · B 28 | text only | "Introducing portfolio Digests." | "Decode what moved in your portfolio, why it happened, and what's coming next". Best of Robinhood's 'why' posts, still under 2x. | 1.9x (median 25,298 of 25 originals 2025-12-18 to 2025-12-23) |
| O4 | https://x.com/the_nof1/status/1977021850036453597 | @the_nof1 (54,029) | 2025-10-11 | V 139,965 · L 149 · RP 9 · Q 1 · R 10 · B 58 | quote-post | "A new era of AI evaluation begins next week https://t.co/qOJ1HEjuqV" | Pre-announcement one week out with a date ("begins next week"). | 2.0x (median 71,701 of @the_nof1's other 4 originals since Sep 2025 (all that search returned)) |
| O5 | https://x.com/RobinhoodApp/status/1965855031636406347 | @RobinhoodApp (1,394,066) | 2025-09-10 | V 61,364 · L 326 · RP 23 · Q 0 · R 10 · B 11 | quote-post | "Why use a coding language when you could just use English?" | "Why use a coding language when you could just use English? Custom indicators coming soon." Plain-English pitch + coming soon. | 1.7x (median 35,421 of 25 originals 2025-09-14 to 2025-09-19) |
| O6 | https://x.com/aidigest_/status/1946237538978705417 | @aidigest_ (10,553) | 2025-07-18 | V 3,727 · L 69 · RP 3 · Q 2 · R 3 · B 11 | photo | "Up to season 2, none of the agents have been able to complete a reCAPTCHA, with o3 explicitly declaring it impossible during Instagram account creation. Now in " | "Up to season 2, none of the agents have been able to complete a reCAPTCHA": a funny fact, not a launch. | 1.8x (median 2,057 of 24 originals 2025-07-14 to 2025-08-06) |
| O7 | https://x.com/RobinhoodApp/status/1919739084609634578 | @RobinhoodApp (1,394,066) | 2025-05-06 | V 38,291 · L 207 · RP 28 · Q 4 · R 35 · B 18 | video 37s | "More than a robo advisor. The “why” behind your portfolio. https://t.co/BBudugdoFt" | "More than a robo advisor. The 'why' behind your portfolio." The owner's exact idea ('the why') as a tagline: 0.90x (baseline window is 6 weeks later, era mismatch). | 0.90x (median 42,444 of 25 originals 2025-06-20 to 2025-06-29) |

## 2. Feature-launch flops (under 0.7x the author's usual)

| # | Link | Author (followers now) | Date (UTC) | Views, likes, reposts, quotes, replies, bookmarks | Format | First line, word for word | Why it worked / failed (one line) | vs author's usual (views ÷ median views of that author's originals) |
|---|---|---|---|---|---|---|---|---|
| F1 | https://x.com/Octagram_01/status/2002097356255240507 | @Octagram_01 (2,367) | 2025-12-19 | V 776 · L 58 · RP 11 · Q 0 · R 65 · B 7 | photo | "AI has always given answers" | Exactly the before/after the owner proposes: "AI has always given answers / Now it finally shows its work". Abstract, no example of the reasoning shown. Its 74.7 likes per 1k views and 65 replies on 776 views look like a reply-farm campaign, and it still drew a sixth of its usual views. | 0.16x (median 4,816 of 25 originals 2025-12-28 to 2026-01-04) |
| F2 | https://x.com/RobinhoodApp/status/2072385330485866967 | @RobinhoodApp (1,394,066) | 2026-07-01 | V 42,645 · L 192 · RP 18 · Q 6 · R 11 · B 13 | photo | "Robinhood Cortex with advanced reasoning is here." | "Cortex with advanced reasoning is here": the feature name and a list of uses, no example of the reasoning itself. Paywalled ($5/month). | 0.26x (median 164,414 of 25 originals 2026-07-04 to 2026-07-13) |
| F3 | https://x.com/ralliesarena/status/2026720880064082056 | @ralliesarena (39,252) | 2026-02-25 | V 3,065 · L 19 · RP 0 · Q 0 · R 1 · B 6 | photo | "OPUS 4.6 JUST BOUGHT SOME INTUIT $INTU STOCK" | Shows a model's reason verbatim, but as a 4-bullet jargon wall ("RSI ~23", "PE ~24.5", "200-day"). Long text, no plain-words layer. | 0.39x (median 7,782 of 24 originals 2026-02-23 to 2026-02-28) |
| F4 | https://x.com/RobinhoodApp/status/1978937045272735746 | @RobinhoodApp (1,394,066) | 2025-10-16 | V 25,993 · L 179 · RP 18 · Q 2 · R 33 · B 16 | video 32s | "Markets move. Cortex tells you why." | "Markets move. Cortex tells you why." A 'why' slogan with no real example. Gold-only. | 0.43x (median 60,570 of 24 originals 2025-10-16 to 2025-10-24) |
| F5 | https://x.com/the_nof1/status/1991257241677078873 | @the_nof1 (54,029) | 2025-11-19 | V 53,133 · L 219 · RP 11 · Q 4 · R 35 · B 31 | quote-post | "Alpha Arena Season 1.5 https://t.co/dZTtfNs22k" | Bare season name, "Alpha Arena Season 1.5", quoting the details. Naming the season alone did nothing. | 0.46x (median 115,117 of @the_nof1's other 4 originals since Sep 2025 (all that search returned)) |
| F6 | https://x.com/ralliesarena/status/2022012104446746945 | @ralliesarena (39,252) | 2026-02-12 | V 3,197 · L 11 · RP 0 · Q 0 · R 1 · B 8 | photo | "THE BEST PERFORMING AI JUST MADE A MOVE" | Vague teaser headline ("THE BEST PERFORMING AI JUST MADE A MOVE") hides the model and the stock. | 0.47x (median 6,830 of 25 originals 2026-02-23 to 2026-02-28) |
| F7 | https://x.com/RobinhoodApp/status/1981420986978488772 | @RobinhoodApp (1,394,066) | 2025-10-23 | V 36,449 · L 308 · RP 19 · Q 12 · R 57 · B 35 | video 27s | "Introducing your new AI investing assistant: Digests - powered by Robinhood Cortex." | "Introducing your new AI investing assistant: Digests": a product name and adjectives ("premium AI-driven stock insights"), no example. | 0.60x (median 60,570 of 24 originals 2025-10-16 to 2025-10-24) |
| F8 | https://x.com/stockgro/status/1999107538059723182 | @stockgro (361,685) | 2025-12-11 | V 1,327 · L 26 · RP 0 · Q 0 · R 12 · B 0 | text only | "Microsoft just bet $30 BILLION on AI." | "Here's what actually happened in plain English:" then an emoji checklist and hashtags. The 'plain English' label alone did not carry it. | 0.61x (median 2,172 of 25 originals 2025-12-16 to 2025-12-24) |
| F9 | https://x.com/RobinhoodApp/status/2003231563530571861 | @RobinhoodApp (1,394,066) | 2025-12-22 | V 17,262 · L 131 · RP 15 · Q 3 · R 10 · B 10 | video 26s | "From Robinhood Presents: YES/NO, say hello to Portfolio Digests by Robinhood Cortex." | Second announcement of the same feature in 5 days (after O3); "say hello to Portfolio Digests". | 0.68x (median 25,314 of 24 originals 2025-12-18 to 2025-12-23) |

**What the flops did differently.** They announced a capability ("tells you why", "advanced reasoning", "shows its work") without showing one real piece of reasoning (F1, F2, F4, F7). They showed the reasoning but as unreadable jargon (F3). They named the season and nothing new (F5). They hid the subject (F6). Or they used the "plain English" label over a checklist (F8). The winners led with one concrete, checkable thing: who is competing (W4, W19), what you can do (W12, W13), or one translated sentence (W6).

## 3. What the evidence says

**Before/after contrast vs a plain statement.** It does not beat a plain statement when the contrast is with your own past. The literal "you used to get X, now you get Y" posts are F1 ("AI has always given answers / Now it finally shows its work", 0.16x), O2 (Robinhood "doesn't just react... tells you why", 1.6x) and F4 ("Markets move. Cortex tells you why.", 0.43x). The one self-contrast that won, Aster's Season 2 (W17, 4.7x), carried four concrete new items and a prize pool, and still drew about 1/8 of its own Season 1 launch (W7). Two kinds of contrast did win:
- against the category: W3, "Everyone talks about AI trading. Very few talk about AI that actually explains its decisions", about 150x on a 1.1k-follower account;
- against a pain the viewer has: W2, "Investing shouldn't feel like managing 12 tabs", 332x, flagged as possibly paid.

The single best format was the plain premise: W4, "We funded Frontier models to autonomously compete...", 45x.

**Does naming the season help?** Not on its own. The bare "Alpha Arena Season 1.5" (F5) did 0.46x of nof1's other posts. Aster's "Season 2" (W17) worked because of what was new in it. "Season 1 proved X. Season 2 Y." is a stock line in crypto campaign posts: https://x.com/gview00/status/1951219100862005378 ("Season 1 proved the hype. Season 2 builds the legacy.", 1,704 views, @gview00 467 followers, baseline not checked) and https://x.com/RBL_XBT/status/2080866011323289944 (123 views, @RBL_XBT 474 followers, not checked). On a feed-ready timeline it reads as campaign copy. Use "Season 2" as a label, not as the hook.

**Which words do traders use for an AI's reasoning?** I counted English posts with a cashtag in the last 7 days, reposts excluded, at about 20:12-20:19 CET (`get_posts_counts_recent`):

| Phrase (with a cashtag) | Posts in 7 days |
|---|---|
| "the thesis" | 784 |
| "my thesis" | 363 |
| "the receipts" | 281 |
| "the reasoning" | 156 (raw count 4,708, almost all one copy-paste spam template, "stocks I'm watching for potential big moves next", which I excluded) |
| "the take" | 119 |
| "the why" | 42 |
| Same as above, but naming Grok, Claude, ChatGPT or Gemini: "thesis" | 107 |
| ... "reasoning" | 63 (spam excluded) |

Traders say **"thesis"**: about 19x more than "the why". But "thesis" is trader jargon, and the prompt requires plain words for a non-trader. "The why" is almost unused, and Robinhood's "why" taglines underperformed (F4 0.43x, O7 0.90x, O2 1.6x). On screen I'd use **"reasoning"** or **"reasons"**. W3 ("explains its decisions... see the reasoning behind every trade") and W19 ("Every decision logged & transparent") are the wording that went with winners. Keep "thesis" for replies to traders.

**"Trade", "call" or "position"?** Posts naming Grok, Claude, ChatGPT or Gemini with a cashtag, in 7 days:
- "trade": 613
- "call": 604. This count excludes "earnings call", "calls" and "puts", but "call" is still muddied by options talk.
- "position": 216

"good call" (108) and "good trade" (107) are a tie. Use **call** for the AI's pick (long or short, the move, the confidence). It is plain, it is already EZ's word ("pre-call") and it doesn't sound like money changing hands. Use **trade** only for the $100K that gets graded. Avoid "position": it is the least used and the most jargon.

**Verdict on the owner's line.** The evidence does **not** support "Season 1 gave you the what, long or short. Season 2 gives you the why." or the two-shot "Season 1 / Long or short" then "Season 2 / Now the why". Here is why:
- It is a self-contrast, which flopped (F1 0.16x) or was ordinary (O2 1.6x).
- "Why" as a slogan underperformed three times at Robinhood (F4 0.43x, O7 0.90x, O3 1.9x at best).
- Leading with the season name did nothing (F5 0.46x).
- "Season 1 ... Season 2 ..." matches crypto campaign copy.
- "Long or short" on its own sells Season 1 short.

What beats it: name who is competing, show that they disagree, and promise one real readable reason. The supporting posts are W4, W19, W3 and W6, plus the design brief's finding that disagreement and short verbatim reasons drive replies.

## 4. The plain-words layer

**Posts that translated jargon and worked (all three beat the author's usual):**
- W6, @ArmstrongEcon, 27x. Label: "What this means in plain English is that...". The plain version is **one sentence, 25 words**, placed straight after the quoted jargon term ("Personal Intelligence"). 1,832 bookmarks.
- W8, @HelenNnebedum, 18.8x, flagged as possibly paid. Labels: "Here's the breakdown in simple terms" and then "In plain English, that means...". **One sentence, 23 words**, and it glosses a term in brackets ("GPU power (the hardware that runs AI)").
- W9, @echodatruth, 15x. Labels: "in plain English using a pawn shop analogy" and "Translation:". The translation is **2 lines, 14 words** ("Banks didn't want to pawn their gold (Treasuries) / They pawned the junk drawer instead."). 746 bookmarks.
- A flop: F8, @stockgro, 0.61x. Label "Here's what actually happened in plain English:", followed by an emoji checklist and hashtags. The label is not the magic. One short, concrete sentence is.
- Not baselined, but the closest AI case: https://x.com/marijiggwan/status/2016630396868255992 ("For us non tech people, here is the layman's translation from Gemini...", 4,044 views, @marijiggwan 893 followers; I did not compute a baseline).

**Labels that worked:** "What this means in plain English", "In plain English, that means", "Translation:" and "in simple terms". All worked as one short sentence of 14-25 words, set right under the jargon. For EZ, a label like "In plain words (ours):" both says what it is and marks it as ours, not the AI's.

**Did people reply to the plain version or the original?** I can't measure it. Reply search (`conversation_id:`) returned zero replies for both W6 and W9. Their quote lists were mostly reposts. The only two text quotes of W6 ("SELF HOST." and "Google is out of control.") react to the plain-English consequence, not to Google's term. That is weak evidence (n=2), but it points to the plain version as the thing people respond to.

**The Grok example in plain words (15 words):**

> Heavy selling, AI disruption fears. Beat confirms slower growth; buyers unlikely back by next close.

Word count: 15, counting words as separated by spaces. Fact mapping:

| Grok's words | Plain words |
|---|---|
| Heavy washout | Heavy selling |
| AI-disruption overhang | AI disruption fears ("overhang" = a fear still hanging over the stock) |
| residual owned slower-growth story | slower growth (the story the remaining holders own) |
| as confirmation | Beat confirms |
| beat unlikely to re-anchor ownership | buyers unlikely back |
| before next close | by next close |

Nothing is added. What gets compressed: "residual owned" (that these are the holders who are left) is implied by "buyers unlikely back", not stated. If that must be explicit, it costs 3 more words and breaks the 15-word cap: "Remaining holders see slower growth". I would ship the 15-word version.

## 5. Teasers

**Teasers that did well (2.5x or more vs the author's usual): 5 found**

| # | Link | Author (followers now) | Date (UTC) | Views, likes, reposts, quotes, replies, bookmarks | Format | First line, word for word | Why it worked / failed (one line) | vs author's usual (views ÷ median views of that author's originals) |
|---|---|---|---|---|---|---|---|---|
| T-W1 | https://x.com/perplexity_ai/status/1894068197936304296 | @perplexity_ai (513,685) | 2025-02-24 | V 816,539 · L 5,222 · RP 597 · Q 468 · R 362 · B 711 | video 7s | "Comet: A Browser for Agentic Search by Perplexity" | Product name + one-line category + "Coming soon." Short clip of the thing itself. | 6.7x (median 121,309 of 13 originals 2025-02-05 to 2025-03-01) |
| T-W2 | https://x.com/Polymarket/status/1986480203301068840 | @Polymarket (2,074,201) | 2025-11-06 | V 7,821,079 · L 8,033 · RP 680 · Q 783 · R 956 · B 595 | photo | "Polymarket x Google" | Named partner + "Coming soon." A big-news teaser; the partner (Google) did the work. 1.03 likes per 1k views. | 44.5x (median 175,844 of 25 originals 2025-11-10 to 2025-11-12) |
| T-W3 | https://x.com/Polymarket/status/1986514405882789983 | @Polymarket (2,074,201) | 2025-11-06 | V 509,133 · L 1,574 · RP 136 · Q 53 · R 252 · B 64 | video 15s | "We are living in the future. Can’t stop the truth machine. " | "We are living in the future. Can't stop the truth machine. App coming soon." Shows the app in a clip. | 2.9x (median 175,844 of 25 originals 2025-11-10 to 2025-11-12) |
| T-W4 | https://x.com/RobinhoodApp/status/2075672977497035108 | @RobinhoodApp (1,394,066) | 2026-07-10 | V 1,305,371 · L 2,759 · RP 367 · Q 343 · R 589 · B 384 | video 206s | "Crypto is coming to agentic trading." | Teaser that says exactly what you will be able to do (connect an AI agent to trade crypto), ends "More soon." | 8.2x (median 159,455 of 24 originals 2026-07-04 to 2026-07-13) |
| T-W5 | https://x.com/RobinhoodApp/status/2000579180078027119 | @RobinhoodApp (1,394,066) | 2025-12-15 | V 201,467 · L 509 · RP 51 · Q 2 · R 41 · B 36 | video 11s | "Lower costs, same API." | Four-word before/after on cost only ("Lower costs, same API."), ends "Coming soon." | 8.0x (median 25,298 of 25 originals 2025-12-18 to 2025-12-23) |

**Above usual but under 2.5x, plus one I would not trust**

| # | Link | Author (followers now) | Date (UTC) | Views, likes, reposts, quotes, replies, bookmarks | Format | First line, word for word | Why it worked / failed (one line) | vs author's usual (views ÷ median views of that author's originals) |
|---|---|---|---|---|---|---|---|---|
| T-W+1 | https://x.com/the_nof1/status/1977021850036453597 | @the_nof1 (54,029) | 2025-10-11 | V 139,965 · L 149 · RP 9 · Q 1 · R 10 · B 58 | quote-post | "A new era of AI evaluation begins next week https://t.co/qOJ1HEjuqV" | Pre-announcement one week out with a date ("begins next week"). | 2.0x (median 71,701 of @the_nof1's other 4 originals since Sep 2025 (all that search returned)) |
| T-W+2 | https://x.com/RobinhoodApp/status/1965855031636406347 | @RobinhoodApp (1,394,066) | 2025-09-10 | V 61,364 · L 326 · RP 23 · Q 0 · R 10 · B 11 | quote-post | "Why use a coding language when you could just use English?" | "Why use a coding language when you could just use English? Custom indicators coming soon." Plain-English pitch + coming soon. | 1.7x (median 35,421 of 25 originals 2025-09-14 to 2025-09-19) |
| T-W+3 | https://x.com/Daulton_AI/status/1980656693399671014 | @Daulton_AI (2,357) | 2025-10-21 | V 156,945 · L 72 · RP 39 · Q 5 · R 186 · B 3 | video 11s | "🚨 $DAULTON — Major Update!" | "The wait is OVER... Exact date dropping soon." FLAG: 490x its median, 0.46 likes per 1k views, 72 likes on 157k views. Almost certainly paid reach. Do not learn from it. | 490.5x (median 320 of 24 originals 2025-10-19 to 2025-10-29) |

**Teasers that flopped: 6 found**

| # | Link | Author (followers now) | Date (UTC) | Views, likes, reposts, quotes, replies, bookmarks | Format | First line, word for word | Why it worked / failed (one line) | vs author's usual (views ÷ median views of that author's originals) |
|---|---|---|---|---|---|---|---|---|
| T-F1 | https://x.com/Daulton_AI/status/1981360857427636454 | @Daulton_AI (2,357) | 2025-10-23 | V 11 · L 0 · RP 0 · Q 0 · R 0 · B 0 | text only | "👀 Something is coming… and it’s not just another memecoin." | Mystery teaser: "Something is coming... and it's not just another memecoin." Shows nothing. | 0.03x (median 362 of 24 originals 2025-10-19 to 2025-10-29) |
| T-F2 | https://x.com/Daulton_AI/status/1982551323057832436 | @Daulton_AI (2,357) | 2025-10-26 | V 6 · L 0 · RP 0 · Q 0 · R 1 · B 0 | video 6s | "🌩️ Something Big is Coming…" | Mystery teaser: "Something Big is Coming..." Shows nothing. | 0.02x (median 362 of 24 originals 2025-10-19 to 2025-10-29) |
| T-F3 | https://x.com/GeminiApp/status/1958921760990228854 | @GeminiApp (625,950) | 2025-08-22 | V 80,478 · L 1,232 · RP 141 · Q 31 · R 63 · B 162 | video 23s | "Coming soon: When you share your camera in Gemini Live, it can highlight what to focus on, becoming even more helpful. 🔎 https://t.co/4FNmFZqNWc" | Shows the feature in a 23s clip and says "Coming soon", yet 0.21x. Small, incremental feature from a huge account. | 0.21x (median 384,011 of 24 originals 2025-08-15 to 2025-08-28) |
| T-F4 | https://x.com/BlinkCashX/status/2123151293426364886 | @BlinkCashX (1,187) | 2026-11-18 | V 543 · L 10 · RP 3 · Q 0 · R 2 · B 2 | quote-post | "Big day tomorrow. Follow the smart money. https://t.co/iM5saUKdr7" | "Big day tomorrow. Follow the smart money." Hides what is launching. Same account's plain launch post 5 days earlier did 45x (W4). | 0.68x (median 796 of 22 originals 2026-09-07 to 2026-11-18) |
| T-F5 | https://x.com/RobinhoodApp/status/1966607550033653971 | @RobinhoodApp (1,394,066) | 2025-09-12 | V 23,945 · L 181 · RP 15 · Q 4 · R 21 · B 22 | video 695s | "Introducing: Custom Indicators and Scans, coming soon to Robinhood Legend." | "Introducing: Custom Indicators and Scans, coming soon" with an 11.6-minute video; repeat of a 1.73x post 2 days earlier. | 0.68x (median 35,421 of 25 originals 2025-09-14 to 2025-09-19) |
| T-F6 | https://x.com/4lpha_agent/status/2106386838781104345 | @4lpha_agent (716) | 2026-10-03 | V 304 · L 7 · RP 1 · Q 1 · R 2 · B 0 | video 73s | "Tokenized stocks trade 24/7. Wall Street doesn't." | "The TradFi model for the 4lpha Trading Agent is coming soon" + a 73s video and feature list. Jargon ("TradFi model"). | 0.85x (median 358 of 11 originals 2026-10-02 to 2026-10-22) |

**What the winners showed, and how they ended.** Every winner named the actual thing in its first line: a product name (Comet), a partner (Google), an app, or a capability ("connect their AI agent... to trade crypto", "Lower costs, same API"). Where a clip was attached it showed the product, and short clips were the norm (7s, 11s, 15s). They ended on a two-word close with no date: "Coming soon." (T-W1, T-W2, T-W3, T-W5) or "More soon." (T-W4).

The flops hid the thing ("Something is coming", "Big day tomorrow"), ran long (an 11.6-minute video, a 73s spec list), or led with jargon ("TradFi model"). T-F3 (Gemini) shows that a clean demo plus "Coming soon" can still fail when the feature is minor for the audience.

For EZ, with about 32 followers, there is a caveat. Every clean teaser winner came from an account with 500k-2M followers. The design brief already found that teasers flop at EZ's size. A teaser can still earn its place if it shows a real AI reason on screen. This evidence does not support a teaser that shows only a phone and "coming soon".

## 6. Ten on-screen lines (two shots, at most 6 words each, no punctuation)

The rules were checked for every line: side is only long or short; no paper, simulated, made, lost or won; no "every earnings report"; no return promises; plain words; no punctuation (so no apostrophes either). The video's own closing card stays "coming soon".

| Rank | Shot 1 | Shot 2 | Words | Backed by |
|---|---|---|---|---|
| 1 | Same report five AIs disagree | Read the reasoning behind each | 5 / 5 | Disagreement + a concrete premise: W4 (45x), W19 (3.9x, "6 frontier LLMs... battling"), W3 (150x, "see the reasoning behind every trade"); the design brief's finding that disagreement drives replies |
| 2 | GPT Claude Grok Gemini Qwen | Long or short and why | 5 / 5 | Naming every model: W19 lists all six; T-W1 and T-W3 put the actual name in line 1 |
| 3 | Five AIs explain their calls | In their words and ours | 5 / 5 | Plain-words layer: W6 (27x), W9 (15x); "explains its decisions" in W3 |
| 4 | Each AI picks long or short | Then explains it in plain words | 6 / 6 | W3; W1's plain binary "up or down" (flagged as possibly paid) |
| 5 | Five AIs pick long or short | Now read their reasons | 6 / 4 | W4's premise; the soft "Now" is a mild self-contrast, see F1 |
| 6 | AI reasoning out in the open | Plain words underneath | 6 / 3 | W19 ("Every decision logged & transparent"); W6 |
| 7 | Every AI shows its reasoning | Then we say it plainly | 5 / 5 | W3, W6; weaker because it is abstract (compare F2) |
| 8 | Long or short is the call | The reasoning is the story | 6 / 5 | Wordplay, no direct backing; abstract slogans did poorly (F4) |
| 9 | Their calls were public | Now their reasoning is too | 4 / 5 | Self-contrast; F1 (0.16x) and O2 (1.6x) argue against it |
| 10 | Season 1 Long or short | Season 2 Now the why | 5 / 5 | Owner's draft. Evidence against: F1, F4, F5 and the season-template posts in part 3 |

## 7. Post text to go with the video (25 words or fewer, no hashtags, no links)

Hashtags: the evidence is mixed, not supportive. The stockgro flop (F8) and Robinhood's O3 carried hashtags, and so did one winner (W9, #Silver). Most winners had none, so nothing here justifies breaking EZ's no-hashtag rule.

1. **(I'd post this one)** "Five AIs. Same earnings report. Different calls. Soon you'll read each AI's reasoning in its own words, with a plain-English version from us." (23 words)
2. "GPT, Claude, Grok, Gemini and Qwen each go long or short before earnings. Next: their reasoning, out in the open." (20 words)
3. "Season 1 showed you long or short. Season 2 shows you why, in each AI's own words. Coming soon." (19 words; the owner's framing)

**Why version 1:**
- It opens on the concrete premise and the disagreement (W4, W19, W3).
- It promises one specific readable thing (the AI's own words) and the plain-words layer (W6, W9).
- It avoids the self-contrast and the season-led hook that flopped (F1, F4, F5).
- It keeps "call", which ties with "trade" in trader usage.

Version 2 is the safe fallback. Version 3 is the weakest on the evidence. One fact check: "Different calls" (version 1) and "five AIs disagree" (line 1) are only true if the AIs shown in the video actually split. If the report on screen was unanimous, use line 2 and version 2.

## Searches and reads run (X API)

1. "Season 2"/"season two" launch posts (trading, AI, arena, crypto), from 2025, by recency (spam; replaced by relevancy searches)
2. "Alpha Arena" Season 1.5 or Season 2, from 2025-10-15
3. "now you can see", "see why", "explains why", "the why" + introducing, new feature or is live
4. from:RobinhoodApp Cortex, "why", digest, introducing
5. "coming soon", "sneak peek", "first look" + AI, trading, app or feature, with videos
6. "Season 2" or "new season" + AI models or agents + benchmark, competition or arena
7. "see its reasoning", "show its work", "thought process" + introducing or rolling out
8. Polymarket, Kalshi, TradingView, Perplexity, nof1 + introducing, new feature or coming soon
9. "in plain English", "Translation:", "what this means" + Fed, earnings, CEO or AI
10. "used to", "until now", "no more" + "now you" + launch
11. "Season 2" official trailer or premieres, with videos
12. Quote posts with "Translation:", "TL;DR" or "in plain English"
13. "model chat", "its reasoning", "reasoning traces" + AI trading
14. AI labs (OpenAI, DeepSeek, Anthropic, xAI, Gemini, Grok, Qwen) + chain of thought, thinking or reasoning, 2025
15. from:Aster_DEX Human vs AI and seasons
16. Coming-soon teasers from trading-contest and trading-app accounts
17. from:the_nof1, all originals since Sep 2025 (5 returned)
18. Trading accounts + introducing or launching (BREAKING posts excluded)
19. AI-contest accounts + introducing, season, reasoning or why
20. "Season 1 was", "Season 1 asked", "Season 1 proved" + "Season 2"
21. "explains every trade", "see why", "reasoning behind every" + AI trading
22. "in plain English", "ELI5", "in simple terms" + AI + stock, earnings or trade
23. "coming soon", "launching soon" + AI agents + trading, with videos
24. AI apps (Grok, xAI, Gemini, ChatGPT, Claude) + coming soon, next week or soon
25. Era-matched baselines (from:<handle>, originals only, 25 posts by recency up to a set end date): RobinhoodApp (Jun 2025, Sep 2025, Oct 2025, Dec 2025, Jul 2026), Aster_DEX (Dec 2025, Jan 2026), OpenAI, AnthropicAI, perplexity_ai (Mar 2025, Mar 2026), Polymarket (Jun 2025, Nov 2025), Kalshi, nansen_ai, deepseek_ai (only 2 returned; not used), aidigest_, getDrivenAI, bashcrypt0x, 4lpha_agent, ZKForge_io, tryneoapp, Octagram_01, ralliesarena (Feb 2026), stockgro, ArmstrongEcon, echodatruth, HelenNnebedum, landmanpplus (only 2 returned; not used), pieverse_io, Daulton_AI, BlinkCashX (Jun-Nov 2026), GeminiApp (Aug 2025), the_nof1 (Dec 2025, 2 returned)
26. Counts (`get_posts_counts_recent`, 7 days, 14 queries): "the thesis", "the reasoning" (raw and with spam excluded), "the why", "the receipts", "the take", "my thesis", AI name + cashtag + trade, position, call, thesis, reasoning or why; "good call" and "good trade"
27. Spam check on "the reasoning" (25 posts sampled)
28. Reply searches (`conversation_id:`) for W6 and W9 (both returned zero); quote posts of W6 and W9 (21 and 22 read)
29. One `get_posts_by_ids` batch re-read of all 55 cited posts at 20:18 CET

Working data: `/workspace/ez/study/research/feed/` (`db.json` holds every post read, `bases.json` the baseline sets, `final_reread.json` the batch re-read, `rows.json` the computed rows).
