# Earnings Zeason — landing page brief (exploration round 4)

Distilled from the owner's brain dump, 2026-09-28. Paste into a session to build.

## What this page is for
The trusted place people check before every earnings print to see what three AI models called, and after the print to see who was right. "Make a spreadsheet sexy." The record is the product; design makes it thrilling. Retention runs on the earnings calendar: there is always a next company, a lock time, a reveal.

Now: one static landing page, no login, cheap to maintain. Later (if it works): a stats section for AI researchers, TradFi and anyone digging into the history.

## Build
Two landing pages, completely different art styles and journey mechanics, both playful, both keeping direction A's attitude (capitalism uncut, the market is the only judge, receipts or it didn't happen). Not a mascot memecoin: a serious experiment with meme energy.

Suggested (not binding) — pick two that differ on every axis:
- an arcade/game journey (rounds as levels, the next round as the boss fight)
- a collectible almanac (each round a card you flip, the season as a binder)
- a live trading-floor broadcast (ticker, replay, "calls are in" breaking news)

## Must do
- Mobile-first (traffic comes from X). First screen: what's next + countdown + one-line premise.
- Return loop: next-round board in 3 states (waiting → calls filed → graded), countdown, add-to-calendar, per-round permalink (#round-N) for tweets, "call it yourself" (local only).
- Embed the round films where they exist (`media/round-3-autozone.{webm,mp4}`); others fall back to a designed card.
- One data block at the top of the file = all maintenance. Adding a round = one entry.
- Static HTML, no login, GitHub Pages ready.
- Research first: mobile-first landing UX, crypto-community norms, what durable memecoin and on-chain projects do for trust and return visits. Summarise findings before building.

## Hard rules
- Only hard facts: calls and outcomes, verbatim. Everything else may change.
- Derived stats = arithmetic on those numbers, labelled derived.
- Board wording: "Round X · Company". Motto "NOBODY SAID IT WOULD BE EZ" has no $; the $EZ mark (gold $, green E, red Z) lives separately.
- No promises of returns, no price-floor framing. Contract address only on this page.
- No black page backgrounds (brand brief) unless the owner says otherwise.
- **Pending owner decision:** do not mention the AI placing its own bets (canon/31 private arc), or publish prompts (canon/26 moat law), until the owner confirms. Public mechanism for now: "the purse settles in $EZ."

## Data (verbatim)
| Round | GPT | KIMI | CLAUDE | Outcome | Winner |
|---|---|---|---|---|---|
| Round 1 · GameStop | UP 1% | UP 4% | UP 2% | +5.95% | KIMI |
| Round 2 · Oracle | UP 6% | DOWN 6% | DOWN 3% | −1.74% | CLAUDE |
| Round 3 · AutoZone | UP 4% | DOWN 5% | DOWN 4.5% | +3.25% | GPT |
| Round 4 · General Mills | UP 3% | UP 3% | DOWN 3% | +1.04% | GPT & KIMI |
| Round 5 · BlackBerry | UP 7% | UP 9% | UP 9% | +4.10% | GPT |
| Round 6 · Costco | DOWN 2.5% | DOWN 2.5% | DOWN 2.8% | +2.95% | no winner |

Ladder: GPT 3 won, direction 4/6, avg distance 3.96 · KIMI 2, 4/6, 4.46 · CLAUDE 1, 3/6, 4.61.
Next: Round 7 · Micron, calls lock Wed Sep 30 · 4:30 pm ET. Purse: 6 of 10 rounds settled, sealed until Round X, 69% to the season's winning machine, settles in $EZ.

Known data issue: the record marks GPT's Round 1 direction ✗, but UP 1% vs +5.95% is right and the ladder's 4/6 only adds up if it's ✓ — owner to fix at the source.

## Deliver
Two single-file HTML pages, previews, screenshots at 390px and desktop, and a short note on which one you'd ship and what would prove it wrong.
