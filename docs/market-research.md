# Market Research — $PRICEDIN on long.xyz (fee-funded AI trading pool)

**Date:** 2026-09-03 (v2 — reworked after concept pivot to the fee→AI→Hyperliquid flywheel)
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

**Design:** trade $PRICEDIN → 1% pool fee → creator receives ~70% of fees → **69% of creator fee revenue** routes to an AI prediction engine's trading pool → the engine trades earnings-call outcomes on **Hyperliquid** → results are public onchain.

- **[verified]** Hyperliquid supports **trade-only API wallets** (agent wallets) — the bot can trade but never withdraw, which is the right key-security posture.
- **[verified]** Hyperliquid **vaults** provide transparent onchain accounting of every trade; running the strategy as a vault leader makes P&L public by construction. Its orderbook is fully onchain — anyone can audit every fill.
- **[derived]** Fee math at the ecosystem-standard split: the machine receives ≈ **0.48% of all trading volume** (1% × 70% × 69%). At $10M cumulative volume the pool holds ~$48k; the flywheel only gets interesting with sustained volume, so the marketing engine *is* the funding engine.
- **[derived — recommendation]** Run the machine as a **public Hyperliquid vault** (or at minimum a published account address). "Verify, don't believe" is the strongest trust story available in this niche and differentiates us from every "AI trading" token that posts screenshots.
- **[hypothesis]** The earnings-prediction engine (built in the separate harness) has positive expectancy. Nothing in this doc assumes it does; the public design must survive the engine losing money, because sometimes it will.

## 4. Legal / structural red flags (read before launch)

- **[derived — serious]** A token whose fees fund a managed trading pool moves away from "pure meme" toward **investment-contract territory** (pooled funds + profits from the efforts of others). Three postures, in increasing legal aggression:
  1. **Winnings compound the pool, never distributed** (current design — weakest profit-expectation link; this is why the site says "no distributions").
  2. Winnings buy back and burn the token (value accrual to holders — more aggressive).
  3. Winnings distributed to holders (looks like a dividend — most aggressive; do not do this without counsel).
  This is not legal advice and none of us are lawyers; **get an actual crypto-competent lawyer to review the structure and the copy before launch.** Jurisdiction of the team matters.
- **[verified]** Asset-confusion risk is real on this venue (holders thinking pairs = stock ownership); our copy must keep repeating that it doesn't.
- **[derived]** Never market with profit promises, projected returns, or "the AI wins X%" claims. The edgy voice must stay on culture and transparency, not returns.
- **[derived]** Avoid "insider" framing in naming/copy (e.g., "Insider Inu") — implying material-non-public-information trading is a legal and platform-ban magnet. "Whisper number" culture is the safe edge of that joke.

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
- [Chainstack — Hyperliquid trading bots 2026 (API wallets, vaults)](https://chainstack.com/hyperliquid-trading-bots-2026/)
- [HIPERWIRE — AI trading bots & agents on Hyperliquid](https://hiperwire.io/explainers/ai-trading-bots-agents-hyperliquid)
- [Coin Bureau — Best memecoin launchpads 2026](https://coinbureau.com/analysis/best-memecoin-launchpads)
