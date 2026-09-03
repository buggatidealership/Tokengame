# The Call ($CALL)

> *the machine makes the call.*

Memecoin on [long.xyz](https://app.long.xyz) (Robinhood Chain), paired against the NVDA stock token, with a flywheel built around a **quarterly public event**: an AI funded by trading fees publishes its earnings call, bets on Hyperliquid stock perps, and — if it profits — buys $CALL on market and burns it. Wrong, it bleeds. Everything onchain.

Working name; the mechanism, page and playbook survive a rename.

## The mechanism (final)

1. Trade $CALL → 1% pool fee → ~70% to creator → **69% of creator fees → the pool** (USDC on Hyperliquid).
2. The pool is the machine's capital. It allocates between trading stake, research/compute, and marketing — every allocation published with reasoning.
3. Before each earnings print it publishes its call and takes a position on Hyperliquid stock perps via a trade-only API key. Public address.
4. Realized profit → buy $CALL → burn. Losses shrink the pool. No profit, no burn.
5. **Five laws:** profits-only buybacks · everything bought is burned, never sold · never trades $CALL for fees · everything public · disclosed marketing only.

At ecosystem-standard fees the pool earns ≈0.48% of trading volume.

## Repo contents

| Path | What |
|---|---|
| `index.html` | Landing page — event card with countdown to the next NVDA print, scoreboard, 5-node loop, the five laws, transparency addresses, spec table, disclaimer. Single file, deployable as-is |
| `docs/market-research.md` | Research: long.xyz mechanics + fee split, Hyperliquid stock-perp verification, flywheel math, legal red flags, landscape, kill criteria (claims labeled verified/derived/hypothesis) |
| `docs/twitter-playbook.md` | X setup, voice, content pillars, launch thread, cadence to the first call |
| `docs/first-video-script.md` | Shot-by-shot script for the launch video + three variants |

## Open decisions

- Cap on non-trading spend per quarter (research + marketing) — suggested 20% of pool; the machine's freedom needs a wall so the pool can't be marketed to zero.
- Confirm NVDA print date (sources say Nov 17 / 18 / 25, 2026) → set the countdown target in `index.html`.
- Name is a working name; rename is a find-and-replace.

## Launch checklist

- [ ] **Legal review of the fee→pool→buyback structure** (research §4) — before the first video, not after
- [ ] Verify in long.xyz app: fee split (70/30 assumed), creator-fee claim/asset, NVDA in pair list
- [ ] Prediction engine (separate harness) + Hyperliquid trade-only API wallet + fee→USDC→bridge pipeline; publish all addresses
- [ ] Ledger page (allocations + calls with reasoning, timestamped) — can start as a pinned thread
- [ ] Human creates X + Telegram; original pixel-art PFP/banner
- [ ] Launch video per `docs/first-video-script.md` (cleared audio)
- [ ] Fill `index.html` placeholders: buy link, addresses, X/TG, CA, countdown date
- [ ] Deploy page; deployer wallet; bridge ETH (chain ID 4663)
- [ ] T-5→T-1 cadence, then T-0: launch + CA on site and X same minute

## Hard rules

- Never promise returns or market win-rates; burns are never framed as a price floor.
- Never imply holders receive profits or own any piece of NVIDIA.
- Losses get the same production value as wins.
- The only official CA lives on the site and the pinned thread.
