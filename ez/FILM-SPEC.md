# Round film spec (for the animator)

Written 2026-10-30. Hand this to whoever makes the round films. If every film follows it, the site can use each film as delivered, with no trimming, cropping or nudging.

## Why this exists

The site shows the same square film in five places, and each one shows a different part of it. I measured the live site (earningszn.xyz, 30 Oct 2026):

| Where | Phone (360 to 430px wide) | Small phone (320px) | Desktop |
|---|---|---|---|
| The round's card (record, swipe) | 96 to 97% of the width, full height | 61% of the width | full |
| The card opened big | 92 to 96% of the width | (not measured) | full width, 98% of the height |
| "Every round so far" thumbnail (the last frame) | full width, 86% of the height | same | same |
| "One round, start to finish" (poster, then the film) | full | full | being fixed (it showed only half the width) |

So anything close to an edge gets cut somewhere:
- numbers near the left or right edge get cut on phone cards;
- titles near the top or bottom get cut on the thumbnails.

Until now I fixed that film by film by sliding the crop sideways. That sometimes meant cutting one AI's number to save another, as with HSBC and ServiceNow, where GPT's call fell off the phone card. Wide 16:9 renders (eBay) had to be cut down and set on a blurred band.

## The rules

1. **Square, 1:1.** Render at 2160 x 2160, as now. 24 to 60 fps are all fine. No 16:9.
2. **Safe area.** Everything someone must read sits inside the middle **88% of the width** and the middle **84% of the height**:
   - the four calls;
   - the market's move;
   - the round label;
   - the crown;
   - the end-card motto.

   On a 2160 frame that box runs from x 130 to x 2030 and from y 173 to y 1987. Scenery can fill the whole frame.
3. **Small phones (nice to have).** If the four calls and the market fit inside the middle 60% of the width (x 432 to x 1728), they show even on the smallest phones (320px).
4. **The same beats in every film,** so the site can start the clip at the climax:
   - **by 0:07** all four calls are on screen, and they stay there;
   - **0:09 to 0:10** the market's move is revealed;
   - **by 0:12** the winner is crowned or turned gold ("Nobody" or "All got it wrong" when the sheet says no winner);
   - **from about 0:16 to the end** the end card holds still, with all four calls, the market, the crown, the round label and the motto.

   The site's walkthrough then plays from 0:07, so a visitor sees under ten seconds: the calls already up, the market resolving, the winner crowned.
5. **The last frame is the poster and the thumbnail.** Hold the finished end card for at least 1 second at the end, everything inside the safe area.
6. **On-screen facts match the sheet:**
   - the round number;
   - the company;
   - all four calls with their signs;
   - the market's move;
   - the crown on the sheet's winner.

   Two films (Coca-Cola, UPS) had the wrong round number, and one (Google) crowned the wrong AI. Those had to be held or repainted.
7. **One clean audio track.** Export the audio once, straight through: no pasted or duplicated audio between cuts. The explainer film had duplicate audio packets that made the voice drift late on some phones.

## What I still check on every film

The numbers against the sheet, the crown, the audio packets, and the crop at 320, 390 and 1280px. Films that follow rules 2 and 4 need no crop setting (`STILLX`) and no hand-picked start time.
