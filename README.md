# The Call ($CALL)

> *the machine makes the call.*

Memecoin on [long.xyz](https://app.long.xyz) (Robinhood Chain), paired against the NVDA stock token, with a flywheel built around a **quarterly public event**: an AI funded by trading fees publishes its earnings call, bets on Hyperliquid stock perps, and — if it profits — buys $CALL on market and locks it forever. Wrong, it bleeds. Everything onchain.

Working name; the mechanism, page and playbook survive a rename.

## The mechanism (final)

1. Trade $CALL → 1% pool fee → ~70% to creator → **69% of creator fees → the pool** (USDC on Hyperliquid, pure stake) · **31% → ops** (AI compute/inference, research, maintainers).
2. The pool is only ever stake. Ops spend is published.
3. Before each earnings print it publishes its call and takes a position on Hyperliquid stock perps via a trade-only API key. Public address.
4. Realized profit → buy $CALL → onchain lock with no withdraw function. Losses shrink the pool. No profit, no lock.
5. **Five laws:** profits-only buybacks · everything bought is locked, never sold · never trades $CALL at all · everything public · disclosed marketing only.

At ecosystem-standard fees the pool earns ≈0.48% of trading volume and ops ≈0.22%.

## Repo contents

| Path | What |
|---|---|
| `index.html` | Landing page — event card with countdown to the next NVDA print, scoreboard, 5-node loop, the five laws, four transparency addresses, spec table, disclaimer. Single file, deployable as-is |
| `docs/market-research.md` | Research: long.xyz mechanics + fee split, Hyperliquid stock-perp verification, flywheel math, legal red flags, landscape, kill criteria (claims labeled verified/derived/hypothesis) |
| `docs/twitter-playbook.md` | X setup, voice, content pillars, launch thread, cadence to the first call |
| `docs/first-video-script.md` | Shot-by-shot script for the launch video + three variants |

## Open decisions

- Lock implementation: a contract with no withdraw path (strongest) vs. a multisig wallet with a policy (weaker — it's a promise). Recommend the contract.
- Who signs the ops wallet, and whether the machine gets discretion over the research/marketing slice of ops.
- Confirm NVDA print date (sources say Nov 17 / 18 / 25, 2026) → set the countdown target in `index.html`.
- Name is a working name; rename is a find-and-replace.

## Launch checklist

- [ ] **Legal review of the fee→pool→buyback-and-lock structure** (research §4) — before the first video, not after
- [ ] Verify in long.xyz app: fee split (70/30 assumed), creator-fee claim/asset, NVDA in pair list
- [ ] Prediction engine (separate harness) + Hyperliquid trade-only API wallet + fee→USDC→bridge pipeline + lock contract; publish all four addresses
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
