# Short-form "dopamine" research for round result videos (2026-11-12)

A helper's web brief, condensed. Every source is dated; **[older]** means before 2023. *Measured* means a study or a platform dataset; *practitioner* means guides and craft convention.

## Retention
- Emplifi, Facebook Reels, 19 Mar 2026 (measured; sample size not stated):
  - Speech in the first 3 s: 3-second retention +11.7%, 10-second +24.7%.
  - Text overlays: +5.1% and +7.6%.
  - A person on screen in the first 3 s: +3.6% and +10.1%.
  - A slower start: 30-second retention +7.7%.
  - Seamless loops in videos of 7 s or less: replay +18.7%, reach +23.6%.
  - Vertical: reach +20.9%.
  - https://emplifi.io/resources/facebook-reels-data/
- "60 to 80% leave in the first 3 s" has no source (practitioner, 2026). No study looks at 0.5 s or 1 s.
- Sound off:
  - 92% of mobile viewers watch muted (Verizon Media/Publicis 2019 **[older]**).
  - Captions led 37% to turn sound on, but captions plus a logo cut ad memory by 12%.
  - X autoplays muted, and viewers who turn autoplay off see only frame 0.
- Length: no X study. X allows 0.5 to 140 s (docs.x.com). On TikTok and Reels, longer videos get more reach (Buffer 2025, Socialinsider 2025). A 6 to 15 s reveal plays for shares and loops, not watch time.
- X ranking weights (PPC Land, 21 Sep 2026, reading `home-mixer/params/param.rs`; this repo's earlier read at commit 660cd74 differs, so recheck):
  - Positive: copy-link share 20, reply 5, quote 5, DM share 5, follow 4, native share 2, repost 1, like 0.5, video open 0.07, dwell 0.05.
  - Negative: mute −58.8, report −234.
  - Watch time barely counts. Being copied, sent on, replied to and followed does.

## Anticipation, suspense, reveal
- Dopamine neurons carry an uncertainty signal that peaks at a 50/50 chance; a fully predicted reward barely registers (Fiorillo, Tobler & Schultz, Science 2003 **[older]**).
- Suspense is the variance of the next belief; surprise is how far it moved (Ely, Frankel & Kamenica, JPE 2015 **[older]**).
- CS:GO on Twitch: one SD more suspense, +0.27 points of staying; surprise had no detectable effect (Simonov, Ursu & Zheng, JMR 2023, measured).
- Premier League minute-by-minute audiences: suspense, surprise and **shock** (the gap from the pre-match odds) all raise viewing (Buraimo et al., Economic Inquiry 2020 **[older]**). CoreWeave is a shock: 3 of 4 AIs said down and it rose 24.71%.
- Arousal rises before a loot-box reveal (Larche et al. 2019 **[older]**).
- Near-misses recruit win circuitry and raise the urge to play (Clark et al., Neuron 2009 **[older]**). **We do not engineer near-misses.**
- Ethics: Polymarket reportedly paid creators for fake wins (WSJ, June 2026; TechCrunch 21 Jun 2026). Show losses as clearly as wins; label the money as a simulated $100K, not advice. X's rules on gambling promotion changed twice in Feb and Mar 2026.

## Formats that travel
- **Alpha Arena (Nof1, Oct–Nov 2025):** an account-value leaderboard, positions and model reasoning. Big swings and US against Chinese models are what travelled.
- **Hyperliquid P&L cards:** a big signed number, the instrument, the side and a brand mark; one tap to post on X. Traders already read this shape.
- **Polymarket and Kalshi:** troll voice and affiliate reposts. A warning, not a model.
- **F1 timing tower:** viewers check how precise the gaps are and want the board stable round to round.
- **Fantasy, bracket busts, leaderboard flips:** the lone contrarian, the upset and the rank change get shared (practitioner, not measured).

## Vocabulary (⚑ = commonly missed)
- Hook and first frame ⚑
- Information hierarchy
- Pacing, rhythm and edit grammar (cut, match cut, smash cut)
- Reading time ⚑ (about 15 to 20 characters a second; at least about 0.85 s per caption)
- Kinetic typography
- Easing, anticipation and overshoot (Disney's 12 principles)
- Sound design and foley ⚑
- Music sync (the reveal and the loop seam on the strongest beat)
- Camera language (a push-in for tension, a hold for weight, a whip for a transition)
- Depth and parallax
- Colour script
- Contrast and value ⚑ (use + and − signs as well as green and red, for colour-blind viewers)
- Lighting, texture and grain, compositing
- Motion blur and frame rate
- Safe zones ⚑
- Burned-in text
- Narrative arc and stakes
- Characters, the parasocial cast
- Ritual and series identity ⚑
- Open loop and call to action ⚑
- Loop seam
- Accessibility (no flashing)
- Compression ⚑ (X: at least 5,000 kbps, H.264 High; 1080p for subscribers, 720p for everyone else)

## Rules drawn for a 6 to 15 s reveal
1. Frame 0 states the stakes in words ("CoreWeave: 1 AI long, 3 short").
2. Show the split before the answer, for about 2 to 3 s.
3. One reveal beat, under about 1.5 s, landing on a sound.
4. Name the shock in words ("Only GPT went long").
5. The losers' numbers as big as the winner's.
6. Hold every line for at least its characters ÷ 15 s, never under about 0.85 s.
7. End on a still result card shaped like a P&L card, held 2 s or more.
8. One line on what it does to the season.
9. Open a loop to the next round.
10. Loop the end into the start where it fits.
11. Signs, not colour alone; text inside the safe zone; no flashes.
12. 1080 wide, at least 5,000 kbps, H.264 High; a small "Simulated $100K · not advice" line.

Gaps: no X-specific data on length or cut rate; no human study from 2023 to 2026 on dopamine and short-video reveals; Reels findings may not carry over to X.
