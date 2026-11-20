# Night studio, 20 to 21 November 2026: the brief every desk works from

## The owner's words (22:55 UTC, before bed)

> "Definitely directionally, the X2P feed teaser up draft, but the music, I prefer the feed pre-teaser draft... work on 10 videos for the feed, different concept of the feed, how it looks, interactions, other features we can build on top. Give me 10, and then give me another 10 mock-ups as well for how the feed should look once it's ready for production. And then... redesigning the outcome videos and prediction videos, where the branding is never missed, but also just different design, different layout, different styles... borrow from some of the creativity that you use for these samples and animation samples... a season 1 and a season 2 filter at the top of the website. And when you switch to season 2, it just changes the font, the style in general as well. The color spectrum to some extent stays the same, but the style, the fonts, the layouts to some extent do change a bit... shifting styles between seasons, so it's not monotone... go nuts, go creative... highest quality marketing professional, do additional research, create a team... reverse engineer the structure of like a high level marketing firm... take my incomputable adjectives and making them computable, take my input, make it better."

Earlier the same day:
- The feed is in-app: a phone with the real app UI, zoom ins and pop outs, a glass layer, crisp type, one thing in focus per shot.
- Feed-1's post layout is liked: the AI's words with the key clause marked, then the company row with "LONG (+4%)" and "58% confident".
- "In plain words, our reading of <AI>" is liked: we simplify what the AIs think.
- "We're trying to sell trust... complexity wrapped in simplicity", not accuracy.

## The firm (how a top agency is built, and who does what tonight)

A full-service agency runs one loop:
1. **Strategy** (planners: audience research, the insight, the single-minded proposition).
2. **Creative** (a creative director over art director and copywriter pairs).
3. **Design and motion studio.**
4. **Production and post** (sound, finishing).
5. **QA and traffic** (checks, versions, delivery).
6. **The account side** (one presentation to the client, with recommendations).

Tonight:

| Desk | Role | Delivers |
|---|---|---|
| Strategy | research and the insight brief | `night/RESEARCH.md`, a Grok prompt for the morning |
| Feed films A | concept films 1 to 5 | `ez/x2p-night-fv<n>.mp4` |
| Feed films B | concept films 6 to 10 | `ez/x2p-night-fv<n>.mp4` |
| Feed product A | production mockups 1 to 5, in the live terminal | boards `ez/x2p-night-pm<n>-{390,1280}.png` + pages |
| Feed product B | production mockups 6 to 10 | same |
| Season system | the Season 1 / Season 2 switch and the Season 2 style | boards + one animated switch film |
| Outcome films | 5 redesigns of the close video | `ez/x2p-night-ov<n>.mp4` |
| Prediction films | 5 redesigns of the prediction video | `ez/x2p-night-pv<n>.mp4` |
| Creative director, QA, account | me: briefs, frame review, the review page | one review link |

## The owner's adjectives, made computable (every piece is checked against these and the report gives the numbers)

| Word | Check |
|---|---|
| **Different / go creative / go nuts** | Each piece differs from every sibling in at least 3 of: layout, type pairing, ground or material, camera grammar, story structure, motion grammar. It also differs from the existing samples (`ez/x2p-anim-*.mp4`, `ez/x2p-oc-*-draft.mp4`, `ez/x2p-feed-*-draft.mp4`). Name the 3 in the report. |
| **Highest quality / professional** | One single-minded message per piece, written as one line before building. Words on screen ≤ 8 a shot, held ≥ 1 s + 0.08 s a character, with no punctuation. Smallest text ≥ 24 px on the 1080x1350 frame (UI text inside a phone may be smaller only if it is texture, not something to read). Siblings aligned within 1 px. Every number equals the data. |
| **Branding never missed** | The EZ. logo (`ez/tools/v22/x2p-logo.svg`) or the wordmark "Earnings Zeason" is on screen within the first 1.0 s and in ≥ 90% of frames (a bug in one fixed corner counts). The film ends on the logo, held ≥ 1.5 s. Colours come only from the brand palette: logo black #04070e, cream #f8f0d9, green #03c870, red #ff3a31, gold #fdbc2a, plus each company's own logo colours. Evidence: brand in the first seconds lifts recall in feed video (research desk cites the source). |
| **The house bug (one rule for every video kind)** | The EZ. logo, 64 px tall, with "Earnings Zeason" beside it in the piece's own face, sits in the top-left corner 44 px from both edges on the 1080x1350 frame. It is never covered, from the first frame to the end card. Every film, whatever its style, shares this corner, so a scroller learns it. |
| **Exciting / upbeat** (from the feed teaser round) | A new shot or a major camera move every ≤ 1.5 s on average. Every cut and pop within 40 ms of a beat. A measured drop (`beat.py`) on the key reveal. `wrapqa.py` median motion ≥ 6. 0 frozen half-seconds. The music runs to the last frame. |
| **Handcrafted** (from the close-video note) | A painted (Hedra) or purpose-made ground, never a flat gradient. At most two faces, chosen on purpose, with tabular figures for numbers. Every card is a material (glass with an edge light, grain, shadow), never a plain translucent box. |
| **Not monotone** (seasons) | Season 2 changes every typeface, the layout grid and the component shapes, and keeps the hues (each colour token within ΔE 10 of Season 1's). |
| **Production-ready** (feed mockups) | Shown inside the live terminal (`ez/v53-terminal.html`), never as a new app. Real data from `ez/data/s2-calls/calls.csv`. Phone 390 and desktop 1280. States drawn: before the call, calls in, graded. Text contrast ≥ 4.5:1. Tap targets ≥ 44 px. Nothing overflows at 320. |

## Hard rules (owner's, standing)
- **Sides and money:**
  - An AI's side is only **LONG** or **SHORT** (never "up/down", "bet on a fall").
  - Money is a signed P&L with its label ("P&L +$12,790"); never "made", "lost" or "won" as the verb for money.
  - Never "paper", "simulated", "every earnings report", "not real money".
- **Punctuation:** none in our own on-screen lines. The AIs' verbatim posts and real UI text keep theirs.
- **Prediction wording:** "LONG (+4%)" and "58% confident" on a post row, not "called +4%".
- **Plain words:** our plain-words reading never adds a fact the AI did not write (the research's "Beat confirms slower growth" was wrong for Grok, so not used).
- **Phones and screens:**
  - A phone in a film shows the real app's UI.
  - A screen in a scene is landscape; a phone held in hand is the exception the owner asked for.
  - Lifted cards grow with layout `zoom`, never `scale()` under perspective (Chrome rasters it at 1x).
- **Generated art:** carries no words or numbers.

## Data and assets
- **The 15 Season 2 calls (Intuit, Keysight, Elastic)** are in `ez/data/s2-calls/calls.csv`. Each row has:
  - side, size, confidence;
  - every reasoning field verbatim;
  - the outcome: move, right/wrong, P&L.
- **The calls in short:**
  - Intuit −12.79%: SHORT Claude and Grok right; LONG GPT, Gemini, Qwen wrong.
  - Keysight −7.07%: SHORT Grok and Gemini right; LONG GPT, Claude, Qwen wrong.
  - Elastic −2.20%: SHORT Qwen right; LONG GPT, Claude, Grok, Gemini wrong.
- **Season 2 board:** Grok +$17,660, Claude +$3,520, Gemini −$7,920, Qwen −$17,660, GPT −$22,060.
- **The close data file:** `ez/tools/concepts/dopa/data/close-2026-11-20.json`, with paths, moves and P&L, written by `prep-close.js`.
- **Feed data used by the teaser:** `dopa/w6/fl/data.json`, built by `prep.py`. It holds posts, logos, the plain-words readings and key clauses.
- **Season 1:** `ez/ez-data.js`, 112 rounds. Final P&L: Grok +$169,450, Claude +$107,020, GPT −$19,780, Kimi −$149,500.
- **Marks and logos:**
  - Model marks: `dopa/models5.json`.
  - Company logos: `dopa/data/co/` and `dopa/w6/fl/`.
  - The EZ. logo: `ez/tools/v22/x2p-logo.svg`.
- **Pages to learn from:**

| Page | What it shows |
|---|---|
| `fl-feed.html?pace=up` | The direction the owner picked for feed films: the phone, real UI, glass lifts, the plain-words panel. |
| `fl-pre.html` | The pre-teaser. Its music, m3-electro, is the one the owner prefers. |
| `s2d.html` | Paint plus glass. |
| `close.html`, `oc-a..d.html` | Outcome takes. |
| `an-in3.html` | The prediction take with every reason. |
| `outcome.html` (glass mode) | The gold `.rim` and `.foil` shine. |
| `ez/tools/concepts/release/vid2.html` | The owner's favourite product video: phone, finger taps, flings, lifts. |

## Music
The owner prefers **m3-electro** (124 BPM; its kick enters at 7.75 s, beat 16 at 7.767 s) over r10-house for the feed.
- Feed films use m3-electro by default. A desk may cut it on its beat grid with `bedx.py` so the drop lands on its own key moment.
- Other beds are open for outcome and prediction films (`ez/tools/concepts/launchvid/hedra/music/`):

| Bed | Tempo and drops | Owner's view |
|---|---|---|
| m2-phonk | 30 s, outcome bed | liked |
| w8f-horns | 174 BPM, drops 12.41 s and 26.55 s | picked for the Season 2 announcement |
| w6-dnb-x | | |
| m1-trailer | | |
| r10-house | | |
| i4-house | | chill, liked for the release video |

- Measure tempo and drops with `beat.py`. Fit a bed with `fitbed.py` if needed.
- Nobody here can hear: the checks are the numbers.

## How to build and render (the house pipeline)
- **Where files go:**
  - Pages live in `ez/tools/concepts/dopa/` (render.js serves that folder on :8993), named `nt-<id>.html`.
  - Assets go in `dopa/w6/nt/<id>/`.
  - Read `fl-feed.html` and `lib.js` first for the frame-page contract: `window.R(t)` draws time t, plus `READY`, `DUR`, `MUSIC`, `CUES`.
- **Stills first:** `node /tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/s2f/still2.js "nt-<id>.html" <prefix> <t> <t>...`. Look at them yourself and fix before rendering.
- **Render command:** from `ez/tools/concepts/dopa`, run `MB=2 CHUNK=150 CRF=22 bash wrapxs.sh "nt-<id>.html" <seconds> x2p-night-<id> <bed> 0 .34`.
  - It writes `ez/x2p-night-<id>.mp4`.
  - `wrapxs.sh` is `wrapx.sh` with `MB` (motion-blur samples) taken from the environment. Use MB=2 for tonight's samples.
  - It shares wrapx.sh's lock, so renders queue one at a time across all desks. A render may wait for others: that is expected, do not kill another desk's render.
- **QA after each render:** `python3 wrapqa.py ../../../x2p-night-<id>.mp4`, which gives motion and frozen windows. The length check is for wrap-ups; ignore it.
- **Disk:**
  - About 1.2 GB is free for all desks together.
  - Before each render run `df -h /home/user`, and do not start one under 300 MB free.
  - Delete your own stills and temp files when done, using explicit paths only. Never `rm -rf` a shell variable.
  - Keep each film 12 to 22 s.
- **Commits:** do not commit or push; I commit.
- **Hedra:**
  - `HEDRA_API_KEY` is in the environment. Never print or commit it.
  - API notes are in `ez/hedra/REPORT.md`; examples in `dopa/w6/s2/gen.sh` and `dopa/w6/ch/gen.sh`.
  - Each desk may spend up to $3, and says what it spent.

## The report every desk sends back
For each piece:
- the file path and the page with its switches;
- the single-minded message in one line;
- the 3 ways it differs from its siblings;
- every check above with its number;
- what is weak;
- any question for the owner.

Keep it plain and short. The owner reads the review page, not the report; I write the page.
