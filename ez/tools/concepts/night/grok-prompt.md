# Prompt for Grok: feed features, AI-reasoning posts and season rebrands on X (2026-11-21)

Run it in a fresh Grok chat, not in the chat that trades for EZ, so its trading notebook stays clean. It follows `ez/data/s2-calls/grok-research-prompt.md` (answers in `x-research-2026-11-20.md`) and `grok-feature-wording-prompt.md` (answers in `x-research-feed-teaser-2026-11-20.md`). Do not repeat those two studies: this one asks about **features inside a feed**, **how AI reasoning is shown in a post**, and **season rebrands**. The web research behind it is in `ez/tools/concepts/night/RESEARCH.md`.

---

You have live search of X. I need evidence, not opinions: real posts, each with a link. Read only: do not post, like, follow or DM. Leave out every post by @earningszn.

Context: @earningszn runs a public experiment. Five AI models (GPT, Claude, Grok, Gemini, Qwen) trade company earnings. Before each report every AI goes LONG or SHORT, names the move it expects (for example +4%) and its confidence (for example 58%), and writes a short reason. Every trade is $100K and is graded at the next market close on a public P&L leaderboard.
- Season 1 (4 AIs, 112 trades) showed only each AI's side.
- Season 2 adds each AI's reason in its own words, in a feed inside our web app, with our own one-sentence plain-words reading under jargon. When a trade is graded, the post shows the move, right or wrong, and the P&L.
- The website gets a Season 1 / Season 2 switch at the top; Season 2 has a new look (typefaces, layout, materials) while the logo and the brand colours stay.

Rules for every post you report (same as before):
- the link;
- the author's handle and follower count now;
- the date (UTC);
- views, likes, reposts, quotes, replies and bookmarks, as shown (write "not shown" if missing);
- the format (text, image, video with its length, quote-post, thread);
- the first line, word for word;
- in one line, why it worked or failed;
- how it did against that author's usual: the post's views divided by the median views of that author's original posts (replies and reposts excluded) in a window you name. Say when the baseline is weak (few posts, era mismatch).
- Flag posts whose likes per 1,000 views are under 1 (often paid reach). Do not learn from them.
- Say plainly when you found fewer posts than asked. Do not pad.

## 1. Feed features that were announced on X and did well

Find at least 15 posts from 2024 to now that announced a **feature inside a feed or social product** for trading, prediction markets, investing or AI, and beat the author's usual by 2.5x or more. Favour these features, and say which one each post is about:
- verified or automatic receipts (posts that carry a real trade or result: Robinhood Social, Hyperliquid P&L cards, Polymarket or Kalshi positions on profiles);
- follow or copy a trader or a model (eToro CopyTrader, Robinhood Social, Kalshi Social "Following");
- notifications or alerts when someone you follow trades;
- a leaderboard inside a social product;
- reactions, polls, comments or "bull/bear" tags (StockTwits sentiment);
- an AI explaining a move or a trade (Robinhood Cortex Digests, StockTwits AI summaries, Perplexity Finance);
- a plain-words layer under expert text (X Community Notes, "Translation:", "in plain English").

Then find 6 feed-feature launches from similar accounts that flopped (under 0.7x the author's usual) and say what they did differently.

## 2. How AI reasoning is shown in a post

Find at least 15 posts from 2025 to now that showed **an AI model's reasoning for a trade, a prediction or a decision**, from accounts such as @the_nof1 (Alpha Arena model chat), @ralliesarena, @andonlabs, @aidigest_, @BlinkCashX, prediction-market and AI-trading accounts. For each, besides the rules above, say:
- whether the reasoning was verbatim, trimmed, paraphrased or translated into plain words;
- how long it was (words);
- whether the key sentence was highlighted;
- whether the outcome (right or wrong, P&L) was in the same post;
- whether two models disagreed in the post.

Then answer from that sample, with counts:
- Do posts that show the outcome next to the reason beat posts that show only the reason?
- Do posts where two named models disagree beat posts about one model?
- Do posts about a model being wrong (a loss, a bad call) do better or worse than posts about a model being right?
- What did the replies under the five biggest posts say: about the reasoning, the outcome, or the model's character? Quote three replies each, with their views.

## 3. Season rebrands and new looks

Find at least 12 posts from 2024 to now where a running product, league, game, show or series **announced a new season with a new look** (a new identity, new graphics, a new key art, a new app design), such as Fortnite season logos, Champions League's "Kick of Light" (Aug 2024), NBA City Edition reveals, Formula 1 season graphics, Spotify Wrapped, Alpha Arena Season 1.5, Aster's "Human vs AI: Season 2", Apple event invites. For each, besides the rules above, say:
- what stayed the same (logo, name, colours) and what changed (type, layout, art, sound), from what the post shows;
- how the switch was announced (a teaser, a reveal video, a side-by-side old vs new, a date);
- the reaction in the replies: liked the new look, missed the old one, or confused. Quote three replies.

Then answer:
- Did "same logo, new world" reveals do better or worse than full rebrands that changed the logo?
- Did side-by-side "old vs new" posts draw more replies than a straight reveal?
- Which posts got backlash for changing too much, and what had they changed?

## 4. Branding inside the video

From any of the video posts you found above (or 10 more, from trading, AI and sports accounts, 2025 to now), note for each video:
- in which second the account's logo or name first appears, and where (a corner bug, an end card, or inside the scene, for example on a phone screen or a jersey);
- whether a logo stays in a corner the whole time;
- the video's length.

Then answer: among the videos that beat their author's usual by 2.5x or more, how many showed the brand in the first 2 seconds, how many kept a corner logo throughout, how many put the brand inside the scene, and how many showed it only at the end? Same counts for the flops.

## 5. What to build first

From all of the above, rank the seven feed features in part 1 by how much X engagement and how many follows they produced when they launched, and say which posts back each rank. Then write three post texts (at most 25 words each, no hashtags, no links) announcing the **first** feature you would ship. Rules:
- an AI's side is only "long" or "short";
- money is a signed P&L ("P&L +$12,790"); never "made", "lost" or "won" for money;
- no "paper", "simulated", "every earnings report", "not real money";
- no promise of returns;
- plain words a non-trader understands.

Answer as plain text with the links inline. At the end, list the searches you ran and how many X reads you used.
