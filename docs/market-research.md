# Market Research — The Call ($CALL) on long.xyz (fee-funded AI earnings-trading flywheel)

**Date:** 2026-09-03 (v5 — pool → call → profit → buy & lock; 69/31 pool/ops)
**Scope:** long.xyz mechanics, the Robinhood Chain launchpad landscape, the fee-funded prediction-pool mechanism, and what could kill this.

Claims are labeled:
- **[verified]** — confirmed from current public sources (linked at bottom)
- **[derived]** — logical conclusion from verified facts
- **[hypothesis]** — judgment call / unverified; check before relying on it

---

## 1. What long.xyz actually is

- **[verified]** long.xyz is a token launchpad on **Robinhood Chain** (Arbitrum-stack L2, chain ID 4663, ETH is the gas token — there is no native chain token or airdrop).
- **[verified]** Core differentiator: the creator pairs the new token against a **tokenized stock** (NVDA, AAPL, TSLA, SPCX, HIMS…) from a curated liquid list, instead of ETH/stablecoins. Communities build lore around the pairing.
- **[verified]** Co-founder Nate has said there are **no plans for a platform token** — any "$LONG" ticker is not the platform.
- **[verified]** Ecosystem reporting describes the launch model as: 1B tokens per project into a liquidity pool, **1% base trading fee, split 70% to the creator / 30% to the protocol**. This is the number our whole flywheel depends on.
- **[hypothesis]** That 70/30 figure comes from third-party ecosystem analysis (KuCoin), and app.long.xyz blocks automated access from here — **confirm the exact fee split, claim mechanism, and payout cadence in the app before finalizing the 69% routing math.**

## 2. Proof the venue works

- **[verified]** **Artificial Inu ($AI)** / NVDA pair: ~$20M market cap (Aug 24) → peak above **$320M** by early September 2026. Flagship proof of scale.
- **[verified]** Other launches: **SPACEHOOD** (SPCX), **BONER** (HIMS). long.xyz has also shipped exotic pairings (NVDA 3x-leverage token pairing).
- **[derived]** Winners tie their identity to the format. Our identity ties to the *other* half of the machine: earnings — the exact thing the stock-pairing venue is culturally about.

## 3. The flywheel mechanism (new core)

**Design:** trade $CALL → 1% pool fee → creator receives ~70% of fees → **69% of creator fee revenue** routes to an AI prediction engine's trading pool → the engine trades earnings-call outcomes on **Hyperliquid** → results are public onchain.

- **[verified]** Hyperliquid supports **trade-only API wallets** (agent wallets) — the bot can trade but never withdraw, which is the right key-security posture.
- **[verified]** Hyperliquid **vaults** provide transparent onchain accounting of every trade; running the strategy as a vault leader makes P&L public by construction. Its orderbook is fully onchain — anyone can audit every fill.
- **[derived]** Fee math at the ecosystem-standard split: the machine receives ≈ **0.48% of all trading volume** (1% × 70% × 69%). At $10M cumulative volume the pool holds ~$48k; the flywheel only gets interesting with sustained volume, so the marketing engine *is* the funding engine.
- **[derived — recommendation]** Run the machine as a **public Hyperliquid vault** (or at minimum a published account address). "Verify, don't believe" is the strongest trust story available in this niche and differentiates us from every "AI trading" token that posts screenshots.
- **[hypothesis]** The earnings-prediction engine (built in the separate harness) has positive expectancy. Nothing in this doc assumes it does; the public design must survive the engine losing money, because sometimes it will.

### 3b. Mechanism v4 (2026-09-03, locked): the machine, the pool, the burn

Founder direction: the machine's goal is to **buy and burn as much $CALL as it can, funded only by trading profit**. The fee pool is its *capital*, which it may allocate with freedom between trading stake, research/compute to improve itself, and marketing to grow volume. Coins bought are burned — "accumulate but never sell" resolved as burn, so no spendable coin treasury exists. Everything transparent.

- **[verified]** Hyperliquid HIP-3 (live since Oct 2025) hosts permissionless perp markets for equities — NVDA, TSLA, S&P 500, gold, oil, pre-IPO names. RWA-perp open interest passed **$3.2B in June 2026** and later a record **$3.6B**; on peak days HIP-3 markets were ~48% of Hyperliquid volume. TradeXYZ (Hyperunit) deploys >90% of HIP-3 OI. NVDA-PERP is USDC-settled, tracks Nasdaq spot via oracle, trades 24/7. → Sizable, directional earnings bets on NVDA are feasible.
- **[verified]** NVDA's next earnings release is **mid/late November 2026** (sources disagree: Nov 17, 18, or 25 — confirm on NVIDIA IR). Not October.
- **[derived]** An "up or down after earnings" bet = holding a perp through the print. The engine must handle funding, the oracle's after-hours behavior around the release, and liquidation at whatever leverage it uses. Right on direction can still lose on sizing.
- **[derived — important correction]** "Bigger pool → better predictions" is not causal. Pool size scales *bet size*; only research/compute spend can plausibly improve *accuracy*. Copy must not claim that volume makes the machine smarter.
- **[derived — hard constraint]** An agent optimizing "buy back as much as possible via trading" with freedom will discover that trading its own pair generates fees for itself. That is wash trading — market manipulation. **The machine must be walled off from trading $CALL except profit-funded buys that are burned.** Written into the constitution (§3 on the site).
- **[derived — hard constraint]** Marketing spend must be disclosed as paid promotion wherever it lands (undisclosed crypto promo is an enforcement magnet for both the promoter and the project). Constitution §5.
- **[derived]** Why burn rather than a coin treasury: a spendable coin stash reintroduces sell pressure ("the machine sold to pay for ads") and contradicts "never sells." Spending authority lives in the *USDC pool*, not in coins. Suggested guardrail: cap non-trading spend at ~20% of pool per quarter so the pool cannot be marketed to zero. Open decision.
- **[derived]** The genuinely novel asset is the **scheduled public spectacle**: each earnings date is an event where the machine posts its call in advance, everyone watches the print, and the outcome visibly changes the burn counter. Brand and content calendar are built around the event.
- **[derived]** Legal posture is §4 posture 2 (value accrual via buyback-and-burn). Accepted by founder direction; counsel review is more important, not less. Marketing must never frame burns as a price floor.

### 3c. Mechanism v5 (2026-09-03, founder decisions)

- **Wash trading: hard no.** The machine never trades $CALL under any circumstances. The only $CALL it touches is bought with realized profit and sent to the lock.
- **Lock, not burn.** Bought-back coins go to an onchain lock. **[derived]** This only means something if the lock is enforced by code — a contract with no withdraw path. A multisig wallet with a "we promise" policy is a team-controlled stash: it invites dump FUD and, legally, looks like team holdings. Recommend the contract; publish and verify its source.
- **Fee split: 69% pool / 31% ops.** Of the creator's ~70% share of the 1% swap fee: 69% is the machine's stake (pool), 31% funds intelligence — AI inference/compute, research, and the maintainers — so the machine is never credit-constrained mid-call. **[derived]** This resolves an earlier ambiguity: the pool is now *pure stake*; research/marketing/compute come from ops, not the pool. The "non-trading spend cap" question disappears and constitution §1 gets simpler.
- **[derived — reality check on ops funding]** At ecosystem-standard fees, ops ≈ 0.22% of volume — about $2.2k per $1M of cumulative volume. Continuous frontier-model inference for earnings research is not free; until volume is meaningful, ops runs out of pocket. Plan a runway rather than assuming fees cover the machine from day one.
- **[derived]** Legal posture: buy-and-lock is functionally close to burn (supply leaves circulation) — still §4 posture 2. A team-unlockable lock is worse than burn, not better.

## 4. Legal / structural red flags (read before launch)

- **[derived — serious]** A token whose fees fund a managed trading pool moves away from "pure meme" toward **investment-contract territory** (pooled funds + profits from the efforts of others). Three postures, in increasing legal aggression:
  1. Winnings compound the pool, never distributed (weakest profit-expectation link).
  2. **Winnings buy back and burn the token** (value accrual to holders — more aggressive; **current design**).
  3. Winnings distributed to holders (looks like a dividend — most aggressive; do not do this without counsel).
  This is not legal advice and none of us are lawyers; **get an actual crypto-competent lawyer to review the structure and the copy before launch.** Jurisdiction of the team matters.
- **[verified]** Asset-confusion risk is real on this venue (holders thinking pairs = stock ownership); our copy must keep repeating that it doesn't.
- **[derived]** Never market with profit promises, projected returns, or "the AI wins X%" claims. The edgy voice must stay on culture and transparency, not returns.
- **[derived]** Avoid "insider" framing in naming/copy — implying material-non-public-information trading is a legal and platform-ban magnet. "Whisper number" culture is the safe edge of that joke.

## 5. Competitive landscape

- **[verified]** Broader 2026 launchpad market: pump.fun and LetsBONK trade the lead on Solana; Four.meme owns BNB; Believe pushes "internet capital markets"; Moonshot, DAOS.fun, Zora, Bags fill niches. "AI-managed treasury" tokens exist as a category — differentiation is our *public-vault receipts* + earnings-call specificity + the stock-paired venue fit.
- **[verified]** On Robinhood Chain: PONS/pools.trade (instant launch and 4-hour TWAP crowd launch; $10k FDV graduation; Uniswap v4 settlement with locked liquidity), robinfun, StonkFun, others. These numbers are ecosystem norms — long.xyz specifics may differ.
- **[derived]** Robinhood Chain is an early, media-covered frontier; the stocks×memes narrative gives mainstream press hooks Solana launches don't get. This advantage decays as the chain crowds.

## 6. Known venue risks

1. **[verified]** Extreme volatility; stock pairing does not de-risk anything.
2. **[verified]** Thin stock-token liquidity — a hot token can absorb much of the onchain stock inventory.
3. **[verified]** Market-hours mismatch: equities close, chain runs 24/7; dislocations happen (HIMS/BONER case). Note this cuts twice for us — our *trading engine* also faces gap risk around earnings, which drop after hours by design.
4. **[derived]** Regulatory attention on memecoins wrapped around tokenized equities on a broker-branded chain is a live tail risk; §4 postures are the mitigation.

## 7. Launch strategy implications

- **[hypothesis — recommended]** Pair: **NVDA** (deepest proven liquidity, $300M+ precedent, and thematically perfect: the machine literally trades on Nvidia-class earnings hype). Verify it's in the live pair list.
- **[derived]** Onboarding friction is the top conversion killer: users must bridge ETH (Arbitrum canonical bridge, Relay, Across, Stargate, LiFi) and add chain 4663. Landing page carries the walkthrough.
- **[derived]** First 72 hours set holder-base quality; retention and onchain activity through week 3 beat impressions. Content engine: the machine's bets ARE the content — every earnings week is a scheduled narrative event (see Twitter playbook).
- **[derived]** If long.xyz is instant-launch only, coordinate simultaneous posts at a pre-announced minute; no warm-up on instant curves.

## 8. What would change these conclusions

- long.xyz fee split ≠ 70/30, or creator fees stream differently → recompute the flywheel and update all "69%" copy honestly.
- NVDA not in the pair list → next-deepest tech name.
- Counsel says the fee→pool structure is unlaunchable as designed → fall back to pure-meme launch (v1 "Token Game" concept) with the machine as a self-funded sideshow, fee routing added later or never.
- Hyperliquid restricts the API wallet or the strategy's market access → engine runs on a fallback venue; transparency story survives via published address.

## Sources

- [KuCoin — Robinhood Chain ecosystem analysis (fee split, launch model)](https://www.kucoin.com/news/flash/robinhood-chain-ecosystem-analysis-from-hood-pons-to-stock-tokens-who-captures-value)
- [MEXC Learn — What is Long.xyz](https://www.mexc.com/learn/article/what-is-long-xyz-how-stock-paired-memecoins-are-reshaping-robinhood-chain/1)
- [MEXC Learn — PONS, LONG and the Robinhood Chain launchpad boom](https://www.mexc.com/learn/article/pons-long-and-the-robinhood-chain-launchpad-boom-where-the-fees-are-coming-from/1)
- [MCG on X — how long.xyz works](https://x.com/MCGlive/status/2080088252661313595)
- [WEEX — long.xyz NVDA 3x leverage pairing](https://www.weex.com/news/detail/longxyz-launches-nvda-3x-leverage-token-pairing-feature-s0445q0tmpa2nfyzbbdhhnhz)
- [LuvKaizen — How to launch a token on Robinhood Chain (2026)](https://www.luvkaizen.com/blogs/how-to-launch-a-token-on-robinhood-chain)
- [FinanceFeeds — Hyperliquid HIP-3 explained (open interest)](https://financefeeds.com/hyperliquid-hip-3-explained/)
- [Stocktwits — Hyperliquid RWA perps record open interest](https://stocktwits.com/news-articles/markets/cryptocurrency/hyperliquid-rwa-perpetuals-record-open-interest-hype-price-spacex/cZmzFCfR7o6)
- [Nansen — What is a stock perp (NVDA-PERP mechanics)](https://nansen.ai/post/how-to-trade-stock-perps-hyperliquid)
- [Chainstack — Hyperliquid trading bots 2026 (API wallets, vaults)](https://chainstack.com/hyperliquid-trading-bots-2026/)
- [HIPERWIRE — AI trading bots & agents on Hyperliquid](https://hiperwire.io/explainers/ai-trading-bots-agents-hyperliquid)
- [Coin Bureau — Best memecoin launchpads 2026](https://coinbureau.com/analysis/best-memecoin-launchpads)
