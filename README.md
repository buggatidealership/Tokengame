# The Call ($CALL)

> *the machine makes the call.*

Memecoin on [long.xyz](https://app.long.xyz) (Robinhood Chain), paired against the NVDA stock token, with a flywheel built around a **quarterly public event**: an AI funded by trading fees publishes its earnings call, bets on Hyperliquid stock perps, and — if it profits — buys $CALL for a vault that never sells — or deepens the pool. Wrong, it bleeds. Everything onchain.

Working name; the mechanism, page and playbook survive a rename.

## The mechanism (final)

1. Trade $CALL → 1% pool fee → ~70% to creator → **69% of creator fees → the pool** (USDC on Hyperliquid, pure stake) · **31% → ops** (AI compute/inference, research, maintainers).
2. The pool is only ever stake. Ops spend is published.
3. Before each earnings print it publishes its call and takes a position on Hyperliquid stock perps via a trade-only API key. Public address.
4. Realized profit → buy $CALL for the vault **or** deepen the $CALL liquidity pool (split published per event). Losses shrink the pool. No profit, no buys.
5. LP keys burned at launch — liquidity can never be pulled. Rug-proof by construction.
6. **Five laws:** profits-only buybacks · the vault only fills, never sells · never trades $CALL at all · everything public · disclosed marketing only.

**The machine's objective (exact wording matters):** acquire the maximum amount of $CALL using only money it earns, within the five laws. Never "increase the price" — an agent given that goal with method freedom will discover manipulation (see research §3d and the Hugging Face incident).

At ecosystem-standard fees the pool earns ≈0.48% of trading volume and ops ≈0.22%.

## Repo contents

| Path | What |
|---|---|
| `index.html` | Landing page — event card with countdown to the next NVDA print, scoreboard, 5-node loop, the five laws, four transparency addresses, spec table, disclaimer. Single file, deployable as-is |
| `docs/market-research.md` | Research: long.xyz mechanics + fee split, Hyperliquid stock-perp verification, flywheel math, legal red flags, landscape, kill criteria (claims labeled verified/derived/hypothesis) |
| `docs/twitter-playbook.md` | X setup, voice, content pillars, launch thread, cadence to the first call |
| `docs/first-video-script.md` | Shot-by-shot script for the launch video + three variants |

## Open decisions

- Vault seal: burn / permanent code-lock / **timelock (recommended — e.g. 4-year, answers "dead capital" without team-stash FUD)** / free treasury (worst: dump-risk FUD + looks like team holdings). See research §3d table.
- Profit split policy between vault buys and LP-deepening: fixed ratio vs. machine's discretion (published either way).
- Who signs the ops wallet, and whether the machine gets discretion over the research/marketing slice of ops.
- Arena expansion order beyond NVDA (~25 high-OI stock perps, crypto later) — machine's discretion vs. curated list.
- Confirm NVDA print date (sources say Nov 17 / 18 / 25, 2026) → set the countdown target in `index.html`.
- Name is a working name; rename is a find-and-replace.

## Launch checklist

- [ ] **Legal review of the fee→pool→buyback-and-lock structure** (research §4) — before the first video, not after
- [ ] Verify in long.xyz app: fee split (70/30 assumed), creator-fee claim/asset, NVDA in pair list, and whether LP is locked/burned by the launchpad automatically (market it either way)
- [ ] Prediction engine (separate harness) + Hyperliquid trade-only API wallet + fee→USDC→bridge pipeline + vault; publish all four addresses
- [ ] Ledger page (allocations + calls with reasoning, timestamped) — can start as a pinned thread
- [ ] Human creates X + Telegram; original pixel-art PFP/banner
- [ ] Launch video per `docs/first-video-script.md` (cleared audio)
- [ ] Fill `index.html` placeholders: buy link, addresses, X/TG, CA, countdown date
- [ ] Deploy page; deployer wallet; bridge ETH (chain ID 4663)
- [ ] T-5→T-1 cadence, then T-0: launch + CA on site and X same minute

## Hard rules

- Never promise returns or market win-rates; buybacks are never framed as a price floor.
- Never imply holders receive profits or own any piece of NVIDIA.
- Losses get the same production value as wins.
- The only official CA lives on the site and the pinned thread.
