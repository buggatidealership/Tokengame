---
name: ez-visual-story
description: How to design any EZ page element (section, card, ticket, chart, label, copy, order of sections) so the picture tells the story and words only label it. Use before proposing or building any design, mockup, layout, wording or sequencing change on the EZ site (X2+, X3+, X4+, X5+, earningszn.xyz), and whenever the owner talks about design.
---

# Visual story: what took "Meet the cast" from card 1 to card 2

Reverse-engineered on 2026-10-30 from the owner's own messages (29 to 30 Oct) and the builds R4 to R10 in world-comic.js.

**Card 1** was a stat sheet: a ranked list of P&L, the right-way count and the last five, with a "Makes the buyback call" chip and a pastel wedge for decoration.
**Card 2** tells the same numbers as a story:
- a Season 1 ticket, whose #1 stub is the Golden ticket;
- the lab's country as a waving flag behind each face;
- the leader's face in holo;
- the P&L counting up as you scroll;
- the words cut down to labels ("Current P&L", "We bet on its call").

## Where the ideas came from (be honest about this)

The owner supplied the metaphors: the ticket stock and its borders, "Season one" in place of "Admit one", the flags, the US vs China rivalry, and "a living comic book... motion, fluidity". I supplied the execution. The gap to close is that I should arrive at those metaphors myself, before being told.

## The test every element must pass

1. **Name the story, not the data.** Write the section's job in one line as a story with stakes, e.g. "four rivals from two countries race for the one ticket we bet on", not "the standings". If you can't find the conflict, the stakes or the change over time, find it before designing.
2. **Every fact needs a carrier.** List the facts the section must convey. For each one, ask what in the page's own world could show it without a sentence:
   - which country → a flag;
   - who we bet on → the golden ticket;
   - leader → holo;
   - money → a bill, a count-up;
   - up or down → green or red, a corner, an arrow.

   A fact that has no carrier stays as a short label.
3. **Decoration must encode something.** If a shape, colour or motion carries no fact, cut it or give it one. Card 1's pastel wedge meant nothing; card 2's flag means "where this lab is from".
4. **Build from objects the site already owns.** Use Season 1 tickets, the graded certificate, the dollar bill, comic panels and balloons. Do not invent a new widget when an existing object can carry the meaning. Every reuse ties the page together.
5. **Motion means something.** A count-up means money accruing. A line drawing in means progression. A wave means a living rival. A punch-in means a new entrant. No motion only because it looks nice, and nothing moves with reduced motion.
6. **Words: the audience's vocabulary, exact about who does what.** Crypto traders say "P&L" and "W/L". "We bet on its call" is right; "makes the buyback call" was wrong, because the AI doesn't buy back. Cut any word the picture already says (the "US" chip next to a flag).
7. **The cover-the-text check.** Hide every word: what can a newcomer still tell? Then show only the words: is anything left that a picture already says? Both answers should be short.
8. **Check the story against the data.** A visual story can lie louder than text. If the golden ticket holder is 1 of 5 in its last five calls, or every hit-rate line is falling, the picture must not imply a hot streak or rising skill. Show the tension or flag it to the owner. Never invent a happier story.
9. **Contrast carries meaning, repetition doesn't.** A flag says something because Kimi's differs from the other three. If every item had the same mark, the mark would carry nothing. Use a carrier where it separates items.
10. **The owner's no-go zones stay.** No flags on the landing cover. No numbers on Starring. The guardrails (no return promises, "the pool can be wiped out") hold. A good principle never overrides an explicit instruction.

## Lessons extracted from the iterations

Each lesson is the reason behind a change the owner liked, not the owner's pointer itself. Each comes with the iteration that taught it.

11. **Explain by walking through one real case, step by step.**
    - People grasp a mechanism through one real instance with cause and effect: these four called it, the close came in, this one passed, it got paid, it moves on.
    - An abstract "how it works" teaches less than that one instance.
    - Pick the instance that shows the mechanism most clearly. A round where everyone was right teaches nothing about grading; one where a single model was right teaches all of it.
    - *Taught by:* the "One round, start to finish" iterations, R2 to R7, 29 Oct.
12. **A carrier belongs only where its fact belongs to that section's story.**
    - The flag works on Meet the models, whose story is rival labs. On the landing page the story is "what EZ does", so a flag there is noise. The same goes for M5's faces, where the story is "the leader".
    - Before reusing a carrier, ask whether this section's story needs that fact.
    - *Taught by:* "you don't need the flag on the landing page / on M5", 30 Oct.
13. **Two carriers for one fact: keep the stronger and cut the other.**
    - A flag plus a "US" chip says the same thing twice. Doubling it is clutter, not emphasis.
    - *Taught by:* the "US" chip removed, 30 Oct.
14. **A thing's own identity is the fastest carrier.**
    - A company is recognised by its brand colour before its name is read. A model is recognised by its face and colour.
    - Use identity where an element stands for that thing.
    - *Taught by:* the brand-colour tickets, B1, 30 Oct.
15. **Build takes from separable parts.**
    - The owner often combines takes: "everything from B1 except the predictions from B3".
    - Design takes whose parts can be swapped (background, layout of the calls, header), and label the parts, so a combination is quick to build.
16. **The strength of a claim must match the size of the sample, and so must its picture.**
    - With about 60 calls, nothing can be said about improving or declining. A coin's 95% range is still 37 to 63%.
    - Show the uncertainty (a luck band, how far into the sample we are) rather than a verdict either way.
    - This is the honest version of lesson 8: don't tell a sadder story than the data either.
    - *Taught by:* "it's not like none of them are improving... we need 100 to 150", 30 Oct.
17. **One name per thing, and words that mean one thing.**
    - "Report" can mean many things; "earnings" is what the audience says.
    - Two "how ... works" in one frame blur together.
    - "Won" means the closest call in a round while the board ranks by P&L. Say which one a word means wherever both appear.
    - *Taught by:* "before the earnings", "How it works / How a round works", 29 Oct; helper a's flag on "wins", 30 Oct.
18. **Don't state the obvious or explain the frame.**
    - "A real one, step by step" tells nothing; of course it is real.
    - Every sentence must add a fact the picture cannot.
    - *Taught by:* R7, 29 Oct.
19. **No dead space, and design each format for itself.**
    - Empty areas and stretched panels read as unfinished.
    - On desktop, recompose the content for the wider shape, scaled to its own container. Do not stretch the phone version.
    - *Taught by:* the R6 panel squares, 29 Oct; the "white space" notes.
20. **Look at the live page before proposing.**
    - Verify what exists before calling it missing. "Every round so far" already showed the winner. The real gap was that a key line had to explain it, which is lesson 7's test.
    - *Taught by:* my wrong proposal, 30 Oct.

21. **A mark must not bury its subject.**
    - A stamp, burst or label sits on top of the thing it is about. Keep it to about a quarter of the area so the subject (the company, the film) stays readable.
    - Bigger is not clearer once it hides what it marks.
    - *Taught by:* the winner stamps in "Every round so far" S1, 30 Oct.
22. **No neutral surfaces.**
    - A plain white or blank fill carries nothing and reads as unfinished.
    - Every surface should carry identity (the company's colours) or the world's texture (halftone, panels), unless the white itself means something.
    - Check every box: why is this background this colour?
    - *Taught by:* "everything that has a white background that doesn't absolutely need one, why have it", 30 Oct.
23. **A carrier must decode at first sight, without a legend.**
    - "Punched in tens" needed a key and still wasn't understood, even by the owner.
    - If an encoding needs explaining, choose one people already know: a line going up, a stamp, a crown, money.
    - *Taught by:* C3 rejected, 30 Oct.
24. **Translate statistics into everyday words, or don't show them.**
    - "19 times in 20" is a statistician's phrase. Most visitors read it as noise.
    - Say what it means for them, or let the picture carry it with no number at all.
    - *Taught by:* the luck band's caption, 30 Oct.
25. **One story, one best carrier, even across sections.**
    - A second element that tells the same story in another form adds length, not meaning. Lead-change panels repeat the line race; a "race for wins" panel repeats the grid of winners.
    - Keep the one that tells it best, usually the simplest graph or the picture people already scroll through.
    - *Taught by:* C6 and S3 dropped, C4 kept, 30 Oct.
26. **The motion is the argument.**
    - P3 works because the punch acts out "this round is now on the record".
    - An idea only lands when its execution makes the point felt. Ask what the movement itself says, not only what the picture shows.
    - *Taught by:* panel 5 P3, 30 Oct.

## How this skill learns (owner, 2026-10-30)

Every time the owner gives pointers and an iteration lands, update this file the same day:
- Ask why the new version is better, find the general reason, and add it as a numbered lesson with what taught it.
- Do not copy the pointer itself. "Remove the US chip" is a pointer; "two carriers for one fact" is the lesson.
- If a new lesson contradicts an old one, rewrite the old one rather than stacking both.
- Commit the change with the work it came from.

## How to work with it

- **Before the first mockup,** write a three-line brief per element:
  - **story:** the conflict or stakes in one line;
  - **facts → carriers:** which visual carries each fact;
  - **words left:** only what no picture can say.
- **Then make several genuinely different takes,** each with a different carrier or metaphor, not a re-skin.
- **Mockups by default** (owner, 2026-10-30): every proposal arrives with its mockups; do not ask whether to make them. Ask a clarifying question whenever a phrase in the owner's brain dump can be read two ways, alongside the mockups.
- **Propose, don't wait.** When an element on the page fails the test, say so and mock up the fix, even if the owner didn't mention it.
- **Say how it could fail.** The usual case: a viewer doesn't decode the visual without text. Analytics are off, so the only test is a person looking at it; ask the owner.
