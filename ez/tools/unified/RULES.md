# EZ · the world's rules (H31, 2026-11-02)

Rule zero, from the owner: decide the world's rules once, make every element obey them, and break them only on purpose,
for the one thing you want seen. Each section hands over to the next in the same rhythm and the same world.

The page is EZ Live XZ+, `ez/v50-live-xzplus.html`, built by `tools/unified/build.py` from `page.html`, `u.css`, `track.js`, `u.js`
(started from H30 concept B, `tools/concepts/worlds/comic/story/h/h30/b/`). A candidate: production stays X2+;
`SITE_PAGE=v50-live-xzplus.html python3 tools/site/make_site.py` builds a site from it.

## The world
A black circuit board seen head-on under one soft, even key light. Every object on it is a chip: a matte black body,
steel leads and glass windows. Words, numbers, films and faces live inside the glass. Nothing is in perspective, and
nothing has a rim light or a glow that does not carry a fact.

## Palette (one meaning per colour)
- Black `#04070e`: the ground, and the body of every chip.
- Cream `#f8f0d9`: every word, every mark and logo (one ink), and every line that is not #1.
- Green `#03c870`: right, profit, up. Only ever with a sign, an arrow or a W.
- Red `#ff3a31`: wrong, loss, down. Only ever with a sign, an arrow or an L.
- Gold `#fdbc2a`: #1, and what #1 decides (Bet #1 and NVIDIA's site on the wafer). Nothing else.
- Full colour lives only inside glass: the films and the founders' portraits.

## Type (three faces)
- Bangers: section titles and names. Titles only, never sentences.
- Bebas Neue: every figure that is read as a number (all ten digits one width).
- Shantell Sans: every sentence. Sentences are in sentence case, never all capitals.

## Ground and handover
- One ground for the whole page. Sections are separated by the same cut: a row of vias across the board.
- Every section is one phone frame (at most 664 px tall at 390 px wide) and is read in the same order:
  title, one line saying what this is, one chip, then the narrator line under the chip.
- On desktop every section is two columns: the chip on the left, the words on the right. The top follows the same rule.

## Motion
- Nothing moves unless the visitor starts it. Films are still pictures until tapped, then they play in place with sound.
- The only exception is the break below.

## Words
- "Trade" is what an AI does each round; the market close grades it; the "pool" is what gets bet.
- About 40 words per phone frame, one narrator line per section.
- Every figure is computed from `ez-data.js` at load. No number is typed by hand.

## The one break: the bet
Bet #1: NVIDIA is the one chip that is lit from below, warm, and its countdown is the only thing on the page that moves
without being asked. Its title is the only gold title. This is where the eye should land, because it is what is at stake.
If anything else starts to glow or move by itself, the break stops working.

## Keep it true
- Before adding anything, check it against every line above. If it needs a new rule, change this file first.
- Every CSS file stays brace-balanced (`build.py` checks `u.css`). The X2+ reduced-motion bug was one missing brace.
