# Prediction videos: what the research says, and the five takes built on it (2026-11-13)

The prediction video is the post that goes out with a round's calls, before the result. About a day later the outcome video quotes it. Sample round: R109 Applied Materials (3 long, 1 short).

Labels: **code** = read in X's own ranking code (github.com/xai-org/x-algorithm at `cec6168`, 12 Nov 2026) or X's developer docs; **third-party** = blogs and vendor studies; **assumed** = my own reasoning, untested.

## What X's ranking does with a short video

| Finding | Source | Label |
|---|---|---|
| Watching earns nothing directly: video view, video open and watch-continuation weights are all 0.0. | `home-mixer/params/param.rs` (`VqvWeight`, `VideoOpenWeight`, `PostVideoWeight`), `scorers/value_model.rs:39` | code |
| A "quality view" only counts for videos over 10 s (`MinVideoDurationMs` 10,000), but its weight is 0.0, so length is free today. | `param.rs`, `util/candidates_util.rs:30-33` | code |
| What scores: copy-link share 20, reply 5 (+15 between mutual follows), quote 5, DM share 5, follow 4, share 2.1, repost 1, like 0.7, dwell 0.05. Report −234, mute −58.8, not interested −53. | `param.rs` | code |
| A quote post is an original post with its own conversation, so the outcome video gets its own shot at the new-author boost (50K followers or fewer, post under 2 h old, under 200 impressions). | `filters/inventory_holdout_filter.rs:149`, `scorers/author_cold_start.rs:188-192`, `filters/dedup_conversation_filter.rs:42-49` | code |
| Posts older than 48 h are dropped, and a quote is dropped if the post it quotes is dropped: the outcome must go out inside 48 h of the prediction. | `AgeFilter`, `AncillaryVFFilter` | code |
| A second and third post by one author in the same feed score x0.625 and x0.4375. | `vm-ranker/params.rs:181-191` | code |
| Look-alike posts compete in one feed (a diversity re-rank on picture and text embeddings), and a duplicate-content label exists whose trigger is not published. | `vm-ranker/dpp.rs`, `visibility-filtering/rules/tweet_rules.rs:971-976` | code (the effect on a daily template: assumed) |
| Upload spec: H.264 High, 30 or 60 fps, at least 5,000 kbps, AAC. A non-Premium uploader gets 720p playback. | docs.x.com media best practices | code |
| Videos autoplay muted and short ones loop. | Meltwater, dlvr.it; help.x.com could not be reached | third-party |
| Share of viewers with sound off: 80 to 92% in vendor blogs and a 2019 Verizon Media study, none specific to X. No first-3-seconds data for X exists. | see `x-dopamine-research.md` | third-party |
| Suspense (an open question with a known deadline) holds viewers; surprise alone does not. | Simonov, Ursu & Zheng, JMR 2023; Ely, Frankel & Kamenica 2015 | third-party (measured, not on X) |

## Design decisions that follow

| Decision | Because | Label |
|---|---|---|
| Design for a share, a reply or a follow, not for watch time. Each take leaves one open question on screen at the end ("3 long vs 1 short. Graded Fri 4 PM ET"). No "reply with your pick" line (the owner cut that on 29 Oct). | weights above | code + assumed (that an open question earns replies is untested) |
| Any length from 6 to 15 s is allowed. | the 10 s gate has weight 0 | code |
| Every fact is readable with the sound off; frame 0 names the company and the report time. | muted autoplay | third-party |
| The type that carries a fact is 26 px or larger; labels and footnotes go down to 18 px (the outcome video's own footnote size). At 720p playback 26 px is 17 px. | 720p for non-Premium | code |
| The outcome video quotes the prediction inside 48 h, and the two are the only posts that day if possible. | age filter, same-author decay | code |
| The prediction video shares the outcome video's frame, rows and chart box, so the outcome reads as part two. | suspense needs a visible, shared deadline | assumed |
| The look varies with the round (the company's logo and name fill frame 0; the split changes the layout), but one template every day may still be treated as look-alike content. | diversity re-rank | assumed, flagged |
| Never "locked N minutes before": the sheet has no posting time. Never a result or a hint of one. | owner rule | n/a |

## The five takes, a ladder from calm to intense

All five: 1080x1350, 30 fps, 3-sample motion blur, the outcome video's colours, type, header, footer and row design. `bash tools/concepts/dopa/pred.sh 109 <1..5>` after `node tools/concepts/dopa/prep-calls.js 109`.

| | Take | Length | Main carrier | Facts shown | Built to earn |
|---|---|---|---|---|---|
| 1 | Slate | 6 s, a loop | type: the split, four rows lit in turn | company, report time, 4 sides, 4 calls, split, close | a share (it reads as a still, so it survives autoplay off) |
| 2 | Roll call | 9 s | two columns filling as each AI files | the same, counted one by one | a reply (the lone dissenter lands last) |
| 3 | Into the report | 10 s | chart: the stock's real 7 days into the report, a wall at EARNINGS, each call projected past it | + the run-in | a follow (the chart stops where the outcome video starts) |
| 4 | The stake | 11 s | face-off panels, then a slider: what a close up or down pays each AI | + what each AI makes or loses on a move | a reply or quote (it shows who pays whom) |
| 5 | Trailer | 14 s | all of the above in sequence, the face-off on the music's drop | everything | a share (the full story in one post) |

The run-in is Hyperliquid's own hourly closes for the company's market, in % from seven days before the report. It is drawn only when the company has a market there; nothing is invented. "If it closes +5%" in takes 4 and 5 is arithmetic on the rule ($100K flat, side x move), labelled as an "if", never a forecast.
