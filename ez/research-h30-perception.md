# H30 · Perception from first principles: what a phone screen can carry, what the colours mean, which world, which type (2026-11-02)

For the owner's question "are the chip world and the palette even right?". Read with `h/h29/SPEC.md` (the lead's rules) and `h/flowaudit/REPORT.md` (the live page measured on 2 Nov).

Labels: **[measured]** a study or field data, or a number I computed here today · **[platform]** a vendor's own guideline · **[practice]** what designers or vendors report · **[opinion]** my reasoning. Every source carries its date. Where I could only find a secondary write-up, I say so.

---

## 1. How people take in a phone screen

**Where the eye goes first**
- **Top-left first, and text before decoration.** 30 people, 193 real mobile UIs: a strong bias to the top-left corner, to text and to images; colour and size had *less* pull than expected; expectations (where people think the important thing is) guided gaze more than brightness ([Leiva, Oulasvirta et al., MobileHCI 2020](https://arxiv.org/abs/2101.09176)) [measured]. So "make it bigger and brighter" is a weaker lever on phones than putting the fact where it is expected.
- **Faces and text grab gaze almost automatically.** In free viewing, people fixate faces 16.6x and text 11.1x more than equal-sized control regions, and keep doing so even when it costs them ([Cerf, Frady & Koch, Journal of Vision 2009](https://resolver.caltech.edu/CaltechAUTHORS:20130816-103355264)) [measured, foundational]. A founder portrait on a model chip will be looked at before the P&L beside it; four portraits on one screen compete with each other and with every number.
- **The start of motion captures attention; ongoing motion much less.** A target that begins to move is found faster than one that is static or constantly moving ([Abrams & Christ, Psychological Science 2003](https://pubmed.ncbi.nlm.nih.gov/12930472/)) [measured, foundational; debated by Franconeri & Simons on what exactly captures]. A loop that starts when its section arrives does the work; endless pulses add cost, not attention.

**First impressions are made in 17 to 500 ms, by complexity**
- Website screenshots shown for 17, 33, 50, 500 or 1,000 ms: visual complexity and prototypicality (how much it looks like its category) already shape appeal at 17 ms; low complexity + high prototypicality is rated most appealing; complexity is processed first ([Tuch et al., IJHCS 2012](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/)) [measured].
- 548 people, 450 sites, 500 ms exposures: computed complexity and colourfulness (plus age and education) explain about half of appeal; complexity matters far more than colourfulness ([Reinecke et al., CHI 2013](https://www.eecs.harvard.edu/~kgajos/papers/2013/reinecke13predicting.shtml)) [measured]. Preferred levels vary by country (CHI 2014, 40,000 people, same group) [measured].
- Attractive interfaces are judged easier to use, before and after use (Kurosu & Kashimura 1995, 252 people; replicated by [Tractinsky, CHI 1997](https://chi1997.acm.org/proceedings/paper/nt.html)) [measured, foundational]. Beauty is not decoration for this audience: it is part of the "is this a project or a rug" check.

**How much one screen holds**
- **About four chunks.** The focus of attention holds about 4 chunks in adults (Cowan 2001; visual arrays: Luck & Vogel 1997); the exact number is still argued (3 to 5) ([Morra et al., Journal of Cognition, July 2024](https://journalofcognition.org/articles/10.5334/joc.387)) [measured, foundational + 2024 review]. One phone screen should ask the visitor to hold no more than four things: four steps, four models, four figures on a chip is the ceiling, not the floor.
- **The phone in question.** 390x844 is the 4th most common mobile resolution worldwide (6.81%, Aug 2026), 11% in North America ([StatCounter, Aug 2026](https://gs.statcounter.com/screen-resolution-stats/mobile/worldwide)) [measured]. Inside X's or Telegram's browser about 664 px of height are visible (the brief's figure). With 16 px gutters the column is 358 px; at 15 px Shantell Sans that is about 8 words a line and 22 px a line, so **40 words = 5 lines = about 110 px** [computed]. Words are not what fills the frame; objects are.
- **Mobile readers understand short simple text as well as on desktop**, but slow down on hard text; brevity still recommended ([NN/g, Moran, 11 Dec 2016](https://www.nngroup.com/articles/mobile-content/), four studies, up to 206 people) [measured]. Scanning patterns: F-shape and "layer cake" (eyes jump from heading to heading) hold on mobile too (NN/g eyetracking report, 2nd ed., via `design-research-2026.md`) [measured, desktop-led].

**Scrolling**
- On desktop pages, 57% of viewing time is on the first screen, 17% on the second, 74% on the first two, 81% on the first three ([NN/g, 15 Apr 2018](https://www.nngroup.com/articles/scrolling-and-attention/)) [measured; desktop only, no newer NN/g data found].
- Mobile homepage visitors scroll through about 25% of the page against 34% on desktop (Chartbeat at ONA 2018, [Chartbeat](https://chartbeat.com/resources/research/what-we-thought-we-knew-about-mobile-readers/)) [measured, old]. Feed content gets about 1.7 s on mobile vs 2.5 s on desktop (Facebook's own test, reported c. 2016 via [secondary](https://www.zmetro.com/?p=6759); I could not find the original) [measured, secondary].
- **Scrollytelling raises engagement, not comprehension.** CHI 2026, N=454, privacy policies: scrollytelling improved engagement, perceived clarity and lowered load against plain text; comprehension was on par with the other formats ([arXiv 2603.04367](https://arxiv.org/abs/2603.04367)) [measured]. A 2026 onboarding study (N=25) found no comprehension difference either ([arXiv 2607.03023](https://arxiv.org/abs/2607.03023)) [measured, small]. So scroll-driven reveals are for pleasure and pacing; a fact must never depend on them.
- "One idea per screen" (Apple product pages, Stripe) is designer practice, not a study I could find [practice/opinion]. The evidence that supports it is the four-chunk limit and the steep drop in attention per screen above.

**What this means:** the first 664 px must carry the whole pitch on their own; every later frame must stand alone (a screenshot, a 1.7 s glance); one fact per frame placed top-left or under its heading; the headings read in sequence must tell the story (layer cake).

---

## 2. Colour

**Green and red**
- Red shown with financial data lowers risk-taking and return expectations and changes trades (8 experiments, 1,451 people); not for yellow or blue; muted in China, absent in colour-blind people ([Bazley, Cronqvist & Mormann, Management Science 2021](https://pubsonline.informs.org/doi/suppl/10.1287/mnsc.2020.3747)) [measured]. The press release quotes 15–30% less risk-taking ([KU, 29 Mar 2021](https://news.ku.edu/news/article/2021/03/29/red-color-impacts-investor-behavior-financial-research-reveals)). Red is potent: a red rim light or red number tab is read as loss whether we mean it or not.
- **The convention flips by market:** mainland China and Taiwan show gains in red, Hong Kong in green ([Jiang, Zhang & Lu, BehavioralEconomics.com](https://behavioraleconomics.com/when-red-means-go); [Benzinga, Oct 2021](https://www.benzinga.com/general/education/21/10/23258001/did-you-know-you-dont-want-to-be-in-the-green-if-youre-trading-in-china-japan-or-taiwan)) [measured + practice]. Binance lets users swap colours, including a blue/orange set for colour vision deficiency ([Cryptohopper news, undated, not confirmed on Binance's own pages](https://cryptohopper.com/news/color-your-trading-binance-adds-support-for-color-vision-deficiencies-6668)) [practice]. Crypto apps default to green = up [opinion from use; not counted]. Keep green = up, but **never let colour be the only carrier**: "+"/"−", W/L letters, ▲/▼.
- **Colour-blind check of the logo's colours [computed today, Machado 2009 deuteranopia matrix, WCAG luminance]:** green #03c870 vs red #ff3a31 differ by only 1.61:1 in lightness for normal vision and 1.25:1 for deuteranopes (both become olive-yellow, #b5a976 and #a99726). Gold #fdbc2a vs green: 1.31:1 (1.49 deutan). About 8% of men are red-green colour blind (`RESEARCH-colour.md`, sourced). For a red-green deficient trader, **green, red and gold are the same family**: profit, loss and #1 must each have a shape.

**Dark or light**
- Controlled tests mostly favour dark text on light for reading and proofreading (MIT AgeLab via [NN/g, Dark mode](https://www.nngroup.com/articles/dark-mode/), 2020; no effect in daytime, light better at night); a 2024 laptop study (30 young adults) found dark mode slightly faster with no error difference ([Muhamad & Mokhtar, JHSMR 2024](https://he01.tci-thaijo.org/index.php/jhsmr/article/view/275050)) [measured, small]. Dark-mode use on phones is reported at about 68–90% (polls and aggregators of weak quality, e.g. [Android Authority poll](https://www.androidauthority.com/dark-mode-survey-results-1090716/)) [measured, weak].
- The audience arrives from X and pump.fun-style trading screens, which are dark [opinion from use]. Prototypicality (Tuch 2012) argues for dark here; the reading penalty is small when text is short, and halation is avoided with cream rather than white text (`RESEARCH-colour.md`). Dark stays.

**How many hues**
- Material Design 3 builds a whole product on three accent groups (primary, secondary, tertiary) plus one semantic role, error ([Android developers, M3 ColorScheme](https://developer.android.com/reference/kotlin/androidx/compose/material3/ColorScheme)) [platform]. Harmony judgements fall as hue differences grow (Schloss & Palmer 2011, [PDF](https://palmerlab.berkeley.edu/pdf/SchlossPalmer.pdf)) [measured, foundational]. The 60-30-10 rule has no traceable origin and no study behind it in UI ([search, Nov 2026](https://www.apartmenttherapy.com/interior-design-rule-60-30-10-explained-37504313)) [practice only].
- **The logo already gives the proportions [computed today from the traced SVG's polygons]:** black disc 66%, cream letters 28%, green slashes 2.5%, red slashes 2.4%, gold dot 0.9%. That is a 66/28/6 split, with gold a single small dot. A page built "from the logo" should look like that: black, cream for every word, and three tiny signal colours.

**Contrast on the ground [computed, WCAG]:** on #04070e cream 17.7, gold 11.9, green 9.1, red 5.7 (all pass 4.5). On cream: ink 17.7, logo green 1.9 and logo red 3.1 (both fail), so green/red text on a cream box needs the deep pair #0a7a3c (4.8) and #c0261d (5.2), as X5+ already found.

**Two findings about today's page [computed]:**
- The narrator yellow #ffd21f and the gold #fdbc2a are 6° of hue and 1.17:1 apart: one colour to the eye. The H29 spec's "gold = headings and #1 only" plus "yellow caption box" gives gold three meanings again.
- The chip world's material is green circuit board and gold pins. In `bet-chip-h2.jpg` and `chip12-*` most of the frame is green solder mask, gold leads and gold rims, with red and green rim lights. The two signal colours (green = profit, gold = #1) are spent as surface on every screen, which is why the audit found "gold means seven things".

---

## 3. Worlds and metaphors

**What the research says**
- The benefits of interface metaphor are "supported by surprisingly little empirical evidence"; its main measurable advantage is mnemonic (memorability), not problem solving ([Blackwell, ACM TOCHI 13(4), 2006](https://dblp.dagstuhl.de/rec/journals/tochi/Blackwell06.html); thesis 1998) [measured, foundational]. Choose the world for recall and identity; do not expect it to explain the data.
- **Decoration next to data hurts novices.** Seductive details (interesting but irrelevant pictures, stories) lower learning, g = −0.33 over 58 studies; worse when placed next to the relevant diagram or when constant; worse for novices ([Sundararajan & Adesope, Educational Psychology Review 2020](https://news.wsu.edu/2020/03/19/seductive-details-inhibit-learning/)) [measured]. Circuit traces, pins and dies around a chart or a P&L are the worst case named in the study.
- **Weak signifiers cost time:** in NN/g's eyetracking of flat vs strong clickability cues, weak ones took about 22% longer with about 25% more fixations (secondary write-up; [NN/g response, 2017](https://www.nngroup.com/articles/response-criticisms-flat-design/)) [measured]. Skeuomorphic UI helps older adults (Urbano et al., BIT 2022) [measured]. Painted knobs that do nothing (8 on today's Smart or lucky) are the opposite failure: false signifiers.
- **AI-slop tells, 2025–26** (agency and tool-vendor blogs, opinion): default gradients and fonts, uniform cards, "every section doing something", illustration that is "too smooth, too symmetrical, plastic", copy that could belong to anyone ([925 Studios, 2026](https://www.925studios.co/blog/ai-slop-web-design-guide); [Built In](https://builtin.com/articles/ai-design-slop-era); [Impeccable](https://impeccable.style/slop)) [practice]. Generated painterly realism with dense texture on every surface reads as one of them; the cure all name is decisions only this brand would make.
- **Comparables.** Alpha Arena (Nof1, Oct–Dec 2025): AI models trading real money, ranked by account value, called an "arena", reported in sport terms (seasons, a mystery model, a winner) ([Forklog](https://forklog.com/en/ai-model-grok-4-2-triumphs-in-trading-tournament/amp); [One Day Advisor, Dec 2025](https://www.onedayadvisor.com/2025/12/nof1ai-alpha-arena-review-season-15.html)) [measured outcomes, secondary]. LMArena frames model comparison as "battles" and a leaderboard ([LMArena policy, 8 Sep 2025](https://news.lmarena.ai/policy)) [platform]. The category's prototype is sport. Broadcast graphics in 2026 moved to "protect the one thing they need to read", motion as temporary hierarchy, brand in the type (SVG, 9 Jun 2026, in `design-research-2026.md`) [practice]. Pokémon TCG Pocket made $120M+ soon after launch on collect-and-reveal ([PocketGamer.biz](https://www.pocketgamer.biz/game-analysis-the-winning-formula-behind-pokmon-trading-card-game-pocket)) [measured, secondary].

**The candidate worlds against EZ's story** (the story: four AIs, a season of rounds, each round a trade graded at the close, a leaderboard by P&L, #1 decides a real bet) [opinion, from the research above]

| World | Instantly understood | Confuses / costs | Fit with the logo | Verdict |
|---|---|---|---|---|
| **Chip / circuit board** (today) | "AI" (silicon), and NVIDIA: the bet's subject is literally a chip; a strong, ownable hero object | Says nothing about competition, season, rounds, ranking or time; green PCB and gold leads use up green and gold; dense traces = high complexity at 17 ms; seductive detail next to every number; every section the same green box (audit: 13–33 framed rectangles a screen) | The logo is a flat black badge; the chip is a lit green 3D object | **Right as objects, wrong as the ground.** Keep the chip for the bet and the four model chips; take it off the floor behind data |
| **Fight night** (a card, bouts, corners, the bell, the decision, a title) | Rivals, one bout per round, long vs short as two corners, the closing bell = the market close, the decision, a title/golden ticket for #1, "the next fight" = the next close | Violence register; boxing is one vs one (four AIs = a card or a tournament); "decision" must equal "Closest" | Black stage, one spotlight, gold belt: very close to the logo's black + one gold dot | **Best story fit.** The owner picked it repeatedly (D2, I4, Upcoming fight night) |
| **Sports broadcast / scoreboard** (scorebug, standings, ticker) | Live, season, standings, form (W-L), "next up"; the most prototypical way to show a leaderboard | Generic, the least ownable; can read as stats app | Flat system graphics match the flat badge logo | **Best as the information system** under whatever story |
| **Trading floor / exchange** | Trading, P&L, the closing bell, ticker tape | Implies a real institution and real advice; 1920s nostalgia; heavy scenes; AIs are not people on a floor | Weak | Borrow the **bell** only |
| **Trading card / collectible** | Each AI as a card with stats on the back; grading (PSA slabs, already live and liked) | "Collect all four" implies something to own or buy (the owner flagged it as false) | Neutral | Keep for the record cards, not as the world |
| **Newspaper / comic book** | Narrative, back issues, "late edition" liveness | Reading load; the owner's own verdict on X3+: "a costume of a comic, not a drawing"; spreadsheets in costume | Bangers lettering fits | Keep the **lettering and the narrator voice**, not the newspaper |

---

## 4. Type

- **Faces.** No study found on the right number of faces; designer practice is two or three (opinion). The audit counted 4–6 per phone screen. NN/g's "glanceable fonts" article (date not checked) finds capitals help single words and short labels read at a glance, and hurt longer passages ([NN/g](https://www.nngroup.com/articles/glanceable-fonts/)) [measured]. All capitals slow running text (Tinker; see [all caps](https://www.wikipedia.org/wiki/Allcaps)), fine for short labels [measured, foundational]. Comic lettering is traditionally all caps for speed of hand-lettering, not readability [practice].
- **Sizes.** Apple: iOS default text 17 pt, minimum 11 pt; thin weights need more ([Apple HIG, Typography](https://developer.apple.com/design/human-interface-guidelines/typography)) [platform]. The H29 scale (body 15, label 12, nothing under 12) sits inside this.
- **Numbers need tabular figures** in columns and counters so digits do not shift ([CreativePro](https://creativepro.com/the-path-to-beautiful-tables-part-iii-working-with-numbers/2/); [Matt Ström, tables](https://mattstromawn.com/writing/tables/)) [practice].
- **Measured on the fonts as Google serves them (2 Nov 2026), with fontTools:**
  - **Anton has no tabular figures** (no `tnum`; its "1" is 677 units against 1,012 for every other digit, 33% narrower). `font-variant-numeric: tabular-nums` does nothing; P&L columns and the countdown jiggle when a 1 appears.
  - **Shantell Sans has `tnum`** (digits 700 units except 1 and 5 by default). It can set table figures at 16 px in columns.
  - **Bangers is capitals only** (x-height = cap height, 721) with proportional figures; fine at 20 px and up, poor for numbers.
  - For reference: Bebas Neue's figures are all one width (400) by default; Barlow Condensed has `tnum`; Oswald, Saira Condensed and Big Shoulders as served do not.

---

## Implications for EZ

### The answer to "is the chip world right?"
**The chip is right as an object and wrong as a world.** It is the one image that says "AI" and "NVIDIA" at once, and the bet chip is the best section; but as the floor of every section it spends green and gold, adds the most visual complexity a 17 ms glance can register, and sits next to every number as a seductive detail. It also says nothing about the thing that makes EZ watchable: a competition with a season, rounds and a winner.

### Recommended world: Fight night, broadcast on a black stage
- **The story is fight night**: Season 1 is the card; each round is a bout; before the report the four AIs take their corners (long or short); **the closing bell** grades it; the decision is "Closest: Grok"; #1 on the board holds the golden ticket (the title) and calls the main event, Bet #1: NVIDIA; "the next fight" is the next close (one "next" source).
- **The system is broadcast graphics**: flat, black, one focal number per frame, a scorebug-like strip for the season, standings like a sports table (the prototype people already know).
- **The chip stays as the cast and the prize**: each model is a chip (meet12 D's medals), the bet is NVIDIA's chip. Re-paint them on **black solder mask with silver/graphite leads**; only #1's chip gets gold. No circuit board behind any chart, table or text.
- Second choice if the owner wants to keep today's look: **the chip world corrected** with the same rules (black boards, gold only on #1, no green surfaces, no rim lights carrying red or green without a fact).

### Palette: one meaning per colour, from the logo
| Logo part (share of the disc) | Colour | Meaning on the page | Never |
|---|---|---|---|
| Disc, 66% | Black #04070e (panels #0c0f17) | The ground, the stage, the night | A pale or white ground |
| Letters, 28% | Cream #f8f0d9 | Every word and line: headings, body, rules, the narrator box's paper (ink #04070e on it) | Pure white |
| Green slash, 2.5% | Green #03c870 (#0a7a3c on cream) | Right direction, profit, W, up | A material, a ground, a model colour, a decorative glow |
| Red slash, 2.4% | Red #ff3a31 (#c0261d on cream) | Wrong direction, loss, L, down, the one risk line | Number tabs, rim lights, "live" dots, headings |
| Gold dot, 0.9% | Gold #fdbc2a | #1 on the board, and the thing #1 decides (the bet). At most one gold thing per screen | Headings, borders, pins, chart of a non-leader, the narrator box |

- Today's yellow narrator box (#ffd21f) is the gold to the eye (1.17:1): make the narrator **cream paper with ink** (the logo's letters), or keep yellow and stop using gold anywhere else; not both.
- Section headings: Bangers lettering kept, **cream fill with an ink stroke**; gold fill only on "Bet #1: NVIDIA" (the stake #1 decides). Owner's call: today's heads are gold.
- Models are told apart by **mark and name**, not hue (they cannot be green, red or gold, and four more hues break the system): chart lines in cream with different dashes or weights, labelled at the line end; #1's line gold.
- Always a second carrier: +/− signs, W/L letters, ▲/▼, a crown or the rank numeral for #1 (gold, green and red collapse for 1 in 12 men).

### Type system (three faces)
| Role | Face | Where | Phone sizes (390) |
|---|---|---|---|
| Heading | Bangers, caps, ink stroke, +0.03em spacing | Headline, section heads, the narrator box | 40 / 34 / narrator 20; never under 20 |
| Display number | Anton | One big figure alone (P&L on a chip, the move, the countdown) | 28 and up. Countdown digits each in a fixed-width box (Anton has no tabular figures) |
| Text and table figures | Shantell Sans, `font-variant-numeric: tabular-nums` | Body, labels, every column of figures | body 15, table 16, label 12 (sentence case) |
Barlow, Barlow Condensed, Kanit and Saira go. Sentences are never in all caps; labels may be.

### Frame budget (phone, 390x664 visible, 358 px column)
Each frame: one focal thing, at most four chunks, at most about 40 words, at most one mover (and only if it carries a fact).

| Section | Frames | What fills them | Words | Focal point / mover |
|---|---|---|---|---|
| Headline | 1.0 | headline (2 lines), the four model marks or the hero chip, "Watch the 1:20 film", Season 1 line | ≤ 25 | the headline / none |
| How a round works | 1.2 | 4 rows: square picture + equal caption box (~150 px each) | ≤ 40 | the step in view / none |
| Meet the models | 1.5 | 4 equal chips, each: rank, name, P&L, W-L (≤ 4 chunks a chip) | ≤ 40 | #1's chip / the founder loop of the chip nearest centre |
| Every round so far | 1.25 | the latest round big (its film muted when in view), one row of back issues, "Show all" | ≤ 30 | the latest round / its film |
| Smart or lucky | 1.0 | one chart, one switch, one narrator line | ≤ 30 | #1's gold line / the line drawing in once |
| The bet | 1.0 | the chip with the countdown, the narrator line, right/wrong | ≤ 35 | the countdown / its seconds |
| Follow on X | 0.6 | "Follow for the next round", the next close's time and companies, one button | ≤ 20 | the button / none |
| Footer | 0.25 | the EZ. logo, the one-line disclaimer | ≤ 20 | none |
| **Total** | **≈ 8 frames, ~5,400 px** | today: ~6,100 px, 9 screens of 27–90 words | | |

Front-load: the first frame must say what it is and that it is live (57% of attention in desktop data; 1.7 s per item in feeds). Every frame should survive as a screenshot.

### Stop doing
1. Green circuit board behind text, tables and charts; gold pins, rims and rules everywhere.
2. Gold on headings, links, non-leader lines and borders; a yellow narrator box next to gold.
3. Red on anything that is not a loss: number tabs, rim lights, live dots, the "NEXT" pill.
4. More than one mover per screen; endless pulses, scan lines, die lights; four founder loops at once.
5. Painted controls that do nothing (knobs, an inert Get $EZ).
6. Anton in columns or counters without fixed-width digits; Bangers under 20 px; sentences in capitals.
7. More than four things to hold on one screen; facts that only appear on a scroll-triggered reveal.
8. Model colours that look like profit, loss or #1 (GPT's mint, Claude's coral, Grok's yellow).
9. White or pale grounds (the owner's rule, and they break the logo's proportions).

### What would prove this wrong
- If a split test (Umami's a/b bucket, once on) shows the chip-floor page holding visitors longer or getting more X follows than a black-stage page, the mnemonic value of the world outweighs its complexity cost for this audience.
- If red-green colour-blind traders report no trouble reading P&L with the signs and letters present, the deep-shape rules can relax.
