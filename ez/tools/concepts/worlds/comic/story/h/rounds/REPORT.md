# Round H, area `rounds`: logos on the newsstand rack, every round a comic cover (2026-10-31)

Owner: "on each cover, you can also have a beautifully hand-drawn logo of the biggest companies that already reported", so the opener (`ez/hedra/openers/o2-rounds-gpt-image-2.jpg`) and the tiles under it align.

Boards: `ez/x2p-x3p-h-rounds-390.png`, `ez/x2p-x3p-h-rounds-1280.png` (today's live section first, then each take with its Hedra cost, then close-ups).
Run: serve `ez/` on :8931, then `node run.js <out> now,r1,r2,r3,r4,r5,r6,t1,t2,t3,t4,t5 390,1280,320` and `/usr/bin/python3 board.py <out> ez/x2p-x3p-h-rounds`.
Code: `_r.js` / `_r.css` (shared), one small `rN.js(.css)` / `tN.js(.css)` per take; `hd.py` (Hedra client: upload, submit, poll with 429 back-off, save JPG q88), `recover.py` (fetch a finished job whose poller died), `crop.py` (cuts the flat bands the model left above and below the tile art into `*-c.jpg`).

## Which companies (live, never typed)
`HR.biggest(9)`: every graded round in ROUNDS, newest per ticker, with a logo file, sorted by CAPS (market cap, $bn). Today: Microsoft (R61), Alphabet (R60), Amazon (R74), TSMC (R30), SpaceX (R34), Meta (R38), Tesla (R40), Eli Lilly (R70), Samsung (R64). Apple and NVIDIA are not graded yet, so they are not on the rack. Each cover links to its round (`#/round/n`) and carries its round number as page text.

## Part 1: the rack (all checked at 390, 1280, 320: no sideways scroll, no console errors)
| Take | Method | Hedra job | Cost | Result, honestly |
|---|---|---|---|---|
| R1 | A: new blank pop rack, logos placed by the page | gpt-image-2, 1K medium 16:9 (`rack-A2`) | $0.029 | Covers flat and frontal, so placement is easy and exact; the rack itself is flatter and plainer than the opener (a box rack on a wooden floor, not the spinner). |
| R5 | A on the opener: the opener edited into nine blank, forward-facing covers, logos placed by the page | gpt-image-2, 2K high, opener as reference (`rack-A3hi`) | $0.234 | **My pick.** Same street, starburst and kiosk as the opener the owner approved; logos exact and live (Apple or NVIDIA would replace the smallest when graded). Logos are small on a phone (about 30 px). |
| R4 | C': themed covers painted around an empty badge, logos placed live | gpt-image-2, 1K medium (`rack-C1`) | $0.029 | Each cover has art for its company (four-colour skyscraper, rocket, parcel...), the logo sits in the badge. The art is tied to today's nine: when the list changes, a cover's art no longer matches its logo. |
| R2 | B: model paints the logos, nine logo files as references | gpt-image-2, 2K medium, opener + 9 refs (`rack-B1`) | $0.178 | Every letter checked at full size (tsmc, SPACEX, SAMSUNG, Lilly's L, the Google G's colours): correct. Logos are part of the painting, so they read as printed. Baked: frozen to today's nine. |
| R6 | B at 2K high | same, quality high (`rack-B3hi`) | $0.344 | Richer cover art round each logo; letters correct; TSMC's thin red underline bar is dropped. Baked. |
| R3 | C: a fresh rack, art drawn around the logos | gpt-image-2, 2K medium, 9 refs (`rack-C2`) | $0.166 | Most dramatic covers (a rocket over the Earth for SpaceX, a car on Tesla's); letters correct; SpaceX is grey, not white. Baked; does not match the opener's scene. |
| rejected | B on nano-banana-pro | 2K, same refs (`rack-B2`) | $0.164 | Wrote "L'Oréal" for Eli Lilly's L and invented "TESLA" and "amazon" wordmarks that were not given. Rejected, shown in the close-ups. |

Pop: every cover is a layer of its own (a registered copy of the painted cover, clipped to its corners), and when the rack scrolls into view each one lifts out of its pocket in turn (scale 1.075, a small tilt, a three-step ink extrusion and a hard cast shadow; once, not with reduced motion). Logos on blank covers sit on a hand-drawn roundel (12 jittered points, thick outer ink, thin inner highlight, faint dots in the shade), mapped to the cover's perspective with a homography; dark-ground logos (Amazon's white "a") get a dark roundel, logos drawn on a black tile (SpaceX, Samsung) get their tile's colour and an oval cut.

How they can fail: baked takes (R2, R3, R6) go stale the day Apple or NVIDIA is graded (the page logs "rack art out of date" and sets `data-hr-stale`; regenerating is $0.17 to $0.34); the cover corners are measured by eye per image, so a new rack image needs new corners; on a phone the logos are small (the rack is about 360 px wide); the caption ("The biggest names graded so far.") shows on desktop only, it covered the top row on phones.

## Part 2: every round a comic cover
Each tile is rebuilt as a cover: painted art in the middle, the company logo as the masthead on a hand-drawn roundel, a Marvel-style corner box with the round number and the winner's coin(s) (a red × for nobody), the move in a jagged burst (green up, red down; irregular per round, seeded by its number), the name strip with who won. Everything but the art is page text from ROUNDS. Art for the 12 tiles shown before "Show all" (rounds 80 to 69); other rounds fall back to their film poster.

| Take | Art | Cost | Result, honestly |
|---|---|---|---|
| T1 Silver Age cover | gpt-image-2 1K medium, 12 company themes (refinery, lab, chip city, oil rig, gold coin, coin vault, parcel hero, memory-card mountain, speech-bubble storm, coffee cup, capsules, DNA) | $0.442 | Strongest set: it reads as a rack of comics, the five no-film rounds (80, 79, 77, 76, 75) stop being black squares. Loud: every tile has a burst, so the section title has competition (lesson 71). |
| T2 Golden Age newsprint | gpt-image-2 1K low, 12 (+1 moderated and retried: Intel) | $0.060 | Cheapest by far ($0.005 a cover) and looks it in places (soft faces); the red title banner and the price-circle issue number make it the most "cover" of the five. |
| T3 Painted 3D variant, 2 a row | seedream-50-pro 1080p, 12 | $0.810 | The most rendered art (lit, modelled), a 70s side strip with the round number, foil logo plate; covers are twice the size, so the section is twice as long on a phone (6 rows for 12). |
| T4 The film is the cover | film posters, T1 art where no film | $0 | The films' own art leads; a "Graded at the close" seal. The posters carry their own baked board text, so the tile shows two sets of numbers at once (busy). |
| T5 Brand duotone | T1 art printed in the company colour | $0 | Brand colour everywhere, but black brands (Intel, Strategy) go grey-on-black; cream is used there. Reads flatter than T1. |

How they can fail: art is per round, so every new round needs a cover ($0.037 on T1 medium, $0.005 on T2 low, $0.068 on T3); all 80 on T1 would be about $3. My prompts asked for calm bands at the top and bottom, and the model letterboxed the art instead (flat pale bands); `crop.py` cuts them off, the next prompts should ask for full-bleed art. The 103 px phone tile holds logo, round, coin, move, name and winner: tight; the winner line is 7.5 px at 320.

## Two readings, both made
"Logos of the biggest companies that already reported": I read "biggest" as market cap (CAPS) and "already reported" as graded (in ROUNDS). If the owner meant "the biggest moves" or "the newest reporters", `HR.biggest` is the one function to change.

## Spend
| Job | Model / settings | Cost (estimate = charge) | Time |
|---|---|---|---|
| rack-A2 | gpt-image-2 1K medium 16:9 | 0.029 | ~31 s |
| rack-C1 | gpt-image-2 1K medium 16:9 | 0.029 | ~31 s |
| rack-B1 | gpt-image-2 2K medium, 10 refs | 0.178 | ~110 s |
| rack-B2 | nano-banana-pro 2K, 10 refs | 0.164 | ~40 s |
| rack-C2 | gpt-image-2 2K medium, 9 refs | 0.166 | ~110 s |
| rack-A3hi | gpt-image-2 2K high, 1 ref | 0.234 | 87 s |
| rack-B3hi | gpt-image-2 2K high, 10 refs | 0.344 | 96 s |
| t1-69..80 | gpt-image-2 1K medium 3:4, x12 | 0.442 | ~32 s each |
| t2-69..80 | gpt-image-2 1K low 3:4, x13 (one moderated) | 0.062 | ~18 s each |
| t3-69..80 | seedream-50-pro 1080p 3:4, x12 | 0.810 | ~100 s each |
| **Total** | | **about $2.46** of $15 | |

Per-job records in `jobs.jsonl` (the first batch's pollers hit Hedra's 60 requests a minute limit and were recovered with `recover.py`; their cost is the estimate, which has equalled the charge on every job so far). The shared balance moved more than this because other areas ran at the same time.
