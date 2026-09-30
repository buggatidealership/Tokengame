# Launching $EZ on Pons (Robinhood Chain): research (2026-09-30)

Labels: **[sourced]** from a cited source · **[derived]** my inference · **[TBC]** needs the owner or Pons to confirm.

## First: the domain
- **pons.xyz is a parked domain for sale ($34,795).** The launchpad is **ponsfamily.com** (app: ponsfamily.com/launchpad, docs: docs.ponsfamily.com). [sourced]
  Anyone searching "pons.xyz" could land on a lookalike. Never connect a wallet to anything but the official domain, and link only that one from our page. [derived]

## What Pons is
- A pump.fun-style launchpad on **Robinhood Chain** (an Arbitrum Orbit L2 settling to Ethereum, public mainnet 1 July 2026; Pons launched 13 July 2026). [sourced]
- Fixed supply of 1B per token, bonding curve, then graduation into a Uniswap v4 pool behind a Pons hook with **permanently locked liquidity**. [sourced]
- Graduation at 4.2 ETH for ETH-quoted launches; per-asset thresholds for other pairs. Launch fee 0.0005 ETH. [sourced]
- A creator can price the launch in **ETH, a dollar stablecoin (USDG), cbBTC, or a tokenized stock such as NVDA**. [sourced]
- Anti-sniping tax at launch: 99% in the first second, about 6% in the next, then 0. [sourced]

## Fees (the number our calculator needs)
- **Standard fee: 1% of every trade (100 bps), on the curve and after graduation.** Uniswap charges nothing on top. [sourced: Bitquery docs, Datawallet]
- Split: Pons takes its share first, the creator gets the rest. Sources disagree on the split: **70% creator / 30% Pons** (Datawallet) vs **about 80% / 20%** (Bitquery's on-chain study). Pons's docs don't state it. [sourced, conflicting] **[TBC with Pons]**
  So **we would collect about 0.70 to 0.80% of all $EZ volume**, versus pump.fun's 0.05% at a $20M market cap. [derived]
- Optional **creator tax** on top, set at launch and capped (reported cap 10%). It is paid to the creator in full. [sourced]
- **Built-in buybacks:** a creator can switch on automatic buybacks, where a slice of the fee buys the token back on-chain. [sourced] That is the EZ thesis in native form. It could show buybacks as public on-chain events. [derived]
- Fees are paid in the launch's pairing asset. They build up in an escrow and can be withdrawn at any time. [sourced] So the creator fee balance is public on-chain, which answers "public wallet" for free. [derived]

## The NVIDIA pairing: tempting, but read this
- Pairing $EZ with tokenized NVDA would mean every buy is paid in NVDA and our fees accrue in NVDA stock tokens. It fits the story perfectly. [derived]
- It is not free:
  - Robinhood Stock Tokens are tokenized debt securities, offered in 120+ countries. [sourced] Whether US users can hold them is **[TBC]**. If they can't, an NVDA pair shuts out US buyers. [derived]
  - Holding NVDA tokens is not the same as holding the share: no votes or dividends by default. [sourced]
  - To fund a Hyperliquid bet, fees in NVDA tokens would have to be sold to USDC and bridged. That is one more step, and every step should be public. [derived]
- **Competitor on the exact theme:** Artificial Inu ($AI), an AI-themed coin paired with tokenized NVDA, went from about $1.5M to a $135M peak in August 2026. Its buy fees go to a vault of NVDA stock tokens "held forever". [sourced] EZ has to be clearly different: receipts, an AI that bets, a public record. [derived]

## Base rates (honest context)
From Bitquery, 3 Aug to 3 Sep 2026 [sourced]:
- 207,893 coins were created and 1.55% graduated.
- $736M was traded on the curves and $2.14B after graduation.
- 66.8% of 314,736 wallets lost money.
- The median graduated coin fell 85% from its first-hour price.
- The median creator earned **$15.73** in fees, and only 16 creators cleared $10,000.

Almost every launch makes little in fees. Volume has to be earned after launch; the calculator's volume slider is the whole question. [derived]

## Risks Pons itself discloses
Regulation could classify launches, fees or stock-token pairs as regulated activity. Bugs could misroute fees or lose funds. **Three audits are "in progress", and none is published as complete.** Single founder, no DAO. [sourced: Blockworks token transparency filing]

## What this changes on our page
- Calculator default fee: Pons's 1% with our ~70% share, so about 0.70% of volume (range 0.70 to 0.80%), labelled as Pons's rate until the split is confirmed.
- "Where the money goes": fees paid in the pair asset into an escrow, withdrawable any time. The escrow and any buybacks are public on-chain.
- Link only the official Pons domain.

## Sources
- https://docs.bitquery.io/docs/blockchain/robinhood/pons-api/ · https://bitquery.io/investigations/pons-launchpad
- https://www.datawallet.com/crypto/pons-explained · https://docs.ponsfamily.com/docs/v2
- https://blockworks.com/token-transparency/filing/pons
- https://www.galaxy.com/insights/research/robinhood-chain-launch-analysis-base-comparison-memecoins-distribution-thesis · https://genfinity.io/2026/07/01/robinhood-chain-mainnet-launch-chainlink-oracle-integration
- https://defiprime.com/stock-paired-memecoins · https://www.kucoin.com/blog/robinhood-stock-paired-meme-coins
