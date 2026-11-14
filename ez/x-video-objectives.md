# Short-form video for X: the owner's words as measured checks

Started 2026-11-11, after the owner said: "majestic animation, cinematic, short form video content based on research... take any sort of non-computable objective and then turn it into a computable objective."

Each word the owner uses becomes a number, a threshold and a way to measure it. Every video is scored on this list before he sees it. The **Source** column says where each threshold comes from:
- **measured:** we checked it ourselves;
- **research:** a cited outside source;
- **mine:** my proposal, open to change.

## 1. Brand colours ("always use our brand colors")

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| Off-brand pixels | under 2% of the frame | `tools/concepts/fresh/palcheck.py` | Threshold: mine. Calibration: measured. |

The palette check samples one frame a second.
- **What counts as on-brand:** coloured pixels must sit in a brand hue, meaning gold (#fdbc2a), green (#55d6a2 / #03c870) or red (#e8576b / #ff3a31).
- **AI mark colours:** Claude orange and Kimi blue may cover at most 3% of the frame between them.
- **Everything else** must be a neutral: the site's warm near-blacks and creams.
- **Calibration:** the approved release video scores 0.4%, the blue party test 63.6%, and the brown elevator draft 41.4%.

## 2. New ("completely new, not something we've already done")

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| Elements reused from earlier EZ posts or pages | 0 | Checklist, below | mine |
| Main carrier never used by EZ before | yes | Search the repo and the skill for the carrier | mine |

Elements on the reuse checklist:
- AI logos on discs;
- a speech bubble holding a %;
- a green/red split screen;
- the yellow pill banner;
- the "Who wins?" end card;
- Season tickets or stubs;
- comic or pop art;
- a P&L terminal or chart;
- casino sets;
- fight night;
- the chip or vault.

## 3. Hook ("short form", the first seconds)

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| The conflict is readable | by 1.0 s, sound off | One frame at 1.0 s answers "which company, and who disagrees with whom" | Hook research: research. 1.0 s threshold: mine. |
| First frame | already shows something with meaning (no blank or title-only frame) | Frame 0 | mine |

The research behind the hook rows: short-form platforms' own guidance and 2026 creator analyses put the decision to keep watching in the first one to three seconds. These are vendor sources, so treat them as a direction.

## 4. Comprehension with the sound off

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| Facts on screen | all 6 by the last beat | Count the frames that answer each fact | mine (from the "lead, not instruction" rule) |
| Reading load | at most 5 new words per beat | Count per beat | mine |
| Hold time | at least 1 s + 0.08 s per character | Measure per beat | mine |

The six facts are:
1. the company;
2. that four AIs traded it;
3. each AI's side;
4. each AI's size;
5. when it settles;
6. that it is EZ.

## 5. Cinematic

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| Camera never still | no run of identical framing longer than 1.5 s, except one planned read-hold | Frame differences | mine |
| Depth | at least 3 layers moving at different speeds (parallax) | Render layers | mine |
| Motion blur | on anything moving faster than 30 px per frame | Renderer setting (MB at least 2) | mine |
| Something changes every 2.0 s or less | a cut, a reveal or a camera turn | Beat sheet | Research: Cutting et al. measured Hollywood's average shot length falling to about 4 s by 2010. Short-form runs faster, hence my 2 s. |

## 6. Majestic

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| One hero moment | the hero object fills at least 60% of the frame | Bounding box at the peak frame | mine |
| Hold on the hero | at least 0.8 s | Frame count | mine |
| Scale contrast | hero to smallest element at least 4:1 | Measure the peak frame | mine |
| Slow motion | one beat at half speed or slower | Beat sheet | mine |

## 7. Game feel ("head of Nintendo... micro interactions")

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| Hit-stop | 50 to 100 ms on every impact | Timeline | research: Sakurai's hit-stop, and game-feel guides |
| Three phases | every arrival has anticipation, overshoot and settle | Curve check | research (animation principles) |
| Sound | every impact sound within 1 frame (33 ms) of the hit | Cue list against frame numbers | mine |
| Idle life | no character fully still for more than 1 s | Frame differences per element | mine |

## 8. Not cheap ("attention to detail")

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| Overlaps and clipped text | 0 | Frame strip every 0.25 s | measured (the release video passes) |
| Edge safe area | no text closer than 48 px to the edge | Bounding boxes | mine |
| Flat fills | no single flat fill over 30% of the frame without light or texture | Luminance spread in large areas | mine |
| Loudness | -14 LUFS, 1 dB either way | ffmpeg ebur128 | measured on the release video |

## 9. X goal (what the post is for)

| Check | Threshold | How it is measured | Source |
|---|---|---|---|
| The end invites a reply | the last frame asks a question a viewer can answer | Last frame | research: in X's open-sourced ranking code (commit 660cd74), a reply weighs 5, a follow 4, a like about 0.7, and video watch time 0. The live weights are not published. |
| Length | 8 to 15 s | Duration | mine |

---

## The four new directions (key frames, 2026-11-11), scored

These are frame-level checks only; motion checks wait for the animatic.

| Check | B elevator | C serif type | D darts | E group chat |
|---|---|---|---|---|
| 1. Off-brand pixels | 0.3% pass | 0.1% pass | 0.2% pass | 0.1% pass |
| 2. Reused elements | 0 | 0 | 0 | 1 (bubbles) |
| 3. Conflict readable in the key frame | partly (no "1 v 3") | yes | partly | yes |
| 4. Facts on the key frame (of 6) | 5 (no EZ) | 6 | 5 (no EZ) | 5 (no EZ) |
| 4. Size shown to scale | no (ordered only) | no | yes | no |
| 6. Room for one hero moment | a button lighting | the giant "3" | a dart in slow motion | weak |
| 9. Natural reply question | "Which floor?" | "Who's right?" | "Where does it land?" | "Pick a side" |
