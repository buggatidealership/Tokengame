# Desktop layout research: what screens EZ's audience uses (2026-10-28)

Labels used below: **[measured]** = third-party panel or analytics data; **[vendor]** = a company's own claim, or an affiliate source with a stake; **[estimate]** = my arithmetic; **[inference]** = my judgement.

## 1. Desktop or phone: pump.fun and the trading terminals
- **pump.fun** had 9.32M visits in Sep 2026. Semrush gives device splits by country only: US 83% desktop, Germany 94%, India 54%, Indonesia 47% ([Semrush, updated 2026-10-11](https://www.semrush.com/website/pump.fun/overview/)) [measured, modelled panel]. Similarweb puts direct visits at 73% of desktop traffic, with X as the top social source ([Similarweb, Sep 2026](https://www.similarweb.com/website/pump.fun/)).
- **pump.fun app** [vendor]: about $50M daily volume ([CryptoBriefing via KuCoin, 2026-08-30](https://www.kucoin.com/news/flash/pump-fun-app-hits-50m-daily-volume-and-905k-transactions)), against about $347M a day across the whole platform (30-day average). That puts the app at roughly 14% of volume [estimate: it compares one day's peak with a monthly average]. The company says the app passed 1.5M downloads ([Decrypt](https://decrypt.co/306072)) [vendor].
- **GMGN** had 11.46M visits. US 97% desktop; Germany, Brazil and Bangladesh 100% desktop; Indonesia 74% ([Semrush, updated 2026-10-13](https://www.semrush.com/website/gmgn.ai/overview/)) [measured].
- **DexScreener** had 18.45M visits. US 70% desktop, India 25%, Turkey 22% ([Semrush](https://www.semrush.com/website/dexscreener.com/overview/)) [measured]. It is more mobile than the terminals, so it is likely the casual or phone check [inference].
- **Axiom** had 10.4M visits over three months. Its top social sources were YouTube, X and Discord ([Similarweb](https://www.similarweb.com/website/axiom.trade/)). No device split is public. Reviews call it desktop-first and web-only ([madeonsol](https://madeonsol.com/blog/how-to-use-axiom-solana-trading)) [vendor/affiliate].
- **Photon, BullX, Padre, Phantom, Solflare**: I found no public device split. Telegram bots (Trojan, BonkBot) are phone-first by design, but their share of volume is poorly documented ([BeInCrypto, Oct 2024](https://beincrypto.com/solana-bot-trading-sets-record)).
- **How trenchers set up**: guides recommend 2 to 3 monitors running Axiom with an X feed beside it ([nomsh guide](https://nomsh-wiki.pages.dev/wiki/beginners-guide-to-memecoin-trading-in-2026-free-course)) [affiliate, anecdotal].
- **Web overall**: 59% mobile, 39% desktop ([StatCounter, Sep 2026](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide)).

**Takeaway [inference]:** active traders are heavily desktop in Western markets. The first visit to a launch page, though, usually comes from an X link.

## 2. Desktop viewports
StatCounter reports the screen size the browser sees, in CSS px, so OS scaling is already applied. The visible page is shorter by the browser bars, the Windows taskbar and the macOS menu bar.

| Screen (CSS px) | Share | What it usually is | Visible page (est.) |
|---|---|---|---|
| 1920x1080 | 28.1% WW, 27.1% US | 1080p at 100% | ~1920x920-950 |
| 1536x864 | 10.0% WW, 7.3% US | 1080p laptop at 125% | ~1536x730 |
| 1366x768 | 8.0% | old or cheap laptop | ~1366x630 |
| 1280x720 | 4.7% | 1080p at 150% | ~1280x590 |
| 2560x1440 | 4.0% | 1440p monitor | ~2560x1300 |
| 1470x956 / 1512x982 / 1728x1117 | not broken out | MacBook Air 13, Pro 14, Pro 16 at their default scaling | ~1470x830 / 1512x860 / 1728x990 |

Sources: shares from [StatCounter, Sep 2026, worldwide](https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide) and [US](https://gs.statcounter.com/screen-resolution-stats/desktop/united-states-of-america). The most common desktop viewport measured was 1920x920, 11% of 926 samples, a small sample ([ScreenSize.net, 2026-09-14](https://screensize.net/reports/viewport-stats)). Windows recommends 125% for a 15" 1080p laptop and 150% for a 13" one ([forum reports](https://community.mendix.com/link/space/ui-%26-front-end/questions/130736)). The Mac figures are each panel at 2x; the Air's 1470x956 default is from [Apple forum reports](https://discussions.apple.com/thread/255630006). Heights in the last column are [estimate].

## 3. Where the traffic comes from
- pump.fun gets 73 to 82% of its desktop traffic as direct visits, with X the leading social source (Similarweb, Semrush above).
- X itself runs about 58 to 59% mobile by visits ([SocialPilot, citing Semrush](https://socialpilot.co/blog/twitter-statistics); [ElectroIQ, citing Statista](https://electroiq.com/stats/how-many-users-are-on-x/)); the sources disagree.
- On a phone, a link tapped in X or Telegram opens inside that app's own browser. Expect most first visits to arrive that way, with DexScreener and pump.fun coin-page links as second hops (once the coin is live, its pump.fun or DexScreener page links to the site), more often on desktop [inference].

## 4. Breakpoints and reference patterns
- **Design target:** 1280 to 1536 px wide and 720 to 870 px tall. Check it at 1366x630 and 1920x940 [inference].
- **Patterns:**
  - pump.fun's livestream coin page: video in the centre, chat, buy panel and bonding curve in a right column ([Odaily](https://www.odaily.news/en/post/5206368)).
  - Alpha Arena: the account-value chart is the centrepiece, with model standings and trades around it ([nof1.ai](https://nof1.ai/), [Datawallet](https://www.datawallet.com/crypto/alpha-arena-nof1-ai-explained)).
  - Twitch and Kick: player in the centre, chat on the right, info under the player ([twitch.tv](https://www.twitch.tv)).
  - F1 Live Timing: a timing tower beside a central feed or track map ([formula1.com](https://www.formula1.com/en/timing/f1-live)).
  - Trading terminals such as Axiom or Hyperliquid: chart in the centre, order book on the right, positions below ([app.hyperliquid.xyz](https://app.hyperliquid.xyz/trade)).

## What this means for EZ's desktop layout
- Phones still bring the first visit. Desktop is where trenchers check a coin before they buy, and many sit beside a terminal and an X feed on a second monitor. Desktop matters, but it is the second look, not the arrival [inference].
- Design the desktop layout at **1280 to 1536 x ~730 px**. Make sure the film, the standings' leader and one call-to-action all show without scrolling at 1536x730.
- The 16:9 film fits about 640 to 720 px wide in a centre column (360 to 405 px tall). That leaves about 300 to 400 px on each side for panels at 1536 px: standings on one side, the live strip and the bet countdown on the other.
- Switch layouts at around **1200 px wide and 680 px tall**. Below that, keep today's single column: a 1280 px window that is only 590 px tall should not get a cramped three-column layout.
- Many people view the page in a half-width window or beside a terminal (about 768 to 960 px). That needs a middle layout, a film plus one side panel, not the phone column stretched wide.
- Do not design for 2560 px. Cap the content at about 1600 px and let the background fill the rest.

## 5. Two columns: what the eye does (added 2026-10-28, for the owner's sketch)
- On a 1920x1080 screen about 80% of fixations land on the left half of the page; the leftmost tenth gets about 6% ([NN/g, Horizontal Attention Leans Left](https://www.nngroup.com/articles/horizontal-attention-leans-left/)) [measured]. The right column is still read, but less: put what people come for on the left or make the right column's content worth the move [NN/g's own advice].
- Aligned rows (all pictures on one side, all text on the other) scan more easily than a zigzag that swaps sides each row ([NN/g, Zigzag Image–Text Layouts](https://nngroup.com/articles/zigzag-page-layout)) [measured, small qualitative eyetracking study].
- An eyetracking study of single- against double-column web text found the F pattern in the left column only ([Coventry University, multi-column text](https://pureportal.coventry.ac.uk/en/publications/visual-perception-of-multi-column-layout-text-insight-from-repeat/)) [measured].

**What it means for the sketch [inference]:** the owner's pairing keeps the moving pictures on the left (film, record cards, MVP cards) and the data on the right (standings, proof, bet), so it is the aligned pattern, not a zigzag. The standings, the page's most important figure, sit on the right; mockup C lifts them to the top of the page so they are on a laptop's first screen. Weighting the left column wider (7:5) was tried and dropped: the season ticket needs about 560px or more (its names ran into the W-L at 533px).
