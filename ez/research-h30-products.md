# Research H30: comparable products, the trench check, colour and material (2026-11-02)

For the H29 Overview spec (`ez/tools/concepts/worlds/comic/story/h/h29/SPEC.md`). It does not repeat `ez/design-research-2026.md` (scorebugs, NEWstalgia, AI-slop tells, the prediction-market card, Alpha Arena's Season 1 results, casing).

**Labels.** [measured] = study, dataset or on-chain count; [observed] = I loaded the page or its HTML today, 2 Nov 2026, with a phone user agent; [practice] = what designers, vendors or reviewers report (often with a stake in it); [recollection] = what I know of a product from before 2026 and could not re-check today; [inference] = my reasoning.

**What I could not do.** pump.fun, DEX Screener, Kalshi and alphaarena.ai refused automated loads (403 or 429), and I did not try to get round that, so their first screens are described from coverage and recollection, and marked that way. Search found almost no design teardowns of these products. Most of the design evidence below is [practice] or [observed]. The [measured] evidence is about behaviour (survival rates, scams, colour vision), not about layouts.

---

## 1. Comparable products: what one phone frame does

### pump.fun coin page (the trenches' home screen)
- **First frame** [recollection, consistent with [practice] guides from 2026]: the coin's image and ticker, its market cap, a price chart, a buy/sell panel, bonding-curve progress, then trades, holders and a comment thread. A row of small icons links to the creator's website, X and Telegram. The guides describe the page as "real-time prices, the bonding curve chart, and trading history" ([DEXTools guide, 2026](https://www.dextools.io/tutorials/what-is-pump-fun-solana-memecoin-launchpad-2026); [Moby guide, 2026](https://moby-website.pages.dev/learn/pumpfun/)). One guide warns that people read the market cap as money that went in and could come out again.
- **Focal point:** the live number (market cap) and the chart. **Palette:** dark ground, green buy and red sell. **Motion:** the trade feed and the chart tick. The motion *is* the data.
- **What the trenches respond to:** in 2025 it was spectacle. Livestreams came back on 4 April 2025 and opened to everyone in September. A fee change raised creator earnings about tenfold, and there were days with more than $4M in creator fees. Creators earned most "when streamers leaned into extreme stunts", and most of those tokens later fell more than 90% ([Decrypt, 29 Dec 2025](https://decrypt.co/352919/creator-capital-markets-pump-fun-streaming-twitch)) [measured payouts, reported]. pump.fun reworked creator fees again in 2026: fees can be shared with up to 10 wallets, ownership can be transferred, and "traders will decide whether a narrative truly deserves Creator Fees" ([KuCoin News, 2026](https://www.kucoin.com/news/flash/pump-fun-overhauls-creator-fees-to-incentivize-trading-and-liquidity)) [practice/news].
- **Lesson** [inference]: by the time a trader opens our site, they have already seen chart, market cap, holders and CA on pump.fun. The site's job is not to repeat that. It has to answer what pump.fun cannot: *is there a real thing behind the ticker, and is it alive?*

### DEX Screener and the terminals (Axiom, GMGN): where the "website" link is clicked
- [recollection] On DEX Screener the token page carries Website / X / Telegram buttons; projects pay for that "enhanced token info". Terminals such as Axiom (more than half of Solana bot volume at one point; [Blockworks, 2025](https://blockworks.co/news/axiom-ycombinator-startup-solana-memecoin-revenue-10m)) and GMGN show wallet PnL publicly (a GMGN wallet page reading "PNL: +$755.7K (+43.81%)" is quoted as proof in Telegram channels; [t.me/fastgemlowcap](https://t.me/s/fastgemlowcap/117)) [observed in coverage].
- **Lesson:** the visitor arrives with their thumb on a trading screen. Our site is a detour from it, and a short one.

### Polymarket (a claim with a live number)
- [observed, 2 Nov 2026] The first frame under the category tabs is "Featured markets": *one* question ("Which party will win the Senate in 2026?") with two outcomes as big percentages (74% / 28%), and right under it news headlines from BBC, The New York Times and The Washington Post attached to the market. `theme-color` is #ffffff in light mode and **#0c0e13** in dark mode.
- [practice] In a redesign around 8 March 2026 a seven-slot carousel of high-profile event cards replaced the market list at the top, and a "Breaking News" panel was added on the argument that "a significant change in probability is itself Breaking News"; "All markets" moved to the second screen ([Foresight News via Tapbit, Mar 2026](https://www.tapbit.com/en/news/articles/polymarket-redesigns-its-website-redefining-news-media)). The card is "the core navigation unit… prominent probability percentage, colour-coded outcome indicators, thumbnail", so discovery "feels like scrolling a news feed" ([Avark, 12 May 2026](https://avark.agency/learn/prediction-market-design-patterns)) [practice, agency].
- **Focal point:** one number answering one question. **Trust:** outside sources (the newspapers) sit next to the number. **CTA:** the outcome buttons themselves.

### Kalshi
- [practice] Reviews call the app "clean", closer to a brokerage than a sportsbook, with Yes/No in place of jargon and the order book visible "for users who want execution transparency"; one reviewer calls it "bare-bones… like an unfinished prototype" ([Sports Illustrated, 2026](https://www.si.com/betting/prediction-market/prediction-markets-101/how-to-use-the-kalshi-app-understanding-prediction-market-data-before-your-first-trade); [Fortunly](https://fortunly.com/reviews/kalshi-review/)). In June 2026 a Bloomberg-terminal-style product for its most active traders was in alpha ([Yogonet, 5 Jun 2026](https://www.yogonet.com/international/news/2026/06/05/122926-kalshi-reportedly-developing-terminalstyle-platform-for-highend-traders)).
- **Lesson:** the mass product hides the machinery, and the depth sits one layer down for the people who want it.

### Alpha Arena (Nof1), our closest comparable
- [measured, reported] Launched 17 to 18 October 2025: models with $10K each on Hyperliquid. Season 1 was won by Qwen3 Max at about +22%, while GPT-5 lost more than 60%. CZ's posts carried it on X ([iWeaver, 2025](https://www.iweaver.ai/blog/alpha-arena-ai-trader-showdown); [Forklog](https://forklog.com/en/four-out-of-six-ai-models-suffer-losses-in-trading-tournament/)). Season 1.5 started on 19 November 2025.
- **First frame** [recollection, not re-checked: the site returned 429]: one big chart, "total account value", every model a line ending in its logo and dollar value; a price ticker on top; tabs for completed trades, positions and **ModelChat**, the models' own reasoning for each trade ([One Day Advisor, Dec 2025](https://www.onedayadvisor.com/2025/12/nof1ai-alpha-arena-review-season-15.html) confirms the "chat log—prompts, reasoning, and timestamps", sorting by account value, and interactive charts). Its parent site's trust signals are credentials and backers ("alumni from DeepMind, Two Sigma, Citadel…", Village Global, Jane Street angels) [observed on nof1.ai, 2 Nov 2026].
- **What spread** [inference from coverage]: the standings as a horse race ("GPT-5 is down 75%"), the losers as much as the winner, and prediction markets on the result (struct.to lists "Will Grok 4 lose Alpha Arena Season 1.5?").
- **Lesson:** one chart of everyone's money and the model's own words made the story. Losing models were content too.

### aixbt (AI-agent coin with a product)
- [observed, 2 Nov 2026, aixbt.tech] The title is "AIXBT Rankings", `theme-color` #0c0c0f. The first frame is a numbered list: "01 Trend 83 *Mercado Bitcoin plans to cover hack losses*", then one plain sentence of fact, then "Mentions 43 · Authors 35 · **Freshness 8m**". Each row: a rank, a score, a headline, one sentence, a timestamp. There is no mascot, and no token price on the first screen.
- [practice] The token gates the premium terminal (600K AIXBT or $200 a month in one report; [Bitget](https://www.bitget.cloud/news/detail/12560604890880)).
- **Lesson:** the agent coin that lasted shows its *output*, timestamped, not its token. "Freshness 8m" is proof that it is alive.

### Virtuals Protocol
- [observed] app.virtuals.io: "Society of AI Agents", `theme-color` #000000. [practice] The headline metric is "aGDP", the agents' combined economic output ($479M in March 2026). Analysts note the method "lacks third-party verification" ([Blockeden, Apr 2026](https://blockeden.xyz/blog/2026/04/21/agdp-agent-gdp-virtuals-protocol-ai-blockchain-valuation-primitive-tvl-displacement/)).
- **Lesson:** a big self-reported number invites "verify it". EZ's numbers can be verified (posted before, graded by the close), so say so.

### Moltbook / MOLT (Jan 2026): AIs as spectacle
- [measured, reported] The Reddit-style network for AI agents went viral around 28 January 2026. Screenshots of agents "complaining about their human" carried it. The unofficial MOLT coin rose more than 1,800% in 24 hours after Marc Andreessen followed the account ([Axios, 31 Jan 2026](https://www.axios.com/2026/01/31/ai-moltbook-human-need-tech)); the creator said he was not behind the coin.
- **Lesson:** in 2026 the trenches buy *AIs doing something visibly human* that can be screenshotted. Our models' one-line quotes and their wins and losses are that material.

### Kaito Yaps, the format that died (Jan 2026)
- [measured, reported] On 15 January 2026 X revoked API access for apps that paid people to post. Nikita Bier blamed them for a flood of low-quality replies and "AI slop". Kaito wound down Yaps and its leaderboards, and KAITO fell 15 to 20% ([BeInCrypto](https://beincrypto.com/x-kills-kaito-infofi-tokens-crash); [KuCoin, Jan 2026](https://www.kucoin.com/news/flash/x-bans-infofi-apps-kaito-token-drops-17-20)).
- **Lesson:** no "post to earn" or engagement-points mechanics. Followers have to come from content worth following.

### Sports and fantasy apps (Underdog, Sleeper, DraftKings)
- [observed, 2 Nov 2026] **Underdog**'s landing opens on a scrolling marquee, "KEEP YOUR $1,000,000! TERMS APPLY.", repeated in capitals, then "A SPORTS APP FOR THOSE WHO GET IN ON THE GAME… YOU'RE NOT JUST A WATCHER"; brand purple #9d61d9 and yellow #ffbf01. **Sleeper**'s web front is "⚡ Scores", "Fastest live scores, standings…", cyan #00d7ff, Poppins 700. Reviews call Sleeper "design-led", and its known weak spot is live scores lagging "minutes behind" ([Unstar, 2026](https://unstar.app/hi/blog/sleeper-espn-yahoo-nfl-cbs-fantasy-sports-apps-ranked-2026)) [practice].
- [practice] **DraftKings** folded sportsbook, casino and predictions into one "Super App" in 2026 ("one app, one account, one wallet"; [Covers, Mar 2026](https://www.covers.com/industry/draftkings-plans-to-integrate-all-products-launch-super-app-in-march-2026)).
- **Lesson:** sports products sell *participation* and *speed*. Their leaderboard is rank, name, one big number and its movement; freshness is a feature, and lag is the complaint.

### Summary table

| Product | One focal point (phone) | Ground | Live proof | Primary CTA |
|---|---|---|---|---|
| pump.fun coin | market cap + chart | dark | trade feed | Buy |
| Polymarket | one question, two % | light or #0c0e13 | news beside the % | the outcome |
| Kalshi | Yes / No price | light | order book (one layer down) | Yes/No |
| Alpha Arena | account-value race chart | (recollection: light, mono) | ModelChat reasoning | none (watch) |
| aixbt | ranked list | #0c0c0f | "Freshness 8m" | Subscribe |
| Sleeper | live scores | dark | "fastest" | app |
| Underdog | marquee promo | purple/yellow | none | Sign up |

---

## 2. What makes trench traders follow or buy, and what makes them bounce

**The base rate they carry in their heads** [measured]: 79% of pump.fun tokens traded only on launch day, 1.5% were still active in week five, and about 1 in 58 graduated. That covers 8,984,141 tokens, 1 Nov 2025 to 7 Oct 2026 ([Bitquery via Coinotag, 20 Oct 2026](https://en.coinotag.com/bitquery-pump-fun-tokens-launch-day-only)). A 2026 dataset of 34,988 meme coins found many have **no functional website** at all, and 5.15% stop trading within 24 hours ([MemeChain, arXiv 2601.22185, 28 Jan 2026](https://arxiv.org/abs/2601.22185)). A visitor therefore starts from "this is dead or a rug" and looks for reasons to change their mind.

**The checklist they run** (DEXTools, Sharpe and other 2026 guides; [practice], vendors promoting their own tools; [DEXTools 2-minute checklist, 2026](https://dev.to/dextools/the-2-minute-memecoin-checklist-2026-entry-guide-26mm); [Sharpe 9-step rug check](https://www.sharpe.ai/learn/how-to-rug-check-a-token); [DEXTools rug-pull checklist](https://www.dextools.io/news/early-crypto-scam-signals)):
1. On-chain first: mint and freeze authority revoked, liquidity locked or burned, top-holder share, **bundles** (in 2026 bundle bots buy up to 40% of supply across about 100 wallets in the launch block), what the deployer kept and where it is moving it. Tools: RugCheck ("necessary, not sufficient"), Bubblemaps clusters.
2. Then off-chain: website, X, Telegram, team. Here the guides are thin. What they agree on:
   - **Website:** "poorly designed websites, misspellings, or URLs that closely mimic legitimate projects" and a "rushed project" look are flags ([iTiger](https://www.itiger.com/news/2518964912)). Newly registered domains are flagged, sometimes with checks via the Internet Archive ([Gridinsoft scans](https://gridinsoft.com/online-virus-scanner/url/startmemcoin-com)) [practice]. Use links from the official X or Telegram only, because cloned sites exist ([dev.to](https://dev.to/cryptosil/spotting-meme-coin-red-flags-lessons-from-the-wall-street-pepe-presale-scam-2b2i)).
   - **X:** thin accounts (1 follower, 1 post), bot replies manufacturing engagement, "sudden influencer endorsements with no context", lookalike names ([1inch blog](https://1inch.com/blog/post/inside-memecoin-launches)) [practice].
   - **Team:** anonymity "correlates with rug frequency" but is not damning [practice, vendor].
3. **The contract address (CA):** the dominant 2026 scam is a hijacked or impersonated account posting a fake CA. Robinhood's CEO's X account pushed a fake "VLAD" token to 175,000 views in 20 minutes (July 2026), and CZ warned about exactly this ([Cointelegraph](https://cointelegraph.com/news/robinhood-ceo-x-account-hacked-in-apparent-memecoin-scam)). The advice is to check the CA "independently against official sites and block explorers" [practice]. **The official website is one of the cross-checks.** Address poisoning works because fake addresses differ "only in the middle characters" (one victim lost $50M in USDT on 20 Dec 2025; [The Block](https://www.theblock.co/post/383423/crypto-trader-loses-50-million-in-address-poisoning-attack-offers-1-million-bounty-for-return)) [measured incident]. A middle-ellipsis display hides exactly the part an attacker fakes.

**How trust actually forms in the trenches** ([Variant, "Trench Tech", 17 Dec 2025](https://variant.fund/articles/trench-tech/)) [practice, VC essay]: alpha lives in small Telegram groups with "strong norms, high trust, and fast information flow". Entry requires "an impressive PnL", and trust is built through "gatekeeping, **screenshots**, and reputation". **A PnL screenshot is the currency of credibility.** A record that can be screenshot and checked fits that culture directly.

**Social distribution** [practice, mostly vendor guides, contradictory]: native video and replies are pushed hardest on X in 2026; several guides claim link posts from non-Premium accounts get "near-zero" reach since March 2026 ([Teract, 2026](https://www.teract.ai/resources/grow-twitter-following-2026); [PostEverywhere](https://posteverywhere.ai/blog/how-to-get-more-x-followers)). This conflicts with the reading of X's open-sourced ranking code recorded in CLAUDE.md (no explicit link penalty; replies weighted 5, follows 4, likes 0.66), so treat it as unproven. X Premium is described as "baseline credibility" for crypto accounts.

**Polish versus proof** [measured, older]: in experiments people rate more visually appealing sites as more trustworthy *regardless of real security*. One 398-person study found graphic design shifts authenticity judgements ([Tsow & Jakobsson, 2007](https://scholarworks.iu.edu/dspace/items/1c29b898-f8ef-4d62-98cd-ce73421d8c8c)). A 2024 phishing study adds that AI has made professional-looking pages cheap ([arXiv 2409.07717](https://arxiv.org/pdf/2409.07717)). So polish raises the floor but no longer proves anything. Trench traders know scams look good. What a scam cannot fake cheaply is a long, timestamped, externally checkable history.

**What makes them bounce** [inference from all of the above]: nothing moving or dated (dead), a promise of returns, the template memecoin site (hero, "How to buy", tokenomics, roadmap, FAQ: the structure every Fiverr and Dribbble listing sells; [Dribbble listings](https://dribbble.com/services/87127-Meme-Coin-Landing-Page-Design)), a missing or shortened CA, an X link that leads to a thin account, a page slower than the chart they left.

---

## 3. Colour and material in trading and crypto UIs

- **Dark ground is the norm** [observed, 2 Nov 2026]: Polymarket's dark theme #0c0e13, aixbt #0c0c0f, Virtuals #000000, Bubblemaps #4d3b4f. All near-black with a cool or neutral tint, never pure black for large areas except Virtuals. Phone dark-mode use is often given as about 82%, but that traces back to a 2020 Litmus survey and self-selected polls ([Android Authority poll](https://androidauthority.com/dark-mode-survey-results-3682352)) [weak].
- **Green up, red down** is the Western convention (Bloomberg: green "generally indicates an up market"). China, Japan and Korea use red for up (Futu's default is "Red Up Green Down"). About 20,000 or more Bloomberg Terminal users have red-green colour blindness, and Bloomberg's own test found they tell alternative or high-contrast colours apart better ([Bloomberg UX, 14 Oct 2021](https://www.techatbloomberg.com/blog/designing-the-terminal-for-color-accessibility/); [Futu on Android Developers](https://developer.android.com/stories/apps/futu)) [measured, internal]. Common practice: keep the hues and add a sign or arrow ("+" / "−") so colour is never the only carrier [practice].
- **Premium in 2025–26** [practice]: restraint and density. Hyperliquid's native interface is described as "restrained", and its trust is credited to everything being public and checkable rather than to styling ([Bitcoin.com](https://news.bitcoin.com/hyperliquid-explained-a-deep-dive-into-the-perp-dex-that-reshaped-crypto-in-2025); [OneKey](https://onekey.so/blog/ecosystem/hyperliquid-cex-ux-comparison/)). aixbt is plain text, ranks and timestamps. Agency roundups for 2026 name verifiability ("data transparency builds trust through verifiability") over futuristic visuals ([Azuro Digital, 2026](https://azurodigital.com/crypto-web-design-tips/); [Lazarev, 2026](https://www.lazarev.agency/articles/best-crypto-website-design)).
- **Scammy in 2025–26** [practice + inference]: the template memecoin look (mascot hero, neon gradient, "How to buy", roadmap), stock 3D coins, urgency gimmicks, big self-reported numbers with no way to check them (the critique of aGDP), and the generic AI-made site (2026's "slop" tells, already in `design-research-2026.md`).
- **Material** [inference]: in a category of flat neon and terminals, a *physical* material (print, ink, foil, paper, a chip) reads as made by hand. That is EZ's comic/ticket world. It only works as premium if the data inside it obeys trading-screen rules: tabular figures, signs, exact amounts, timestamps.

---

## Implications for EZ (design rules)

**First frame (390x664, sound off, inside X's or Telegram's browser)**
1. Answer three questions in one frame: **what is it** (one line), **is it alive** (one dated, live thing: the next close and its companies, or the latest graded round), **is it real** (the record exists and is checkable). Polymarket and aixbt both do this with one number and one timestamp.
2. One focal point. My recommendation is **the race** (four models, their P&L, the leader marked), as Alpha Arena's single chart was. Second choice is the headline with the race right under it. Not a mascot and not a token price: the trader has just left the price on pump.fun.
3. Show freshness as text: "Graded 3h ago · Next close Thu 4pm ET: AAPL, AMZN". aixbt's "Freshness 8m" is the model. Nothing on the first screen may be undated.

**Focal point and order**
4. The models' *own* words and their wins and losses are the content that spreads (ModelChat, Moltbook screenshots). Keep the one-line quotes, and let losers be loud too (GPT-5's −62% was Alpha Arena's meme).
5. Depth one layer down (Kalshi): the record, sectors and the stats live behind the tap, not on the landing.

**Palette**
6. The near-black ground fits the category (#04070e is darker than Polymarket's #0c0e13; keep the panels lifted, #0c0f17, so they read on OLED). Cream text, not white.
7. Green = right or profit and red = wrong or loss, *always with a sign* (+$148,480 / −$56,293) and W/L letters, so colour is never the only carrier (Bloomberg, Futu). Gold for #1 only. No neon gradients.

**Type**
8. Numbers in tabular figures, full and exact, formatted as a P&L screenshot (sign, $, thousands separators, no rounding to "k" on the main figure). That is the trench's credential format (Variant). The comic hand for headings is a distinction; it must never touch a figure.

**Motion**
9. Motion only where it is data or liveness (a countdown, the latest round's film muted, the newest grade arriving), as on pump.fun's trade feed. No decorative loops: a trader reads them as a template.

**Trust (the 2-minute check)**
10. **CA block:** before launch, "CA posted here and on @earningszn at launch. Any other address is fake." After launch, the *full* address (never middle-ellipsis: poisoning hides in the middle), a copy button, and links to Solscan and the pump.fun page, identical to the pinned X post.
11. **Receipts beside claims**, as Polymarket attaches news to the %: next to "every trade posted on X before the report", link the actual post for the latest round. Next to the pool, after launch, the pool wallet's address with a Solscan link (the 69% is otherwise a self-reported number, like aGDP).
12. State what EZ is *not*: no presale, no airdrop, no DMs. These are the impersonation vectors of 2026.
13. Who's behind it: if the team stays anonymous, say so plainly and let the record carry the trust; never imply credentials it does not have. Alpha Arena's parent leads with credentials.
14. Risk once, plainly ("the pool can be wiped out"), and never a return promise.

**CTA**
15. Before launch, one primary action: **Follow @earningszn** "for the next round", with the next close's time and companies (a dated reason, not "join the community"). No points or engage-to-earn: X killed that format on 15 Jan 2026.
16. After launch: Follow and Buy side by side, with Buy pointing to the pump.fun page and the CA block, never to a custom swap widget (that is what phishing clones use).
17. Every round has a screenshot-ready card (the /r/n pages): a P&L-card layout traders already post.

**Speed**
18. The page competes with the chart the visitor just left. It must show its first screen before they switch back (see `SPEC.md` 17).

---

## Five reference screens to imitate in spirit

1. **Polymarket "Featured markets"**, https://polymarket.com: one question, one big %, outside sources attached. *Imitate:* one claim, one number, its receipt beside it.
2. **Alpha Arena leaderboard and ModelChat**, https://nof1.ai (Alpha Arena linked from there): every model's money as one race chart, and the model's own reasoning one tap away. *Imitate:* the race as the focal point; the models' words as content.
3. **aixbt Rankings**, https://aixbt.tech: numbered rows, a score, a plain one-sentence fact, "Freshness 8m". *Imitate:* timestamps as proof of life; restraint.
4. **Sleeper Scores**, https://sleeper.com: "Fastest live scores, standings". *Imitate:* standings as a live sports product, with speed as a promise.
5. **The pump.fun coin page**, https://pump.fun (any coin): the trench's native grammar of market cap, chart, trades, holders, website/X/Telegram icons. *Imitate in spirit, not in look:* meet the visitor's conventions for CA, links and numbers, so our site reads as the verified extension of that page and not as a template detour.

*Sources dated where the source gives a date; "2026" alone means the page says 2026 without a day. Recollection items are marked and should be checked by eye on a phone before they are relied on.*
